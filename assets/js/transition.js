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
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;

    // 1. Matrix Background
    const drops = Array(Math.floor(canvas.width / 10)).fill(1);
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 8, 15, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00f2ff";
        drops.forEach((y, i) => {
            ctx.fillText(String.fromCharCode(Math.random() * 128), i * 20, y * 20);
            if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }
    const matrixInt = setInterval(drawMatrix, 20);

    // 2. Typing Welcome Message
    const msg = "ACCESS GRANTED , WELCOME TO RAVI'S PORTFOLIO.";
    let charI = 0;
    function type() {
        if(charI < msg.length) {
            document.getElementById('welcome-text').innerHTML += msg.charAt(charI);
            charI++; setTimeout(type, 40);
        }
    }
    type();

    // 3. System Logs (Kernel & Terminal)
    const logData = ["INIT_CORE", "SEC_LINK_v4", "BYPASS_SSL", "MEM_SYNC", "OS_BOOT_OK"];
    setInterval(() => {
        const k = document.getElementById('kernel-output');
        const t = document.getElementById('terminal-output');
        k.innerHTML = `> STACK_VAL: ${Math.random().toFixed(4)}<br>` + k.innerHTML.slice(0, 200);
        t.innerHTML = `[SYNC] Node_${Math.floor(Math.random()*99)} active...<br>` + t.innerHTML.slice(0, 200);
        // AI Logic Percent
        document.getElementById('logic-percent').innerText = Math.floor(Math.random() * 100) + "%";
    }, 450);

    // 4. Time/Date HUD
    function updateHUD() {
        const now = new Date();
        document.getElementById('live-date').innerText = now.toLocaleDateString();
        document.getElementById('live-time').innerText = now.toLocaleTimeString();
    }
    setInterval(updateHUD, 1000); updateHUD();

    // 5. Exit Trigger
    setTimeout(() => {
        document.getElementById('loader-screen').classList.add('loader-up');
    }, 3000);
});
