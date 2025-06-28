---
title: "🚀 Ultimate Guide! Google's Gemini CLI: 1M Token Context, MCP Server Extensions, and More!"
date: 2025-06-28T10:00:00+08:00
updated: 2025-06-28T10:00:00+08:00
keywords: ["Gemini", "CLI", "AI", "Google", "Development"]
featured: true
summary: "Google recently launched Gemini CLI, an open-source command-line interface tool based on the Gemini 1.5 Pro model, bringing artificial intelligence directly into the developer's terminal environment."
---

Google recently launched Gemini CLI, an open-source command-line interface tool based on the Gemini 2.5 Pro model, bringing artificial intelligence directly into the developer's terminal environment. This innovative tool represents a significant advancement in developer productivity, transforming the traditional command line from a rigid command executor into an intelligent conversational partner.

**Core Features and Architecture**

At the core of Gemini CLI is Gemini 2.5 Pro, a multimodal foundation model capable of handling a context window of up to 1 million tokens. This massive context window allows developers to input large codebases, documents, and file trees for comprehensive, multi-step analysis or transformation. The tool is equipped with several built-in features, including a code reader, a command runner, and a memory module. These features can be extended through Multimodal Composable Functions (MCPs), a Python-based interface for adding custom behaviors.

**Versatile Development Assistant**

While Gemini CLI excels at programming, it is designed as a versatile local utility for a wide range of tasks, from content generation and problem-solving to in-depth research and task management. The tool allows users to use natural language for prompts, eliminating the need to enter lengthy, complex commands or constantly consult documentation. Developers can perform complex tasks such as code refactoring, documentation generation, executing shell commands, running scripts, and editing files using natural language commands.

**Free Access and Usage Limits**

Any user with a personal Google account can access Gemini 1.5 Pro for free, with a limit of 60 requests per minute and 1,000 requests per day. This generous quota ensures that individual developers will rarely encounter usage limits in their development work. For professional developers who require higher limits or specific models, Google offers integration with Google AI Studio and Vertex AI, which use a usage-based billing model.

**Open Source and Extensibility**

The project is fully open-source under the Apache 2.0 license. This transparency allows developers to inspect the code, understand its functionality, and verify its security implications. The open-source nature encourages community contributions, including bug reports, feature suggestions, and code improvements. The tool supports built-in integration with the Model Context Protocol (MCP) and bundled extensions, allowing developers to customize prompts and instructions for specific workflows.

**Development Ecosystem Integration**

Gemini CLI shares the same technology as Google's AI programming assistant, Gemini Code Assist. This integration provides consistency across different development environments, whether working in the terminal or in VS Code. The tool can use Google Search to ground prompts, fetch web pages, and provide the model with real-time external context.

**Cross-Platform Compatibility**

Gemini CLI is written in TypeScript and runs on all platforms, including Windows, macOS, and Linux. Installation via npm is straightforward, making it easily accessible to developers regardless of their operating system.

Gemini CLI represents a paradigm shift in developer tools, making artificial intelligence an integral part of the command-line experience, enhancing productivity while maintaining the efficiency and portability that developers value.

## Basic Operations

*   **Add Context**: Use `@` to specify a file as context (e.g., `@src/myFile.ts`) to target a specific file or folder.
*   **Shell Mode**: Execute shell commands with `!` (e.g., `!npm run start`) or use natural language (e.g., "start the server").

## Command List

*   `/help` - Show help information for gemini-cli.
*   `/docs` - Open the full Gemini CLI documentation in a browser.
*   `/clear` - Clear the screen and conversation history.
*   `/theme` - Change the theme.
*   `/auth` - Change the authentication method.
*   `/editor` - Set external editor preferences.
*   `/stats` - Check session statistics.
*   `/mcp` - List configured MCP servers and tools.
*   `/memory` - Manage memory. Usage: `/memory <show | refresh | add> [text to add]`
*   `/tools` - List available Gemini CLI tools.
*   `/about` - Show version information.
*   `/bug` - Submit a bug report.
*   `/chat` - Manage conversation history. Usage: `/chat <list | save | resume> [label]`
*   `/quit` - Exit the command-line interface.
*   `/compress` - Compress the context by replacing it with a summary.
*   `!` - Shell command.

## Keyboard Shortcuts

*   **Enter** - Send a message.
*   **Shift+Enter** - Newline.
*   **Up/Down** - Cycle through prompt history.
*   **Alt+Left/Right** - Jump by word in the input.
*   **Esc** - Cancel an operation.
*   **Ctrl+C** - Exit the application.

## MCP Server Configuration Commands

```bash
mkdir -p ~/.gemini
cd ~/.gemini
nano settings.json
```

Configuration file example (for context7):

```json
{
  "theme": "Default",
  "selectedAuthType": "oauth-personal",
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-",
        "OPENAI_API_KEY": "sk-proj-",
        "GOOGLE_API_KEY": "sk-proj-"
      }
    }
  }
}
```

## GEMINI.md Configuration Example

```markdown
# AutoGen AI Agent Development Project

## Project Overview
Develop an AI agent using the latest version of AutoGen 0.4, Python 3.11, and a venv virtual environment.

## Environment Configuration

### Python Environment
- Python Version: 3.11
- Virtual Environment: Use venv
- Package Management: pip + requirements.txt

### Installation Steps

# Create a virtual environment
python3.11 -m venv .venv

# Activate the environment
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# Install AutoGen
pip install -U "autogen-agentchat" "autogen-ext[openai]"

## Programming Standards

### Import Conventions

import asyncio
from autogen_agentchat.agents import AssistantAgent, UserProxyAgent
from autogen_agentchat.teams import RoundRobinGroupChat
from autogen_ext.models.openai import OpenAIChatCompletionClient

### Code Style
- Use async/await for all operations (AutoGen 0.4 is an asynchronous architecture).
- Use type hints.
- Add Chinese comments to functions and classes.
- Ensure comprehensive error handling.

### Basic Pattern

async def main():
    # Create a model client
    model_client = OpenAIChatCompletionClient(model="gpt-4o")
    
    # Create an agent
    agent = AssistantAgent("Assistant", model_client=model_client)
    
    # Run a task
    result = await agent.run(task="Your task")
    
    # Close the connection
    await model_client.close()

## Project Structure

project_directory/
├── .venv/           # Virtual environment (not committed to git)
├── .env             # Environment variables (not committed to git)
├── requirements.txt # Dependencies
├── agents/          # Agent implementations
├── main.py          # Main program entry point
└── GEMINI.md        # This configuration file

## Environment Variable Setup

# .env file
OPENAI_API_KEY=your_api_key
MODEL_NAME=gpt-4o

## Development Points

### Agent Types
- **AssistantAgent**: LLM-driven assistant agent.
- **CodeExecutorAgent**: Code execution agent.

### Team Modes
- **RoundRobinGroupChat**: Round-robin group chat.
- Supports multi-agent collaboration.

### Best Practices
- Test agents individually before combining them into a team.
- Use async/await for all operations.
- Properly close model client connections.
- Manage sensitive information with environment variables.
- Do not commit the virtual environment to version control.

## Documentation and Resource Acquisition

### MCP Server Configuration
Always use the **context7 MCP server** to search for the latest AutoGen documentation and code standards:
- Prioritize querying the official AutoGen 0.4 documentation.
- Get the latest API references and best practices.
- Find code examples and patterns.
- Verify version compatibility and new features.

### Search Strategy
When you need information about AutoGen:
1. First, use context7 to search the official documentation.
2. Focus on the changes and new features of version 0.4.
3. Get the latest examples of asynchronous programming patterns.
4. Look for best practices in multi-agent collaboration.

## Notes
- AutoGen 0.4 is completely different from version 0.2 and uses a new asynchronous architecture.
- AgentChat is suitable for rapid prototype development.
- Requires Python 3.11.
- All example code uses Chinese comments.
- When encountering problems, prioritize searching for the latest solutions via context7.

## Gemini CLI Advanced Usage Guide

## Installation and Authentication

### Quick Installation

# Run directly (recommended)
npx https://github.com/google-gemini/gemini-cli

# Or install globally
npm install -g @google/gemini-cli

### Advanced Authentication Configuration

# Use an API key (for enterprise users)
export GEMINI_API_KEY="your_api_key_here"

# Google Workspace account authentication
gemini auth --workspace

# Check authentication status
gemini auth status

## Core Advanced Features

### 1. Large Codebase Analysis

### Project Architecture Analysis

cd your-large-project/
gemini

# Execute in Gemini CLI:
> Analyze the overall architecture of this project, including:
  - Main modules and their responsibilities
  - Data flow and dependencies
  - Use of design patterns
  - Potential architectural issues

### Cross-File Code Refactoring

> Refactor the entire project to support a new database abstraction layer:
  1. Identify all database-related code.
  2. Create a unified data access interface.
  3. Generate a migration plan and timeline.

### Technical Debt Assessment

> Assess the technical debt of this codebase:
  - Code duplication analysis
  - Identification of outdated dependencies
  - Performance bottleneck detection
  - Security vulnerability scanning

### 2. Multimodal Application Development

### Generate an Application from a Design Mockup

# After uploading the design image
> Create a React application based on this UI design mockup:
  - Implement pixel-perfect UI components.
  - Add responsive design.
  - Integrate state management.
  - Include basic interaction logic.

### Convert a PDF Document to Code

> Analyze this API specification document and generate:
  - Complete TypeScript interface definitions.
  - An API client wrapper class.
  - Unit test cases.
  - Usage examples and documentation.

### 3. Operations Automation

### Git Workflow Automation

> Automate our Git workflow:
  1. Analyze recent commit patterns.
  2. Create intelligent branch naming conventions.
  3. Generate an automated code review checklist.
  4. Set up a conflict resolution strategy.

### CI/CD Process Optimization

> Optimize our CI/CD process:
  - Analyze build time bottlenecks.
  - Suggest parallelization strategies.
  - Create intelligent test selection.
  - Design a failure recovery mechanism.

## MCP Server Integration

### 1. Custom MCP Server Configuration

### Database Operations Server

```json
{
  "servers": {
    "database": {
      "command": "node",
      "args": ["./mcp-servers/database-server.js"],
      "env": {
        "DB_CONNECTION_STRING": "postgresql://..."
      }
    }
  }
}
```

> Via the database MCP server:
  - Query user behavior analysis data.
  - Generate data model optimization suggestions.
  - Create automated data cleaning scripts.

### Media Generation Server Integration

> Use the Imagen/Veo server to create:
  - A product demo video script.
  - Marketing material design proposals.
  - A collection of user interface icons.
  - A brand consistency check.

### 2. Enterprise Tool Integration

### Slack Integration Automation

> Create a Slack bot to:
  - Automatically summarize daily stand-up meetings.
  - Monitor production environment alerts.
  - Generate code review notifications.
  - Track project milestone progress.

### Google Workspace Integration

> Automate Google Workspace workflows:
  - Generate action items from meeting minutes.
  - Create project status reports.
  - Synchronize calendars and project timelines.
  - Generate team performance analysis.

## Advanced Project Management

### 1. Intelligent Project Analysis

### Team Contribution Visualization

> Create a report showing the git history of the last 7 days:
  - Group commits by functional module.
  - Analyze team member contribution patterns.
  - Identify collaboration bottlenecks.
  - Generate workload balancing suggestions.

### Real-Time Monitoring Dashboard

> Create a full-screen monitoring application to display:
  - A heatmap of GitHub Issues interactions.
  - Real-time build status.
  - Code quality trends.
  - Aggregated user feedback.

### 2. Documentation and Process Automation

### Intelligent Documentation Generation

> Automatically generate project documentation:
  - API reference documentation (from code comments).
  - Deployment guide (from configuration files).
  - Troubleshooting manual (from log analysis).
  - User manual (from functional specifications).

### Compliance Check Automation

> Implement a compliance check process:
  - GDPR data processing audit.
  - Security vulnerability scanning report.
  - Code license compliance check.
  - Access rights review.

## Advanced Development Workflows

### 1. Code Quality Improvement

### Intelligent Code Review

> Perform a deep code review:
  - Architectural consistency check.
  - Performance impact analysis.
  - Security best practices validation.
  - Maintainability assessment.

### Automated Refactoring Suggestions

> Analyze the code and provide refactoring suggestions:
  - Design pattern optimization opportunities.
  - Code duplication elimination.
  - Function complexity simplification.
  - Dependency optimization.

### 2. Technology Migration and Upgrades

### Version Upgrade Strategy

> Develop a Python 3.12 upgrade plan:
  1. Compatibility risk assessment.
  2. Dependency library upgrade path.
  3. Test strategy formulation.
  4. Progressive migration plan.

### Framework Migration Guidance

> Assist in migrating from Flask to FastAPI:
  - Route conversion strategy.
  - Middleware adaptation plan.
  - Data validation migration.
  - Performance optimization opportunities.

## Enterprise-Level Deployment Configuration

### 1. Batch Processing and Automation

### File Processing Automation

> Batch process project files:
  - Convert all images to WebP format.
  - Reorganize photos based on EXIF data.
  - Compress and optimize video files.
  - Generate thumbnails and previews.

### Data Organization Automation

> Intelligently organize financial documents:
  - Categorize PDF invoices by month.
  - Extract key financial data.
  - Generate expenditure analysis reports.
  - Create a tax preparation checklist.

### 2. Advanced Configuration Management

### Environment Configuration Optimization

```bash
# Enterprise-level configuration file
export GEMINI_MODEL="gemini-2.5-pro"
export GEMINI_TEMPERATURE="0.3"
export GEMINI_MAX_TOKENS="8192"
export MCP_SERVER_TIMEOUT="30000"
```

### Team Collaboration Configuration

```bash
# Team shared configuration
gemini config set --team \
  --project-context="/path/to/project" \
  --coding-standards="/path/to/standards.json" \
  --review-templates="/path/to/templates"
```

## Performance Optimization and Monitoring

### 1. Usage Management

```bash
# Monitor API usage
gemini usage --detailed
gemini quota --check

# Optimize request strategy
gemini config set --batch-size=5 --parallel-requests=3
```

### 2. Local Cache Configuration

```bash
# Enable smart caching
gemini config set --cache-enabled=true --cache-ttl=3600
gemini cache clean --older-than=7d
```

## Best Practice Recommendations

### 1. Security Considerations

*   Use environment variables to manage sensitive information.
*   Rotate API keys regularly.
*   Implement access control.
*   Enable audit logging.

### 2. Performance Optimization

*   Use the batch processing feature judiciously.
*   Implement a smart caching strategy.
*   Monitor token usage efficiency.
*   Optimize prompt length.

### 3. Team Collaboration

*   Establish uniform configuration standards.
*   Share commonly used prompt templates.
*   Implement a code review process.
*   Regularly train team members.

By leveraging these advanced features, Gemini CLI can become a powerful productivity tool for enterprise development teams, significantly improving development efficiency and code quality.