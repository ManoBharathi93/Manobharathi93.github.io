// ===== BLOG PAGE FUNCTIONALITY =====

let allBlogs = [];

// Fetch all blogs
async function loadAllBlogs() {
    try {
        const response = await fetch('data/blogs.json');
        const blogsData = await response.json();
        allBlogs = blogsData.blogs;
        
        displayBlogs(allBlogs);
        loadTagFilters();
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

// Display blogs in list
function displayBlogs(blogs) {
    const container = document.getElementById('blog-list');
    container.innerHTML = '';
    
    if (blogs.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-light);">No blog posts found.</p>';
        return;
    }
    
    blogs.forEach((blog) => {
        const blogItem = createBlogItem(blog);
        container.appendChild(blogItem);
    });
}

// Create blog item (list view)
function createBlogItem(blog) {
    const item = document.createElement('article');
    item.className = 'blog-list-item';
    
    const tagsHtml = blog.tags
        .map(tag => `<span class="blog-tag">${tag}</span>`)
        .join('');
    
    item.innerHTML = `
        <div class="blog-item-header">
            <h2 class="blog-item-title">${blog.title}</h2>
            <span class="blog-item-date">${blog.date}</span>
        </div>
        <p class="blog-item-excerpt">${blog.excerpt}</p>
        <div class="blog-item-footer">
            <div class="blog-tags">
                ${tagsHtml}
            </div>
            ${blog.link ? `<a href="${blog.link}" class="read-more">Read More →</a>` : ''}
        </div>
    `;
    
    if (blog.link) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            window.location.href = blog.link;
        });
    }
    
    return item;
}

// Load and display tag filters
function loadTagFilters() {
    const allTags = new Set();
    allBlogs.forEach(blog => {
        blog.tags.forEach(tag => allTags.add(tag));
    });
    
    const tagContainer = document.getElementById('tag-buttons');
    tagContainer.innerHTML = '<button class="tag-button active" data-tag="all">All</button>';
    
    Array.from(allTags).sort().forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-button';
        button.textContent = tag;
        button.setAttribute('data-tag', tag);
        button.addEventListener('click', () => filterByTag(tag, button));
        tagContainer.appendChild(button);
    });
}

// Filter blogs by tag
function filterByTag(tag, button) {
    // Update active button
    document.querySelectorAll('.tag-button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Filter blogs
    let filtered = allBlogs;
    if (tag !== 'all') {
        filtered = allBlogs.filter(blog => blog.tags.includes(tag));
    }
    
    displayBlogs(filtered);
}

// Search blogs
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = allBlogs.filter(blog => {
        return blog.title.toLowerCase().includes(searchTerm) ||
               blog.excerpt.toLowerCase().includes(searchTerm) ||
               blog.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    
    displayBlogs(filtered);
});

// Load blogs on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAllBlogs();
});

// Add styles for blog page
const style = document.createElement('style');
style.textContent = `
    .blog-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4rem var(--spacing);
        text-align: center;
    }

    .blog-header h1 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
    }

    .blog-header p {
        font-size: 1.2rem;
        opacity: 0.95;
    }

    .blog-controls {
        background-color: var(--light-color);
        padding: 2rem var(--spacing);
    }

    .search-bar {
        margin-bottom: 2rem;
    }

    .search-input {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
    }

    .tag-filter h3 {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: var(--text-color);
    }

    .tag-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    .tag-button {
        padding: 0.5rem 1rem;
        border: 2px solid var(--primary-color);
        background-color: transparent;
        color: var(--primary-color);
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .tag-button:hover {
        background-color: var(--primary-color);
        color: white;
    }

    .tag-button.active {
        background-color: var(--primary-color);
        color: white;
    }

    .all-blogs {
        padding: 4rem var(--spacing);
    }

    .blog-list {
        display: grid;
        gap: 2rem;
    }

    .blog-list-item {
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        border-left: 4px solid var(--primary-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
    }

    .blog-list-item:hover {
        transform: translateX(5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .blog-item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .blog-item-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--dark-color);
        flex: 1;
    }

    .blog-item-date {
        color: var(--primary-color);
        font-weight: 600;
        white-space: nowrap;
    }

    .blog-item-excerpt {
        color: var(--text-light);
        line-height: 1.8;
        margin-bottom: 1rem;
    }

    .blog-item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .read-more {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .read-more:hover {
        color: var(--secondary-color);
        transform: translateX(3px);
    }

    @media (max-width: 768px) {
        .blog-header h1 {
            font-size: 2rem;
        }

        .blog-header p {
            font-size: 1rem;
        }

        .blog-item-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .blog-item-title {
            font-size: 1.3rem;
        }

        .blog-item-footer {
            flex-direction: column;
            align-items: flex-start;
        }

        .tag-buttons {
            gap: 0.5rem;
        }

        .tag-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
        }
    }
`;
document.head.appendChild(style);
