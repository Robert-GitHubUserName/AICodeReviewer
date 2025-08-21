// GitLab Merge Request Code Reviewer
class GitLabReviewer {
    constructor() {
        this.openaiApiKey = "";
        this.apiEndpoint = "https://api.openai.com/v1";
        this.gitlabUrl = "";
        this.gitlabToken = "";
        this.mergeRequestData = null;
        this.customInstructions = null;
    }

    // Parse GitLab URL to extract project and MR information
    parseGitLabUrl(url) {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter(part => part !== '');

            // GitLab URL structure: /group/project/-/merge_requests/id
            if (pathParts.length >= 4 &&
                pathParts[pathParts.length - 3] === '-' &&
                pathParts[pathParts.length - 2] === 'merge_requests') {

                const projectPath = pathParts.slice(0, pathParts.length - 3).join('/');
                const mergeRequestId = pathParts[pathParts.length - 1];

                return {
                    baseUrl: `${urlObj.origin}`,
                    projectPath: projectPath,
                    mergeRequestId: mergeRequestId,
                    apiUrl: `${urlObj.origin}/api/v4/projects/${encodeURIComponent(projectPath)}/merge_requests/${mergeRequestId}`
                };
            }
        } catch (error) {
            console.error('Error parsing GitLab URL:', error);
        }
        return null;
    }

    // Fetch merge request data using GitLab API
    async fetchMergeRequestData(apiUrl) {
        if (!this.gitlabToken) {
            throw new Error('GitLab personal access token is required');
        }

        try {
            // First, get the basic merge request information
            const mrResponse = await this.makeGitLabRequest(apiUrl);
            const mergeRequest = await mrResponse.json();

            // Get the changes using the changes endpoint
            const changesUrl = `${apiUrl}/changes`;
            const changesResponse = await this.makeGitLabRequest(changesUrl);
            const changesData = await changesResponse.json();

            // Process changes with pagination support
            let allChanges = [];
            if (changesData.changes) {
                allChanges = changesData.changes;
            }

            // Handle pagination for large diffs
            if (changesData._links && changesData._links.next) {
                const paginatedChanges = await this.fetchAllChanges(changesUrl);
                allChanges = paginatedChanges;
            }

            // Get file contents for each changed file
            const changesWithContent = await this.enrichChangesWithContent(
                allChanges,
                mergeRequest.source_branch
            );

            return {
                id: mergeRequest.id,
                title: mergeRequest.title,
                description: mergeRequest.description || '',
                state: mergeRequest.state,
                source_branch: mergeRequest.source_branch,
                target_branch: mergeRequest.target_branch,
                author: {
                    name: mergeRequest.author ? mergeRequest.author.name : 'Unknown',
                    username: mergeRequest.author ? mergeRequest.author.username : 'unknown'
                },
                changes: changesWithContent
            };
        } catch (error) {
            console.error('Error fetching merge request data:', error);
            throw new Error(`Failed to fetch merge request data: ${error.message}`);
        }
    }

    // Make authenticated request to GitLab API
    async makeGitLabRequest(url) {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.gitlabToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`GitLab API error ${response.status}: ${errorData.message || response.statusText}`);
        }

        return response;
    }

    // Fetch all changes with pagination support
    async fetchAllChanges(baseUrl) {
        let allChanges = [];
        let nextUrl = baseUrl;

        while (nextUrl) {
            const response = await this.makeGitLabRequest(nextUrl);
            const data = await response.json();

            if (data.changes) {
                allChanges = allChanges.concat(data.changes);
            }

            // Check for next page
            if (data._links && data._links.next) {
                nextUrl = data._links.next;
            } else {
                nextUrl = null;
            }
        }

        return allChanges;
    }

    // Enrich changes with file content from GitLab API
    async enrichChangesWithContent(changes, sourceBranch) {
        const enrichedChanges = [];

        for (const change of changes) {
            try {
                const fileContent = await this.fetchFileContent(change.new_path, sourceBranch);
                enrichedChanges.push({
                    file: change.new_path,
                    old_path: change.old_path,
                    new_path: change.new_path,
                    content: fileContent || change.diff,
                    diff: change.diff,
                    new_file: change.new_file,
                    renamed_file: change.renamed_file,
                    deleted_file: change.deleted_file
                });
            } catch (error) {
                console.warn(`Failed to fetch content for ${change.new_path}:`, error);
                // Use diff as fallback
                enrichedChanges.push({
                    file: change.new_path,
                    old_path: change.old_path,
                    new_path: change.new_path,
                    content: change.diff,
                    diff: change.diff,
                    new_file: change.new_file,
                    renamed_file: change.renamed_file,
                    deleted_file: change.deleted_file
                });
            }
        }

        return enrichedChanges;
    }

    // Fetch file content from GitLab repository
    async fetchFileContent(filePath, branch) {
        try {
            const parsedUrl = this.parseGitLabUrl(this.gitlabUrl);
            if (!parsedUrl) {
                throw new Error('Invalid GitLab URL');
            }

            const fileUrl = `${parsedUrl.baseUrl}/api/v4/projects/${encodeURIComponent(parsedUrl.projectPath)}/repository/files/${encodeURIComponent(filePath)}/raw?ref=${encodeURIComponent(branch)}`;

            const response = await this.makeGitLabRequest(fileUrl);
            const content = await response.text();
            return content;
        } catch (error) {
            console.warn(`Could not fetch file content for ${filePath}:`, error);
            return null;
        }
    }

    // Generate code review using OpenAI
    async generateCodeReview(mergeRequestData) {
        const prompt = this.buildReviewPrompt(mergeRequestData);

        try {
            const response = await fetch(`${this.apiEndpoint}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert code reviewer. Provide detailed, constructive feedback on code changes in merge requests. Focus on code quality, best practices, security, performance, and maintainability.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating code review:', error);
            throw error;
        }
    }

    // Build the prompt for OpenAI
    buildReviewPrompt(mergeRequestData) {
        let prompt = `Please review this merge request:

Title: ${mergeRequestData.title}
Description: ${mergeRequestData.description}
Source Branch: ${mergeRequestData.source_branch}
Target Branch: ${mergeRequestData.target_branch}

Files changed:
`;

        mergeRequestData.changes.forEach(change => {
            prompt += `
File: ${change.file}
\`\`\`
${change.content}
\`\`\`
`;
        });

        // Use custom instructions if available, otherwise use default
        if (this.customInstructions) {
            prompt += `

${this.customInstructions}`;
        } else {
            prompt += `

Please provide a comprehensive code review covering:
1. Code quality and style
2. Best practices and conventions
3. Potential bugs or issues
4. Security concerns
5. Performance considerations
6. Maintainability
7. Suggestions for improvement

Format your review with clear sections and be constructive in your feedback.`;
        }

        return prompt;
    }

    // Save review to local storage
    saveReview(reviewContent, mergeRequestData) {
        const savedReviews = JSON.parse(localStorage.getItem('gitlabReviews') || '[]');
        const review = {
            id: Date.now(),
            mergeRequestId: mergeRequestData.id,
            title: mergeRequestData.title,
            url: this.gitlabUrl,
            review: reviewContent,
            timestamp: new Date().toISOString(),
            author: mergeRequestData.author.name
        };

        savedReviews.push(review);
        localStorage.setItem('gitlabReviews', JSON.stringify(savedReviews));
        return review;
    }

    // Get saved reviews
    getSavedReviews() {
        return JSON.parse(localStorage.getItem('gitlabReviews') || '[]');
    }

    // Load custom instructions from uploaded file
    async loadCustomInstructions(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.customInstructions = e.target.result;
                resolve(this.customInstructions);
            };
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    }
}

// UI Controller
class UIController {
    constructor() {
        this.reviewer = new GitLabReviewer();
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('review-btn').addEventListener('click', () => this.startReview());
        document.getElementById('save-btn').addEventListener('click', () => this.saveReview());

        // Add input event listeners to clear errors when user starts typing
        const inputs = ['gitlab-url', 'gitlab-token', 'openai-key', 'api-endpoint'];
        inputs.forEach(inputId => {
            document.getElementById(inputId).addEventListener('input', () => {
                this.hideError();
            });
        });

        // Add real-time URL validation
        document.getElementById('gitlab-url').addEventListener('blur', (e) => {
            const url = e.target.value.trim();
            if (url && !this.reviewer.parseGitLabUrl(url)) {
                this.showError('Please enter a valid GitLab merge request URL');
            }
        });
    }

    async startReview() {
        const gitlabUrl = document.getElementById('gitlab-url').value.trim();
        const apiEndpoint = document.getElementById('api-endpoint').value.trim();
        const gitlabToken = document.getElementById('gitlab-token').value.trim();
        const openaiKey = document.getElementById('openai-key').value.trim();

        if (!gitlabUrl || !gitlabToken || !openaiKey) {
            this.showError('Please provide GitLab URL, GitLab token, and OpenAI API key');
            return;
        }

        // Parse GitLab URL
        const parsedUrl = this.reviewer.parseGitLabUrl(gitlabUrl);
        if (!parsedUrl) {
            this.showError('Invalid GitLab merge request URL format');
            return;
        }

        // Update reviewer instance
        this.reviewer.gitlabUrl = gitlabUrl;
        this.reviewer.gitlabToken = gitlabToken;
        this.reviewer.apiEndpoint = apiEndpoint || this.reviewer.apiEndpoint;
        this.reviewer.openaiApiKey = openaiKey;

        // Show loading state
        this.showLoading();

        try {
            // Fetch merge request data
            const mergeRequestData = await this.reviewer.fetchMergeRequestData(parsedUrl.apiUrl);

            // Generate code review
            const reviewContent = await this.reviewer.generateCodeReview(mergeRequestData);

            // Display results
            this.showResults(reviewContent, mergeRequestData);
        } catch (error) {
            console.error('Review process failed:', error);
            this.showError('Failed to generate code review. Please check your API key and try again.');
            this.hideLoading();
        }
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('results').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showResults(reviewContent, mergeRequestData) {
        this.hideLoading();
        document.getElementById('results').style.display = 'block';
        document.getElementById('review-content').textContent = reviewContent;

        // Store data for saving
        this.currentReview = reviewContent;
        this.currentMRData = mergeRequestData;
    }

    saveReview() {
        if (!this.currentReview || !this.currentMRData) {
            this.showSaveStatus('No review to save', false);
            return;
        }

        try {
            const savedReview = this.reviewer.saveReview(this.currentReview, this.currentMRData);
            this.showSaveStatus(`Review saved successfully! (ID: ${savedReview.id})`, true);
        } catch (error) {
            console.error('Error saving review:', error);
            this.showSaveStatus('Failed to save review', false);
        }
    }

    showSaveStatus(message, isSuccess) {
        const statusEl = document.getElementById('save-status');
        statusEl.textContent = message;
        statusEl.className = isSuccess ? 'success' : 'error';
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');

        errorText.textContent = message;
        errorDiv.style.display = 'flex';

        // Hide loading and results if they're visible
        this.hideLoading();
        document.getElementById('results').style.display = 'none';

        // Auto-hide error after 10 seconds
        setTimeout(() => {
            this.hideError();
        }, 10000);
    }

    hideError() {
        document.getElementById('error-message').style.display = 'none';
    }
}

// Global function to handle file upload
async function loadCustomInstructions(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            // Get the global UI controller instance
            const uiController = window.uiController;
            if (uiController && uiController.reviewer) {
                await uiController.reviewer.loadCustomInstructions(file);
                console.log('Custom instructions loaded successfully');
                uiController.showError('Custom instructions loaded successfully!');
            }
        } catch (error) {
            console.error('Error loading custom instructions:', error);
            // Use inline error display instead of alert
            const uiController = window.uiController;
            if (uiController) {
                uiController.showError('Error loading custom instructions file. Please try a different file.');
            }
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.uiController = new UIController();
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GitLabReviewer, UIController };
}
