// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to cross (simple toggle)
    const icon = menuBtn.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('ph-list');
        icon.classList.add('ph-x');
    } else {
        icon.classList.add('ph-list');
        icon.classList.remove('ph-x');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0 // Changed from 0.15 to fix tall elements not fading in
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    // Select all elements to animate on scroll
    const fadeElements = document.querySelectorAll('.fade-up, .hero-content, .service-card, .case-study, .stat-item, .faq-item, .contact-block');
    
    fadeElements.forEach(el => {
        // Only add fade-up class if it's not already there
        if(!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
        observer.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if(question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all others
                faqItems.forEach(i => i.classList.remove('active'));
                
                if(!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Back to top button logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Page Transitions
    const internalLinks = document.querySelectorAll('a[href]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Target local navigations only
            if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('http') && !this.hasAttribute('target')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 400); 
            }
        });
    });

    // BFCache (back button) fix
    window.addEventListener('pageshow', (event) => {
        if (event.persisted || document.body.classList.contains('fade-out')) {
            document.body.classList.remove('fade-out');
        }
    });

    // Space Glitter Effect Generation
    const spaceBg = document.getElementById('spaceBg');
    if (spaceBg) {
        const numStars = 150;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            // Random properties for natural look
            const size = Math.random() * 2.5 + 0.5; // Size between 0.5px and 3px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 4 + 2}s`; // 2s to 6s
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            spaceBg.appendChild(star);
        }
    }

    // Active state highlighting for navbar
    const currentLocation = location.href;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        if(link.href === currentLocation) {
            link.classList.add('active');
        }
    });
});
