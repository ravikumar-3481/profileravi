function toggleMenu() {
    const menuBox = document.getElementById("menuBox");
    const overlay = document.getElementById("overlay");
    const menuContainer = document.querySelector(".menu-container");

    menuBox.classList.toggle("active");
    overlay.classList.toggle("active");
    menuContainer.classList.toggle("change");
}

// Event listeners ko function ke bahar rakhein taaki wo sirf ek baar load hon
document.querySelectorAll('.menu-box a').forEach(link => {
    link.addEventListener('click', () => {
        const menuBox = document.getElementById("menuBox");
        if (menuBox.classList.contains("active")) {
            toggleMenu();
        }
    });
});

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

// Marquee Auto-Loop Logic is handled in loadTools()
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

        // Store projects globally to access them in modal
        window.allProjectsData = projects;

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
                        <div class="project-tech">
                            ${p.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                        <div class="project-btns-group">
                            <div class="project-links">
                                <a href="${p.liveLink}" target="_blank" class="p-btn"><i class="fas fa-external-link-alt"></i> Live View</a>
                                <a href="${p.codeLink}" target="_blank" class="p-btn outline"><i class="fab fa-github"></i> Source</a>
                            </div>
                            <button onclick="openProjectModal(${p.id})" class="view-more-modern">
                                Explore Details <i class="fas fa-arrow-right"></i>
                            </button>
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

// Project Modal Logic
function openProjectModal(id) {
    if (!window.allProjectsData) return;
    const p = window.allProjectsData.find(proj => proj.id === id);
    if (!p) return;
    
    const modalBody = document.getElementById('projectModalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-project-img">
            <img src="assets/img/${p.thumbnail}" alt="${p.title}">
            <div class="project-tag">${p.result}</div>
        </div>
        <div class="modal-project-info">
            <h2>${p.title}</h2>
            <div class="project-tech" style="margin-bottom: 20px;">
                ${p.technologies.map(tech => `<span class="tech-badge">#${tech}</span>`).join('')}
            </div>
            <p><strong>Problem:</strong> ${p.problem}</p>
            <p><strong>Solution:</strong> ${p.solution}</p>
            <p><strong>Result:</strong> ${p.result1}</p>
            <div class="project-btns" style="margin-top: 20px;">
                <a href="${p.liveLink}" target="_blank" class="p-btn"><i class="fas fa-external-link-alt"></i> Live</a>
                <a href="${p.codeLink}" target="_blank" class="p-btn outline"><i class="fab fa-github"></i> Code</a>
            </div>
        </div>
    `;
    
    const modal = document.getElementById('projectModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}




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
                    ${edu.skills.map(skill => `<span class="skill-tag">#${skill}</span>`).join('')}
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



        const sheetId = '1Y3ZMgMpme1xolYpka_2EwayrpUkpr7Qic2AzfspGwTA';
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

        async function fetchTestimonials() {
            try {
                const response = await fetch(url);
                const text = await response.text();
                // Extracting JSON from the Google Sheets Response
                const jsonData = JSON.parse(text.substring(47).slice(0, -2));
                const rows = jsonData.table.rows;

                // Getting the 4 latest testimonials
                const latestData = rows.reverse().slice(0, 4);
                const grid = document.getElementById('testimonial-grid');

                latestData.forEach((row, index) => {
                    const name = row.c[1] ? row.c[1].v : 'Collaborator';
                    const role = row.c[2] ? row.c[2].v : 'Professional';
                    const institute = row.c[3] ? row.c[3].v : '';
                    const rating = row.c[4] ? parseInt(row.c[4].v) : 5;
                    const feedback = row.c[5] ? row.c[5].v : 'Great contribution to the project.';

                    const starHtml = Array(5).fill(0).map((_, i) => 
                        `<i class="${i < rating ? 'fas' : 'far'} fa-star"></i>`
                    ).join('');

                    const card = document.createElement('div');
                    card.className = 't-card';
                    card.innerHTML = `
                        <i class="fas fa-quote-right quote-mark"></i>
                        <div class="content-top">
                            <div class="rating-stars">${starHtml}</div>
                            <p class="feedback-text" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0;">"${feedback}"</p>
                            ${feedback.length > 120 ? `<span class="read-more-btn" style="color:#9124ff; cursor:pointer; font-size:0.85rem; font-weight:600; display:inline-block; margin-top:8px;" onclick="toggleTestimonial(this)">Read More <i class="fas fa-chevron-down"></i></span>` : ''}
                        </div>
                        <div class="meta-container">
                            <div class="meta-info">
                                <div class="meta-name">${name}</div>
                                <div class="meta-role">${role} ${institute ? `at <b> ${institute} </b>` : ''}</div>
                            </div>
                        </div>
                    `;

                    grid.appendChild(card);

                    // Reveal animation
                    setTimeout(() => {
                        card.classList.add('reveal');
                    }, index * 200);
                });

            } catch (err) {
                console.error("Error loading sheet data:", err);
            }
        }

        window.addEventListener('DOMContentLoaded', fetchTestimonials);

        function toggleTestimonial(btn) {
            const container = btn.parentElement;
            const textEl = container.querySelector('.feedback-text');
            
            if (textEl.style.webkitLineClamp === '3') {
                textEl.style.webkitLineClamp = 'unset';
                btn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>';
            } else {
                textEl.style.webkitLineClamp = '3';
                btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            }
        }



async function loadExperience() {
    const container = document.getElementById('experience-container');

    try {
        const response = await fetch('assets/data/experience.json');
        
        if (!response.ok) throw new Error("Experience data not found");

        const expData = await response.json();
        window.allExperienceData = expData;

        container.innerHTML = expData.map(item => `
            <div class="exp-card project-card" style="padding: 1.5rem;">
                <div class="project-info" style="padding: 0; display:flex; flex-direction:column; height:100%; gap:15px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <div class="exp-logo-box" style="width: 55px; height: 55px; background:#fff; border-radius:12px; padding:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center;">
                            <img src="${item.logo}" alt="${item.company}" style="max-width:100%; max-height:100%; object-fit:contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                            <span style="display:none; color:#000; font-weight:bold; font-size:1.5rem;">${item.company.charAt(0)}</span>
                        </div>
                        <span class="tech-badge" style="background:rgba(145,36,255,0.15); border-color:rgba(145,36,255,0.3); color:#d1a3ff; text-transform:uppercase; font-size:0.7rem;">${item.type}</span>
                    </div>
                    
                    <div>
                        <h3 style="margin-bottom: 5px; color:#fff; font-size:1.25rem; font-weight:600;">${item.role}</h3>
                        <p style="color:#a78bfa; margin-bottom:12px; font-weight:500; font-size:0.95rem;">${item.company}</p>
                        <div style="display:flex; flex-wrap:wrap; gap:12px; font-size:0.85rem; color:rgba(255,255,255,0.6); margin-bottom:5px;">
                            <span><i class="far fa-calendar-alt" style="color:#9124ff;"></i> ${item.duration}</span>
                            <span><i class="fas fa-map-marker-alt" style="color:#9124ff;"></i> ${item.location}</span>
                        </div>
                    </div>

                    <div class="project-tech" style="margin-bottom:5px;">
                        ${item.skills.slice(0, 3).map(skill => `<span class="tech-badge">#${skill}</span>`).join('')}
                        ${item.skills.length > 3 ? `<span class="tech-badge">+${item.skills.length - 3}</span>` : ''}
                    </div>

                    <div class="project-btns-group" style="margin-top:auto; padding-top:10px;">
                        <button onclick="openExpModal(${item.id})" class="view-more-modern">View Details <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error loading experience:", error);
        container.innerHTML = `<p style="color: red; text-align: center;">Failed to load experience.</p>`;
    }
}

function openExpModal(id) {
    if (!window.allExperienceData) return;
    const p = window.allExperienceData.find(exp => exp.id === id);
    if (!p) return;
    
    const modalBody = document.getElementById('projectModalBody'); // reuse project modal body
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div class="modal-project-img" style="background:#fff; display:flex; align-items:center; justify-content:center; padding: 20px; height: 180px;">
            <img src="${p.logo}" alt="${p.company}" style="max-height:100%; width:auto; object-fit:contain;" onerror="this.style.display='none'">
            <div class="project-tag">${p.type}</div>
        </div>
        <div class="modal-project-info">
            <h2>${p.role}</h2>
            <h4 style="color:#a78bfa; margin-bottom:15px; font-weight:500;">@ ${p.company}</h4>
            <div style="display:flex; gap:15px; font-size:0.9rem; color:#ccc; margin-bottom:20px;">
                <span><i class="fas fa-map-marker-alt"></i> ${p.location}</span>
                <span><i class="fas fa-calendar-alt"></i> ${p.duration}</span>
            </div>
            <div class="project-tech" style="margin-bottom: 20px;">
                ${p.skills.map(skill => `<span class="tech-badge">#${skill}</span>`).join('')}
            </div>
            <div style="margin-bottom: 20px;">
                <p style="color:#ddd; line-height:1.6;">${p.description}</p>
            </div>
            <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:15px; border:1px solid rgba(145,36,255,0.2);">
                <p style="color:#fff; font-weight:600; margin-bottom:10px;">Key Responsibilities:</p>
                <ul style="padding-left: 20px; color:#aaa; line-height:1.7; font-size:0.95rem;">
                    ${p.tasks.map(task => `<li style="margin-bottom:8px;">${task}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    const modal = document.getElementById('projectModal'); // Reuse project modal completely
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Call the function
loadExperience();


async function fetchCertificates() {
    const container = document.getElementById('cert-container');
    
    // 1. Loading State (User experience ke liye)
    container.innerHTML = '<div class="loading">Loading certificates...</div>';
    
    try {
        const response = await fetch('assets/data/certificates.json');
        
        // 2. Check if the response is actually OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 3. Check if data is empty
        if (!data || data.length === 0) {
            container.innerHTML = "<p>No certificates found.</p>";
            return;
        }

        // 4. Fragment optimization (Performance ke liye)
        const certCards = data.map(cert => `
            <div class="cert-card">
                <div class="cert-img-box">
                    <img src="assets/img/${cert.image}" 
                         alt="${cert.title}" 
                         loading="lazy" 
                         onerror="this.src='https://via.placeholder.com/400x200?text=Certificate'">
                </div>
                <div class="cert-info">
                    <div class="cert-issuer-row">
                        <span class="cert-issuer"><i class="fas fa-certificate"></i> ${cert.issuer}</span>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                    <h3>${cert.title}</h3>
                    <p class="cert-text">${cert.description}</p>
                    
                    <div class="cert-tags">
                        ${cert.skills.map(skill => `<span class="cert-tag">#${skill}</span>`).join('')}
                    </div>

                    <a href="${cert.link}" target="_blank" class="cert-link" rel="noopener noreferrer">
                        Verify Credential <i class="fas fa-external-link-alt" style="margin-left: 5px; font-size: 0.8rem;"></i>
                    </a>
                </div>
            </div>
        `).join('');

        container.innerHTML = certCards;

    } catch (error) {
        console.error("Error loading certificates:", error);
        container.innerHTML = `
            <div class="error-msg">
                <p>⚠️ Failed to load certifications. Please try again later.</p>
            </div>`;
    }
}

window.addEventListener('DOMContentLoaded', fetchCertificates);



async function loadActivities() {
    const container = document.getElementById('activities-container');
    
    try {
        const response = await fetch('assets/data/activities.json');
        if (!response.ok) throw new Error("Activities data not found");
        
        const data = await response.json();

        container.innerHTML = data.map(item => `
            <div class="activity-card">
                <div class="activity-icon"><i class="${item.icon}"></i></div>
                <span class="activity-inst">${item.institute}</span>
                <h3>${item.title}</h3>
                <p class="activity-desc">${item.description}</p>
                <div class="activity-duration">
                    <i class="far fa-clock"></i> ${item.duration}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Error loading activities:", error);
        container.innerHTML = `<p style="color: rgba(255,255,255,0.5);">Information temporarily unavailable.</p>`;
    }
}

// Initialize the function
document.addEventListener('DOMContentLoaded', loadActivities);



async function fetchLeetCodeStats() {
    const container = document.getElementById('leetcode-stats-container');
    if(!container) return;

    const username = "ravivish3481"; 
    
    try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();

        if (data.status === "success") {
            container.innerHTML = `
                <div class="lc-stats-wrapper">
                    <div class="lc-stats-row"><span>Total Solved</span><span class="lc-val">${data.totalSolved}</span></div>
                    <div class="lc-stats-row"><span>Acceptance Rate</span><span class="lc-val">${data.acceptanceRate}%</span></div>
                    <div class="lc-stats-row"><span>Easy</span><span class="lc-val" style="color:#00b8a3">${data.easySolved}</span></div>
                    <div class="lc-stats-row"><span>Medium</span><span class="lc-val" style="color:#ffc01e">${data.mediumSolved}</span></div>
                    <div class="lc-stats-row"><span>Hard</span><span class="lc-val" style="color:#ef4743">${data.hardSolved}</span></div>
                    <div class="lc-stats-row"><span>Global Ranking</span><span class="lc-val">${data.ranking}</span></div>
                </div>
            `;
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        container.innerHTML = `<p style="color:rgba(255,255,255,0.4)">LeetCode data is currently private or restricted.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', fetchLeetCodeStats);






const form = document.getElementById('contact-form');
const successOverlay = document.getElementById('successMsg');

function closeSuccess() {
    successOverlay.classList.remove('active');
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = true;
    
    // Reset errors
    document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

    const fields = ['name', 'email', 'subject', 'message'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (id === 'email' && !emailRegex.test(el.value)) {
            el.parentElement.classList.add('error');
            isValid = false;
        } else if (!el.value || el.value.trim() === '') {
            el.parentElement.classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) return;

    // Show loading on button
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.style.opacity = '0.7';

    try {
        const response = await fetch('https://formspree.io/f/xvgqzalg', {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            successOverlay.classList.add('active');
            form.reset();
        } else {
            alert("Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("Network error. Please check your connection.");
    } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
    }
});

// Typing Effect for Hero Subtitle
const typingTextArray = ["AI Engineer", "Data Scientist", "Machine Learning Engineer", "Data Analyst"];
let typingTextIndex = 0;
let typingCharIndex = 0;
const typeSpeed = 90;
const eraseSpeed = 50;
const delayBetweenTexts = 2000;

function typeHeroText() {
    const el = document.getElementById("typing-text");
    if (!el) return;
    
    if (typingCharIndex < typingTextArray[typingTextIndex].length) {
        el.textContent += typingTextArray[typingTextIndex].charAt(typingCharIndex);
        typingCharIndex++;
        setTimeout(typeHeroText, typeSpeed);
    } else {
        setTimeout(eraseHeroText, delayBetweenTexts);
    }
}

function eraseHeroText() {
    const el = document.getElementById("typing-text");
    if (!el) return;
    
    if (typingCharIndex > 0) {
        el.textContent = typingTextArray[typingTextIndex].substring(0, typingCharIndex - 1);
        typingCharIndex--;
        setTimeout(eraseHeroText, eraseSpeed);
    } else {
        typingTextIndex++;
        if (typingTextIndex >= typingTextArray.length) typingTextIndex = 0;
        setTimeout(typeHeroText, typeSpeed + 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("typing-text")) {
        setTimeout(typeHeroText, 1000); // Start after 1s
    }
});

