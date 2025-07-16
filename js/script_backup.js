// Custom JavaScript for Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) only if it's available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Initialize all functionality
    initializePortfolio();
});

function initializePortfolio() {
    // Initialize project filtering
    initializeProjectFiltering();
    
    // Initialize certification filtering
    initializeCertificationFiltering();
    
    // Initialize scroll container width
    updateScrollContainerWidth();
    
    // Initialize other functionality
    initializeNavigation();
    initializeContactForm();
    initializeEffects();
}

function initializeProjectFiltering() {
    const projectButtons = document.querySelectorAll('.project-categories .btn-category');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');
    
    if (projectButtons.length === 0 || projectCards.length === 0) {
        console.log('Project filtering elements not found');
        return;
    }
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
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
    
    if (certificationButtons.length === 0 || certificationCards.length === 0) {
        console.log('Certification filtering elements not found');
        return;
    }
    
    certificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
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
    
    if (projectsContainer) {
        const visibleProjectCards = Array.from(projectsContainer.children).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('hidden')
        );
        updateContainerWidth(projectsContainer, visibleProjectCards);
    }
    
    if (certificationsContainer) {
        const visibleCertificationCards = Array.from(certificationsContainer.children).filter(card => 
            card.style.display !== 'none' && !card.classList.contains('hidden')
        );
        updateContainerWidth(certificationsContainer, visibleCertificationCards);
    }
}

// Helper function to update container width
function updateContainerWidth(container, visibleCards) {
    if (visibleCards.length === 0) return;
    
    const cardWidth = visibleCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 32; // Default gap from CSS
    const totalWidth = (cardWidth * visibleCards.length) + (gap * (visibleCards.length - 1));
    
    container.style.width = totalWidth + 'px';
    
    // Check if scrolling is needed
    const scrollWrapper = container.parentElement;
    const wrapperWidth = scrollWrapper.offsetWidth;
    
    if (totalWidth <= wrapperWidth) {
        // No scrolling needed, center the content
        container.style.justifyContent = 'center';
    } else {
        // Scrolling needed, align to start
        container.style.justifyContent = 'flex-start';
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 10);

// Add active navigation style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #007bff !important;
    }
`;
document.head.appendChild(style);

console.log('Portfolio website loaded successfully! 🚀');

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
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const currentValue = Math.floor(start + (end - start) * progress);
        element.textContent = currentValue + (element.dataset.suffix || '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                counter.dataset.suffix = counter.textContent.replace(/[0-9]/g, '');
                animateCounter(counter, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}

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
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
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
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load dark mode preference
window.addEventListener('load', function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Mobile menu close on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: 50%;
                top: 50%;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .scrolled {
        background: rgba(33, 37, 41, 0.98) !important;
        backdrop-filter: blur(10px);
    }
    
    .nav-link.active {
        color: #007bff !important;
    }
`;
document.head.appendChild(style);

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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Portfolio website loaded successfully! 🚀');

// Certification filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const certificationButtons = document.querySelectorAll('.certification-categories .btn-category');
    const certificationCards = document.querySelectorAll('#certificationsContainer .certification-card');
    
    certificationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
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
    
    // Initialize scroll container width
    updateScrollContainerWidth();
});

// Function to update scroll container width and prevent overscrolling
function updateScrollContainerWidth() {
    const projectsContainer = document.getElementById('projectsContainer');
    const certificationsContainer = document.getElementById('certificationsContainer');
    
    if (projectsContainer) {
        const visibleProjectCards = Array.from(projectsContainer.children).filter(card => 
            card.style.display !== 'none'
        );
        updateContainerWidth(projectsContainer, visibleProjectCards);
    }
    
    if (certificationsContainer) {
        const visibleCertificationCards = Array.from(certificationsContainer.children).filter(card => 
            card.style.display !== 'none'
        );
        updateContainerWidth(certificationsContainer, visibleCertificationCards);
    }
}

// Helper function to update container width
function updateContainerWidth(container, visibleCards) {
    if (visibleCards.length === 0) return;
    
    const cardWidth = visibleCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const totalWidth = (cardWidth * visibleCards.length) + (gap * (visibleCards.length - 1));
    
    container.style.width = totalWidth + 'px';
    
    // Check if scrolling is needed
    const scrollWrapper = container.parentElement;
    const wrapperWidth = scrollWrapper.offsetWidth;
    
    if (totalWidth <= wrapperWidth) {
        // No scrolling needed, center the content
        container.style.justifyContent = 'center';
    } else {
        // Scrolling needed, align to start
        container.style.justifyContent = 'flex-start';
    }
}

// Update container widths on window resize
window.addEventListener('resize', function() {
    updateScrollContainerWidth();
});

// Enhanced project filtering with proper scroll handling
document.addEventListener('DOMContentLoaded', function() {
    const projectButtons = document.querySelectorAll('.project-categories .btn-category');
    const projectCards = document.querySelectorAll('#projectsContainer .project-card');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
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
});
