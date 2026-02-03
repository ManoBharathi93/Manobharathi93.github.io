# Content Management Guide

## Overview

Your portfolio is built with **JSON-based content management**. This means you can add, edit, and remove content without touching any code. Just update the JSON files in the `data/` directory.

## Data Files

### 1. `data/experience.json`
Manage your work experience, internships, and roles.

**Structure:**
```json
{
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "duration": "Oct 2024 - Present",
      "description": "Short description of your role",
      "highlights": [
        "Achievement or responsibility 1",
        "Achievement or responsibility 2",
        "Achievement or responsibility 3"
      ]
    }
  ]
}
```

**Example:**
```json
{
  "experience": [
    {
      "company": "OpenText",
      "title": "Associate Software Engineer",
      "duration": "Oct 2024 - Present",
      "description": "Building backend systems and AI-driven features for enterprise platforms.",
      "highlights": [
        "Optimized UUID storage reducing database overhead",
        "Developed LLM-based CLI Assistant and SQL query generator",
        "Automated CVE summarization using LangChain"
      ]
    }
  ]
}
```

### 2. `data/projects.json`
Showcase your projects with detailed descriptions and technologies.

**Structure:**
```json
{
  "projects": [
    {
      "name": "Project Name",
      "description": "What the project does and why it matters",
      "technologies": ["Tech1", "Tech2", "Tech3"],
      "impact": "Optional: The impact or results of the project"
    }
  ]
}
```

**Example:**
```json
{
  "projects": [
    {
      "name": "Power Grid Anomaly Detection",
      "description": "ML-based system for detecting false data injection attacks in SCADA systems",
      "technologies": ["Python", "PyTorch", "Scikit-learn"],
      "impact": "Achieved 95%+ detection accuracy for coordinated attacks"
    }
  ]
}
```

### 3. `data/research.json`
List your research papers and publications.

**Structure:**
```json
{
  "research": [
    {
      "title": "Paper Title",
      "authors": "You, Colleague 1, Colleague 2",
      "venue": "Conference or Journal Name",
      "links": [
        {
          "label": "Paper",
          "url": "https://link-to-paper"
        },
        {
          "label": "GitHub",
          "url": "https://link-to-code"
        }
      ]
    }
  ]
}
```

**Example:**
```json
{
  "research": [
    {
      "title": "Adaptive Compute-Efficient Learning via Conceptual Criticality",
      "authors": "Mano Bharathi M, et al.",
      "venue": "MLSys 2024",
      "links": [
        {
          "label": "Paper",
          "url": "https://arxiv.org/..."
        },
        {
          "label": "GitHub",
          "url": "https://github.com/..."
        }
      ]
    }
  ]
}
```

### 4. `data/articles.json`
Link to your blog posts and technical articles.

**Structure:**
```json
{
  "articles": [
    {
      "date": "2024-01-15",
      "title": "Article Title",
      "excerpt": "Brief summary of the article",
      "link": "https://link-to-article",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

**Example:**
```json
{
  "articles": [
    {
      "date": "2024-01-15",
      "title": "Building Scalable Microservices with Spring Boot",
      "excerpt": "A comprehensive guide to designing microservices architecture for large-scale systems",
      "link": "https://medium.com/your-article",
      "tags": ["Backend", "Spring Boot", "Microservices"]
    }
  ]
}
```

**Note:** Articles can be empty (`"articles": []`) if you haven't published any yet. They will show "More articles coming soon..." on the portfolio.

## Editing Your Portfolio

### To Add Experience
1. Open `data/experience.json`
2. Add a new object to the `experience` array
3. Save the file
4. The portfolio updates automatically!

### To Add a Project
1. Open `data/projects.json`
2. Add a new object to the `projects` array with name, description, technologies, and optionally impact
3. Save the file

### To Add Research
1. Open `data/research.json`
2. Add a new object to the `research` array with title, authors, venue, and links
3. Save the file

### To Add Articles
1. Open `data/articles.json`
2. Add a new object to the `articles` array
3. Use ISO date format (YYYY-MM-DD)
4. Save the file

## Tips & Best Practices

### Markdown Formatting
Currently, the content is plain text. If you need **bold** or *italic* text, you can edit the HTML or CSS later.

### Date Format
Use consistent date formatting:
- Experience: "Oct 2024 - Present" or "Jan 2023 - Sep 2024"
- Articles: ISO format "2024-01-15"

### Technologies
Keep technology names consistent. Use exact names like:
- ✅ "PyTorch", "TensorFlow", "Scikit-learn"
- ✅ "Spring Boot", "REST APIs", "Microservices"
- ✅ "Docker", "Kubernetes", "Linux"

### Links
Make sure all URLs are complete with `https://`:
- ✅ `https://github.com/username/repo`
- ❌ `github.com/username/repo`

## Deployment to GitHub Pages

Once your content is updated:

1. **Commit your changes:**
   ```bash
   git add data/
   git commit -m "Update portfolio content"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Your portfolio updates automatically!** (after a minute or two)

## File Validation

Before deploying, make sure:
- ✅ All JSON files are valid (use [JSONLint.com](https://jsonlint.com) to check)
- ✅ All URLs are complete with `https://`
- ✅ No comma errors in JSON arrays
- ✅ Date formats are consistent

## Troubleshooting

### Content not showing up?
1. Check browser console for errors (F12)
2. Verify JSON syntax is correct
3. Make sure file is saved
4. Hard refresh (Ctrl+Shift+R)

### JSON syntax errors?
- Use a JSON validator: https://jsonlint.com
- Common issues:
  - Missing commas between objects
  - Missing quotes around strings
  - Trailing commas after last item

### Need help?
Check the JSON files already in `data/` - they show the correct format!
