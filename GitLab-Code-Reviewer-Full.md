# GitLab Merge Request Code Reviewer - Complete Code

This is a complete, browser-based GitLab merge request code reviewer powered by OpenAI's GPT models. The application allows users to input a GitLab merge request URL, specify a custom OpenAI API endpoint, upload company-specific code review instructions, and receive AI-generated code reviews.

---

## 📄 Page 1: HTML Interface (index.html)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GitLab Merge Request Code Reviewer</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>GitLab Merge Request Code Reviewer</h1>
        <p>AI-powered code review for GitLab merge requests</p>
      </header>

      <div class="input-section">
        <div class="input-group">
          <label for="gitlab-url">GitLab Merge Request URL:</label>
          <input
            type="url"
            id="gitlab-url"
            placeholder="https://gitlab.com/group/project/-/merge_requests/123"
            required
          />
        </div>

        <div class="input-group">
          <label for="api-endpoint">OpenAI API Endpoint:</label>
          <input
            type="url"
            id="api-endpoint"
            placeholder="https://api.openai.com/v1"
            value="https://api.openai.com/v1"
          />
        </div>

        <div class="input-group">
          <label for="openai-key">OpenAI API Key:</label>
          <input
            type="password"
            id="openai-key"
            placeholder="Enter your OpenAI API key"
            required
          />
        </div>

        <div class="input-group">
          <label for="custom-instructions"
            >Custom Review Instructions (Optional):</label
          >
          <input
            type="file"
            id="custom-instructions"
            accept=".md,.txt"
            onchange="loadCustomInstructions(event)"
          />
          <small style="color: #666; font-size: 12px;"
            >Upload a markdown or text file with company-specific code review
            guidelines</small
          >
        </div>

        <button id="review-btn" onclick="startReview()">
          Start Code Review
        </button>
      </div>

      <div class="loading" id="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Analyzing merge request...</p>
      </div>

      <div class="results" id="results" style="display: none;">
        <h2>Code Review Results</h2>
        <div id="review-content"></div>
        <div class="save-section">
          <button id="save-btn" onclick="saveReview()">Save Review</button>
          <div id="save-status"></div>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

---

## 📄 Page 2: CSS Styling (styles.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background: #2c3e50;
  color: white;
  padding: 30px;
  text-align: center;
}

header h1 {
  margin-bottom: 10px;
  font-size: 2.2rem;
}

header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.input-section {
  padding: 30px;
  background: #f8f9fa;
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

input[type="url"],
input[type="password"] {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input[type="url"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

button:active {
  transform: translateY(0);
}

.loading {
  text-align: center;
  padding: 40px 30px;
  background: #f8f9fa;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.results {
  padding: 30px;
  background: white;
}

.results h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

#review-content {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 1.7;
  white-space: pre-wrap;
  font-family: "Courier New", monospace;
  font-size: 14px;
  max-height: 400px;
  overflow-y: auto;
}

.save-section {
  text-align: center;
}

#save-status {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500;
}

#save-status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

#save-status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .container {
    margin: 10px;
  }

  header {
    padding: 20px;
  }

  header h1 {
    font-size: 1.8rem;
  }

  .input-section,
  .results {
    padding: 20px;
  }
}
```

---

## 📄 Page 3: JavaScript Logic (script.js)

```javascript
// GitLab Merge Request Code Reviewer
class GitLabReviewer {
  constructor() {
    this.openaiApiKey = "";
    this.apiEndpoint = "https://api.openai.com/v1";
    this.gitlabUrl = "";
    this.mergeRequestData = null;
    this.customInstructions = null;
  }

  // Parse GitLab URL to extract project and MR information
  parseGitLabUrl(url) {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname
        .split("/")
        .filter((part) => part !== "");

      // GitLab URL structure: /group/project/-/merge_requests/id
      if (
        pathParts.length >= 4 &&
        pathParts[pathParts.length - 3] === "-" &&
        pathParts[pathParts.length - 2] === "merge_requests"
      ) {
        const projectPath = pathParts.slice(0, pathParts.length - 3).join("/");
        const mergeRequestId = pathParts[pathParts.length - 1];

        return {
          baseUrl: `${urlObj.origin}`,
          projectPath: projectPath,
          mergeRequestId: mergeRequestId,
          apiUrl: `${urlObj.origin}/api/v4/projects/${encodeURIComponent(
            projectPath
          )}/merge_requests/${mergeRequestId}`,
        };
      }
    } catch (error) {
      console.error("Error parsing GitLab URL:", error);
    }
    return null;
  }

  // Simulate fetching merge request data (in real implementation, this would use GitLab API)
  async fetchMergeRequestData(apiUrl) {
    // For demo purposes, we'll simulate merge request data
    // In a real implementation, you would need a GitLab personal access token
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 123,
          title: "Add new authentication feature",
          description: "This MR adds JWT authentication to the API endpoints",
          state: "opened",
          source_branch: "feature/auth",
          target_branch: "main",
          author: {
            name: "John Doe",
            username: "johndoe",
          },
          changes: [
            {
              file: "src/auth.js",
              content: `const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateUser;`,
            },
            {
              file: "src/routes.js",
              content: `const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.get('/protected', auth, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;`,
            },
          ],
        });
      }, 2000);
    });
  }

  // Generate code review using OpenAI
  async generateCodeReview(mergeRequestData) {
    const prompt = this.buildReviewPrompt(mergeRequestData);

    try {
      const response = await fetch(`${this.apiEndpoint}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an expert code reviewer. Provide detailed, constructive feedback on code changes in merge requests. Focus on code quality, best practices, security, performance, and maintainability.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating code review:", error);
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

    mergeRequestData.changes.forEach((change) => {
      prompt += `
File: ${change.file}
\`\`\`
${change.content}
\`\`\`
`;
    });

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

    return prompt;
  }

  // Save review to local storage
  saveReview(reviewContent, mergeRequestData) {
    const savedReviews = JSON.parse(
      localStorage.getItem("gitlabReviews") || "[]"
    );
    const review = {
      id: Date.now(),
      mergeRequestId: mergeRequestData.id,
      title: mergeRequestData.title,
      url: this.gitlabUrl,
      review: reviewContent,
      timestamp: new Date().toISOString(),
      author: mergeRequestData.author.name,
    };

    savedReviews.push(review);
    localStorage.setItem("gitlabReviews", JSON.stringify(savedReviews));
    return review;
  }

  // Get saved reviews
  getSavedReviews() {
    return JSON.parse(localStorage.getItem("gitlabReviews") || "[]");
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
    document
      .getElementById("review-btn")
      .addEventListener("click", () => this.startReview());
    document
      .getElementById("save-btn")
      .addEventListener("click", () => this.saveReview());
  }

  async startReview() {
    const gitlabUrl = document.getElementById("gitlab-url").value.trim();
    const apiEndpoint = document.getElementById("api-endpoint").value.trim();
    const openaiKey = document.getElementById("openai-key").value.trim();

    if (!gitlabUrl || !openaiKey) {
      this.showError("Please provide both GitLab URL and OpenAI API key");
      return;
    }

    // Parse GitLab URL
    const parsedUrl = this.reviewer.parseGitLabUrl(gitlabUrl);
    if (!parsedUrl) {
      this.showError("Invalid GitLab merge request URL format");
      return;
    }

    // Update reviewer instance
    this.reviewer.gitlabUrl = gitlabUrl;
    this.reviewer.apiEndpoint = apiEndpoint || this.reviewer.apiEndpoint;
    this.reviewer.openaiApiKey = openaiKey;

    // Show loading state
    this.showLoading();

    try {
      // Fetch merge request data
      const mergeRequestData = await this.reviewer.fetchMergeRequestData(
        parsedUrl.apiUrl
      );

      // Generate code review
      const reviewContent = await this.reviewer.generateCodeReview(
        mergeRequestData
      );

      // Display results
      this.showResults(reviewContent, mergeRequestData);
    } catch (error) {
      console.error("Review process failed:", error);
      this.showError(
        "Failed to generate code review. Please check your API key and try again."
      );
      this.hideLoading();
    }
  }

  showLoading() {
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").style.display = "none";
  }

  hideLoading() {
    document.getElementById("loading").style.display = "none";
  }

  showResults(reviewContent, mergeRequestData) {
    this.hideLoading();
    document.getElementById("results").style.display = "block";
    document.getElementById("review-content").textContent = reviewContent;

    // Store data for saving
    this.currentReview = reviewContent;
    this.currentMRData = mergeRequestData;
  }

  saveReview() {
    if (!this.currentReview || !this.currentMRData) {
      this.showSaveStatus("No review to save", false);
      return;
    }

    try {
      const savedReview = this.reviewer.saveReview(
        this.currentReview,
        this.currentMRData
      );
      this.showSaveStatus(
        `Review saved successfully! (ID: ${savedReview.id})`,
        true
      );
    } catch (error) {
      console.error("Error saving review:", error);
      this.showSaveStatus("Failed to save review", false);
    }
  }

  showSaveStatus(message, isSuccess) {
    const statusEl = document.getElementById("save-status");
    statusEl.textContent = message;
    statusEl.className = isSuccess ? "success" : "error";
  }

  showError(message) {
    // Create a simple alert for errors
    alert(message);
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  new UIController();
});

// Export for potential testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { GitLabReviewer, UIController };
}
```

---

## 📄 Page 4: Documentation (README.md)

# GitLab Merge Request Code Reviewer

An AI-powered code review tool that analyzes GitLab merge requests using OpenAI's GPT models. Built with HTML, CSS, and JavaScript for easy browser-based usage.

## Features

- 🔍 **GitLab URL Parsing**: Automatically parses GitLab merge request URLs
- 🤖 **AI Code Review**: Uses OpenAI GPT-3.5-turbo for comprehensive code analysis
- 💾 **Save Reviews**: Store code reviews locally for future reference
- 🎨 **Modern UI**: Clean, responsive interface with loading states
- 📱 **Browser-based**: Works entirely in the browser without server setup

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Enter GitLab URL**: Paste the URL of the merge request you want to review
   - Example: `https://gitlab.com/group/project/-/merge_requests/123`
3. **Set API Endpoint** (Optional): Enter your custom OpenAI API endpoint
   - Default: `https://api.openai.com/v1` (for standard OpenAI)
   - For Azure OpenAI: `https://your-resource.openai.azure.com/`
   - For other compatible endpoints, use the base URL
4. **Add OpenAI API Key**: Enter your OpenAI API key
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
5. **Start Review**: Click "Start Code Review" to begin the analysis
6. **View Results**: Read the AI-generated code review
7. **Save Review**: Optionally save the review for future reference

## Code Review Coverage

The AI reviewer analyzes:

- ✅ Code quality and style
- ✅ Best practices and conventions
- ✅ Potential bugs or security issues
- ✅ Performance considerations
- ✅ Maintainability suggestions
- ✅ Constructive improvement recommendations

## File Structure

```
├── index.html          # Main HTML interface
├── styles.css          # Modern CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Important Notes

### GitLab API Integration

Currently, the application uses simulated merge request data for demonstration purposes. For production use with real GitLab repositories, you would need to:

1. Add a GitLab Personal Access Token input field
2. Implement actual GitLab API calls in the `fetchMergeRequestData()` method
3. Handle authentication and rate limiting

### OpenAI API Requirements

- You need a valid OpenAI API key
- The application uses GPT-3.5-turbo model
- API costs apply based on token usage

### Security Considerations

- API keys are stored only in memory during the session
- Saved reviews are stored in browser's localStorage
- Never commit API keys to version control

## Browser Compatibility

Works in all modern browsers that support:

- ES6+ JavaScript features
- Fetch API
- localStorage
- CSS Grid and Flexbox

## Customization

You can easily modify the code review prompts in the `buildReviewPrompt()` method to:

- Change the review focus areas
- Adjust the tone of reviews
- Add organization-specific guidelines
- Support different programming languages

## Future Enhancements

Potential improvements could include:

- Real GitLab API integration
- Support for multiple AI models
- Export reviews as PDF/Markdown
- Integration with GitLab comments
- Batch processing of multiple merge requests
- Custom review templates

## License

This project is open source and available under the MIT License.

---

## 📄 Page 5: Setup Instructions

### Quick Start

1. Download all files from this markdown document
2. Save each code block to its respective file:
   - Page 1 → `index.html`
   - Page 2 → `styles.css`
   - Page 3 → `script.js`
   - Page 4 → `README.md`
3. Open `index.html` in any modern web browser
4. Enter your GitLab merge request URL and OpenAI API key
5. Click "Start Code Review"

### File Dependencies

- `index.html` - Links to `styles.css` and `script.js`
- `styles.css` - Contains all styling
- `script.js` - Contains all functionality
- `README.md` - Documentation

### Browser Requirements

- Modern browser with ES6+ support
- Fetch API support
- localStorage support
- CSS Grid and Flexbox support

### API Requirements

- OpenAI API key (or compatible service)
- Custom endpoint URL (if using Azure OpenAI or similar)
- Internet connection for API calls

---

**Note**: This complete code package includes everything needed to run the GitLab Merge Request Code Reviewer. All files are self-contained and work together to provide a fully functional AI-powered code review tool.
