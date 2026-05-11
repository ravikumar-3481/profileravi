// Scroll Reveal Observer Logic with Reset
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) {
                entry.target.classList.remove('active');
            }
        }
    });
}, {
    threshold: [0, 0.15] 
});


document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));




function toggleContactDropdown(event) {
    // Prevent event from bubbling up to the window listener
    event.stopPropagation();
    const dropdown = document.getElementById("contactDropdown");
    dropdown.classList.toggle("active");
}

// Close dropdown when clicking anywhere outside
window.addEventListener("click", function(event) {
    const dropdown = document.getElementById("contactDropdown");
    const container = document.getElementById("contactDropdownContainer");
    
    // If the click is not on the container or its children, close it
    if (dropdown.classList.contains("active") && !container.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});




window.addEventListener("load", function() {
    const loader = document.getElementById('loader-screen');
    const percentEl = document.getElementById('pl-percent');
    const barEl = document.querySelector('.pl-progress-bar');
    const textEl = document.getElementById('pl-typing-text');
    
    if (!loader) return;

    let progress = 0;
    const stages = [
        "Initializing Ecosystem...",
        "Loading Assets...",
        "Establishing Connection...",
        "System Ready"
    ];

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;

        if (percentEl) percentEl.innerText = `${progress}%`;
        if (barEl) barEl.style.width = `${progress}%`;

        if (progress < 40 && textEl) textEl.innerText = stages[0];
        else if (progress < 70 && textEl) textEl.innerText = stages[1];
        else if (progress < 99 && textEl) textEl.innerText = stages[2];
        else if (textEl) textEl.innerText = stages[3];

        if (progress === 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 600); // Delay at 100% to let users see completion
        }
    }, 180); // Speed of loading
});
