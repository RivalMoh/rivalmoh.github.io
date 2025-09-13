/*
==============================================
PORTFOLIO WEBSITE - JAVASCRIPT
==============================================
Modern, interactive features for portfolio website
Author: Rival Moh. Wahyudi
Features: Project filtering, smooth scrolling, navigation highlighting, 
          responsive galleries, and professional UI enhancements
==============================================
*/

/*
==============================================
INITIALIZATION SYSTEM
==============================================
Main entry point that sets up all interactive features
Waits for DOM to be ready before initializing components
==============================================
*/

// Wait for DOM to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting Portfolio initialization...');
    
    /*
    Initialize AOS (Animate On Scroll) library
    Provides smooth, scroll-triggered animations throughout the site
    Only initialize if the library is available (graceful degradation)
    */
    if (typeof AOS !== 'undefined') {
        console.log('AOS library found, initializing...');
        AOS.init({
            duration: 800,          // Animation duration in milliseconds
            easing: 'ease-out-cubic', // Smooth easing function for natural movement
            once: true,             // Animate elements only once (performance optimization)
            mirror: false,          // Don't reverse animations when scrolling up
            offset: 50              // Trigger animations 50px before element enters viewport
        });
    } else {
        console.log('AOS library not found, skipping animation initialization');
    }
    
    // Initialize all portfolio functionality
    initializePortfolio();
});

/*
==============================================
MAIN INITIALIZATION FUNCTION
==============================================
Coordinates the initialization of all interactive features
Called after DOM is ready and AOS is initialized
==============================================
*/
function initializePortfolio() {
    console.log('Initializing portfolio functionality...');
    
    // Initialize modern navigation with scroll effects
    initializeModernNavigation();
    
    // Initialize project filtering system for project gallery
    initializeProjectFiltering();
    
    // Initialize certification filtering system
    initializeCertificationFiltering();
    
    // Initialize horizontal scroll container widths (with delay for proper calculation)
    setTimeout(() => {
        updateScrollContainerWidth();
    }, 100);
    
    // Initialize smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Initialize intersection observer for navigation highlighting
    initializeNavHighlighting();
    
    // Initialize contact form functionality
    initializeContactForm();
    
    // Initialize modern effects
    initializeModernEffects();
    
    // Initialize scroll to top button
    initializeScrollToTop();
    
    // Initialize reading progress bar
    initializeProgressBar();
    
    console.log('Portfolio initialization complete!');
}

// Modern Navigation with scroll effects
function initializeModernNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add active state to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/*
==============================================
SCROLL-TO-TOP BUTTON
==============================================
Creates and manages a floating scroll-to-top button
Shows when user scrolls down, provides smooth return to top
==============================================
*/
function initializeScrollToTop() {
    // Create scroll to top button element
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');   // Show button after scrolling 300px
        } else {
            scrollButton.classList.remove('visible'); // Hide button when near top
        }
    });
    
    // Scroll to top when clicked with smooth animation
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*
==============================================
READING PROGRESS BAR
==============================================
Shows visual progress indicator of page scroll
Helps users understand how much content remains
==============================================
*/
function initializeProgressBar() {
    // Create progress bar element at top of page
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    // Update progress width based on scroll position
    window.addEventListener('scroll', function() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/*
==============================================
SMOOTH SCROLLING NAVIGATION
==============================================
Provides smooth animated scrolling for anchor links
Accounts for fixed navbar height in positioning
==============================================
*/
function initializeSmoothScrolling() {
    // Get all internal anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Add smooth scroll behavior to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump behavior
            
            // Get target section ID from href
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll to section if it exists
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/*
==============================================
NAVIGATION HIGHLIGHTING
==============================================
Automatically highlights active navigation link based on scroll position
Uses Intersection Observer for performance and accuracy
==============================================
*/
function initializeNavHighlighting() {
    // Get all sections with IDs and navigation links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Create intersection observer to track visible sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,              // Trigger when 30% of section is visible
        rootMargin: '-80px 0px -50% 0px'  // Account for navbar height
    });
    
    // Observe all sections for visibility changes
    sections.forEach(section => {
        observer.observe(section);
    });
}

/*
==============================================
MODERN EFFECTS & MICRO-INTERACTIONS
==============================================
Adds sophisticated visual effects and small interactive details
Enhances user experience with subtle animations
==============================================
*/
function initializeModernEffects() {
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-section::before');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Dynamic project rendering (if projects data is available)
function renderProjects(projects = null) {
    if (typeof ProjectManager === 'undefined') {
        console.log('ProjectManager not found, using static projects');
        return;
    }
    
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    const projectsToRender = projects || ProjectManager.getAllProjects();
    
    projectsContainer.innerHTML = projectsToRender.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" class="img-fluid" 
                     onerror="this.src='${project.fallbackImage}'">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="projects/${project.id}.html" class="project-link"><i class="fas fa-eye"></i></a>
                        <a href="${project.githubUrl}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h5>${project.title}</h5>
                <p>${project.shortDescription}</p>
                <div class="project-tech">
                    ${project.technologies.slice(0, 4).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Update scroll container width after rendering
    setTimeout(updateScrollContainerWidth, 100);
}

/*
==============================================
PROJECT FILTERING SYSTEM
==============================================
Interactive filtering system for project gallery
Allows users to filter projects by category (All, ML, Data Analysis)
Includes smooth animations and button state management
==============================================
*/
function initializeProjectFiltering() {
    // Get filter buttons and project cards from DOM
    const projectButtons = document.querySelectorAll('.project-categories .btn-category');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');
    
    // Log found elements for debugging
    console.log('Project buttons found:', projectButtons.length);
    console.log('Project cards found:', projectCards.length);
    
    // Exit if required elements are not found
    if (projectButtons.length === 0 || projectCards.length === 0) {
        console.log('Project filtering elements not found');
        return;
    }
    
    // Add click event listeners to filter buttons
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the category to filter by from data attribute
            const category = this.getAttribute('data-category');
            console.log('Filtering projects by category:', category);
            
            // Update button states (remove active class from all, add to clicked)
            projectButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter project cards with smooth animations
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Show cards that match the selected category (or all)
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';        // Make card visible
                    card.style.opacity = '0';            // Start with invisible
                    setTimeout(() => {
                        card.style.opacity = '1';        // Fade in with delay
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Recalculate scroll container width after filtering
            setTimeout(() => {
                updateScrollContainerWidth();
            }, 350);
        });
    });
}

function initializeCertificationFiltering() {
    const certificationButtons = document.querySelectorAll('.certification-categories .btn-category');
    const certificationCards = document.querySelectorAll('#certificationsContainer .certification-card');
    
    console.log('Certification buttons found:', certificationButtons.length);
    console.log('Certification cards found:', certificationCards.length);
    
    if (certificationButtons.length === 0 || certificationCards.length === 0) {
        console.log('Certification filtering elements not found');
        return;
    }
    
    certificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Filtering certifications by category:', category);
            
            // Remove active class from all buttons
            certificationButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter certification cards
            certificationCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Recalculate scroll container width after filtering
            setTimeout(() => {
                updateScrollContainerWidth();
            }, 350);
        });
    });
}

// Function to update scroll container width and prevent overscrolling
function updateScrollContainerWidth() {
    const projectsContainer = document.getElementById('projectsContainer');
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    console.log('Updating scroll container widths...');
    
    if (projectsContainer) {
        const visibleProjectCards = Array.from(projectsContainer.children).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('hidden')
        );
        console.log('Visible project cards:', visibleProjectCards.length);
        updateContainerWidth(projectsContainer, visibleProjectCards);
    }
    
    if (certificationsContainer) {
        const visibleCertificationCards = Array.from(certificationsContainer.children).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('hidden')
        );
        console.log('Visible certification cards:', visibleCertificationCards.length);
        updateContainerWidth(certificationsContainer, visibleCertificationCards);
    }
}

// Helper function to update container width
function updateContainerWidth(container, visibleCards) {
    if (visibleCards.length === 0) return;
    
    const cardWidth = visibleCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 32; // Default gap from CSS
    const totalWidth = (cardWidth * visibleCards.length) + (gap * (visibleCards.length - 1));
    
    console.log('Container width calculation:', {
        cardWidth,
        cardCount: visibleCards.length,
        gap,
        totalWidth
    });
    
    container.style.width = totalWidth + 'px';
    
    // Check if scrolling is needed
    const scrollWrapper = container.parentElement;
    const wrapperWidth = scrollWrapper.offsetWidth;
    
    if (totalWidth <= wrapperWidth) {
        // No scrolling needed, center the content
        container.style.justifyContent = 'center';
        console.log('No scrolling needed, centering content');
    } else {
        // Scrolling needed, align to start
        container.style.justifyContent = 'flex-start';
        console.log('Scrolling needed, aligning to start');
    }
}

function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function initializeContactForm() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                }, 3000);
            }, 2000);
        });
    }
}

function initializeEffects() {
    // Skill tags hover effect
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Project card tilt effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Search functionality for projects (if needed)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            project.classList.add('fade-in');
        } else {
            project.style.display = 'none';
            project.classList.remove('fade-in');
        }
    });
    
    // Update scroll container width after filtering
    setTimeout(() => {
        updateScrollContainerWidth();
    }, 350);
}

// Update container widths on window resize
window.addEventListener('resize', function() {
    updateScrollContainerWidth();
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize scroll-to-top button
function initializeScrollToTop() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollButton);
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        }
    });
}

// Initialize progress bar
function initializeProgressBar() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.progress-bar')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        document.body.appendChild(progressBar);
    }
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        }
    });
}

// Add active navigation style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
`;
document.head.appendChild(style);

// Initialize additional professional features
initializeScrollToTop();
initializeProgressBar();

console.log('Portfolio website loaded successfully! 🚀');