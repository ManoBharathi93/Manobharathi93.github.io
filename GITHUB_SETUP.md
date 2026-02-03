# Deploying to GitHub Pages

## Quick Start

Your portfolio is **ready to deploy** to GitHub Pages in 5 minutes!

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it: `ManoBharathi93.github.io` (replace with your GitHub username)
3. Keep it **public**
4. Click "Create repository"

## Step 2: Connect Local Repository

From your portfolio folder, run:

```bash
git remote add origin https://github.com/ManoBharathi93/ManoBharathi93.github.io.git
git branch -M main
git push -u origin main
```

Replace `ManoBharathi93` with your actual GitHub username.

## Step 3: Enable GitHub Pages

1. Go to your repository settings: `https://github.com/ManoBharathi93/ManoBharathi93.github.io/settings`
2. Scroll down to **Pages**
3. Select **Deploy from a branch**
4. Choose **main** branch
5. Click **Save**

## Step 4: Visit Your Portfolio

Wait 1-2 minutes, then visit:
```
https://ManoBharathi93.github.io
```

That's it! Your portfolio is now live! 🎉

---

## Updating Your Portfolio

### To change content:

1. **Edit JSON files** in the `data/` folder
2. **Commit changes:**
   ```bash
   git add data/
   git commit -m "Update portfolio content"
   ```
3. **Push to GitHub:**
   ```bash
   git push
   ```

Your portfolio updates automatically within 1-2 minutes!

### To change design/styling:

1. **Edit CSS** in `assets/css/style.css`
2. **Edit HTML** if needed in `index.html`
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update design"
   git push
   ```

---

## Customization Guide

### Update Your Name & Info

Edit `index.html`:

```html
<h1>Your Name Here</h1>
<p class="tagline">Your Title Here</p>
<p class="subtitle">Your Subtitle</p>

<div class="contact-info">
    <a href="mailto:your-email@example.com">your-email@example.com</a>
    <span>Your Phone</span>
    <span>Your Location</span>
</div>

<div class="social-links">
    <a href="https://github.com/yourname" target="_blank">GitHub</a>
    <a href="https://linkedin.com/in/yourname" target="_blank">LinkedIn</a>
    <a href="https://twitter.com/yourname" target="_blank">Twitter</a>
</div>
```

### Update Social Links

In `index.html`, modify the social links section:

```html
<div class="social-links">
    <a href="https://github.com/ManoBharathi93" target="_blank">GitHub</a>
    <a href="https://linkedin.com/in/manobharathi-m" target="_blank">LinkedIn</a>
    <a href="https://twitter.com/yourhandle" target="_blank">Twitter</a>
</div>
```

### Update About Section

Edit the bio section in `index.html`:

```html
<section class="bio">
    <div class="container">
        <h2>About</h2>
        <p>Your biography here...</p>
        
        <h3>Core Skills</h3>
        <div class="tech-stack">
            <div class="tech-group">
                <strong>Languages:</strong>
                Your languages here
            </div>
            <!-- More tech groups -->
        </div>
    </div>
</section>
```

### Update Colors

Edit `assets/css/style.css` - look for the `:root` section:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent: #0066cc;      /* This is the blue color */
    /* Change #0066cc to your color */
}
```

---

## Custom Domain (Optional)

If you have a custom domain (e.g., `yourdomain.com`):

1. Go to your repository **Settings → Pages**
2. Enter your custom domain
3. Follow GitHub's instructions to update your DNS records

---

## Troubleshooting

### Portfolio not showing?
- Wait 2-3 minutes for GitHub Pages to build
- Check if repository is **public**
- Verify repository name is `YourUsername.github.io`

### Changes not updating?
- Hard refresh your browser (Ctrl+Shift+R)
- Clear browser cache
- Wait 2 minutes for GitHub Pages rebuild

### Need more help?
- GitHub Pages docs: https://docs.github.com/en/pages
- Check repository **Actions** tab for build errors

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Update personal information
4. ✅ Add your content (see CONTENT_GUIDE.md)
5. ✅ Share your portfolio!

Your portfolio is now ready for the world! 🚀
