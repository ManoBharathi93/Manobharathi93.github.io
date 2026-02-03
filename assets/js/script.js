// ===== DATA MANAGEMENT =====
// All content is managed through JSON files in the data/ folder
// This makes it easy to add new content without touching the code

// Load all data files and render content
document.addEventListener('DOMContentLoaded', function() {
    loadExperience();
    loadProjects();
    loadResearch();
    loadArticles();
});

// ===== EXPERIENCE SECTION =====
async function loadExperience() {
    try {
        const response = await fetch('data/experience.json');
        const data = await response.json();
        renderExperience(data.experience);
    } catch (error) {
        console.error('Error loading experience:', error);
        document.getElementById('exp-list').innerHTML = '<p>Error loading experience data.</p>';
    }
}

function renderExperience(experiences) {
    const container = document.getElementById('exp-list');
    container.innerHTML = '';

    experiences.forEach(exp => {
        const expHTML = `
            <div class="experience-item">
                <div class="exp-header">
                    <div>
                        <div class="exp-company">${exp.company}</div>
                        <div class="exp-title">${exp.title}</div>
                    </div>
                    <div class="exp-date">${exp.duration}</div>
                </div>
                <p class="exp-description">${exp.description}</p>
                <ul class="exp-points">
                    ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `;
        container.innerHTML += expHTML;
    });
}

// ===== PROJECTS SECTION =====
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-list').innerHTML = '<p>Error loading projects data.</p>';
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';

    projects.forEach(project => {
        const techHTML = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        const projectHTML = `
            <div class="project-item">
                <div class="project-name">${project.name}</div>
                <p class="project-desc">${project.description}</p>
                ${project.impact ? `<p class="project-desc"><strong>Impact:</strong> ${project.impact}</p>` : ''}
                <div class="project-tech">
                    ${techHTML}
                </div>
            </div>
        `;
        container.innerHTML += projectHTML;
    });
}

// ===== RESEARCH SECTION =====
async function loadResearch() {
    try {
        const response = await fetch('data/research.json');
        const data = await response.json();
        renderResearch(data.research);
    } catch (error) {
        console.error('Error loading research:', error);
        document.getElementById('research-list').innerHTML = '<p>Error loading research data.</p>';
    }
}

function renderResearch(research) {
    const container = document.getElementById('research-list');
    container.innerHTML = '';

    research.forEach(item => {
        const linksHTML = item.links
            .map(link => `<a href="${link.url}" target="_blank" class="research-link">${link.label}</a>`)
            .join('');

        const researchHTML = `
            <div class="research-item">
                <div class="research-title">${item.title}</div>
                <div class="research-authors">${item.authors}</div>
                <div class="research-venue">${item.venue}</div>
                <div class="research-links">
                    ${linksHTML}
                </div>
            </div>
        `;
        container.innerHTML += researchHTML;
    });
}

// ===== ARTICLES SECTION =====
async function loadArticles() {
    try {
        const response = await fetch('data/articles.json');
        const data = await response.json();
        renderArticles(data.articles);
    } catch (error) {
        console.error('Error loading articles:', error);
        document.getElementById('articles-list').innerHTML = '<p>Error loading articles data.</p>';
    }
}

function renderArticles(articles) {
    const container = document.getElementById('articles-list');
    container.innerHTML = '';

    if (articles.length === 0) {
        container.innerHTML = '<p>More articles coming soon...</p>';
        return;
    }

    articles.forEach(article => {
        const tagsHTML = article.tags
            .map(tag => `<span class="article-tag">${tag}</span>`)
            .join('');

        const articleHTML = `
            <a href="${article.link}" target="_blank" class="article-item" style="text-decoration: none; color: inherit;">
                <div class="article-date">${article.date}</div>
                <div class="article-title">${article.title}</div>
                <p class="article-excerpt">${article.excerpt}</p>
                ${article.tags.length > 0 ? `<div class="article-tags">${tagsHTML}</div>` : ''}
            </a>
        `;
        container.innerHTML += articleHTML;
    });
}


