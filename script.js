// Test if JavaScript is loading
console.log('Script.js is loading...');

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

// Legacy mobile menu functions - now empty since mobile menu is removed
function toggleMobileMenu() {
    // Mobile menu functionality removed - now shows simple logo + CTA layout
}

function closeMobileMenu() {
    // Mobile menu functionality removed - now shows simple logo + CTA layout
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
        
        // Mobile nav links removed - using simple logo + CTA layout on mobile
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

// Team Carousel functionality
class TeamCarousel {
    constructor() {
        this.container = document.querySelector('.team-grid');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.cards = document.querySelectorAll('.team-card');
        this.currentSlide = 0;
        
        console.log('TeamCarousel constructor:', {
            container: this.container,
            dotsCount: this.dots.length,
            cardsCount: this.cards.length,
            windowWidth: window.innerWidth
        });
        
        this.init();
    }
    
    init() {
        console.log('TeamCarousel init called:', {
            hasContainer: !!this.container,
            windowWidth: window.innerWidth,
            shouldInit: this.container && window.innerWidth <= 639
        });
        
        if (!this.container || window.innerWidth > 639) {
            console.log('TeamCarousel init aborted - no container or window too wide');
            return;
        }
        
        console.log('TeamCarousel initializing...');
        
        // Add throttled scroll event listener
        let scrollTimeout;
        this.container.addEventListener('scroll', () => {
            console.log('Scroll event fired');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });
        
        // Add click listeners to dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                this.goToSlide(index);
            });
        });
        
        // Add touch support
        this.setupTouchHandlers();
        
        // Initial indicator update
        this.updateIndicators();
        
        console.log('TeamCarousel initialization complete');
    }
    
    handleScroll() {
        const scrollLeft = this.container.scrollLeft;
        const cardWidth = this.cards[0].offsetWidth + 40; // card width + margins
        const newSlide = Math.round(scrollLeft / cardWidth);
        
        // Ensure slide is within bounds
        const clampedSlide = Math.max(0, Math.min(newSlide, this.cards.length - 1));
        
        // Debug logging
        console.log(`Scroll: ${scrollLeft}, CardWidth: ${cardWidth}, NewSlide: ${newSlide}, Clamped: ${clampedSlide}`);
        
        if (clampedSlide !== this.currentSlide) {
            this.currentSlide = clampedSlide;
            this.updateIndicators();
            console.log(`Updated to slide ${this.currentSlide}`);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.cards.length) return;
        
        const cardWidth = this.cards[0].offsetWidth + 40; // card width + margins
        const scrollLeft = slideIndex * cardWidth;
        
        this.container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        
        this.currentSlide = slideIndex;
        this.updateIndicators();
    }
    
    updateIndicators() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        console.log(`Indicators updated: active slide ${this.currentSlide}`);
    }
    
    setupTouchHandlers() {
        let startX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0 && this.currentSlide < this.cards.length - 1) {
                    this.goToSlide(this.currentSlide + 1);
                } else if (diffX < 0 && this.currentSlide > 0) {
                    this.goToSlide(this.currentSlide - 1);
                }
            }
            
            isDragging = false;
        });
    }
}

// Simple Team Carousel function (backup approach)
function initTeamCarousel() {
    console.log('initTeamCarousel called');
    
    const container = document.querySelector('.team-grid');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.team-card');
    
    console.log('Elements found:', {
        container: !!container,
        dotsCount: dots.length,
        cardsCount: cards.length,
        windowWidth: window.innerWidth
    });
    
    if (!container || window.innerWidth > 639) {
        console.log('Carousel not initialized - no container or window too wide');
        return;
    }
    
    let currentSlide = 0;
    let autoRotateInterval;
    let isUserInteracting = false;
    let userInteractionTimeout;
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        console.log(`Dots updated: active slide ${currentSlide}`);
    }
    
    function goToSlide(slideIndex) {
        const cardWidth = cards[0].offsetWidth + 40;
        const scrollLeft = slideIndex * cardWidth;
        
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });
        
        currentSlide = slideIndex;
        updateDots();
        console.log(`Moved to slide ${currentSlide}`);
    }
    
    function startAutoRotate() {
        if (autoRotateInterval) return;
        
        autoRotateInterval = setInterval(() => {
            if (!isUserInteracting) {
                const nextSlide = (currentSlide + 1) % cards.length;
                console.log(`Auto-rotating from ${currentSlide} to ${nextSlide}`);
                goToSlide(nextSlide);
            }
        }, 3000);
        console.log('Auto-rotate started');
    }
    
    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
            console.log('Auto-rotate stopped');
        }
    }
    
    function handleUserInteraction() {
        isUserInteracting = true;
        stopAutoRotate();
        
        // Clear existing timeout
        clearTimeout(userInteractionTimeout);
        
        // Restart auto-rotate after 5 seconds of no interaction
        userInteractionTimeout = setTimeout(() => {
            isUserInteracting = false;
            startAutoRotate();
        }, 5000);
    }
    
    // Add dot click listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            console.log(`Dot ${index} clicked`);
            handleUserInteraction();
            goToSlide(index);
        });
    });
    
    // Handle manual swiping/touching
    container.addEventListener('touchstart', handleUserInteraction);
    
    // Simplified scroll detection (only for manual scrolling detection)
    let scrollTimeout;
    container.addEventListener('scroll', function() {
        // Only handle if user is manually scrolling
        if (!isUserInteracting && scrollTimeout) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = container.scrollLeft;
            const cardWidth = cards[0].offsetWidth + 40;
            const newSlide = Math.round(scrollLeft / cardWidth);
            const clampedSlide = Math.max(0, Math.min(newSlide, cards.length - 1));
            
            if (clampedSlide !== currentSlide) {
                currentSlide = clampedSlide;
                updateDots();
                console.log(`Manual scroll detected: updated to slide ${currentSlide}`);
            }
        }, 150);
    });
    
    // Initial setup
    updateDots();
    startAutoRotate();
    console.log('Team carousel initialized successfully with clean auto-rotate');
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - starting initialization');
    
    try {
        // Initialize performance monitoring
        console.log('Initializing PerformanceMonitor...');
        new PerformanceMonitor();
        console.log('PerformanceMonitor initialized');
    } catch (error) {
        console.error('Error initializing PerformanceMonitor:', error);
    }
    
    try {
        // Initialize modern app
        console.log('Initializing App...');
        new App();
        console.log('App initialized');
    } catch (error) {
        console.error('Error initializing App:', error);
    }
    
    try {
        // Initialize testimonial
        console.log('Initializing testimonial...');
        updateTestimonial();
        console.log('Testimonial updated');
    } catch (error) {
        console.error('Error updating testimonial:', error);
    }
    
    try {
        // Initialize team carousel
        console.log('About to initialize TeamCarousel');
        initTeamCarousel();
        console.log('TeamCarousel initialization attempted');
    } catch (error) {
        console.error('Error initializing TeamCarousel:', error);
    }
    
    console.log('All initialization attempts completed');
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

