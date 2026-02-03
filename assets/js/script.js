function toggleMenu() {

    const menuBox = document.getElementById("menuBox");
    const overlay = document.getElementById("overlay");
    const menuContainer = document.querySelector(".menu-container");

    menuBox.classList.toggle("active");
    overlay.classList.toggle("active");

    menuContainer.classList.toggle("change");
}
const counters = document.querySelectorAll('.counter');
const speed = 100;

const triggerCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');

            const count = parseInt(counter.innerText) || 0;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            triggerCounters();
        } else {
            counters.forEach(counter => {
                counter.innerText = "0";
            });
        }
    });
}, { 
    threshold: 0.5 
});

const counterContainer = document.querySelector('.minimal-counter-container');
if(counterContainer) {
    observer.observe(counterContainer);
}

// Marquee Auto-Loop Logic
const marqueeContent = document.getElementById('marqueeContent');

if (marqueeContent) {

    const clone = marqueeContent.innerHTML;
    marqueeContent.innerHTML += clone; 
}
async function loadSkills() {
    const container = document.getElementById('skills-container');

    container.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
        </div>
    `;

    try {


        const response = await fetch('assets/data/skills.json');
        
        if (!response.ok) throw new Error("File not found");

        const skillsData = await response.json();

        const skillsHTML = skillsData.map(skill => `
            <div class="skill-item" title="${skill.name}">
                <i class="${skill.icon}"></i>
            </div>
        `).join('');

        container.innerHTML = skillsHTML;

    } catch (error) {

        container.innerHTML = `<p style="color: red;">Failed to load skills</p>`;
        console.error("Error:", error);
    }
}

loadSkills();

async function loadTools() {
    const marquee = document.getElementById('marqueeContent');
    
    marquee.innerHTML = `<div class="spinner-small"></div>`;

    try {
        const response = await fetch('assets/data/tools.json');
        const tools = await response.json();

        const getIconHTML = (tool) => {
            if (tool.type === 'iconify') {
                return `<iconify-icon icon="${tool.icon}" style="${tool.style || ''}"></iconify-icon>`;
            } else {
                return `<i class="${tool.icon}" style="${tool.style || ''}"></i>`;
            }
        };

        const toolItems = tools.map(tool => `
            <div class="marquee-item">
                ${getIconHTML(tool)} ${tool.name}
            </div>
        `).join('');

        marquee.innerHTML = toolItems + toolItems;

    } catch (error) {
        console.error("Failed to load tools :", error);
        marquee.innerHTML = "Failed to load tools.";
    }
}

loadTools();
async function loadProjects() {
    const container = document.getElementById('projects-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    try {
        const response = await fetch('assets/data/projects.json');
        const projects = await response.json();

        function displayProjects(filter) {
            const filtered = filter === 'all' 
                ? projects 
                : projects.filter(p => p.category === filter);

            container.innerHTML = filtered.map(p => `
                <div class="project-card">
                    <div class="project-img">
                        <img src="assets/img/${p.thumbnail}" loading="lazy" alt="${p.title}">
                        <div class="project-tag">${p.result}</div>
                    </div>
                    <div class="project-info">
                        <h3>${p.title}</h3>
                        <p><strong>Problem:</strong> ${p.problem}</p>
                        <p><strong>Solution:</strong> ${p.solution}</p>
                        <p><strong>Result:</strong> ${p.solution}</p>
                        <div class="project-tech">
                            ${p.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                        <div class="project-btns">
                            <a href="${p.liveLink}" class="p-btn"><i class="fas fa-external-link-alt"></i> Live</a>
                            <a href="${p.codeLink}" class="p-btn outline"><i class="fab fa-github"></i> Code</a>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Initial Load
        displayProjects('all');

        // Filter Clicking
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                displayProjects(btn.getAttribute('data-filter'));
            });
        });

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

loadProjects();


function showResumePopup() {
  const popup = document.getElementById('resumePopup');
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden'; 
}

function closeResumePopup() {
  const popup = document.getElementById('resumePopup');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

document.getElementById('resumeImage').addEventListener('click', function() {
  this.classList.toggle('zoomed');
});




async function loadEducation() {
    const container = document.getElementById('education-container');
    
    try {
        const response = await fetch('assets/data/education.json');
        if (!response.ok) throw new Error("Education data not found");
        
        const educationData = await response.json();

        container.innerHTML = educationData.map(edu => `
            <div class="education-card">
                <div class="edu-header">
                    <img src="${edu.logo}" alt="${edu.institute}" class="edu-logo" onerror="this.src='https://via.placeholder.com/60'">
                    <div class="edu-info">
                        <h3>${edu.degree}</h3>
                        <span>${edu.institute}</span>
                    </div>
                </div>
                <div class="edu-details">
                    <p>${edu.description}</p>
                </div>
                <div class="edu-skills">
                    ${edu.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="edu-meta">
                    <span class="edu-duration"><i class="far fa-calendar-alt"></i> ${edu.duration}</span>
                    <span class="edu-cgpa">CGPA: ${edu.cgpa}</span>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error loading education:", error);
        container.innerHTML = `<p style="color: red; text-align: center;">Failed to load education details.</p>`;
    }
}

// Function call
loadEducation();


async function fetchToolboxData() {
    try {
        // Parallel fetching for performance
        const [skillsRes, toolsRes, softRes, otherRes] = await Promise.all([
            fetch('assets/data/skills.json'),
            fetch('assets/data/tools.json'),
            fetch('assets/data/soft.json'),
            fetch('assets/data/other.json')
        ]);

        const skills = await skillsRes.json();
        const tools = await toolsRes.json();
        const softSkills = await softRes.json();
        const other = await otherRes.json();

        // 1. Render Hard Skills (with icons)
        const skillsGrid = document.getElementById('skills-grid');
        skillsGrid.innerHTML = skills.map(s => `
            <div class="tool-item">
                <i class="${s.icon}"></i>
                <p>${s.name}</p>
            </div>
        `).join('');

        // 2. Render Tools (with icons/iconify)
        const toolsGrid = document.getElementById('tools-grid');
        toolsGrid.innerHTML = tools.map(t => `
            <div class="tool-item">
                ${t.type === 'iconify' 
                    ? `<iconify-icon icon="${t.icon}"></iconify-icon>` 
                    : `<i class="${t.icon}"></i>`}
                <p>${t.name}</p>
            </div>
        `).join('');

        // 3. Render Soft Skills (Text Only)
        const softGrid = document.getElementById('soft-skills-grid');
        softGrid.innerHTML = softSkills.map(skill => `
            <div class="soft-tag">${skill.name}</div>
        `).join('');

        const otherGrid = document.getElementById('other-skills-grid');
        otherGrid.innerHTML = other.map(other => `
            <div class="soft-tag">${other.name}</div>
        `).join('');
        
    } catch (error) {
        console.error("Failed to load toolbox data:", error);
    }
}

// Call function to execute
fetchToolboxData();
