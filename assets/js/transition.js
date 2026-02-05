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
