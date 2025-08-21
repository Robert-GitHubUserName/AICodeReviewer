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
4. **Add GitLab Token**: Enter your GitLab Personal Access Token
   - Create one at User Settings > Access Tokens with `read_api` scope
   - Required for accessing GitLab API data
5. **Upload Custom Instructions** (Optional): Upload a markdown or text file with company-specific code review guidelines
   - See `custom-review-instructions.md` for an example template
   - If no custom instructions are uploaded, default guidelines will be used
6. **Add OpenAI API Key**: Enter your OpenAI API key
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
7. **Start Review**: Click "Start Code Review" to begin the analysis
8. **View Results**: Read the AI-generated code review
9. **Save Review**: Optionally save the review for future reference

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

The application now supports full GitLab API integration with the following features:

- **Real-time Data**: Uses actual GitLab API endpoints instead of simulated data
- **Authentication**: Supports GitLab Personal Access Tokens for API access
- **Diff Analysis**: Implements `GET /merge_requests/:id/changes` for comprehensive diff data
- **File Context**: Uses `GET /projects/:id/repository/files/:file_path` for full file content
- **Pagination Support**: Handles large diffs with automatic pagination
- **Error Handling**: Comprehensive error handling for API failures and authentication issues

**Required Setup:**

1. Create a GitLab Personal Access Token with `read_api` scope
2. Enter the token in the "GitLab Personal Access Token" field
3. Ensure the token has access to the target repository

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

- Support for multiple AI models (GPT-4, Claude, etc.)
- Export reviews as PDF/Markdown
- Integration with GitLab comments
- Batch processing of multiple merge requests
- Custom review templates
- GitLab CI/CD integration

## License

This project is open source and available under the MIT License.
