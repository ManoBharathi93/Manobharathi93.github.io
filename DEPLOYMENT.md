# GitHub Pages Deployment Guide

This guide walks you through deploying your portfolio to GitHub Pages completely free!

## 📋 Prerequisites

- GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Your portfolio files ready to go

## 🚀 Step-by-Step Deployment

### Step 1: Create a GitHub Repository

1. Log in to [GitHub.com](https://github.com)
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. **IMPORTANT:** Name your repository `yourusername.github.io`
   - Replace `yourusername` with your actual GitHub username
   - Example: `john-smith.github.io`
5. Set it to **Public**
6. Click **Create repository**

### Step 2: Setup Git Locally (First Time Only)

Run these commands in your terminal/PowerShell in the portfolio directory:

```bash
cd "d:/My GitHub Projects/personal-portfolio"

# Configure git with your GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your.github.email@example.com"

# Add the remote repository
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository: `github.com/yourusername/yourusername.github.io`
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select **Deploy from a branch**
   - **Branch**: Select **main** and **/ (root)**
   - Click **Save**

Wait 1-2 minutes, then your site will be live at: `https://yourusername.github.io`

## 📝 Making Updates

### Via Command Line (Recommended)

```bash
cd "d:/My GitHub Projects/personal-portfolio"

# Make changes to files (edit JSON data, HTML, CSS, etc.)

# Stage changes
git add .

# Create a commit
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

### Via GitHub Web UI

1. Go to your repository on GitHub
2. Navigate to the file you want to edit
3. Click the pencil icon (Edit)
4. Make your changes
5. Click "Commit changes"
6. Changes go live within seconds!

## 🎯 Common Update Scenarios

### Adding a Blog Post
```bash
# You edited data/blogs.json
git add data/blogs.json
git commit -m "Add blog post: How to Learn React"
git push
```

### Adding a Project
```bash
# You edited data/projects.json
git add data/projects.json
git commit -m "Add new project: Chat Application"
git push
```

### Updating Your About Section
```bash
# You edited index.html
git add index.html
git commit -m "Update about section with new bio"
git push
```

### Changing Colors/Styling
```bash
# You edited CSS files
git add assets/css/
git commit -m "Update color scheme to blue theme"
git push
```

## 🌐 Using a Custom Domain (Optional)

### With Domain Registrar (e.g., GoDaddy, Namecheap)

1. In GitHub Pages settings, enter your domain: `yourwebsite.com`
2. Update your domain's DNS records:
   - Type: **A**
   - Host: `@` (or your domain)
   - Points to: `185.199.108.153`
   - Also add: `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Wait up to 24 hours for DNS to propagate
4. GitHub will automatically use HTTPS

**Note:** See [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions.

## 🔍 Troubleshooting

### Site not loading?
- Check that your repository is named `yourusername.github.io`
- Wait 1-2 minutes after push
- Check repository settings → Pages for any errors
- Clear your browser cache (Ctrl+Shift+Delete)

### Getting "404 Not Found"?
- Verify branch is set to `main` in Pages settings
- Make sure you're accessing `https://yourusername.github.io`
- Check that index.html exists in root folder

### Changes not showing up?
- Wait 30 seconds and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check that you actually pushed: `git push`
- Check GitHub Actions for build errors (Settings → Actions)

### JSON files not loading?
- Verify file paths in script.js: `'data/blogs.json'`
- Check browser console (F12 → Console) for errors
- Ensure JSON is valid: [JSONLint.com](https://jsonlint.com/)

## 📊 Checking Deployment Status

### View GitHub Actions
1. Go to your repository
2. Click **Actions** tab
3. Look for recent workflow runs
4. Green checkmark = successful deployment
5. Red X = build failed (check error logs)

### Check for Errors in Browser
1. Visit your site: `https://yourusername.github.io`
2. Press F12 to open Developer Tools
3. Check **Console** tab for error messages
4. Check **Network** tab to see if files are loading

## 🔐 Security Best Practices

1. **Never commit secrets** - Don't put API keys in code
2. **Use .gitignore** - Already included!
3. **Review before pushing** - Check what you're uploading: `git status`
4. **Keep GitHub updated** - Enable security alerts in repository settings

## 📈 Performance Tips

1. **Optimize images** - Compress with [TinyPNG](https://tinypng.com/)
2. **Minimize files** - Gzip compression is automatic
3. **Use CDN** - GitHub Pages uses global CDN automatically
4. **Lazy load** - Already implemented for scroll effects

## 🎓 Git Commands Quick Reference

```bash
# Check status
git status

# See recent commits
git log --oneline

# Add specific files
git add file.html
git add data/

# Add all changes
git add .

# Create commit
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View remote URL
git remote -v

# Undo last commit (before push)
git reset --soft HEAD~1
```

## 🔄 Keeping Your Repository Updated

### Pull Latest Changes
```bash
git pull origin main
```

### Syncing After Edits on GitHub
```bash
# Someone edited files on GitHub web UI
git pull origin main
# Now your local copy is updated
```

## 💡 Pro Tips

1. **Write clear commit messages** - Helps track changes
2. **Commit frequently** - Don't wait to commit all changes at once
3. **Pull before pushing** - Prevents conflicts
4. **Test locally first** - Validate before pushing
5. **Review diffs** - Check what you're about to push

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Learning Lab](https://lab.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)

## ✨ Next Steps

1. ✅ Deploy to GitHub Pages
2. ✅ Customize your content in `data/` JSON files
3. ✅ Update HTML with your info
4. ✅ Change colors in CSS
5. ✅ Share your portfolio link!

---

**Your portfolio is now live! 🎉**

Share it with: `https://yourusername.github.io`

Good luck! 🚀
