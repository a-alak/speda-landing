// Modern scroll utilities using ES6+
const ScrollUtils = {
    headerHeight: 70,
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (!element) return;
        
        const elementPosition = element.offsetTop - this.headerHeight;
        
        // Use modern scrollTo with behavior
        window.scrollTo({
            top: elementPosition,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    }
};

// Legacy function wrappers for backwards compatibility
function scrollToSection(sectionId) {
    ScrollUtils.scrollToSection(sectionId);
}

function scrollToTop() {
    ScrollUtils.scrollToTop();
}

// Modern navigation highlighting with intersection observer
class NavigationHighlighter {
    constructor() {
        this.sections = ['solution', 'why-us', 'about', 'team', 'faq'];
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentSection = '';
        this.init();
    }
    
    init() {
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.setupScrollListener();
        }
    }
    
    setupIntersectionObserver() {
        const options = {
            rootMargin: '-50px 0px -50px 0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveLink(entry.target.id);
                }
            });
        }, options);
        
        this.sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });
    }
    
    setupScrollListener() {
        // Throttled scroll listener fallback
        let ticking = false;
        
        const updateOnScroll = () => {
            this.sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        this.updateActiveLink(sectionId);
                    }
                }
            });
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }, { passive: true });
    }
    
    updateActiveLink(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }
}

// Legacy function for backwards compatibility
function updateActiveNavLink() {
    // This is now handled by NavigationHighlighter class
}

// Modal functionality
function openModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add active class with slight delay for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus trap
    const firstFocusableElement = modal.querySelector('input, button, textarea');
    if (firstFocusableElement) {
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 350);
    }
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Hide modal after animation completes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeMobileMenu();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const overlay = document.getElementById('mobileNavOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (overlay.classList.contains('active') && 
        !overlay.contains(event.target) && 
        !toggle.contains(event.target)) {
        closeMobileMenu();
    }
});

// FAQ accordion functionality
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Close all other FAQ items
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
}

// Testimonial slider functionality
let currentTestimonial = 0;
const testimonials = [
    {
        text: "Working with this team has been incredibly beneficial. They're easily accessible and quick to respond, which I really appreciate. They consistently provided a clear overview of the data and storage procedures, demonstrating a firm grasp on where and how we would retrieve the information. The data they delivered was high-quality and user-friendly, though I did need to manually look up some details that were not included in the initial extraction. I would definitely use their services again and wouldn't hesitate to recommend them to others, especially for projects involving 100 patients or more. For larger datasets, I see tremendous potential for time savings. Overall, their service has significantly streamlined our research process.",
        source: "Medical Researcher, Danish Capital Region",
        logo: "images/d22758_3b2eeed0bdeb4fe8af3232dbb4d13c8c~mv2.avif"
    }
];

function updateTestimonial() {
    const testimonialContent = document.querySelector('.testimonial-content blockquote');
    const testimonialSource = document.querySelector('.testimonial-source p');
    const testimonialLogo = document.querySelector('.testimonial-logo');
    
    if (testimonials[currentTestimonial]) {
        testimonialContent.textContent = `"${testimonials[currentTestimonial].text}"`;
        testimonialSource.textContent = testimonials[currentTestimonial].source;
        testimonialLogo.src = testimonials[currentTestimonial].logo;
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

// Contact form submission
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    setFormLoading(true);
    hideFormMessage();
    
    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically send the data to a server
        console.log('Form submitted with data:', data);
        
        // Show success message
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            closeModal();
        }, 2000);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        setFormLoading(false);
    }
}

// Show/hide form messages
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type} show`;
}

function hideFormMessage() {
    const formMessage = document.getElementById('formMessage');
    formMessage.classList.remove('show');
}

// Header scroll opacity functionality
function updateHeaderOpacity() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Parallax effect for About section
function updateParallaxEffect() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = aboutSection.offsetTop;
    const sectionHeight = aboutSection.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Check if section is in viewport
    if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
        const parallaxSpeed = 0.5;
        const yPos = -(scrollTop - sectionTop) * parallaxSpeed;
        aboutSection.style.backgroundPosition = `center ${yPos}px`;
    }
}

// Modern mobile menu class
class MobileMenu {
    constructor() {
        this.overlay = document.getElementById('mobileNavOverlay');
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.isOpen = false;
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        if (this.isOpen) return;
        
        this.overlay?.classList.add('active');
        this.toggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: { isOpen: true } }));
    }
    
    close() {
        if (!this.isOpen) return;
        
        this.overlay?.classList.remove('active');
        this.toggle?.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.isOpen = false;
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: { isOpen: false } }));
    }
}

// Initialize mobile menu
const mobileMenu = new MobileMenu();

// Legacy functions for backwards compatibility
function toggleMobileMenu() {
    mobileMenu.toggle();
}

function closeMobileMenu() {
    mobileMenu.close();
}

// Simple image lazy loading utility
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }
    
    init() {
        // Just add loaded class when images load (native lazy loading handles the rest)
        this.images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                }, { once: true });
            }
        });
    }
}

// App initialization class
class App {
    constructor() {
        this.navigationHighlighter = null;
        this.lazyImageLoader = null;
        this.init();
    }
    
    init() {
        // Initialize components
        this.navigationHighlighter = new NavigationHighlighter();
        this.lazyImageLoader = new LazyImageLoader();
        
        // Setup navigation links
        this.setupNavigation();
        
        // Setup scroll handlers
        this.setupScrollHandlers();
        
        // Setup form handlers
        this.setupForms();
        
        // Setup animations
        this.setupAnimations();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                ScrollUtils.scrollToSection(targetId);
            });
        });
        
        // Setup mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                ScrollUtils.scrollToSection(targetId);
                mobileMenu.close();
            });
        });
    }
    
    setupScrollHandlers() {
        // Throttled scroll handler for header opacity and parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeaderOpacity();
                    updateParallaxEffect();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    setupForms() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmission);
        }
        
        // Setup email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    }
    
    setupAnimations() {
        // Setup intersection observer for animations
        if ('IntersectionObserver' in window) {
            this.setupScrollAnimations();
        }
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-column, .team-card');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance monitoring
    new PerformanceMonitor();
    
    // Initialize modern app
    new App();
    
    // Initialize testimonial
    updateTestimonial();
});

// Prevent form submission if required fields are empty
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter signup handler
function handleNewsletterSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('.newsletter-input');
    const submitBtn = form.querySelector('.newsletter-btn');
    
    if (!validateEmail(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<div style="width: 16px; height: 16px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success state
        submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>';
        submitBtn.style.background = '#22c55e';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
}

// Enhanced form validation (will be called from App initialization)

// Add loading state for form submission
function setFormLoading(isLoading) {
    const submitBtn = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formInputs.forEach(input => input.disabled = true);
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        formInputs.forEach(input => input.disabled = false);
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        // Measure FCP, LCP, CLS, FID
        if ('PerformanceObserver' in window) {
            this.observeWebVitals();
        }
        
        // Log initial page load metrics
        window.addEventListener('load', () => {
            this.logPageLoadMetrics();
        });
    }
    
    observeWebVitals() {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        const fidObserver = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                this.metrics.fid = entry.processingStart - entry.startTime;
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((entryList) => {
            let clsScore = 0;
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                }
            });
            this.metrics.cls = clsScore;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
    
    logPageLoadMetrics() {
        if (window.performance && window.performance.navigation) {
            const perfData = window.performance.timing;
            const networkConnect = perfData.connectEnd - perfData.connectStart;
            const pageLoad = perfData.loadEventEnd - perfData.navigationStart;
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
            
            console.log('Performance Metrics:', {
                networkConnect,
                pageLoad,
                domContentLoaded,
                ...this.metrics
            });
        }
    }
}

