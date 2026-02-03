# How to Link Blog Posts from Other Platforms

This guide shows how to link your portfolio to blogs hosted on Medium, Dev.to, Hashnode, or your own blog platform.

## Why Link to External Blogs?

✅ Leverage established platforms (Medium, Dev.to)
✅ Easy blog management elsewhere
✅ No need to maintain separate blog system
✅ Build audience on multiple platforms
✅ Portfolio focuses on showcase, not hosting

## 📱 Popular Blogging Platforms

### Medium
**URL Format:** `https://medium.com/@yourhandle/article-title-123abc`

**Steps:**
1. Write blog on [Medium.com](https://medium.com)
2. Copy article URL
3. Add to `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "How to Learn React in 30 Days",
  "excerpt": "A complete roadmap for learning React from basics to advanced concepts.",
  "tags": ["React", "JavaScript", "Learning"],
  "link": "https://medium.com/@yourhandle/how-to-learn-react-123abc"
}
```

### Dev.to
**URL Format:** `https://dev.to/yourhandle/article-title-123abc`

**Steps:**
1. Write blog on [Dev.to](https://dev.to)
2. Copy article URL
3. Add to `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "Building REST APIs with Node.js",
  "excerpt": "Learn to build scalable REST APIs using Express.js and best practices.",
  "tags": ["Node.js", "API", "Backend"],
  "link": "https://dev.to/yourhandle/building-rest-apis-with-nodejs-123"
}
```

### Hashnode
**URL Format:** `https://yourhandle.hashnode.dev/article-title`

**Steps:**
1. Write blog on [Hashnode.com](https://hashnode.com)
2. Copy article URL
3. Add to `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "Docker for Beginners",
  "excerpt": "Complete guide to containerizing your applications with Docker.",
  "tags": ["Docker", "DevOps", "Containers"],
  "link": "https://yourhandle.hashnode.dev/docker-for-beginners"
}
```

### Substack
**URL Format:** `https://yourname.substack.com/p/article-title`

**Steps:**
1. Publish on [Substack.com](https://substack.com)
2. Copy article URL
3. Add to `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "Weekly Tech Digest #1",
  "excerpt": "Curated tech news and insights from the past week.",
  "tags": ["News", "Tech", "Weekly"],
  "link": "https://yourname.substack.com/p/weekly-tech-digest-1"
}
```

### Your Own Blog Site
**URL Format:** `https://yourblog.com/posts/article-title`

**Steps:**
1. Host blog anywhere (Wordpress, Ghost, Hugo, etc.)
2. Copy article URL
3. Add to `data/blogs.json`:

```json
{
  "id": 7,
  "date": "Jan 25, 2026",
  "title": "Personal Blog Title",
  "excerpt": "Your blog post description here.",
  "tags": ["tag1", "tag2"],
  "link": "https://yourblog.com/posts/article-title"
}
```

## 🔗 Finding Your Blog URLs

### Medium
1. Click your blog post
2. Copy the URL from address bar
3. Example: `https://medium.com/@alex/my-post-abc123def`

### Dev.to
1. Click your published post
2. Copy the URL
3. Example: `https://dev.to/alex/my-post-abc123`

### Hashnode
1. Click your article
2. Copy the URL
3. Example: `https://alex.hashnode.dev/my-post`

### Own Blog
- Copy the full article URL from your site
- Make sure it's publicly accessible

## 📊 Example: Multi-Platform Strategy

Link blogs to different platforms:

```json
{
  "blogs": [
    {
      "id": 1,
      "date": "Jan 25, 2026",
      "title": "React Performance Tips",
      "excerpt": "Optimize your React apps for better performance.",
      "tags": ["React", "Performance"],
      "link": "https://medium.com/@yourname/react-perf-tips"
    },
    {
      "id": 2,
      "date": "Jan 20, 2026",
      "title": "Node.js Best Practices",
      "excerpt": "Essential Node.js patterns and practices.",
      "tags": ["Node.js", "Backend"],
      "link": "https://dev.to/yourname/nodejs-best-practices"
    },
    {
      "id": 3,
      "date": "Jan 15, 2026",
      "title": "Docker Tutorial",
      "excerpt": "Get started with containerization.",
      "tags": ["Docker", "DevOps"],
      "link": "https://yourname.hashnode.dev/docker-tutorial"
    },
    {
      "id": 4,
      "date": "Jan 10, 2026",
      "title": "Local Blog Post",
      "excerpt": "Post on my personal blog.",
      "tags": ["Personal", "Tech"],
      "link": "https://myblog.com/articles/local-post"
    }
  ]
}
```

## ✨ Benefits of Each Platform

| Platform | Best For | Audience | Monetization |
|----------|----------|----------|--------------|
| **Medium** | In-depth articles | Large, diverse | Member program |
| **Dev.to** | Dev community | Developers | None (free) |
| **Hashnode** | Tech blog hosting | Developers | Brand partnership |
| **Substack** | Newsletter | Email subscribers | Premium option |
| **Own Blog** | Full control | Your audience | Whatever you want |

## 🎯 Recommended Approach

### For Maximum Reach:
1. Write blog on **Medium** or **Dev.to** (large audience)
2. Cross-post to **Hashnode** (SEO boost)
3. Link all from your portfolio
4. Share on social media

### For Maximum Control:
1. Self-host blog (Hugo, Ghost, Wordpress)
2. Link from portfolio
3. Share to Medium/Dev.to as canonical

### For Simplicity:
1. Write on **Dev.to** (easiest, free)
2. Copy link to portfolio
3. Done!

## 📈 Best Practices

✅ **DO:**
- Write unique, valuable content
- Include relevant tags
- Keep description/excerpt clear
- Update portfolio monthly
- Add new posts regularly

❌ **DON'T:**
- Duplicate exact content (use canonical tags)
- Add broken links
- Leave portfolio outdated
- Use clickbait titles
- Post spam content

## 🔐 SEO Tips for Linked Posts

1. **Use unique meta descriptions** - Each post should have distinct description
2. **Add keywords in excerpt** - Help SEO by including relevant keywords
3. **Proper URLs** - Use readable URLs instead of `article-123`
4. **Update portfolio** - Fresh content signals active developer
5. **Link to high-quality content** - Only link posts you're proud of

## 📚 Example JSON with Real URLs

```json
{
  "blogs": [
    {
      "id": 1,
      "date": "Jan 15, 2026",
      "title": "Building a Modern Web Stack with React and Node.js",
      "excerpt": "Learn how to build a full-stack application using React for the frontend and Node.js for the backend. In this comprehensive guide, I'll walk you through best practices, architecture decisions, and deployment strategies.",
      "tags": ["React", "Node.js", "Web Development"],
      "link": "https://medium.com/@yourusername/modern-web-stack-abc123"
    },
    {
      "id": 2,
      "date": "Jan 08, 2026",
      "title": "Mastering CSS Grid and Flexbox for Responsive Design",
      "excerpt": "A deep dive into modern CSS layout techniques. Understand when to use CSS Grid vs Flexbox, and how to create truly responsive designs that work on all devices.",
      "tags": ["CSS", "Design", "Frontend"],
      "link": "https://dev.to/yourusername/css-grid-flexbox-guide"
    },
    {
      "id": 3,
      "date": "Dec 28, 2025",
      "title": "Getting Started with Docker and Containerization",
      "excerpt": "Docker has revolutionized the way we deploy applications. In this tutorial, I'll explain containerization concepts and show you how to containerize your first application.",
      "tags": ["Docker", "DevOps", "Backend"],
      "link": "https://yourusername.hashnode.dev/docker-getting-started"
    }
  ]
}
```

## 🚀 Next Steps

1. Choose your blogging platform(s)
2. Write your first post
3. Copy the URL
4. Add to `data/blogs.json`
5. Push to GitHub
6. Share on social media!

---

**Remember:** Your portfolio is your digital resume. Link to content you're proud of!

Happy writing! ✍️
