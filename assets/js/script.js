// ===== DATA MANAGEMENT =====
// All content is managed through JSON files in the data/ folder
// This makes it easy to add new content without touching the code

// Load all data files and render content
document.addEventListener('DOMContentLoaded', function() {
    loadExperience();
    loadProjects();
    loadExperiments();
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

        // Check if project has documentation blog
        const hasDoc = project.documentation && project.documentation.trim() !== '';

        // If documentation link exists, make the entire card clickable and open docs in a new tab.
        const cardInner = `
            <div class="project-item">
                <div class="project-name">${project.name}</div>
                ${project.tldr ? `<div class="project-tldr"><strong>TLDR:</strong> ${project.tldr}</div>` : ''}
                <p class="project-desc">${project.description}</p>
                ${project.impact ? `<p class="project-impact"><strong>💡 Impact:</strong> ${project.impact}</p>` : ''}
                <div class="project-tech">
                    ${techHTML}
                </div>
            </div>
        `;

        if (hasDoc) {
            // wrap the card in an anchor so clicks open the documentation in new tab
            const safeLink = project.documentation.replace(/"/g, '&quot;');
            container.innerHTML += `<a class="project-card-link" href="${safeLink}" target="_blank" rel="noopener">${cardInner}</a>`;
        } else {
            container.innerHTML += cardInner;
        }
    });
}

// ===== EXPERIMENTS SECTION =====
async function loadExperiments() {
    try {
        const response = await fetch('data/experiments.json');
        const data = await response.json();
        renderExperiments(data.experiments);
    } catch (error) {
        console.error('Error loading experiments:', error);
        document.getElementById('experiments-list').innerHTML = '<p>Error loading experiments data.</p>';
    }
}

function renderExperiments(experiments) {
    const container = document.getElementById('experiments-list');
    container.innerHTML = '';

    experiments.forEach(item => {
        const linksHTML = item.links
            ? item.links.map(link => `<a href="${link.url}" target="_blank" class="experiment-link">${link.label}</a>`).join('')
            : '';

        const authorsHTML = item.authors ? `<div class="experiment-authors">${item.authors}</div>` : '';
        const venueHTML = item.venue ? `<div class="experiment-venue">${item.venue}</div>` : '';
        const descriptionHTML = item.description ? `<p class="experiment-description">${item.description}</p>` : '';

        const experimentHTML = `
            <div class="experiment-item">
                <div class="experiment-title">${item.title}</div>
                ${authorsHTML}
                ${venueHTML}
                ${descriptionHTML}
                <div class="experiment-links">
                    ${linksHTML}
                </div>
            </div>
        `;
        container.innerHTML += experimentHTML;
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

        // Check if link is internal (local blog post) or external
        const isInternal = article.link.startsWith('blog/') || !article.link.startsWith('http');
        const isNotebook = article.link.endsWith('.ipynb');
        
        // For local development, notebooks open directly
        // For GitHub Pages, they render natively or use nbviewer
        let finalLink = article.link;
        let target = isInternal ? '' : 'target="_blank"';
        
        if (!isInternal) {
            target = 'target="_blank"';
        }

        const articleHTML = `
            <a href="${finalLink}" ${target} class="article-item" style="text-decoration: none; color: inherit;">
                <div class="article-date">${article.date}</div>
                <div class="article-title">${article.title}</div>
                <p class="article-excerpt">${article.excerpt}</p>
                ${article.tags.length > 0 ? `<div class="article-tags">${tagsHTML}</div>` : ''}
            </a>
        `;
        container.innerHTML += articleHTML;
    });
}


