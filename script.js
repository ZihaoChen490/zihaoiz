// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an external page link (like career.html), don't prevent default
            if (href.includes('.html')) {
                return; // Allow normal navigation
            }
            
            // For internal links, prevent default and scroll smoothly
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation based on scroll position
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    if (linkHref === '#' + sectionId || linkHref.includes('#' + sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial call to set active state
    updateActiveNav();
});
