# How to Add Content to Your Portfolio

This guide shows you exactly how to add blog posts, projects, publications, and news without writing any code!

## Quick Reference

All your content is in the `data/` folder:
- `blogs.json` - Blog posts
- `projects.json` - Your projects
- `publications.json` - Research papers and publications
- `news.json` - News and updates

## 1️⃣ Adding a Blog Post

### Example: Add a new blog post

**File:** `data/blogs.json`

Find the end of the `blogs` array and add:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "How to Build Scalable APIs",
  "excerpt": "Learn best practices for designing APIs that can handle millions of requests. In this tutorial, I'll cover caching strategies, rate limiting, and optimization techniques.",
  "tags": ["API", "Backend", "Scalability"],
  "link": "#"
}
```

**What each field means:**
- `id` - Just increment the last ID (6 → 7)
- `date` - Publication date
- `title` - Your blog post title
- `excerpt` - 1-2 sentences summary
- `tags` - Keywords for searching/filtering
- `link` - URL to full post (can be external URL or #)

✅ Save the file - your blog post appears immediately!

---

## 2️⃣ Adding a Project

### Example: Add a new project

**File:** `data/projects.json`

```json
{
  "id": 7,
  "name": "Real-Time Chat Application",
  "description": "A modern chat app with WebSocket support, user authentication, and message history. Built for instant communication.",
  "icon": "💬",
  "technologies": ["React", "WebSocket", "Node.js", "PostgreSQL"],
  "github": "https://github.com/yourusername/chat-app",
  "live": "https://chat-app-demo.com"
}
```

**Field explanations:**
- `name` - Project title
- `description` - What it does (keep it to 1-2 sentences)
- `icon` - Emoji that represents it (🚀 💻 📱 etc.)
- `technologies` - List of tech used
- `github` - Link to your repo
- `live` - Demo/deployed link (optional)

---

## 3️⃣ Adding a Publication

### Example: Add a research paper or article

**File:** `data/publications.json`

```json
{
  "date": "May 2025",
  "title": "Machine Learning in Production: Challenges and Solutions",
  "authors": "Your Name, Jane Smith, John Doe",
  "venue": "International Conference on ML 2025",
  "arxiv": "https://arxiv.org/abs/2501.12345",
  "code": "https://github.com/research-org/ml-production",
  "website": "https://conference.org/papers/123"
}
```

**Notes:**
- All links are optional - include what you have
- `authors` - Comma-separated list
- `venue` - Conference, journal, or publication name

---

## 4️⃣ Adding News/Updates

### Example: Share exciting news

**File:** `data/news.json`

```json
{
  "date": "Jan 18, 2026",
  "content": "Just launched my new SaaS product! 🎉 Check it out at <a href='https://example.com'>example.com</a>"
}
```

**Tips:**
- Keep it short and engaging
- You can include HTML links: `<a href='url'>text</a>`
- List newest updates first

---

## 📋 Checklists

### Adding a Blog Post Checklist
- [ ] Edit `data/blogs.json`
- [ ] Add new entry with unique ID
- [ ] Write meaningful title
- [ ] Add 2-3 sentence excerpt
- [ ] Add relevant tags
- [ ] Add link (or use # if post not published yet)
- [ ] Save file
- [ ] Git commit and push: `git add data/blogs.json && git commit -m "Add blog: Your Title" && git push`

### Adding a Project Checklist
- [ ] Edit `data/projects.json`
- [ ] Add unique ID
- [ ] Write clear description
- [ ] Choose appropriate emoji icon
- [ ] List all technologies used
- [ ] Add GitHub link
- [ ] Add demo link (optional)
- [ ] Git commit and push

### Adding a Publication Checklist
- [ ] Edit `data/publications.json`
- [ ] Format date as "Month Year"
- [ ] Add all authors
- [ ] Add publication venue
- [ ] Add links (arxiv, code, website)
- [ ] Git commit and push

---

## 🚨 Common Mistakes to Avoid

### ❌ Forgetting commas
```json
// WRONG - Missing comma after first item
{
  "blogs": [
    { "id": 1, ... }  // ← Missing comma here!
    { "id": 2, ... }
  ]
}

// CORRECT
{
  "blogs": [
    { "id": 1, ... },  // ← Comma added
    { "id": 2, ... }
  ]
}
```

### ❌ Forgetting quotes around values
```json
// WRONG
{ "title": Your Blog Title }

// CORRECT
{ "title": "Your Blog Title" }
```

### ❌ Using special characters without escaping
```json
// WRONG
{ "excerpt": "It's amazing" }

// CORRECT - Use backslash to escape quotes
{ "excerpt": "It\\'s amazing" }
```

### ❌ Duplicate IDs
```json
// WRONG - Both have id 1
{ "id": 1, ... },
{ "id": 1, ... }  // ← Should be 2, 3, 4, etc.
```

---

## 🔧 Testing Your JSON

Unsure if your JSON is correct? Use this free validator:
👉 [JSONLint.com](https://jsonlint.com/)

Just paste your JSON and it will show any errors!

---

## 💾 Saving and Publishing

After editing a JSON file:

### Using Git (Command Line)
```bash
# Stage your changes
git add data/blogs.json

# Create a commit message
git commit -m "Add blog post: Your Blog Title"

# Push to GitHub
git push
```

### Using GitHub Web UI
1. Go to `github.com/yourusername/yourusername.github.io`
2. Navigate to `data/` folder
3. Click the file to edit
4. Click the pencil icon (Edit)
5. Make your changes
6. Click "Commit changes"
7. Site updates within seconds!

---

## 📚 Template Examples

### Blog Post Template
```json
{
  "id": NEXT_ID,
  "date": "Month DD, YYYY",
  "title": "Your Post Title",
  "excerpt": "Two to three sentence summary of what readers will learn.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "link": "https://your-blog-url.com/post-name"
}
```

### Project Template
```json
{
  "id": NEXT_ID,
  "name": "Project Name",
  "description": "One sentence about what it does.",
  "icon": "📱",
  "technologies": ["Tech1", "Tech2", "Tech3"],
  "github": "https://github.com/yourusername/repo-name",
  "live": "https://demo-url.com"
}
```

### Publication Template
```json
{
  "date": "Month YYYY",
  "title": "Publication Title",
  "authors": "Your Name, Co-Author",
  "venue": "Conference or Journal Name",
  "arxiv": "https://arxiv.org/...",
  "code": "https://github.com/...",
  "website": "https://..."
}
```

### News Template
```json
{
  "date": "Month DD, YYYY",
  "content": "Your news item. Can include <a href='url'>links</a>."
}
```

---

## ❓ FAQ

**Q: Can I add images to blog posts?**
A: The current setup displays blog excerpts. For full blog posts with images, link to your Medium, Dev.to, or personal blog.

**Q: Do I need to restart anything after editing JSON?**
A: No! The website loads the JSON files dynamically. Just save and refresh the page.

**Q: Can I reorder items?**
A: Yes! The order items appear in the JSON is the order they display on the website.

**Q: What if I publish a blog post on Medium?**
A: Just add the entry to blogs.json with the Medium URL as the link!

**Q: Can I use markdown in descriptions?**
A: The current version uses plain text. For markdown support, you'd need to modify the JavaScript.

---

## 🎯 Pro Tips

1. **Keep IDs sequential** - Don't skip numbers, increment by 1
2. **Sort by date (newest first)** - Most recent items appear at top
3. **Use meaningful tags** - Makes blog searchable
4. **Add links** - Make it easy for people to explore your work
5. **Update monthly** - Fresh content keeps visitors coming back!

---

**You're all set!** Start adding your content and watch your portfolio grow! 🚀
