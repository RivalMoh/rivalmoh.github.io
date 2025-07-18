// Custom JavaScript for Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting Portfolio initialization...');
    
    // Initialize AOS (Animate On Scroll) only if it's available
    if (typeof AOS !== 'undefined') {
        console.log('AOS library found, initializing...');
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    } else {
        console.log('AOS library not found, skipping animation initialization');
    }
    
    // Initialize all functionality
    initializePortfolio();
});

function initializePortfolio() {
    console.log('Initializing portfolio functionality...');
    
    // Initialize project filtering
    initializeProjectFiltering();
    
    // Initialize certification filtering
    initializeCertificationFiltering();
    
    // Initialize scroll container width
    setTimeout(() => {
        updateScrollContainerWidth();
    }, 100);
    
    // Initialize other functionality
    initializeNavigation();
    initializeContactForm();
    initializeEffects();
    
    console.log('Portfolio initialization complete!');
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

function initializeProjectFiltering() {
    const projectButtons = document.querySelectorAll('.project-categories .btn-category');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');
    
    console.log('Project buttons found:', projectButtons.length);
    console.log('Project cards found:', projectCards.length);
    
    if (projectButtons.length === 0 || projectCards.length === 0) {
        console.log('Project filtering elements not found');
        return;
    }
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            console.log('Filtering projects by category:', category);
            
            // Remove active class from all buttons
            projectButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter project cards
            projectCards.forEach(card => {
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

// Add active navigation style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #007bff !important;
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully! 🚀');