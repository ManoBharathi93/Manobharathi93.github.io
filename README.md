# Personal Portfolio - Backend Engineer & ML Researcher

A clean, academic-style technical portfolio perfect for showcasing your backend engineering and machine learning research work. Inspired by [alexzhang13.github.io](https://alexzhang13.github.io/).

## ✨ Features

- **Clean Design**: Minimal aesthetic with academic focus (no flashy gradients)
- **Easy Content Management**: All content in JSON files - no coding required
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **GitHub Pages Ready**: Deploy for free in 5 minutes
- **SEO Optimized**: Built with semantic HTML and proper meta tags
- **Fast**: Pure HTML/CSS/JavaScript - zero dependencies

## 📁 File Structure

```
├── index.html                 # Main portfolio page
├── assets/
│   ├── css/style.css         # All styling (responsive, minimal)
│   └── js/script.js          # Data loading and rendering
├── data/
│   ├── experience.json       # Your work experience
│   ├── projects.json         # Your projects
│   ├── research.json         # Research papers
│   └── articles.json         # Blog posts/articles
├── CONTENT_GUIDE.md          # How to add/edit content
├── GITHUB_SETUP.md           # Deploy to GitHub Pages
└── VERIFICATION_CHECKLIST.md # Setup verification
```

## 🚀 Quick Start

### 1. Customize Your Portfolio

Edit `index.html` to update:
- Your name
- Email address
- Phone number
- Location
- Social links (GitHub, LinkedIn, Twitter)

### 2. Add Your Content

Update JSON files in `data/`:
- **experience.json** - Add your work experience
- **projects.json** - Add your projects
- **research.json** - Add your research/publications
- **articles.json** - Add your blog posts

See `CONTENT_GUIDE.md` for examples.

### 3. Deploy to GitHub Pages

Follow `GITHUB_SETUP.md` to:
1. Create a GitHub repository named `YourUsername.github.io`
2. Push your code
3. Enable GitHub Pages
4. Visit `https://YourUsername.github.io` 🎉

## 📝 Content Management

All your portfolio content is stored in JSON files. No HTML/CSS knowledge needed!

### Example: Adding Experience

Edit `data/experience.json`:
```json
{
  "experience": [
    {
      "company": "Your Company",
      "title": "Your Job Title",
      "duration": "Oct 2024 - Present",
      "description": "What you did",
      "highlights": [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3"
      ]
    }
  ]
}
```

See `CONTENT_GUIDE.md` for complete examples for all sections.

## 🎨 Customization

### Change Colors

Edit `assets/css/style.css`:
```css
:root {
    --accent: #0066cc;  /* Change this blue to your color */
}
```

### Change Layout Width

Edit `assets/css/style.css`:
```css
:root {
    --max-width: 900px;  /* Adjust if needed */
}
```

## 📱 Responsive Design

- **Desktop**: Full width with 900px max-width
- **Tablet (768px+)**: Optimized layout
- **Mobile (480px+)**: Stacked layout with readable text

## 🔍 Sections

1. **About/Header** - Your intro with contact info
2. **Bio** - About you, tech stack, education
3. **Experience** - Work experience loaded from JSON
4. **Projects** - Your projects with technologies
5. **Research** - Publications and papers
6. **Articles** - Blog posts and technical writing

## 📚 Documentation

- **`CONTENT_GUIDE.md`** - Complete guide to managing content
- **`GITHUB_SETUP.md`** - Step-by-step GitHub Pages deployment
- **`REDESIGN_SUMMARY.md`** - Overview of the redesign
- **`VERIFICATION_CHECKLIST.md`** - Setup verification checklist

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Variables)
- Vanilla JavaScript (no frameworks)
- JSON for data management

**Zero external dependencies!**

## 📦 What's Pre-populated

Your portfolio comes with example content based on your background:

- **OpenText** work experience (1.8+ years)
- **4 real projects**: Power grid detection, medical imaging, observability
- **Research paper** entry
- **Tech stack** with your skills

Update these with your actual information!

## ✅ Pre-deployment Checklist

Before deploying to GitHub Pages:

- [ ] Update your name and email
- [ ] Update social links
- [ ] Review all content for accuracy
- [ ] Test on mobile devices
- [ ] Verify all links work

## 🚢 Deployment

See `GITHUB_SETUP.md` for complete instructions. Quick version:

1. Create repo: `YourUsername.github.io`
2. Push code to GitHub
3. Enable GitHub Pages in repository settings
4. Visit your new portfolio!

## 📈 Performance

- **Page Load**: < 500ms (no external dependencies)
- **Mobile Friendly**: 100/100 accessibility ready
- **SEO**: Semantic HTML, proper meta tags
- **Hosting**: Free on GitHub Pages

## 🎯 Design Philosophy

This portfolio is designed for:
- **Backend Engineers** - Emphasizing systems and architecture
- **ML Researchers** - Showcasing research and projects
- **Technical People** - Clean, minimal, professional aesthetic

No flashy animations or gradients - just pure technical style.

## 🔧 Troubleshooting

### Content not showing?
1. Check browser console (F12) for errors
2. Verify JSON syntax (use [JSONLint.com](https://jsonlint.com))
3. Hard refresh (Ctrl+Shift+R)

### GitHub Pages not working?
1. Verify repository is public
2. Check repository name: `YourUsername.github.io`
3. Wait 2-3 minutes for rebuild
4. Check **Actions** tab for errors

See documentation files for more help!

## 📄 License

This portfolio template is provided as-is. Feel free to customize it however you like!

## 👨‍💻 About

Built with ❤️ for backend engineers and ML researchers who want a clean, professional portfolio without the complexity.

---

**Next Steps:**
1. Read `CONTENT_GUIDE.md` to understand content management
2. Customize your information in `index.html`
3. Add your projects and articles
4. Follow `GITHUB_SETUP.md` to deploy
5. Share your portfolio!

Good luck! 🚀
