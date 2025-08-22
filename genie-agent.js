/**
 * Genie Agent Integration for AI Code Reviewer
 * Handles Clippy Genie agent initialization and interactions
 */

class GenieAgent {
    constructor() {
        this.agent = null;
        this.isLoaded = false;
        this.isVisible = false;
        this.loadAttempted = false;
    }

    /**
     * Initialize the Genie agent
     */
    async init() {
        if (this.loadAttempted) {
            return;
        }
        
        this.loadAttempted = true;
        
        try {
            // Check if Clippy library is loaded
            if (typeof clippy === 'undefined') {
                console.error('Clippy library not found - make sure clippy.min.js is loaded');
                throw new Error('Clippy library not loaded');
            }

            // Check if jQuery is loaded
            if (typeof jQuery === 'undefined' && typeof $ === 'undefined') {
                console.error('jQuery not found - make sure jQuery is loaded before Clippy');
                throw new Error('jQuery library not loaded');
            }

            console.log('Dependencies loaded successfully, loading Genie agent...');
            
            // CRITICAL: Override the hardcoded S3 path in the clippy library
            // This must be done BEFORE calling clippy.load()
            const localBasePath = window.location.origin + '/Clippy/agents/';
            clippy.BASE_PATH = localBasePath;
            console.log('Clippy BASE_PATH overridden to:', clippy.BASE_PATH);
            
            // Also need to override the _loadMap function since it might use hardcoded paths
            const originalLoadMap = clippy.load._loadMap;
            clippy.load._loadMap = function(path) {
                // Replace S3 path with local path if present
                const localPath = path.replace('//s3.amazonaws.com/clippy.js/Agents/', localBasePath);
                console.log('Loading map from:', localPath + '/map.png');
                return originalLoadMap.call(this, localPath);
            };
            
            // First, test if we can access the Genie agent files
            console.log('Testing agent file accessibility...');
            fetch('./Clippy/agents/Genie/agent.js')
                .then(response => {
                    if (response.ok) {
                        console.log('Genie agent.js file is accessible');
                    } else {
                        console.error('Cannot access Genie agent.js file:', response.status, response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error accessing Genie agent.js file:', error);
                });
            
            // Try alternative path format
            fetch('Clippy/agents/Genie/agent.js')
                .then(response => {
                    if (response.ok) {
                        console.log('Genie agent.js file is accessible (alternative path)');
                    } else {
                        console.error('Cannot access Genie agent.js file (alternative path):', response.status, response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error accessing Genie agent.js file (alternative path):', error);
                });
            
            // Add error handling and timeout for clippy.load
            let loadTimeout = setTimeout(() => {
                console.error('Genie agent load timeout - callback never triggered');
                this.showError('Genie agent failed to load (timeout). Check if agent files are accessible.');
            }, 5000);
            
            clippy.load('Genie', (agent) => {
                clearTimeout(loadTimeout);
                console.log('Genie agent callback triggered');
                if (!agent) {
                    console.error('Agent is null in callback');
                    return;
                }
                
                this.agent = agent;
                this.isLoaded = true;
                console.log('Genie agent loaded successfully');
                
                // Ensure DOM is ready before showing
                setTimeout(() => {
                    // Show the agent
                    console.log('Calling agent.show()...');
                    agent.show();
                    this.isVisible = true;
                    console.log('Genie agent show() called');
                    
                    // Position immediately after showing
                    setTimeout(() => {
                        // Position the agent in the center of the screen
                        const centerX = Math.max(window.innerWidth / 2 - 64, 200);
                        const centerY = Math.max(window.innerHeight / 2 - 64, 200);
                        console.log(`Positioning Genie at: ${centerX}, ${centerY}`);
                        console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`);
                        
                        agent.moveTo(centerX, centerY);
                        
                        // Force visibility with CSS
                        if (agent._el) {
                            console.log('Setting agent position and visibility via CSS');
                            agent._el.style.left = centerX + 'px';
                            agent._el.style.top = centerY + 'px';
                            agent._el.style.zIndex = '10000';
                            agent._el.style.display = 'block';
                            agent._el.style.visibility = 'visible';
                            agent._el.style.opacity = '1';
                            agent._el.style.position = 'fixed';
                            console.log('Agent element:', agent._el);
                            console.log('Agent element computed style:', window.getComputedStyle(agent._el));
                        } else {
                            console.error('Agent element (_el) not found after show()');
                        }
                        
                        // Ask how to help when first summoned
                        setTimeout(() => {
                            console.log('Playing greeting...');
                            
                            // Double-check agent visibility
                            if (agent._el) {
                                console.log('Agent element exists and should be visible');
                                console.log('Element style:', agent._el.style.cssText);
                            } else {
                                console.error('Agent element not found!');
                            }
                            
                            agent.speak('Hello! I\'m Genie, your code assistant. How can I help you today?');
                            agent.play('Greet');
                            
                            // After a brief pause, offer to ask a question
                            setTimeout(() => {
                                this.askQuestion();
                            }, 3000);
                        }, 500);
                        
                    }, 100);
                }, 200);
                
                // Set up click interactions for questions
                this.setupAgentInteractions(agent);
            }, (error) => {
                // Error callback for clippy.load
                clearTimeout(loadTimeout);
                console.error('Clippy.load error callback triggered:', error);
                console.error('Error type:', typeof error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                
                // Try to extract more info from the error event
                if (error && error.target) {
                    console.error('Error target:', error.target);
                    console.error('Error target src:', error.target.src);
                }
                
                this.showError('Failed to load Genie agent files. Check browser console for details.');
            }, {
                // Try absolute path to avoid S3 fallback
                path: window.location.origin + '/Clippy/agents/'
            });
            
        } catch (error) {
            console.error('Error loading Genie agent:', error);
            this.showError('Failed to load Genie agent: ' + error.message);
        }
    }

    /**
     * Toggle agent visibility
     */
    toggle() {
        if (!this.isLoaded) {
            this.init();
            return;
        }

        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * Set up agent interactions (simple right-click only)
     */
    setupAgentInteractions(agent) {
        if (!agent || !agent._el) {
            console.error('Cannot setup interactions - agent or element not available');
            return;
        }

        console.log('Setting up simple Genie right-click interaction...');

        // Right-click to ask a question
        $(agent._el).on('contextmenu', (e) => {
            e.preventDefault();
            this.askQuestion();
        });

        console.log('Genie ready - right-click to ask questions!');
    }

    /**
     * Show the agent
     */
    show() {
        if (this.agent && !this.isVisible) {
            this.agent.show();
            this.isVisible = true;
            
            // Ask how to help when shown
            setTimeout(() => {
                this.agent.speak('I\'m back! How can I help you with your code?');
                this.agent.play('GetAttention');
                
                // Offer to ask a question after greeting
                setTimeout(() => {
                    this.askQuestion();
                }, 2500);
            }, 300);
        }
    }

    /**
     * Hide the agent
     */
    hide() {
        if (this.agent && this.isVisible) {
            this.agent.hide();
            this.isVisible = false;
        }
    }

    /**
     * Ask Genie a question about code
     */
    askQuestion() {
        if (!this.agent || !this.isVisible) {
            this.init().then(() => {
                setTimeout(() => this.askQuestion(), 1000);
            });
            return;
        }

        // Enhanced question interface with suggestions
        const questionSuggestions = [
            "💡 Explain this code section",
            "🔍 Review for best practices", 
            "🐛 Help debug an issue",
            "⚡ Suggest performance improvements",
            "🎨 Improve code readability",
            "🔧 Refactor suggestions",
            "📚 Explain a concept",
            "🌐 Framework-specific help",
            "✅ Code quality check",
            "🚀 Modernize this code"
        ];

        const suggestion = questionSuggestions[Math.floor(Math.random() * questionSuggestions.length)];
        
        const question = prompt(`🧞‍♂️ What would you like to ask about your code?

💬 Quick suggestion: "${suggestion}"

I can help with:
• Code explanations & reviews
• Best practices & clean code
• Debugging & troubleshooting  
• Performance optimization
• Modern JavaScript/HTML/CSS
• Framework questions
• Architecture advice
• Security considerations

✨ Tip: Be specific for better help!`);
        
        if (question && question.trim()) {
            this.processQuestionWithAI(question.trim());
        }
    }

    /**
     * Process question with AI integration
     */
    async processQuestionWithAI(question) {
        if (!this.agent) return;

        // Show thinking animation
        this.agent.play('Processing');
        this.agent.speak('Let me think about that...');

        try {
            // For now, use enhanced local processing
            // TODO: Integrate with actual AI API when available
            const response = await this.getEnhancedResponse(question);
            
            // FUTURE: Replace with actual AI API call
            // const response = await this.queryAI(question);
            
            // Show the response
            this.agent.speak(response);
            this.agent.play('Explain');
            
            // Ask if they want to know more
            setTimeout(() => {
                const followUp = confirm('Would you like to ask another question or get more details?');
                if (followUp) {
                    this.askQuestion();
                }
            }, 3000);
            
        } catch (error) {
            console.error('Error processing question:', error);
            this.agent.speak('Sorry, I had trouble processing that question. Please try again!');
            this.agent.play('Confused');
        }
    }

    /**
     * Get enhanced response (can be upgraded to AI API later)
     */
    async getEnhancedResponse(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced pattern matching for better responses
        if (lowerQuestion.includes('explain') || lowerQuestion.includes('what')) {
            return this.getExplanationResponse(question);
        } else if (lowerQuestion.includes('debug') || lowerQuestion.includes('error') || lowerQuestion.includes('fix')) {
            return this.getDebuggingResponse(question);
        } else if (lowerQuestion.includes('best practice') || lowerQuestion.includes('improve') || lowerQuestion.includes('better')) {
            return this.getBestPracticeResponse(question);
        } else if (lowerQuestion.includes('performance') || lowerQuestion.includes('optimize') || lowerQuestion.includes('faster')) {
            return this.getPerformanceResponse(question);
        } else if (lowerQuestion.includes('modern') || lowerQuestion.includes('update') || lowerQuestion.includes('es6')) {
            return this.getModernizationResponse(question);
        } else if (lowerQuestion.includes('security') || lowerQuestion.includes('safe') || lowerQuestion.includes('vulnerability')) {
            return this.getSecurityResponse(question);
        } else {
            return this.getGeneralResponse(question);
        }
    }

    /**
     * Get explanation response
     */
    getExplanationResponse(question) {
        return `Great question! When explaining code, I look for: 

🔍 **Structure**: How the code is organized
⚙️ **Logic**: What the code actually does  
🎯 **Purpose**: Why this approach was chosen
🔗 **Dependencies**: What it relies on

For your specific question about "${question}", I'd recommend:
• Breaking it down into smaller parts
• Checking variable names and function purposes
• Looking at data flow and transformations
• Understanding the expected inputs/outputs

Would you like me to analyze a specific code section?`;
    }

    /**
     * Get debugging response
     */
    getDebuggingResponse(question) {
        return `🐛 **Debugging Strategy**:

1️⃣ **Reproduce the issue** consistently
2️⃣ **Check browser console** for error messages
3️⃣ **Add console.log()** statements strategically
4️⃣ **Use debugger** or breakpoints
5️⃣ **Isolate the problem** area

Common issues to check:
• Typos in variable/function names
• Missing semicolons or brackets
• Async/await timing issues
• DOM elements not loaded yet
• Network request failures

**Pro tip**: The error message usually points to the exact line and issue!`;
    }

    /**
     * Get best practice response
     */
    getBestPracticeResponse(question) {
        return `✨ **Code Best Practices**:

🏗️ **Structure**:
• Use meaningful variable/function names
• Keep functions small and focused
• Organize code into logical modules

🎨 **Style**:
• Consistent indentation and formatting
• Comments for complex logic
• Remove unused code

⚡ **Performance**:
• Avoid global variables
• Use efficient data structures
• Minimize DOM manipulations

🔒 **Safety**:
• Input validation
• Error handling
• Security considerations

Which area would you like to focus on improving?`;
    }

    /**
     * Get performance response
     */
    getPerformanceResponse(question) {
        return `🚀 **Performance Optimization Tips**:

⚡ **JavaScript**:
• Use const/let instead of var
• Avoid global scope pollution
• Debounce/throttle frequent events
• Use efficient loops and array methods

🎨 **CSS**:
• Minimize reflows and repaints
• Use CSS transforms for animations
• Optimize selectors
• Use CSS Grid/Flexbox efficiently

🌐 **Network**:
• Minimize HTTP requests
• Compress images and assets
• Use CDNs for libraries
• Implement caching strategies

📊 **Measurement**:
• Use browser dev tools profiler
• Monitor Core Web Vitals
• Test on various devices

What specific performance issue are you trying to solve?`;
    }

    /**
     * Get modernization response
     */
    getModernizationResponse(question) {
        return `🆕 **Modern JavaScript Features**:

🔧 **ES6+ Syntax**:
• Arrow functions: \`() => {}\`
• Template literals: \`Hello \${name}\`
• Destructuring: \`const {prop} = obj\`
• Spread operator: \`...array\`

⚡ **Async Patterns**:
• Promises over callbacks
• async/await for readable code
• Fetch API over XMLHttpRequest

🏗️ **Modern Tools**:
• Module system (import/export)
• Package managers (npm/yarn)
• Build tools (Webpack/Vite)
• Linting (ESLint)

🎯 **Best Practices**:
• Functional programming concepts
• Immutable data patterns
• Component-based architecture

Ready to modernize your code? What legacy patterns are you working with?`;
    }

    /**
     * Get security response
     */
    getSecurityResponse(question) {
        return `🔒 **Security Best Practices**:

🛡️ **Input Validation**:
• Sanitize user inputs
• Validate on both client and server
• Use parameterized queries
• Escape HTML content

🔐 **Authentication**:
• Use HTTPS everywhere
• Secure session management
• Strong password policies
• Two-factor authentication

⚠️ **Common Vulnerabilities**:
• XSS (Cross-Site Scripting)
• CSRF (Cross-Site Request Forgery)
• SQL Injection
• Insecure dependencies

🔍 **Security Tools**:
• npm audit for dependency checks
• CSP (Content Security Policy)
• OWASP security guidelines
• Regular security testing

What security aspect are you most concerned about?`;
    }

    /**
     * Get general response
     */
    getGeneralResponse(question) {
        return `Thanks for your question! Here's my analysis:

🤔 **Understanding**: "${question}"

💡 **General Approach**:
• Break down complex problems into smaller parts
• Research documentation and examples
• Test solutions incrementally
• Get feedback from other developers

📚 **Learning Resources**:
• MDN Web Docs for web standards
• Stack Overflow for specific issues
• GitHub repositories for code examples
• Online courses for structured learning

🎯 **Next Steps**:
• Be more specific about the code area
• Share error messages if any
• Describe expected vs actual behavior
• Provide context about your project

Would you like to ask a more specific question about your code?`;
    }

    /**
     * Get JavaScript-specific tips
     */
    getJavaScriptTip(question) {
        const tips = [
            "Remember to use 'const' and 'let' instead of 'var' for better scoping!",
            "Arrow functions are great for callbacks: () => {}",
            "Use async/await for cleaner asynchronous code!",
            "Don't forget to handle errors with try/catch blocks!",
            "Use template literals with backticks for string interpolation!"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    /**
     * Get HTML-specific tips
     */
    getHTMLTip(question) {
        const tips = [
            "Always use semantic HTML elements like <main>, <section>, <article>!",
            "Don't forget alt attributes for images for accessibility!",
            "Use proper heading hierarchy: h1, h2, h3...",
            "Include a viewport meta tag for responsive design!",
            "Validate your HTML for better structure!"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    /**
     * Get CSS-specific tips
     */
    getCSSTip(question) {
        const tips = [
            "Use CSS Grid or Flexbox for modern layouts!",
            "Mobile-first responsive design works best!",
            "CSS custom properties (variables) make maintenance easier!",
            "Use CSS classes instead of inline styles!",
            "Consider using a CSS methodology like BEM for organization!"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }

    /**
     * Perform a random action when the agent is summoned
     */
    performRandomAction() {
        if (!this.agent) return;

        const actions = [
            () => {
                this.agent.speak('Ready to help you review some code! What merge request should we look at?');
                this.agent.play('Thinking');
            },
            () => {
                this.agent.speak('I can help you analyze code quality, check for bugs, and suggest improvements!');
                this.agent.play('Explain');
            },
            () => {
                this.agent.speak('Remember to check your GitLab token and API settings before starting a review.');
                this.agent.play('Alert');
            },
            () => {
                this.agent.speak('Pro tip: Upload custom review instructions for better, more targeted feedback!');
                this.agent.play('Congratulate');
            },
            () => {
                this.agent.speak('Click the settings gear to configure your API keys and preferences.');
                this.agent.play('GetAttention');
            }
        ];

        // Randomly select an action
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setTimeout(randomAction, 1000); // Delay for better UX
    }

    /**
     * Make the agent react to code review events
     */
    onReviewStart() {
        if (this.agent && this.isVisible) {
            this.agent.speak('Analyzing the merge request... This might take a moment!');
            this.agent.play('Processing');
        }
    }

    onReviewComplete() {
        if (this.agent && this.isVisible) {
            this.agent.speak('Code review complete! Check out the results below.');
            this.agent.play('Congratulate');
        }
    }

    onReviewError(errorMessage) {
        if (this.agent && this.isVisible) {
            this.agent.speak(`Oops! There was an error: ${errorMessage}. Let me help you troubleshoot.`);
            this.agent.play('Alert');
        }
    }

    /**
     * Show error message if agent fails to load
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid red;
            color: red;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    /**
     * Future AI Integration Method
     * Replace getEnhancedResponse() with this for real AI
     */
    async queryAI(question) {
        // FUTURE: Implement actual AI API integration
        // Example integration points:
        
        /*
        // Option 1: OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: 'system', 
                    content: 'You are a helpful coding assistant genie. Provide concise, practical coding advice.'
                }, {
                    role: 'user', 
                    content: question
                }],
                max_tokens: 500
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
        */

        /*
        // Option 2: Local AI API (if you have one running)
        const response = await fetch('/api/ai/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, context: 'coding' })
        });
        const data = await response.json();
        return data.answer;
        */

        /*
        // Option 3: Claude/Anthropic API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': 'YOUR_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 500,
                messages: [{
                    role: 'user',
                    content: `As a coding assistant genie, help with this question: ${question}`
                }]
            })
        });
        const data = await response.json();
        return data.content[0].text;
        */

        // For now, fallback to enhanced local response
        return this.getEnhancedResponse(question);
    }
}

// Create global instance
window.genieAgent = new GenieAgent();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GenieAgent;
}
