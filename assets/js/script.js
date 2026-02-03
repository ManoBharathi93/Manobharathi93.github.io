// ===== DATA MANAGEMENT =====
// All content is managed through JSON files in the data/ folder
// This makes it easy to add new content without touching the code

// Fetch and display featured blog posts
async function loadFeaturedBlogs() {
    try {
        const response = await fetch('data/blogs.json');
        const blogsData = await response.json();
        
        // Get the 3 most recent blogs
        const featuredBlogs = blogsData.blogs.slice(0, 3);
        
        const container = document.getElementById('featured-blogs');
        container.innerHTML = '';
        
        featuredBlogs.forEach((blog, index) => {
            const blogCard = createBlogCard(blog);
            container.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error loading featured blogs:', error);
    }
}

// Fetch and display projects
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projectsData = await response.json();
        
        const container = document.getElementById('projects-list');
        container.innerHTML = '';
        
        projectsData.projects.forEach((project) => {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Fetch and display publications
async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        const pubData = await response.json();
        
        const container = document.getElementById('publications-list');
        container.innerHTML = '';
        
        pubData.publications.forEach((pub) => {
            const pubItem = createPublicationItem(pub);
            container.appendChild(pubItem);
        });
    } catch (error) {
        console.error('Error loading publications:', error);
    }
}

// Fetch and display news
async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const newsData = await response.json();
        
        const container = document.getElementById('news-list');
        container.innerHTML = '';
        
        newsData.news.forEach((item) => {
            const newsItem = createNewsItem(item);
            container.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Create blog card element
function createBlogCard(blog) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    
    const tagsHtml = blog.tags
        .slice(0, 3)
        .map(tag => `<span class="blog-tag">${tag}</span>`)
        .join('');
    
    card.innerHTML = `
        <div class="blog-card-header">
            <div class="blog-date">${blog.date}</div>
            <h3 class="blog-title">${blog.title}</h3>
        </div>
        <div class="blog-card-body">
            <p class="blog-excerpt">${blog.excerpt}</p>
            <div class="blog-tags">
                ${tagsHtml}
            </div>
        </div>
    `;
    
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        if (blog.link) {
            window.location.href = blog.link;
        }
    });
    
    return card;
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const techHtml = project.technologies
        .map(tech => `<span class="tech-badge">${tech}</span>`)
        .join('');
    
    let linksHtml = '';
    if (project.github || project.live) {
        linksHtml = '<div class="project-links">';
        if (project.github) {
            linksHtml += `<a href="${project.github}" target="_blank" class="project-link">View Code ↗</a>`;
        }
        if (project.live) {
            linksHtml += `<a href="${project.live}" target="_blank" class="project-link">Live Demo ↗</a>`;
        }
        linksHtml += '</div>';
    }
    
    card.innerHTML = `
        <div class="project-image">${project.icon || '💻'}</div>
        <div class="project-content">
            <h3 class="project-name">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techHtml}
            </div>
            ${linksHtml}
        </div>
    `;
    
    return card;
}

// Create publication item element
function createPublicationItem(pub) {
    const item = document.createElement('div');
    item.className = 'publication-item';
    
    let linksHtml = '';
    if (pub.arxiv || pub.code || pub.website || pub.venue) {
        linksHtml = '<div class="publication-links">';
        if (pub.arxiv) {
            linksHtml += `<a href="${pub.arxiv}" target="_blank" class="pub-link">ARXIV</a>`;
        }
        if (pub.code) {
            linksHtml += `<a href="${pub.code}" target="_blank" class="pub-link">CODE</a>`;
        }
        if (pub.website) {
            linksHtml += `<a href="${pub.website}" target="_blank" class="pub-link">WEBSITE</a>`;
        }
        linksHtml += '</div>';
    }
    
    item.innerHTML = `
        <div class="publication-date">${pub.date}</div>
        <div class="publication-title">${pub.title}</div>
        <div class="publication-authors">${pub.authors}</div>
        <div class="publication-venue">${pub.venue || ''}</div>
        ${linksHtml}
    `;
    
    return item;
}

// Create news item element
function createNewsItem(newsItem) {
    const item = document.createElement('div');
    item.className = 'news-item';
    
    item.innerHTML = `
        <div class="news-date">${newsItem.date}</div>
        <div class="news-content">${newsItem.content}</div>
    `;
    
    return item;
}

// ===== NAVIGATION INTERACTIVITY =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LOAD ALL DATA ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedBlogs();
    loadProjects();
    loadPublications();
    loadNews();
});

// ===== THEME TOGGLE (Optional) =====
function toggleTheme() {
    document.documentElement.style.colorScheme = 
        document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 99;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.transform = 'translateY(-3px)';
    scrollTopButton.style.boxShadow = '0 8px 16px rgba(0, 102, 204, 0.3)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.transform = 'translateY(0)';
    scrollTopButton.style.boxShadow = 'none';
});
