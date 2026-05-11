// assets/js/url-obfuscator.js

/**
 * URL Obfuscator
 * Completely hides the file names (like .html) and raw query parameters from the browser address bar.
 * Replaces them with a unique ID/token, giving the site a clean, modern, and professional look.
 * Handles page reloads automatically by routing obfuscated URLs back to their original files.
 */
(function() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // Helper to generate a unique random token
    const generateUniqueToken = () => {
        return btoa(Math.random().toString(36).substring(2, 15) + Date.now().toString(36));
    };

    // 1. ROUTING: Handle incoming obfuscated URLs (e.g., when a user reloads the page)
    if (urlParams.has('ref')) {
        const ref = urlParams.get('ref');
        try {
            // Try to decode the reference
            const decoded = atob(ref);
            if (decoded.startsWith('proj_')) {
                const id = decoded.split('_')[1];
                // If we are NOT currently on project.html, seamlessly redirect to it
                if (!path.includes('project.html')) {
                    let basePath = path.endsWith('/') ? path : path.substring(0, path.lastIndexOf('/') + 1);
                    window.location.replace(`${basePath}project.html?id=${id}${hash}`);
                    return; // Stop execution
                }
            }
        } catch(e) {
            // Invalid or tampered reference, ignore and let it load normally
        }
    }

    // 2. OBFUSCATION: Hide the .html filename and raw parameters
    if (path.includes('.html') || urlParams.has('id')) {
        let basePath = path;
        
        // Extract the root directory path (e.g., from "/portfolio/index.html" to "/portfolio/")
        if (path.includes('.html')) {
            basePath = path.substring(0, path.lastIndexOf('/') + 1);
        }
        
        // Handle Project pages
        if (urlParams.has('id')) {
            const id = urlParams.get('id');
            const encodedId = btoa(`proj_${id}`);
            // Replace the URL instantly without reloading the page
            window.history.replaceState(null, '', `${basePath}?ref=${encodedId}${hash}`);
        } 
        // Handle Index/Home page
        else if (path.includes('index.html')) {
            window.history.replaceState(null, '', `${basePath}?profileravi=${generateUniqueToken()}${hash}`);
        }
        // Handle any other HTML pages
        else {
            window.history.replaceState(null, '', `${basePath}?profileravi=${generateUniqueToken()}${hash}`);
        }
    }
})();
