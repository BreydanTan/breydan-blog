# Image Requirements for Kimi-K2 CLI + OpenCode Tutorial

This file lists the recommended images to create for the tutorial blog post to enhance user understanding.

## Required Images

### 1. OpenRouter Credits Dashboard
**Filename**: `openrouter-credits-setup.png`
**Description**: Screenshot of the OpenRouter credits page showing:
- Current credit balance
- "Add Credits" button
- Pricing information
- Usage statistics
**Size**: 1200x800px recommended

### 2. API Key Creation Process
**Filename**: `openrouter-api-key-creation.png`
**Description**: Screenshot showing the API key creation interface:
- API key creation form
- Security settings options
- Generated API key (censored)
**Size**: 1200x600px recommended

### 3. OpenCode CLI Interface
**Filename**: `opencode-cli-interface.png`
**Description**: Terminal screenshot showing:
- OpenCode help command output
- Basic usage examples
- Version information
**Size**: 1000x600px recommended

### 4. Configuration File Example
**Filename**: `opencode-config-example.png`
**Description**: Screenshot of a well-formatted config.yaml file with:
- Syntax highlighting
- All major configuration sections
- Comments explaining each section
**Size**: 800x1000px recommended

### 5. Kimi-K2 Model Performance Comparison
**Filename**: `kimi-k2-performance-chart.png`
**Description**: Chart/infographic showing:
- SWE-bench scores comparison
- Context window comparison
- Performance metrics vs other models
**Size**: 1200x800px recommended

### 6. OpenCode Workflow Diagram
**Filename**: `opencode-workflow-diagram.png`
**Description**: Flow diagram showing:
- Developer -> OpenCode CLI -> OpenRouter API -> Kimi-K2
- Return path with code suggestions
- Integration points with IDE/Git
**Size**: 1400x900px recommended

### 7. Cost Comparison Chart
**Filename**: `cost-comparison-chart.png`
**Description**: Bar chart comparing costs:
- OpenCode + Kimi-K2
- GitHub Copilot
- Other premium AI coding assistants
- Monthly cost estimates
**Size**: 1200x700px recommended

### 8. Usage Dashboard Screenshot
**Filename**: `usage-monitoring-dashboard.png`
**Description**: Mock dashboard showing:
- Daily usage statistics
- Cost tracking
- Model usage breakdown
- Alerts configuration
**Size**: 1200x900px recommended

## Optional Enhancement Images

### 9. Integration Architecture
**Filename**: `integration-architecture.png`
**Description**: Technical architecture diagram showing:
- OpenCode components
- API connections
- Local vs cloud processing
- Security boundaries
**Size**: 1400x1000px recommended

### 10. IDE Integration Screenshots
**Filename**: `ide-integration-examples.png`
**Description**: Collage showing OpenCode integration with:
- VS Code
- Vim/Neovim
- Terminal environments
**Size**: 1200x800px recommended

## Image Style Guidelines

- **Color Scheme**: Use consistent colors matching the blog theme
- **Typography**: Clear, readable fonts (recommended: Inter, SF Pro, or similar)
- **Contrast**: Ensure high contrast for accessibility
- **Branding**: Include subtle OpenCode and Kimi-K2 branding where appropriate
- **Format**: PNG with transparent backgrounds where applicable
- **Compression**: Optimize for web while maintaining quality

## Tools for Creating Images

### Screenshots
- **macOS**: Use Shift+Cmd+4 for selective screenshots
- **Windows**: Use Snipping Tool or Shift+Win+S
- **Linux**: Use gnome-screenshot or similar

### Diagrams and Charts
- **Figma**: Professional design tool (free tier available)
- **Canva**: Template-based design tool
- **Draw.io**: Free diagram creation tool
- **Excalidraw**: Hand-drawn style diagrams

### Image Optimization
- **TinyPNG**: Compress PNG files
- **ImageOptim**: macOS image optimization tool
- **Squoosh**: Google's web-based image optimizer

## Implementation Notes

Once images are created:
1. Place them in `/public/images/blog/kimi-k2-tutorial/`
2. Update the blog post to reference the correct image paths
3. Add appropriate alt text for accessibility
4. Consider adding image captions for better context

Example markdown for image inclusion:
```markdown
![OpenRouter Credits Setup](https://your-domain.com/images/blog/kimi-k2-tutorial/openrouter-credits-setup.png)
*Figure 1: OpenRouter credits dashboard showing how to add credits to your account*
```