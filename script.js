// --- SPLASH SCREEN / LOADER LOGIC ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const logo = document.querySelector('.loader-logo');
    
    // --- DECISION LOGIC: SHOULD WE SHOW THE ANIMATION? ---
    
    // 1. Check if the page was reloaded (User pressed Refresh)
    // performance.getEntriesByType is reliable in modern browsers
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    
    // 2. Check if the user came from an internal page (e.g., clicked "Home" from Developers)
    // If referrer contains our own domain name, it's internal.
    // Note: If referrer is empty (direct type-in), isInternal is false -> Animation Shows.
    const isInternal = document.referrer && document.referrer.includes(window.location.hostname);

    // LOGIC: Show animation if it's a Reload OR if it's a Fresh Entry (not internal)
    const shouldShowSplash = isReload || !isInternal;

    if (shouldShowSplash) {
        // --- SHOW ANIMATION ---
        
        // Define animation classes
        const animations = ['anim-pop', 'anim-slide'];
        const randomIndex = Math.floor(Math.random() * animations.length);
        const selectedAnimation = animations[randomIndex];
        
        if (logo) {
            logo.classList.add(selectedAnimation);
        }
        
        if (preloader) {
            // Wait 2.0 seconds before hiding
            setTimeout(() => {
                preloader.classList.add('hide-loader');
                setTimeout(() => { preloader.style.display = 'none'; }, 500);
            }, 2000);
        }
    } else {
        // --- SKIP ANIMATION (Hide Immediately) ---
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
});


// --- SMOOTH PAGE TRANSITIONS (EXIT ANIMATION) ---
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    if (link) {
        // SAFETY CHECK: Ignore links that open in a new tab (like your Prototype)
        if (link.target === '_blank') return;

        const href = link.getAttribute('href');
        
        // Check for valid internal navigation
        // We ensure it's not an anchor link (#), not email (mailto), and is a relative path
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.includes('http') && href !== window.location.pathname) {
            
            e.preventDefault();
            
            // Fade out the current page
            document.body.classList.add('fade-out');
            
            // Wait 200ms (0.2s) for the fade, then go to the new page
            setTimeout(() => {
                window.location.href = href;
            }, 200); 
        }
    }
});


// --- MOBILE NAVIGATION LOGIC ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Toggle the mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px'; // Height of navbar
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            navLinks.style.zIndex = '999'; // Ensure it sits on top of everything
        }
    });
}

// --- SMOOTH SCROLL (ANCHOR LINKS) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#' || targetId === '') return; 
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }
            }
        }
    });
});

// --- EMAIL SENDING LOGIC ---
const supportForm = document.getElementById('supportForm');
if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const type = document.getElementById('contactType').value;
        const message = document.getElementById('contactMessage').value;
        
        const subject = encodeURIComponent(`NoQ Inquiry: ${type} - ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nInquiry Type: ${type}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:noqeatssrm@gmail.com?subject=${subject}&body=${body}`;
        
        const btn = supportForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Opening Email Client...';
        setTimeout(() => {
            btn.innerText = originalText;
            supportForm.reset();
        }, 2000);
    });
}