# Personal Portfolio - Quick Start Guide

Welcome to your new professional portfolio website! Here's everything you need to know.

## 🎯 What You Have

A fully functional, modern portfolio website with:
- ✨ Beautiful responsive design (works on all devices)
- 📝 Easy blog management (just add JSON entries)
- 💼 Project showcase section
- 📚 Publications & research section
- 📰 News & updates section
- 🎨 Modern UI with smooth animations
- 📱 Mobile-friendly layout
- 🚀 Ready to deploy on GitHub Pages

## 📂 File Structure

```
personal-portfolio/
├── index.html              ← Main page (about, featured content)
├── blog.html               ← Blog listing page
├── assets/
│   ├── css/
│   │   ├── style.css      ← Main styling
│   │   └── responsive.css ← Mobile styles
│   ├── js/
│   │   ├── script.js      ← Main functionality
│   │   └── blog.js        ← Blog features
│   └── img/               ← Your images here
├── data/                   ← ⭐ EDIT THESE FILES TO UPDATE CONTENT
│   ├── blogs.json         ← Add blog posts
│   ├── projects.json      ← Add projects
│   ├── publications.json  ← Add publications
│   └── news.json          ← Add news items
├── README.md              ← Full documentation
├── ADDING_CONTENT.md      ← How to add content
├── DEPLOYMENT.md          ← How to deploy
└── .gitignore             ← Files to ignore
```

## 🎨 Customize Your Portfolio

### Update Main Information

Edit `index.html`:
1. Find "Your Name" and replace with your name
2. Find "your.email@example.com" and add your real email
3. Update social media links (GitHub, LinkedIn, Twitter, etc.)
4. Update the about section description
5. Update subtitle: "Software Engineer | Full-Stack Developer | Tech Enthusiast"

### Change Colors

Edit `assets/css/style.css` (near the top):

```css
:root {
    --primary-color: #0066cc;      /* Change this to your color */
    --secondary-color: #ff6b6b;    /* Change this to another color */
    /* ... other colors ... */
}
```

Some nice color combinations:
- Blue/Orange: `#0066cc` / `#ff6b6b`
- Purple/Pink: `#667eea` / `#764ba2`
- Green/Teal: `#00b894` / `#00cec9`
- Dark/Gold: `#1a1a1a` / `#f1c40f`

## 📝 Adding Content (The Easy Way!)

### ➕ Add a Blog Post

Edit `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "Your Blog Post Title",
  "excerpt": "2-3 sentence summary of the post",
  "tags": ["tag1", "tag2", "tag3"],
  "link": "https://your-blog-url.com"
}
```

✅ That's it! No code changes needed!

### ➕ Add a Project

Edit `data/projects.json`:

```json
{
  "id": 7,
  "name": "Project Name",
  "description": "What it does in 1-2 sentences",
  "icon": "🚀",
  "technologies": ["React", "Node.js", "MongoDB"],
  "github": "https://github.com/yourusername/repo",
  "live": "https://demo-url.com"
}
```

### ➕ Add a Publication

Edit `data/publications.json`:

```json
{
  "date": "Jun 2025",
  "title": "Publication Title",
  "authors": "Your Name, Co-Author",
  "venue": "Conference or Journal Name",
  "arxiv": "https://arxiv.org/...",
  "code": "https://github.com/...",
  "website": "https://..."
}
```

### ➕ Add News

Edit `data/news.json`:

```json
{
  "date": "Jan 18, 2026",
  "content": "Your news! Can include <a href='url'>links</a>"
}
```

## 🚀 Deploy to GitHub

### Quick Setup (5 minutes)

1. Create repository named: `yourusername.github.io` on GitHub
2. Run these commands in terminal:

```bash
cd "d:/My GitHub Projects/personal-portfolio"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

3. Go to GitHub → Settings → Pages
4. Select "Deploy from a branch" → "main" → "/ (root)"
5. Wait 1-2 minutes
6. Your site is live at: `https://yourusername.github.io`

**That's it!** 🎉

## 🔄 Update Your Portfolio

### Via Command Line

```bash
cd "d:/My GitHub Projects/personal-portfolio"
# Edit your files...
git add .
git commit -m "Update blog post title"
git push
```

### Via GitHub Web UI

1. Go to github.com/yourusername/yourusername.github.io
2. Click the file to edit
3. Click the pencil icon
4. Make changes
5. Click "Commit changes"

Changes appear within seconds!

## 📚 Helpful Documents

- **README.md** - Full documentation
- **ADDING_CONTENT.md** - Detailed guide on adding content
- **DEPLOYMENT.md** - Complete deployment guide

## ✅ Testing Checklist

- [ ] Name appears correct throughout
- [ ] Email is your real email
- [ ] Social links work
- [ ] Blog posts appear
- [ ] Projects show up
- [ ] Colors look good
- [ ] Looks good on mobile
- [ ] Site loads fast

## 💡 Tips for Success

1. **Add content regularly** - New blog posts keep your site fresh
2. **Update projects** - Remove outdated ones, add recent work
3. **Write good descriptions** - Help people understand your work
4. **Verify links** - Test all external links monthly
5. **Keep it professional** - This is your online resume!

## 🎯 Next Steps

1. ✅ Customize your name and info
2. ✅ Change colors if desired
3. ✅ Add your real content (blogs, projects)
4. ✅ Deploy to GitHub Pages
5. ✅ Share your portfolio: `yourusername.github.io`

## ❓ Frequently Asked

**Q: How do I add a photo?**
A: Add to `assets/img/` folder and modify the hero section in `index.html`

**Q: Can I change fonts?**
A: Yes, add Google Fonts to the `<head>` of HTML files

**Q: How do I add external blog links?**
A: Just put the URL in the `link` field of blogs.json

**Q: What if blog content is blank?**
A: Check JSON syntax at [JSONLint.com](https://jsonlint.com/)

**Q: Can I add a resume PDF?**
A: Yes, put the PDF in `assets/` and link to it

## 🆘 Troubleshooting

### Content not showing?
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)
- Validate JSON files

### Site looks broken?
- Hard refresh browser (Ctrl+Shift+R)
- Check CSS file paths
- View browser console for errors

### GitHub Pages not updating?
- Wait 1-2 minutes
- Check GitHub Actions for errors
- Verify you pushed changes

## 📖 Full Documentation

- See **README.md** for everything
- See **ADDING_CONTENT.md** for detailed examples
- See **DEPLOYMENT.md** for hosting details

## 🎓 Learning Resources

- [HTML Basics](https://www.w3schools.com/html/)
- [CSS Guide](https://www.w3schools.com/css/)
- [JSON Format](https://www.json.org/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/book/en/v2)

---

**You're all set to impress the world with your portfolio!** 🚀

If you need help, check the documentation files or visit the GitHub Pages docs.

Happy building! 💪
