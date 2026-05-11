// assets/js/project.js

function toggleMenu() {
    const menuBox = document.getElementById("menuBox");
    const overlay = document.getElementById("overlay");
    const menuContainer = document.querySelector(".menu-container");

    menuBox.classList.toggle("active");
    overlay.classList.toggle("active");
    menuContainer.classList.toggle("change");
}

document.querySelectorAll('.menu-box a').forEach(link => {
    link.addEventListener('click', () => {
        const menuBox = document.getElementById("menuBox");
        if (menuBox.classList.contains("active")) {
            toggleMenu();
        }
    });
});

async function loadProjectDetails() {
    const content = document.getElementById('project-content');
    const params = new URLSearchParams(window.location.search);
    let projectId = params.get('id');

    // If obfuscated ref exists instead of id
    if (!projectId && params.has('ref')) {
        try {
            const decoded = atob(params.get('ref'));
            if (decoded.startsWith('proj_')) {
                projectId = decoded.split('_')[1];
            }
        } catch(e) {
            console.error("Could not decode project reference.");
        }
    }

    if (!projectId) {
        content.innerHTML = `<div style="text-align:center; padding: 100px 20px;"><h2>Project Not Found</h2><a href="index.html#projects" class="pd-btn pd-btn-primary" style="margin-top:20px;">Back to Projects</a></div>`;
        return;
    }

    try {
        const response = await fetch('assets/data/projects.json');
        if (!response.ok) throw new Error("Could not load project data");
        const projects = await response.json();
        
        const project = projects.find(p => p.id == projectId);

        if (!project) {
            content.innerHTML = `<div style="text-align:center; padding: 100px 20px;"><h2>Project Not Found</h2><a href="index.html#projects" class="pd-btn pd-btn-primary" style="margin-top:20px;">Back to Projects</a></div>`;
            return;
        }

        // Generate images HTML
        let imagesHtml = '';
        if (project.images && project.images.length > 0) {
            imagesHtml = `<div class="pd-gallery">` + project.images.map(img => `<img src="assets/img/${img}" alt="${project.title}">`).join('') + `</div>`;
        } else {
            imagesHtml = `<div class="pd-gallery"><img src="assets/img/${project.thumbnail}" alt="${project.title}"></div>`;
        }

        const html = `
            <div class="pd-header reveal">
                <div class="pd-category">${project.category === 'ai' ? 'AI/ML' : (project.category === 'web' ? 'Web Dev' : 'Data Analysis')}</div>
                <h1 class="pd-title">${project.title}</h1>
                <div class="pd-tech">
                    ${project.technologies.map(tech => `<span class="tech-badge">#${tech}</span>`).join('')}
                </div>
                
                <div class="pd-actions">
                    <a href="${project.liveLink}" target="_blank" class="pd-btn pd-btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                    <a href="${project.codeLink}" target="_blank" class="pd-btn pd-btn-secondary"><i class="fab fa-github"></i> View Source Code</a>
                    ${project.reportLink ? `<a href="${project.reportLink}" target="_blank" class="pd-btn pd-btn-secondary"><i class="fas fa-file-alt"></i> View Report</a>` : ''}
                </div>
            </div>

            ${imagesHtml}

            <div class="pd-content-grid reveal">
                <div class="pd-card">
                    <h3><i class="fas fa-exclamation-triangle"></i> The Problem</h3>
                    <p>${project.problem}</p>
                </div>
                <div class="pd-card">
                    <h3><i class="fas fa-lightbulb"></i> The Solution</h3>
                    <p>${project.solution}</p>
                </div>
            </div>

            ${project.caseStudy ? `
            <div class="pd-case-study reveal">
                <h3>Case Study & Approach</h3>
                <p>${project.caseStudy}</p>
            </div>
            ` : ''}

            ${project.challenges && project.challenges.length > 0 ? `
            <div class="pd-challenges reveal">
                <h3><i class="fas fa-mountain"></i> Challenges Overcome</h3>
                <ul class="challenges-list">
                    ${project.challenges.map(c => `<li><i class="fas fa-check-circle"></i> ${c}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            <div class="pd-result-card reveal">
                <h3>Final Result & Impact</h3>
                <p>${project.result1}</p>
            </div>

            <div class="pd-back">
                <a href="index.html#projects"><i class="fas fa-arrow-left"></i> Back to all projects</a>
            </div>
        `;

        content.innerHTML = html;

        // Simple reveal animation
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }, 100);

    } catch (error) {
        console.error("Error:", error);
        content.innerHTML = `<div style="text-align:center; padding: 100px 20px;"><h2>Error loading project details.</h2><p>${error.message}</p></div>`;
    }
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);
