// Mobile Navigation Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#' || targetId === '') return; 
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        }
    });
});

// --- EMAIL SENDING LOGIC (Technical Support Form) ---
const supportForm = document.getElementById('supportForm');

if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const name = document.getElementById('contactName').value;
        const type = document.getElementById('contactType').value;
        const message = document.getElementById('contactMessage').value;
        
        // Construct Mailto Link
        const subject = encodeURIComponent(`NoQ Inquiry: ${type} - ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nInquiry Type: ${type}\n\nMessage:\n${message}`);
        
        // Open Email Client
        window.location.href = `mailto:noqeatssrm@gmail.com?subject=${subject}&body=${body}`;
        
        // Visual Feedback
        const btn = supportForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Opening Email Client...';
        setTimeout(() => {
            btn.innerText = originalText;
            supportForm.reset();
        }, 2000);
    });
}