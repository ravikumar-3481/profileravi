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
