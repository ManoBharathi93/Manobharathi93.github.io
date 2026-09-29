// ===== SYSTEM INITIALIZATION & STATE =====
let globalState = {
    currentTab: 'overview.sys',
    viewMode: 'summary', // 'summary' | 'deep'
    manifestFormat: 'yaml', // 'yaml' | 'json'
    activeTopologyTab: 'systems', // 'systems' | 'tech' | 'research'
    activeSystemFlow: 'syncstream', // 'syncstream' | 'dual-memory-agent' | 'cve-automation' | 'grid-security'
    projectsData: [],
    experienceData: [],
    experimentsData: [],
    articlesData: [],
    systemClockInterval: null,
    latencyTimer: null,
    topologyCoords: {} // Store drag-coordinate persistence mapping
};

// Activity stream logging cues
const logsList = [
    "Loaded production impact from OpenText.",
    "Showing systems projects with architecture decisions.",
    "Highlighting backend, distributed systems, and AI infrastructure fit.",
    "Resume, GitHub, LinkedIn, and email are available in Contact.",
    "Architecture explorer is ready for review.",
    "Technical writing loaded from project data."
];
let logIndex = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    startLoggingStream();
});

// ===== CORE INITIALIZATION =====
async function initApp() {
    startSystemClock();
    startLatencySim();
    
    // Load local storage theme configuration
    const savedTheme = localStorage.getItem('mb-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Fetch and cache JSON data
    await loadAllData();
    
    // Render initial sections
    renderTelemetryLog();
    renderManifest('yaml');
}

async function loadAllData() {
    try {
        // Read from DB_DATA from db.js to avoid local file CORS blocks
        globalState.projectsData = DB_DATA.projects || [];
        globalState.experienceData = DB_DATA.experience || [];
        globalState.experimentsData = DB_DATA.experiments || [];
        globalState.articlesData = DB_DATA.articles || [];

        // Render projects and experiments immediately
        renderProjects();
        renderExperiments();
        renderArticles();
        initTopologyGraph();
    } catch (e) {
        console.error("Error loading control plane schema data:", e);
        writeLog("[ERROR] Failed to load system config payloads.");
    }
}

// ===== NAVIGATION ROUTER =====
function switchTab(targetTab) {
    globalState.currentTab = targetTab;
    
    // Update Sidebar state
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        if (item.getAttribute('data-target') === targetTab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update Viewport state
    const viewportId = 'viewport-' + targetTab.split('.')[0];
    document.querySelectorAll('.sys-viewport .viewport-panel').forEach(panel => {
        if (panel.id === viewportId) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    if (targetTab === 'topology.sys') {
        // Redraw with a 60ms timeout to ensure browser reflow has resolved visible dimensions
        setTimeout(initTopologyGraph, 60);
    } else if (targetTab === 'achievements.sys') {
        renderAchievements();
    }

    writeLog(`[INFO] Context switched to node: ${targetTab}`);
}

// ===== EVENT HANDLERS =====
function setupEventListeners() {
    // Sidebar clicks
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Overview buttons trigger
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-trigger')) {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            switchTab(target);
        }
    });

    // Theme Toggle
    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
        const currTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('mb-theme', nextTheme);
        writeLog(`Theme set to ${nextTheme}.`);
    });

    // Project View Mode Toggle (Summary vs Deep Dive)
    document.getElementById('mode-summary-btn').addEventListener('click', () => {
        setViewMode('summary');
    });
    document.getElementById('mode-deep-btn').addEventListener('click', () => {
        setViewMode('deep');
    });

    // Resume Manifest Format Toggle (YAML vs JSON)
    document.getElementById('manifest-yaml-btn').addEventListener('click', () => {
        setManifestFormat('yaml');
    });
    document.getElementById('manifest-json-btn').addEventListener('click', () => {
        setManifestFormat('json');
    });

    // Topology Explorer Sub-tabs
    document.getElementById('topo-systems-btn').addEventListener('click', () => {
        setTopologyTab('systems');
    });
    document.getElementById('topo-tech-btn').addEventListener('click', () => {
        setTopologyTab('tech');
    });
    document.getElementById('topo-research-btn').addEventListener('click', () => {
        setTopologyTab('research');
    });

    // Topology System Sub-selectors
    document.querySelectorAll('.sys-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.id === 'topology-reset-btn') return;
            document.querySelectorAll('.sys-select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetSystem = btn.getAttribute('data-system');
            globalState.activeSystemFlow = targetSystem;
            writeLog(`[INFO] System topology pipeline selected: ${targetSystem}`);
            initTopologyGraph();
        });
    });

    const resetTopologyBtn = document.getElementById('topology-reset-btn');
    if (resetTopologyBtn) {
        resetTopologyBtn.addEventListener('click', () => {
            resetTopologyLayout();
        });
    }

    // REST API endpoints sandbox runners
    document.querySelectorAll('.api-runner-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const endpoint = btn.getAttribute('data-endpoint');
            handleApiRunnerCall(endpoint);
        });
    });

    // Terminal Keyboard input listener
    document.getElementById('console-input-box').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleTerminalCommand();
        }
    });

    // Click on Console viewport auto-focuses input
    document.getElementById('viewport-console').addEventListener('click', () => {
        document.getElementById('console-input-box').focus();
    });
}

function setViewMode(mode) {
    globalState.viewMode = mode;
    const container = document.getElementById('services-viewport-container');
    
    if (mode === 'summary') {
        document.getElementById('mode-summary-btn').classList.add('active');
        document.getElementById('mode-deep-btn').classList.remove('active');
        container.classList.add('summary-mode');
        writeLog("Projects view set to summary.");
    } else {
        document.getElementById('mode-summary-btn').classList.remove('active');
        document.getElementById('mode-deep-btn').classList.add('active');
        container.classList.remove('summary-mode');
        writeLog("Projects view set to deep dive.");
        // Trigger benchmark bar animation
        setTimeout(animateBenchmarkBars, 100);
    }
    
    renderProjects();
}

function setManifestFormat(format) {
    globalState.manifestFormat = format;
    if (format === 'yaml') {
        document.getElementById('manifest-yaml-btn').classList.add('active');
        document.getElementById('manifest-json-btn').classList.remove('active');
    } else {
        document.getElementById('manifest-yaml-btn').classList.remove('active');
        document.getElementById('manifest-json-btn').classList.add('active');
    }
    renderManifest(format);
}

function setTopologyTab(tabName) {
    globalState.activeTopologyTab = tabName;
    
    // Toggle active tab buttons
    document.getElementById('topo-systems-btn').classList.remove('active');
    document.getElementById('topo-tech-btn').classList.remove('active');
    document.getElementById('topo-research-btn').classList.remove('active');
    document.getElementById(`topo-${tabName}-btn`).classList.add('active');
    
    // Toggle sub-selectors group visibility
    const subSelectorGroup = document.getElementById('topo-systems-selector');
    if (tabName === 'systems') {
        subSelectorGroup.classList.remove('hidden');
    } else {
        subSelectorGroup.classList.add('hidden');
    }
    
    writeLog(`Architecture map switched to ${tabName}.`);
    initTopologyGraph();
}

function renderTelemetryLog() {
    // Helper function to satisfy init startup calls
}

// ===== RENDER ENGINES =====

// Render Technical Articles list
function renderArticles() {
    const container = document.getElementById('writing-list-container');
    if (!container) return;
    container.innerHTML = '';
    
    globalState.articlesData.forEach(article => {
        const item = document.createElement('a');
        item.href = article.link;
        item.target = '_blank';
        item.rel = 'noopener';
        item.className = 'writing-item';
        item.innerHTML = `
            <div class="writing-meta">${article.date} · ${article.readTime}</div>
            <div class="writing-title">${article.title}</div>
            <div class="writing-excerpt">${article.excerpt}</div>
        `;
        container.appendChild(item);
    });
}

// Render Projects list
function renderProjects() {
    const container = document.getElementById('services-viewport-container');
    if (!container) return;
    container.innerHTML = '';

    globalState.projectsData.forEach((project, index) => {
        const isDeep = globalState.viewMode === 'deep';
        const item = document.createElement('div');
        item.className = 'service-node';
        item.id = `node-srv-${project.id}`;

        // Build tech flow HTML
        const techFlowItems = project.techFlow.split(' → ');
        const techFlowHTML = techFlowItems.map((item, i) => {
            return `<span>${item}</span>` + (i < techFlowItems.length - 1 ? `<span class="arrow">→</span>` : '');
        }).join('');

        // Generate dynamic bookmarks CSS chart HTML
        let benchmarksHTML = '';
        if (project.benchmarks && project.benchmarks.length > 0) {
            benchmarksHTML = `
                <div class="charts-grid">
                    ${project.benchmarks.map(b => `
                        <div class="chart-bar-row">
                            <div class="chart-bar-info">
                                <span class="chart-bar-label">${b.label}</span>
                                <span class="chart-bar-val">${b.value}${b.unit}</span>
                            </div>
                            <div class="chart-bar-bg">
                                <div class="chart-bar-fill" data-percent="${b.value}" style="width: 0%;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Consolidated Tabs representation inside deep dive viewport
        let deepDiveHTML = '';
        if (isDeep) {
            deepDiveHTML = `
                <!-- Deep Dive Tabs navigation -->
                <div class="service-tabs-nav">
                    <button class="tab-nav-btn active" onclick="switchProjectTab('${project.id}', 'overview')">Overview</button>
                    <button class="tab-nav-btn" onclick="switchProjectTab('${project.id}', 'architecture')">Architecture</button>
                    <button class="tab-nav-btn" onclick="switchProjectTab('${project.id}', 'results')">Results</button>
                    <button class="tab-nav-btn" onclick="switchProjectTab('${project.id}', 'resources')">Resources</button>
                </div>
                
                <!-- Tab: Overview -->
                <div class="service-tab-content active" id="tab-${project.id}-overview">
                    <div class="detail-section-grid">
                        <div class="sub-block col-span-1">
                            <h4>Architecture Decision</h4>
                            <div class="adr-box">${project.adr}</div>
                        </div>
                        <div class="sub-block col-span-1">
                            <h4>Constraints</h4>
                            <ul class="sub-bullet-list">
                                ${project.constraints.map(c => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="sub-block col-span-1">
                            <h4>Tradeoffs Accepted</h4>
                            <div class="adr-box" style="border-left: 3px solid var(--text-accent);">${project.tradeoff}</div>
                        </div>
                        <div class="sub-block col-span-1">
                            <h4>Scale Context</h4>
                            <ul class="sub-bullet-list">
                                ${project.scaleContext.map(s => `<li>${s}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab: Architecture -->
                <div class="service-tab-content" id="tab-${project.id}-architecture">
                    <div class="detail-section-grid">
                        <div class="sub-block">
                            <h4>Pipeline Flow</h4>
                            <div class="tech-flow-bar" style="margin-top: 0.5rem; justify-content: center; background-color: var(--bg-primary);">
                                ${techFlowHTML}
                            </div>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-top: 1rem;">
                                Ingests WAL logs incrementally via Debezium CDC and streams structured row operations (INSERT/UPDATE/DELETE) into Apache Kafka partitions, triggering atomic synchronization updates downstream.
                            </p>
                        </div>
                        <div class="sub-block">
                            <h4>Rejected Alternatives</h4>
                            <div class="alternatives-grid">
                                ${project.rejectedAlternatives.map(alt => `
                                    <div class="alt-item">
                                        <div class="name">${alt.name}</div>
                                        <div class="reason">${alt.reason}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tab: Results -->
                <div class="service-tab-content" id="tab-${project.id}-results">
                    <div class="detail-section-grid">
                        <div class="sub-block">
                            <h4>Benchmarks</h4>
                            ${benchmarksHTML}
                        </div>
                        <div class="sub-block">
                            <h4>Failure Modes Considered</h4>
                            <ul class="sub-bullet-list" style="margin-bottom: 1.5rem;">
                                ${project.failureModes.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            <h4>Operational Considerations</h4>
                            <div class="align-tags" style="margin-top: 0.5rem;">
                                ${project.operationalConcerns.map(op => `<span class="tag">${op}</span>`).join('')}
                            </div>
                        </div>
                        <div class="sub-block col-span-2">
                            <h4>Cost Considerations</h4>
                            <ul class="sub-bullet-list">
                                ${project.costConsiderations.map(c => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Tab: Resources -->
                <div class="service-tab-content" id="tab-${project.id}-resources">
                    <div class="detail-section-grid">
                        <div class="sub-block">
                            <h4>What I Would Build Next</h4>
                            <div class="roadmap-box">
                                <h5>Engineering Roadmap</h5>
                                <p>${project.whatNext}</p>
                            </div>
                        </div>
                        <div class="sub-block" style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;">
                            <h4>Links</h4>
                            <a href="${project.repolink}" class="btn btn-primary" target="_blank" rel="noopener">Code Repository</a>
                            <a href="${project.documentation}" class="btn btn-secondary" target="_blank" rel="noopener">Architecture Docs</a>
                        </div>
                    </div>
                </div>
            `;
        }

        // Summary Mode actions footer
        let summaryFooterHTML = '';
        if (!isDeep) {
            summaryFooterHTML = `
                <div class="service-actions">
                    <a href="${project.repolink}" class="btn btn-primary" target="_blank" rel="noopener">Repository</a>
                    <a href="${project.documentation}" class="btn btn-secondary" target="_blank" rel="noopener">Writeup</a>
                </div>
            `;
        }

        // Assemble node
        item.innerHTML = `
            <div class="service-node-header">
                <div class="service-node-title">
                    <span class="pulse-indicator ${project.status === 'ACTIVE' ? 'status-nominal' : project.status === 'STANDBY' ? 'status-standby' : 'status-local'}"></span>
                    <span class="service-name">${project.name}</span>
                    <span class="service-status-tag ${project.status === 'ACTIVE' ? 'active' : project.status === 'STANDBY' ? 'standby' : 'local_only'}">${project.status}</span>
                </div>
                <span class="service-timestamp">ADR-00${index + 1} · Jun 2026</span>
            </div>
            <div class="service-node-body">
                <div class="tech-flow-bar">
                    ${techFlowHTML}
                </div>
                <p class="service-summary-line">${project.summary}</p>
                ${deepDiveHTML}
                ${summaryFooterHTML}
            </div>
        `;

        container.appendChild(item);
    });

    if (globalState.viewMode === 'deep') {
        animateBenchmarkBars();
    }
}

// Switch nested tabs inside projects
window.switchProjectTab = function(projectId, tabName) {
    const parentNode = document.getElementById(`node-srv-${projectId}`);
    if (!parentNode) return;

    // Toggle button active classes
    parentNode.querySelectorAll('.service-tabs-nav .tab-nav-btn').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Toggle tab viewport active classes
    parentNode.querySelectorAll('.service-tab-content').forEach(content => {
        if (content.id === `tab-${projectId}-${tabName}`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // If Results tab is chosen, animate benchmark bar sizes
    if (tabName === 'results') {
        setTimeout(animateBenchmarkBars, 50);
    }
};

// Animate benchmark metric bars
function animateBenchmarkBars() {
    document.querySelectorAll('.chart-bar-fill').forEach(bar => {
        const targetPercent = bar.getAttribute('data-percent');
        // If the units or values are absolute sizes, normalize relative bar filling.
        let fillWidth = targetPercent;
        if (parseInt(targetPercent) > 100) {
            // Norm values for tokens representation (e.g. 4200 max)
            fillWidth = (parseInt(targetPercent) / 4200) * 100;
        }
        bar.style.width = fillWidth + '%';
    });
}

// Render Experiments & RFCs
function renderExperiments() {
    const container = document.getElementById('research-viewport-container');
    if (!container) return;
    container.innerHTML = '';

    globalState.experimentsData.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'rfc-card';
        card.innerHTML = `
            <div class="rfc-header">
                <span class="rfc-meta">${exp.rfcNumber} · ${exp.date}</span>
                <span class="rfc-read-time">${exp.readTime}</span>
            </div>
            <div class="rfc-title-block" style="margin-bottom: 1.25rem;">
                <h3>${exp.title}</h3>
            </div>
            <div class="rfc-grid">
                <div class="rfc-left">
                    <div class="rfc-section">
                        <h4>Problem</h4>
                        <p>${exp.problem}</p>
                    </div>
                    <div class="rfc-section">
                        <h4>Hypothesis</h4>
                        <p>${exp.hypothesis}</p>
                    </div>
                    <div class="rfc-section">
                        <h4>Methodology</h4>
                        <p>${exp.methodology}</p>
                    </div>
                </div>
                <div class="rfc-right">
                    <div class="rfc-section">
                        <h4>Results</h4>
                        <p>${exp.results}</p>
                    </div>
                    <div class="rfc-section">
                        <h4>Tradeoffs</h4>
                        <p>${exp.tradeoffs}</p>
                    </div>
                    <div class="rfc-section">
                        <h4>Conclusion</h4>
                        <p>${exp.conclusion}</p>
                    </div>
                </div>
            </div>
            <div class="rfc-links">
                ${exp.links.map(l => `<a href="${l.url}" class="btn btn-secondary" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}

// Render Manifest (Resume Configuration view)
function renderManifest(format) {
    const codeBlock = document.getElementById('manifest-code-block');
    if (!codeBlock) return;

    if (format === 'yaml') {
        codeBlock.className = 'language-yaml';
        codeBlock.innerHTML = formatYAMLManifest();
    } else {
        codeBlock.className = 'language-json';
        codeBlock.innerHTML = formatJSONManifest();
    }
}

// YAML Formatter Helper
function formatYAMLManifest() {
    let yaml = `<span class="key">manifest</span>:\n`;
    yaml += `  <span class="key">backend_ai_infrastructure_engineer</span>: <span class="string">Mano Bharathi M</span>\n`;
    yaml += `  <span class="key">experience_level</span>: <span class="number">2</span> <span class="comment"># Years in production</span>\n`;
    yaml += `  <span class="key">technologies</span>:\n`;
    yaml += `    <span class="key">languages</span>: [Java, Python, Golang, SQL]\n`;
    yaml += `    <span class="key">backend</span>: [Spring Boot, REST APIs, Microservices, Distributed Systems]\n`;
    yaml += `    <span class="key">ml_ai</span>: [PyTorch, Milvus, HuggingFace, LangChain, RAG]\n`;
    yaml += `    <span class="key">infra_devops</span>: [Kafka, Debezium, Docker, Kubernetes, Helm, Git, Linux]\n`;
    yaml += `  <span class="key">career_trajectory</span>:\n`;
    
    globalState.experienceData.forEach(exp => {
        yaml += `    - <span class="key">role</span>: <span class="string">${exp.title}</span>\n`;
        yaml += `      <span class="key">company</span>: <span class="string">${exp.company}</span>\n`;
        yaml += `      <span class="key">duration</span>: <span class="string">${exp.duration}</span>\n`;
        yaml += `      <span class="key">contributions</span>:\n`;
        exp.highlights.forEach(h => {
            yaml += `        - <span class="string">"${h.replace(/"/g, '\\"')}"</span>\n`;
        });
    });

    return yaml;
}

// JSON Formatter Helper
function formatJSONManifest() {
    const obj = {
        manifest: {
            backend_ai_infrastructure_engineer: "Mano Bharathi M",
            experience_level: 2,
            technologies: {
                languages: ["Java", "Python", "Golang", "SQL"],
                backend: ["Spring Boot", "REST APIs", "Microservices", "Distributed Systems"],
                ml_ai: ["PyTorch", "Milvus", "HuggingFace", "LangChain", "RAG"],
                infra_devops: ["Kafka", "Debezium", "Docker", "Kubernetes", "Helm", "Git", "Linux"]
            },
            career_trajectory: globalState.experienceData.map(exp => ({
                role: exp.title,
                company: exp.company,
                duration: exp.duration,
                contributions: exp.highlights
            }))
        }
    };
    
    // Quick custom formatter for colored JSON presentation
    let json = JSON.stringify(obj, null, 2);
    json = json.replace(/"(\w+)":/g, '<span class="key">"$1"</span>:')
               .replace(/: "([^"]+)"/g, ': <span class="string">"$1"</span>')
               .replace(/: (\d+)/g, ': <span class="number">$1</span>');
    return json;
}

// ===== ACHIEVEMENTS DRAGGABLE WORKSPACE =====
const initialAwardPositions = [
    { id: 'award-pi45', title: 'CVE Agent Prototype', desc: 'AI assistant prototype appreciation for extracting CVE data.', file: 'awards/award-pi45.pdf', x: 60, y: 60 },
    { id: 'award-pi44', title: 'High-Impact Delivery', desc: 'PI44 appreciation for high-impact platform features delivery.', file: 'awards/award-pi44.pdf', x: 340, y: 60 },
    { id: 'award-pi42', title: 'Telemetry Cost Optimization', desc: 'PI42 appreciation for cloud cost optimization using metrics data.', file: 'awards/award-PI42.pdf', x: 60, y: 320 },
    { id: 'award-pi41', title: 'Platform Engineering', desc: 'PI41 appreciation for cloud connectivity platform services contributions.', file: 'awards/award-PI41.pdf', x: 340, y: 320 }
];

let globalAwardCoords = {};

function renderAchievements() {
    const container = document.getElementById('achievements-workspace');
    if (!container) return;
    container.innerHTML = '';

    // Initialize coordinate cache if empty
    initialAwardPositions.forEach(award => {
        if (!globalAwardCoords[award.id]) {
            globalAwardCoords[award.id] = { x: award.x, y: award.y };
        }
    });

    initialAwardPositions.forEach(award => {
        const coords = globalAwardCoords[award.id];
        const card = document.createElement('div');
        card.className = 'award-file-card';
        card.style.left = `${coords.x}px`;
        card.style.top = `${coords.y}px`;
        card.id = award.id;

        card.innerHTML = `
            <span class="file-icon">📄</span>
            <h3>${award.title}</h3>
            <p>${award.desc}</p>
            <a href="${award.file}" class="btn-open" target="_blank" rel="noopener">Open PDF</a>
        `;

        // Double click to open directly
        card.addEventListener('dblclick', () => {
            window.open(award.file, '_blank');
        });

        // Setup Dragging events
        card.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('btn-open')) return;
            
            const startX = e.clientX;
            const startY = e.clientY;
            const initialX = coords.x;
            const initialY = coords.y;

            card.style.cursor = 'grabbing';

            const onMouseMove = (moveEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaY = moveEvent.clientY - startY;

                // Restrict drag bounds to container box size
                const rect = container.getBoundingClientRect();
                const cardRect = card.getBoundingClientRect();
                
                let newX = initialX + deltaX;
                let newY = initialY + deltaY;

                // Clamp within achievements workspace bounds
                newX = Math.max(10, Math.min(rect.width - cardRect.width - 10, newX));
                newY = Math.max(10, Math.min(rect.height - cardRect.height - 10, newY));

                coords.x = newX;
                coords.y = newY;

                card.style.left = `${newX}px`;
                card.style.top = `${newY}px`;
            };

            const onMouseUp = () => {
                card.style.cursor = 'grab';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        container.appendChild(card);
    });
}

// ===== TOPOLOGY GRAPH ENGINE =====
let dragNode = null;

const SVG_WIDTH = 900;
const SVG_HEIGHT = 520;
const TOPOLOGY_LAYOUT_VERSION = 'v3';
const NODE_BOUNDS = {
    minX: 70,
    maxX: SVG_WIDTH - 70,
    minY: 80,
    maxY: SVG_HEIGHT - 90
};

function clampNodePosition(x, y) {
    return {
        x: Math.max(NODE_BOUNDS.minX, Math.min(NODE_BOUNDS.maxX, x)),
        y: Math.max(NODE_BOUNDS.minY, Math.min(NODE_BOUNDS.maxY, y))
    };
}

function topologyCoordKey(tab, flow, nodeId) {
    return `${TOPOLOGY_LAYOUT_VERSION}_${tab}_${tab === 'systems' ? flow : ''}_${nodeId}`;
}

// Persistent coordinates resolver supporting fixed viewBox coordinate space
function getNodeCoords(tab, flow, nodeId, defaultPctX, defaultPctY) {
    const key = topologyCoordKey(tab, flow, nodeId);
    
    if (!globalState.topologyCoords[key]) {
        globalState.topologyCoords[key] = clampNodePosition(SVG_WIDTH * defaultPctX, SVG_HEIGHT * defaultPctY);
    }
    return globalState.topologyCoords[key];
}

function resetTopologyLayout() {
    const prefix = `${TOPOLOGY_LAYOUT_VERSION}_${globalState.activeTopologyTab}_`;
    Object.keys(globalState.topologyCoords).forEach(key => {
        if (key.startsWith(prefix)) {
            delete globalState.topologyCoords[key];
        }
    });
    writeLog("Architecture layout reset.");
    initTopologyGraph();
}

function initTopologyGraph() {
    const wrapper = document.getElementById('topology-graph-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    const tab = globalState.activeTopologyTab;

    // Create SVG Element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    let nodes = [];
    let links = [];

    if (tab === 'systems') {
        const sys = globalState.activeSystemFlow;
        
        // Define Flow Layouts with persistent node coordinates
        if (sys === 'syncstream') {
            const p1 = getNodeCoords(tab, sys, 'postgres', 0.14, 0.50);
            const p2 = getNodeCoords(tab, sys, 'debezium', 0.34, 0.50);
            const p3 = getNodeCoords(tab, sys, 'kafka', 0.54, 0.50);
            const p4 = getNodeCoords(tab, sys, 'redis', 0.78, 0.35);
            const p5 = getNodeCoords(tab, sys, 'elasticsearch', 0.78, 0.65);

            nodes = [
                { id: 'postgres', label: 'PostgreSQL WAL', type: 'source', x: p1.x, y: p1.y, desc: 'Primary database source of truth transaction log.' },
                { id: 'debezium', label: 'Debezium CDC', type: 'agent', x: p2.x, y: p2.y, desc: 'CDC connector capturing WAL row mutations.' },
                { id: 'kafka', label: 'Kafka Event Bus', type: 'queue', x: p3.x, y: p3.y, desc: 'Distributed event bus queue message broker.' },
                { id: 'redis', label: 'Redis Projection', type: 'sink', x: p4.x, y: p4.y, desc: 'Low-latency in-memory query projection cache.' },
                { id: 'elasticsearch', label: 'ES Search Index', type: 'sink', x: p5.x, y: p5.y, desc: 'Elasticsearch query projection search index.' }
            ];
            links = [
                { source: 'postgres', target: 'debezium', id: 'ss1' },
                { source: 'debezium', target: 'kafka', id: 'ss2' },
                { source: 'kafka', target: 'redis', id: 'ss3' },
                { source: 'kafka', target: 'elasticsearch', id: 'ss4' }
            ];
        } else if (sys === 'dual-memory-agent') {
            const p1 = getNodeCoords(tab, sys, 'user_query', 0.12, 0.50);
            const p2 = getNodeCoords(tab, sys, 'router', 0.28, 0.50);
            const p3 = getNodeCoords(tab, sys, 'vector_db', 0.50, 0.35);
            const p4 = getNodeCoords(tab, sys, 'case_db', 0.50, 0.65);
            const p5 = getNodeCoords(tab, sys, 'llm', 0.72, 0.50);
            const p6 = getNodeCoords(tab, sys, 'response', 0.88, 0.50);

            nodes = [
                { id: 'user_query', label: 'User Query', type: 'source', x: p1.x, y: p1.y, desc: 'Enterprise ticket prompt submission input.' },
                { id: 'router', label: 'Intent Router', type: 'agent', x: p2.x, y: p2.y, desc: 'Dynamic context complexity evaluator.' },
                { id: 'vector_db', label: 'Knowledge Base', type: 'store', x: p3.x, y: p3.y, desc: 'Milvus long-term document vector index.' },
                { id: 'case_db', label: 'Case Memory', type: 'store', x: p4.x, y: p4.y, desc: 'Hierarchical historical resolutions buffer cache.' },
                { id: 'llm', label: 'Reasoning Engine', type: 'agent', x: p5.x, y: p5.y, desc: 'Local LLaMA model assembling contexts.' },
                { id: 'response', label: 'Final Output', type: 'sink', x: p6.x, y: p6.y, desc: 'Structured ticket answer payload response.' }
            ];
            links = [
                { source: 'user_query', target: 'router', id: 'dm1' },
                { source: 'router', target: 'vector_db', id: 'dm2' },
                { source: 'router', target: 'case_db', id: 'dm3' },
                { source: 'vector_db', target: 'llm', id: 'dm4' },
                { source: 'case_db', target: 'llm', id: 'dm5' },
                { source: 'llm', target: 'response', id: 'dm6' }
            ];
        } else if (sys === 'cve-automation') {
            const p1 = getNodeCoords(tab, sys, 'vendor', 0.14, 0.50);
            const p2 = getNodeCoords(tab, sys, 'ingestion', 0.38, 0.50);
            const p3 = getNodeCoords(tab, sys, 'llama', 0.62, 0.50);
            const p4 = getNodeCoords(tab, sys, 'vex', 0.86, 0.50);

            nodes = [
                { id: 'vendor', label: 'Vendor Feeds', type: 'source', x: p1.x, y: p1.y, desc: 'CVE advisories vulnerability ingestion source.' },
                { id: 'ingestion', label: 'Ingestion Engine', type: 'agent', x: p2.x, y: p2.y, desc: 'Filtering, deduplication, and mapping parser.' },
                { id: 'llama', label: 'LLaMA Evaluator', type: 'agent', x: p3.x, y: p3.y, desc: 'Local LLM assessment model analyzing exploitability context.' },
                { id: 'vex', label: 'VEX Report', type: 'sink', x: p4.x, y: p4.y, desc: 'Structured machine-readable VEX security compliance report.' }
            ];
            links = [
                { source: 'vendor', target: 'ingestion', id: 'cve1' },
                { source: 'ingestion', target: 'llama', id: 'cve2' },
                { source: 'llama', target: 'vex', id: 'cve3' }
            ];
        } else if (sys === 'grid-security') {
            const p1 = getNodeCoords(tab, sys, 'scada', 0.14, 0.50);
            const p2 = getNodeCoords(tab, sys, 'builder', 0.38, 0.50);
            const p3 = getNodeCoords(tab, sys, 'gnn', 0.62, 0.50);
            const p4 = getNodeCoords(tab, sys, 'anomaly', 0.86, 0.50);

            nodes = [
                { id: 'scada', label: 'SCADA Telemetry', type: 'source', x: p1.x, y: p1.y, desc: 'Raw smart meters grid measurement telemetry.' },
                { id: 'builder', label: 'Graph Builder', type: 'agent', x: p2.x, y: p2.y, desc: 'Translates electrical topologies to NetworkX graphs.' },
                { id: 'gnn', label: 'GNN Model', type: 'agent', x: p3.x, y: p3.y, desc: 'Graph Neural Network evaluating spatial-electrical anomalies.' },
                { id: 'anomaly', label: 'FDI Classifier', type: 'sink', x: p4.x, y: p4.y, desc: 'Classifies false data injection attacks under noise.' }
            ];
            links = [
                { source: 'scada', target: 'builder', id: 'gr1' },
                { source: 'builder', target: 'gnn', id: 'gr2' },
                { source: 'gnn', target: 'anomaly', id: 'gr3' }
            ];
        }

        // Trigger detail inspector populate for selected system flow
        inspectSystemFlow(sys);

    } else if (tab === 'tech') {
        const p1 = getNodeCoords(tab, '', 'postgres', 0.15, 0.25);
        const p2 = getNodeCoords(tab, '', 'redis', 0.15, 0.5);
        const p3 = getNodeCoords(tab, '', 'milvus', 0.15, 0.75);
        const p4 = getNodeCoords(tab, '', 'kafka', 0.38, 0.35);
        const p5 = getNodeCoords(tab, '', 'debezium', 0.38, 0.65);
        const p6 = getNodeCoords(tab, '', 'langgraph', 0.62, 0.25);
        const p7 = getNodeCoords(tab, '', 'ollama', 0.62, 0.5);
        const p8 = getNodeCoords(tab, '', 'faiss', 0.62, 0.75);
        const p9 = getNodeCoords(tab, '', 'java', 0.85, 0.35);
        const p10 = getNodeCoords(tab, '', 'python', 0.85, 0.65);

        nodes = [
            { id: 'postgres', label: 'PostgreSQL', x: p1.x, y: p1.y, type: 'tech', category: 'DATA SYSTEMS', chosen: 'Reliable transactional database with WAL replication capture capability.' },
            { id: 'redis', label: 'Redis', x: p2.x, y: p2.y, type: 'tech', category: 'DATA SYSTEMS', chosen: 'Sub-millisecond write-through projection views cache.' },
            { id: 'milvus', label: 'Milvus', x: p3.x, y: p3.y, type: 'tech', category: 'DATA SYSTEMS', chosen: 'High-performance index vectors search on massive embeddings datasets.' },
            { id: 'kafka', label: 'Kafka Bus', x: p4.x, y: p4.y, type: 'tech', category: 'EVENT STREAMING', chosen: 'High-throughput replayable message bus event storage transport.' },
            { id: 'debezium', label: 'Debezium', x: p5.x, y: p5.y, type: 'tech', category: 'EVENT STREAMING', chosen: 'Reads DB logs directly, avoiding application code synchronization edits.' },
            { id: 'langgraph', label: 'LangGraph', x: p6.x, y: p6.y, type: 'tech', category: 'AI INFRASTRUCTURE', chosen: 'Stateful multi-agent workflow orchestrator.' },
            { id: 'ollama', label: 'Ollama', x: p7.x, y: p7.y, type: 'tech', category: 'AI INFRASTRUCTURE', chosen: 'Low-friction offline local LLM serving API executor.' },
            { id: 'faiss', label: 'Faiss index', x: p8.x, y: p8.y, type: 'tech', category: 'AI INFRASTRUCTURE', chosen: 'Optimized vector comparison speeds on CPU structures.' },
            { id: 'java', label: 'Java', x: p9.x, y: p9.y, type: 'tech', category: 'LANGUAGES', chosen: 'JVM backend services platforms, strong concurrency, default choice at OpenText.' },
            { id: 'python', label: 'Python', x: p10.x, y: p10.y, type: 'tech', category: 'LANGUAGES', chosen: 'Ecosystem choices for vector computations and graph mathematical libraries.' }
        ];

        // Draw category labels directly in SVG
        const categories = [
            { label: 'DATA SYSTEMS', x: SVG_WIDTH * 0.15 },
            { label: 'EVENT STREAMING', x: SVG_WIDTH * 0.38 },
            { label: 'AI INFRASTRUCTURE', x: SVG_WIDTH * 0.62 },
            { label: 'LANGUAGES', x: SVG_WIDTH * 0.85 }
        ];
        categories.forEach(cat => {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', cat.x);
            label.setAttribute('y', '30');
            label.setAttribute('fill', 'var(--text-secondary)');
            label.setAttribute('font-family', 'JetBrains Mono, monospace');
            label.setAttribute('font-size', '10px');
            label.setAttribute('font-weight', '700');
            label.setAttribute('text-anchor', 'middle');
            label.textContent = cat.label;
            svg.appendChild(label);
        });

    } else if (tab === 'research') {
        const p1 = getNodeCoords(tab, '', 'cdc', 0.2, 0.25);
        const p2 = getNodeCoords(tab, '', 'event-sourcing', 0.2, 0.5);
        const p3 = getNodeCoords(tab, '', 'projections', 0.2, 0.75);
        const p4 = getNodeCoords(tab, '', 'agent-memory', 0.5, 0.25);
        const p5 = getNodeCoords(tab, '', 'runtime-systems', 0.5, 0.5);
        const p6 = getNodeCoords(tab, '', 'scheduling', 0.5, 0.75);
        const p7 = getNodeCoords(tab, '', 'dynamic-compute', 0.8, 0.25);
        const p8 = getNodeCoords(tab, '', 'early-exit', 0.8, 0.5);
        const p9 = getNodeCoords(tab, '', 'routing', 0.8, 0.75);

        nodes = [
            { id: 'cdc', label: 'CDC', x: p1.x, y: p1.y, type: 'interest', category: 'Distributed Systems', desc: 'Real-time database mutations capturing mechanisms.' },
            { id: 'event-sourcing', label: 'Event Sourcing', x: p2.x, y: p2.y, type: 'interest', category: 'Distributed Systems', desc: 'Representing entity state shifts as transactional chronological event logs.' },
            { id: 'projections', label: 'Projections', x: p3.x, y: p3.y, type: 'interest', category: 'Distributed Systems', desc: 'Eventual consistent materialized materialized query reads models.' },
            { id: 'agent-memory', label: 'Agent Memory', x: p4.x, y: p4.y, type: 'interest', category: 'AI Infrastructure', desc: 'Hierarchical abstractions caching LLM interactions.' },
            { id: 'runtime-systems', label: 'Runtime Systems', x: p5.x, y: p5.y, type: 'interest', category: 'AI Infrastructure', desc: 'Operating systems runtimes serving LLM agent workers.' },
            { id: 'scheduling', label: 'Agent Scheduling', x: p6.x, y: p6.y, type: 'interest', category: 'AI Infrastructure', desc: 'Prioritizing tool execution calls queues.' },
            { id: 'dynamic-compute', label: 'Dynamic Compute', x: p7.x, y: p7.y, type: 'interest', category: 'Learning Systems', desc: 'Adapting model size evaluations relative to prompt complexity.' },
            { id: 'early-exit', label: 'Early Exit Nets', x: p8.x, y: p8.y, type: 'interest', category: 'Learning Systems', desc: 'Halting model tensor layer runs on high-confidence checkpoints.' },
            { id: 'routing', label: 'Conditional Routing', x: p9.x, y: p9.y, type: 'interest', category: 'Learning Systems', desc: 'Triage models sending requests to specialized parameter subnets.' }
        ];

        // Draw research categories labels
        const categories = [
            { label: 'DISTRIBUTED SYSTEMS', x: SVG_WIDTH * 0.2 },
            { label: 'AI INFRASTRUCTURE', x: SVG_WIDTH * 0.5 },
            { label: 'LEARNING SYSTEMS', x: SVG_WIDTH * 0.8 }
        ];
        categories.forEach(cat => {
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', cat.x);
            label.setAttribute('y', '30');
            label.setAttribute('fill', 'var(--text-secondary)');
            label.setAttribute('font-family', 'JetBrains Mono, monospace');
            label.setAttribute('font-size', '10px');
            label.setAttribute('font-weight', '700');
            label.setAttribute('text-anchor', 'middle');
            label.textContent = cat.label;
            svg.appendChild(label);
        });
    }

    // Render Link Lines
    links.forEach(l => {
        const sourceNode = nodes.find(n => n.id === l.source);
        const targetNode = nodes.find(n => n.id === l.target);
        if (sourceNode && targetNode) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', sourceNode.x);
            line.setAttribute('y1', sourceNode.y);
            line.setAttribute('x2', targetNode.x);
            line.setAttribute('y2', targetNode.y);
            line.setAttribute('class', 'link-line');
            line.setAttribute('id', `link-${l.id}`);
            svg.appendChild(line);

            // Traveling event packets animation
            const packet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            packet.setAttribute('r', '3');
            packet.setAttribute('class', 'data-packet');
            
            const animateX = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animateX.setAttribute('attributeName', 'cx');
            animateX.setAttribute('from', sourceNode.x);
            animateX.setAttribute('to', targetNode.x);
            animateX.setAttribute('dur', '2.5s');
            animateX.setAttribute('repeatCount', 'indefinite');
            packet.appendChild(animateX);

            const animateY = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animateY.setAttribute('attributeName', 'cy');
            animateY.setAttribute('from', sourceNode.y);
            animateY.setAttribute('to', targetNode.y);
            animateY.setAttribute('dur', '2.5s');
            animateY.setAttribute('repeatCount', 'indefinite');
            packet.appendChild(animateY);

            svg.appendChild(packet);
        }
    });

    // Render Nodes
    nodes.forEach(node => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'node-group');

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.type === 'tech' || node.type === 'interest' ? '17' : '20');
        circle.setAttribute('class', `node-circle ${node.type === 'tech' || node.type === 'interest' ? '' : 'core'}`);
        circle.setAttribute('id', `node-${node.id}`);
        group.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + (node.type === 'tech' || node.type === 'interest' ? 34 : 38));
        text.setAttribute('class', 'node-text');
        text.textContent = node.label;
        group.appendChild(text);

        // Bind interactive actions
        group.addEventListener('mouseenter', () => highlightNode(node, nodes, links));
        group.addEventListener('mouseleave', () => resetNodeHighlight(nodes, links));
        
        // Bind dragging triggers
        group.addEventListener('pointerdown', (e) => {
            dragNode = node;
            group.classList.add('dragging');
            group.setPointerCapture(e.pointerId);
            e.stopPropagation();
            e.preventDefault();
        });

        group.addEventListener('click', () => {
            if (tab === 'systems') {
                inspectSystemFlow(globalState.activeSystemFlow);
            } else if (tab === 'tech') {
                inspectTechNode(node);
            } else if (tab === 'research') {
                inspectResearchNode(node);
            }
        });

        svg.appendChild(group);
    });

    // Bind dragging events to the SVG container itself for smooth tracking
    svg.addEventListener('pointermove', (e) => {
        if (!dragNode) return;
        
        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        
        // Compute relative positions in viewBox coordinates space
        const mouseX = ((e.clientX - rect.left) / rect.width) * viewBox.width;
        const mouseY = ((e.clientY - rect.top) / rect.height) * viewBox.height;

        // Update persistent coordinates
        const sys = globalState.activeSystemFlow;
        const key = topologyCoordKey(tab, sys, dragNode.id);
        if (globalState.topologyCoords[key]) {
            globalState.topologyCoords[key] = clampNodePosition(mouseX, mouseY);

            dragNode.x = globalState.topologyCoords[key].x;
            dragNode.y = globalState.topologyCoords[key].y;

            // Move node circle directly in DOM
            const circle = document.getElementById(`node-${dragNode.id}`);
            if (circle) {
                circle.setAttribute('cx', dragNode.x);
                circle.setAttribute('cy', dragNode.y);

                // Move text label
                const group = circle.parentNode;
                const text = group.querySelector('text');
                if (text) {
                    text.setAttribute('x', dragNode.x);
                    text.setAttribute('y', dragNode.y + (dragNode.type === 'tech' || dragNode.type === 'interest' ? 34 : 38));
                }
            }

            // Move linked lines directly in DOM
            links.forEach(l => {
                if (l.source === dragNode.id || l.target === dragNode.id) {
                    const line = document.getElementById(`link-${l.id}`);
                    if (line) {
                        const sNode = nodes.find(n => n.id === l.source);
                        const tNode = nodes.find(n => n.id === l.target);
                        if (sNode && tNode) {
                            line.setAttribute('x1', sNode.x);
                            line.setAttribute('y1', sNode.y);
                            line.setAttribute('x2', tNode.x);
                            line.setAttribute('y2', tNode.y);
                        }
                    }
                }
            });
        }
    });

    // Complete drag-drop tracking
    const endDrag = () => {
        if (dragNode) {
            document.querySelectorAll('.node-group.dragging').forEach(group => group.classList.remove('dragging'));
            dragNode = null;
            // Redraw to align animate tag pathways
            initTopologyGraph();
        }
    };

    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);
    svg.addEventListener('pointerleave', endDrag);

    wrapper.appendChild(svg);
}

function highlightNode(targetNode, nodes, links) {
    document.querySelectorAll('.node-circle').forEach(c => c.style.opacity = '0.3');
    document.querySelectorAll('.link-line').forEach(l => l.style.opacity = '0.1');
    document.querySelectorAll('.node-text').forEach(t => t.style.opacity = '0.3');

    const activeCircle = document.getElementById(`node-${targetNode.id}`);
    if (activeCircle) activeCircle.style.opacity = '1';
    
    const connectedLinks = links.filter(l => l.source === targetNode.id || l.target === targetNode.id);
    connectedLinks.forEach(l => {
        const line = document.getElementById(`link-${l.id}`);
        if (line) {
            line.style.opacity = '1';
            line.classList.add('highlight');
        }

        const neighborId = l.source === targetNode.id ? l.target : l.source;
        const neighborCircle = document.getElementById(`node-${neighborId}`);
        if (neighborCircle) neighborCircle.style.opacity = '1';
    });
}

function resetNodeHighlight(nodes, links) {
    document.querySelectorAll('.node-circle').forEach(c => c.style.opacity = '1');
    document.querySelectorAll('.node-text').forEach(t => t.style.opacity = '1');
    document.querySelectorAll('.link-line').forEach(l => {
        l.style.opacity = '1';
        l.classList.remove('highlight');
    });
}

// Redirect systems nodes to project panel tabs
function inspectNode(node) {
    const parentNode = globalState.projectsData.find(p => p.id === globalState.activeSystemFlow);
    if (parentNode) {
        switchTab('services.sys');
        setViewMode('deep');
        
        // Target container and scroll
        const targetElement = document.getElementById(`node-srv-${parentNode.id}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Inspect Tech Landscape items
function inspectTechNode(node) {
    const pane = document.getElementById('pane-content');
    if (!pane) return;

    // Search where it is used
    let usedIn = [];
    if (node.id === 'postgres' || node.id === 'redis' || node.id === 'kafka' || node.id === 'debezium') {
        usedIn.push('SyncStream');
    }
    if (node.id === 'postgres' || node.id === 'llama2' || node.id === 'ollama') {
        usedIn.push('CVE Pipeline');
    }
    if (node.id === 'milvus' || node.id === 'ollama' || node.id === 'faiss') {
        usedIn.push('Dual Memory Agent');
    }
    if (node.id === 'pytorch') {
        usedIn.push('Grid Security');
    }
    if (usedIn.length === 0) usedIn.push('Research labs');

    pane.innerHTML = `
        <h3 style="color: var(--text-accent);">${node.label}</h3>
        <div class="tech-meta" style="margin-bottom: 1rem;">CATEGORY: ${node.category}</div>
        
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">WHY_IT_WAS_CHOSEN</div>
        <p style="margin-bottom: 1.2rem;">${node.chosen}</p>
        
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">USED_IN_SYSTEMS</div>
        <ul class="sub-bullet-list">
            ${usedIn.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;
}

// Inspect Research Map items
function inspectResearchNode(node) {
    const pane = document.getElementById('pane-content');
    if (!pane) return;

    pane.innerHTML = `
        <h3 style="color: var(--text-accent);">${node.label}</h3>
        <div class="tech-meta" style="margin-bottom: 1rem;">TRAJECTORY: ${node.category}</div>
        
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">DESCRIPTION</div>
        <p>${node.desc || 'Active area of long-term technical exploration and prototype evaluation.'}</p>
    `;
}

// Draw the System topologies inspector on click
function inspectSystemFlow(sysId) {
    const pane = document.getElementById('pane-content');
    if (!pane) return;

    const data = globalState.projectsData.find(p => p.id === sysId);
    if (!data) return;

    pane.innerHTML = `
        <h3 style="color: var(--text-accent);">${data.name}</h3>
        <div class="tech-meta">METADATA</div>
        <div style="font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: 1rem; border-left: 2px solid var(--border-hover); padding-left: 0.5rem;">
            STATUS: ACTIVE<br>
            CATEGORY: Distributed System<br>
            LAST_UPDATED: Jul 2026
        </div>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">ENGINEERING_PROBLEM</div>
        <p style="margin-bottom: 1rem;">${data.summary}</p>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">SCALE_CONTEXT</div>
        <ul class="sub-bullet-list" style="margin-bottom: 1rem;">
            ${data.scaleContext.map(s => `<li>${s}</li>`).join('')}
        </ul>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">ARCHITECTURAL_DECISION</div>
        <p style="margin-bottom: 1rem;">${data.adr}</p>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">REJECTED_ALTERNATIVES</div>
        <ul class="sub-bullet-list" style="margin-bottom: 1rem;">
            ${data.rejectedAlternatives.map(alt => `<li><strong>${alt.name}</strong>: ${alt.reason}</li>`).join('')}
        </ul>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">TRADEOFFS_ACCEPTED</div>
        <p style="margin-bottom: 1rem;">${data.tradeoff}</p>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">FAILURE_MODES_CONSIDERED</div>
        <ul class="sub-bullet-list" style="margin-bottom: 1rem;">
            ${data.failureModes.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">FUTURE_ROADMAP_WORK</div>
        <p>${data.whatNext}</p>
    `;
}

// ===== REST API PLAYGROUND RUNNER =====
function handleApiRunnerCall(endpoint) {
    const sandboxPrompt = document.getElementById('endpoints-sandbox-prompt');
    const sandboxResponse = document.getElementById('endpoints-api-response');
    const jsonBlock = document.getElementById('sandbox-json-block');
    const statusBadge = document.getElementById('sandbox-status-badge');

    sandboxPrompt.classList.add('hidden');
    sandboxResponse.classList.remove('hidden');
    
    // Set headers loading state
    statusBadge.textContent = "HTTP 100 Processing";
    statusBadge.style.color = "var(--status-standby)";
    jsonBlock.textContent = `{ "status": "CONNECTING_NETWORK_SOCKET..." }`;

    writeLog(`[INFO] Network connection running GET ${endpoint} call.`);

    setTimeout(() => {
        statusBadge.textContent = "HTTP 200 OK";
        statusBadge.style.color = "var(--status-nominal)";

        let responseObj = {
            status: "SUCCESS",
            method: "GET",
            uri: endpoint,
            timestamp: new Date().toISOString()
        };

        if (endpoint === '/resume') {
            responseObj.action = "OPEN_RESUME_PDF";
            responseObj.target = "file:///assets/resume.pdf";
            responseObj.details = {
                file_size_bytes: 120749,
                content_type: "application/pdf",
                integrity_sha256: "0xfa18b3ec48a049cb816bf33f56ce"
            };
            jsonBlock.textContent = JSON.stringify(responseObj, null, 2);
            window.open('assets/resume.pdf', '_blank');
            writeLog("Opening resume PDF.");
        } else if (endpoint === '/github') {
            responseObj.action = "REDIRECT";
            responseObj.target = "https://github.com/ManoBharathi93";
            jsonBlock.textContent = JSON.stringify(responseObj, null, 2);
            window.open('https://github.com/ManoBharathi93', '_blank');
            writeLog("Opening GitHub profile.");
        } else if (endpoint === '/linkedin') {
            responseObj.action = "REDIRECT";
            responseObj.target = "https://linkedin.com/in/manobharathi-m";
            jsonBlock.textContent = JSON.stringify(responseObj, null, 2);
            window.open('https://linkedin.com/in/manobharathi-m', '_blank');
            writeLog("Opening LinkedIn profile.");
        } else if (endpoint === '/email') {
            responseObj.action = "LAUNCH_MAILTO_CLIENT";
            responseObj.target = "mailto:immanobharathi21@gmail.com";
            responseObj.prefilled_params = {
                subject: "Systems Engineering Role",
                body: "Prefilled Recruiter context."
            };
            jsonBlock.textContent = JSON.stringify(responseObj, null, 2);
            window.location.href = "mailto:immanobharathi21@gmail.com?subject=Systems%20Engineering%20Opportunities";
            writeLog("Opening email client.");
        }
    }, 800);
}

// ===== POWER CONSOLE CLI INTERPRETER =====
function handleTerminalCommand() {
    const inputBox = document.getElementById('console-input-box');
    const cmd = inputBox.value.trim().toLowerCase();
    inputBox.value = '';

    if (!cmd) return;

    const output = document.getElementById('console-output-area');
    
    // Echo command
    output.innerHTML += `<div class="line"><span class="prompt">mb-core-01:~$</span> ${cmd}</div>`;

    let reply = '';

    // Lexer parser
    if (cmd === 'help') {
        reply = `
            Available Commands:<br>
            &nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Show this help listing.<br>
            &nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear screen outputs.<br>
            &nbsp;&nbsp;overview&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to overview dashboard context.<br>
            &nbsp;&nbsp;projects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to services configurations context.<br>
            &nbsp;&nbsp;architecture&nbsp;&nbsp;- Navigate to system topology explorer context.<br>
            &nbsp;&nbsp;research&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to RFC research laboratory context.<br>
            &nbsp;&nbsp;awards&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to achievements workspace context.<br>
            &nbsp;&nbsp;resume&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to resume manifest context.<br>
            &nbsp;&nbsp;contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Navigate to endpoints network context.<br>
            &nbsp;&nbsp;theme dark&nbsp;&nbsp;&nbsp;&nbsp;- Switch visual interface to dark mode console.<br>
            &nbsp;&nbsp;theme light&nbsp;&nbsp;&nbsp;- Switch visual interface to light mode document.<br>
            &nbsp;&nbsp;ping&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Test connection diagnostics latency.
        `;
    } else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    } else if (cmd === 'overview') {
        switchTab('overview.sys');
        reply = "Navigating to overview.sys telemetry dashboard...";
    } else if (cmd === 'projects') {
        switchTab('services.sys');
        reply = "Navigating to services.sys system case studies...";
    } else if (cmd === 'architecture') {
        switchTab('topology.sys');
        reply = "Navigating to topology.sys architecture explorer...";
    } else if (cmd === 'research') {
        switchTab('research_lab.sys');
        reply = "Navigating to research_lab.sys RFC laboratory...";
    } else if (cmd === 'awards' || cmd === 'achievements') {
        switchTab('achievements.sys');
        reply = "Navigating to achievements.sys awards workspace...";
    } else if (cmd === 'resume') {
        switchTab('manifest.sys');
        reply = "Navigating to manifest.sys resume config...";
    } else if (cmd === 'contact') {
        switchTab('endpoints.sys');
        reply = "Navigating to endpoints.sys network endpoints...";
    } else if (cmd === 'theme dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('mb-theme', 'dark');
        reply = "Aesthetic variables modified to: GRAFANA_DARK_CONSOLE";
    } else if (cmd === 'theme light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('mb-theme', 'light');
        reply = "Aesthetic variables modified to: STRIPE_LIGHT_DOC";
    } else if (cmd === 'ping') {
        const pingTime = Math.floor(10 + Math.random() * 20);
        reply = `PING mb-core-01: 64 bytes received. latency=${pingTime}ms. Status: EXCELLENT.`;
    } else {
        reply = `mb-shell: command not recognized: '${cmd}'. Type 'help' for support diagnostics.`;
    }

    output.innerHTML += `<div class="line" style="color: var(--text-secondary); margin-bottom: 0.5rem;">${reply}</div>`;
    
    // Auto-scroll output area to bottom
    output.scrollTop = output.scrollHeight;
}

// ===== REAL OBSERVABILITY TIMERS & UTILITIES =====
function startSystemClock() {
    if (globalState.systemClockInterval) clearInterval(globalState.systemClockInterval);
    
    const clockEl = document.getElementById('sys-clock');
    if (!clockEl) return;

    const renderClock = () => {
        const now = new Date();
        const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);
        clockEl.textContent = 'UTC ' + timeStr;
    };

    renderClock();
    globalState.systemClockInterval = setInterval(renderClock, 1000);
}

function startLatencySim() {
    if (globalState.latencyTimer) clearInterval(globalState.latencyTimer);
    
    const latencyEl = document.getElementById('latency-indicator');
    if (!latencyEl) return;

    globalState.latencyTimer = setInterval(() => {
        const ping = Math.floor(12 + Math.random() * 6);
        latencyEl.textContent = `PING: ${ping}ms`;
    }, 4000);
}

function startLoggingStream() {
    const container = document.getElementById('log-stream-container');
    if (!container) return;

    setInterval(() => {
        container.innerHTML = '';
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = logsList[logIndex];
        container.appendChild(line);

        logIndex = (logIndex + 1) % logsList.length;
    }, 8000);
}

function writeLog(message) {
    const container = document.getElementById('log-stream-container');
    if (!container) return;

    container.innerHTML = '';
    const line = document.createElement('div');
    line.className = 'log-line';
    line.textContent = message;
    container.appendChild(line);
}
