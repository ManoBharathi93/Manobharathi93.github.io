# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your projects, blogs, publications, and professional work.

## 🌟 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations** - Beautiful CSS animations and transitions
- **Blog Management** - Easy JSON-based blog post management without code changes
- **Project Showcase** - Display your best work with descriptions and links
- **Publications & Research** - Highlight your academic or professional publications
- **News & Updates** - Keep visitors updated with your latest news
- **Social Media Links** - Connect with your audience across platforms
- **SEO Optimized** - Meta tags and proper semantic HTML
- **GitHub Pages Ready** - Deploy instantly to GitHub Pages

## 📁 Project Structure

```
personal-portfolio/
├── index.html                 # Main portfolio page
├── blog.html                  # Blog listing page
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles
│   │   └── responsive.css    # Mobile responsive styles
│   ├── js/
│   │   ├── script.js         # Main functionality & data loading
│   │   └── blog.js           # Blog page functionality
│   └── img/                  # Your images and photos
├── data/
│   ├── blogs.json           # Blog posts data
│   ├── projects.json        # Projects data
│   ├── publications.json    # Publications data
│   └── news.json            # News & updates data
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/personal-portfolio.git
cd personal-portfolio
```

### 2. Customize Your Portfolio

Edit these files to make the portfolio your own:

#### Update index.html
- Change "Your Name" to your actual name
- Update email in contact section
- Update social media links (GitHub, LinkedIn, Twitter, etc.)
- Update hero section description
- Modify about section content

#### Update the CSS (Optional)
- Change color scheme in `assets/css/style.css` (update CSS variables in `:root`)
- Modify fonts, spacing, or layout as needed

### 3. Add Your Content

All content is managed through JSON files in the `data/` folder, making it super easy to update!

## 📝 How to Add Blog Posts

1. Open `data/blogs.json`
2. Add a new blog entry to the `blogs` array:

```json
{
  "id": 7,
  "date": "Jan 20, 2026",
  "title": "Your Blog Post Title",
  "excerpt": "A short excerpt that appears in the blog list...",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "link": "#"
}
```

3. Save the file - your blog post appears automatically!

### Blog Post Fields:
- **id**: Unique number (increment from the last entry)
- **date**: Publication date (format: "Jan 20, 2026")
- **title**: Blog post title
- **excerpt**: Short description (2-3 sentences)
- **tags**: Array of tags for filtering
- **link**: URL to the full blog post (can link to external blog, Medium, Dev.to, etc.)

## 💼 How to Add Projects

1. Open `data/projects.json`
2. Add a new project entry:

```json
{
  "id": 7,
  "name": "Project Name",
  "description": "What your project does...",
  "icon": "🚀",
  "technologies": ["React", "Node.js", "MongoDB"],
  "github": "https://github.com/yourusername/project-name",
  "live": "https://project-demo.com"
}
```

### Project Fields:
- **name**: Project name
- **description**: What it does (1-2 sentences)
- **icon**: Emoji icon representing the project
- **technologies**: Array of tech stack
- **github**: Link to GitHub repository
- **live**: Link to live demo (optional)

## 📚 How to Add Publications

1. Open `data/publications.json`
2. Add a publication entry:

```json
{
  "date": "Jun 2025",
  "title": "Publication Title",
  "authors": "Your Name, Co-Author",
  "venue": "Conference Name 2025",
  "arxiv": "https://arxiv.org/...",
  "code": "https://github.com/...",
  "website": "https://example.com"
}
```

## 📰 How to Add News Items

1. Open `data/news.json`
2. Add a news entry:

```json
{
  "date": "Jan 10, 2026",
  "content": "Your news item with optional <a href='#'>links</a>"
}
```

## 🌐 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** icon and select **New repository**
3. Name it: `yourusername.github.io` (replace with your actual GitHub username)
4. Make it **Public**
5. Click **Create repository**

### Step 2: Initialize Git Locally

```bash
cd personal-portfolio
git init
git add .
git commit -m "Initial commit: Personal portfolio website"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **main** and **root** folder
5. Click **Save**

Your site will be live at: `https://yourusername.github.io` 🎉

### Step 4: Use a Custom Domain (Optional)

1. In GitHub Pages settings, add your custom domain under "Custom domain"
2. Update your domain's DNS settings to point to GitHub Pages
3. See [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for details

## 🔄 Updating Your Portfolio

### Update Blog Post:
```bash
# Edit data/blogs.json
# No code changes needed!
git add data/blogs.json
git commit -m "Add new blog post: Your Blog Title"
git push
```

### Update Projects:
```bash
git add data/projects.json
git commit -m "Add new project"
git push
```

### Update HTML Content:
```bash
git add index.html
git commit -m "Update about section"
git push
```

All changes will be live within seconds!

## 🎨 Customization Guide

### Change Color Scheme

Edit `assets/css/style.css`, update the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #0066cc;      /* Change to your color */
    --secondary-color: #ff6b6b;    /* Change to your color */
    --dark-color: #1a1a1a;
    --light-color: #f5f5f5;
    /* ... more variables ... */
}
```

### Add Your Photo

1. Place your photo in `assets/img/` folder
2. Replace the profile placeholder in `index.html`:

```html
<div class="profile-placeholder">
    <img src="assets/img/your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
</div>
```

### Change Fonts

Add Google Fonts in the `<head>` of HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

Update in CSS:
```css
body {
    font-family: 'Inter', sans-serif;
}
```

## 📱 Responsive Design

The website is fully responsive and tested on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## ✨ Best Practices

1. **Keep descriptions concise** - Blog excerpts and project descriptions should be 1-3 sentences
2. **Update regularly** - Add new blog posts and news at least monthly
3. **Verify links** - Make sure all GitHub and social media links work
4. **Use meaningful tags** - Help visitors find related content
5. **Keep projects updated** - Remove outdated projects or update descriptions

## 🐛 Troubleshooting

### Content not showing?
- Check browser console (F12) for errors
- Make sure JSON files are in the `data/` folder
- Verify JSON syntax is valid (use [JSON validator](https://jsonlint.com/))

### Styling issues?
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure CSS files are in `assets/css/`
- Check file paths are correct

### GitHub Pages not updating?
- Wait 1-2 minutes after pushing
- Hard refresh your browser (Ctrl+Shift+R)
- Check repository settings for correct branch

## 📄 License

This project is free to use and modify for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💡 Tips for Success

1. **Add blog posts regularly** - This keeps your site fresh and improves SEO
2. **Keep projects relevant** - Highlight your best and most recent work
3. **Update social links** - Make it easy for visitors to follow you
4. **Write good descriptions** - Help visitors understand your work
5. **Optimize images** - Compress images to improve load times

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the code comments
3. Validate your JSON files
4. Check GitHub Pages documentation

---

**Happy building! 🚀** Your portfolio is ready to impress the world!
