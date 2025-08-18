// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 70; // Account for fixed header
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Navigation link highlighting
function updateActiveNavLink() {
    const sections = ['solution', 'why-us', 'about', 'team', 'faq'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Modal functionality
function openModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    const firstFocusableElement = modal.querySelector('input, button, textarea');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
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
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted with data:', data);
    
    // Show success message (placeholder)
    alert('Thank you for your message! We\'ll get back to you soon.');
    closeModal();
    
    // Reset form
    event.target.reset();
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

// Mobile menu functionality
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileNavOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    overlay.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobileNavOverlay');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    overlay.classList.remove('active');
    toggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add scroll event listener for active nav highlighting and header opacity
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderOpacity();
    });
    
    // Add form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Initialize testimonial
    updateTestimonial();
    
    // Add hover effects for team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature columns for animation
    const featureColumns = document.querySelectorAll('.feature-column');
    featureColumns.forEach(column => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(30px)';
        column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(column);
    });
    
    // Observe team cards for animation
    const teamCards2 = document.querySelectorAll('.team-card');
    teamCards2.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
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

// Enhanced form validation
document.addEventListener('DOMContentLoaded', function() {
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
});

// Add loading state for form submission
function setFormLoading(isLoading) {
    const submitBtn = document.querySelector('.submit-btn');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    if (isLoading) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formInputs.forEach(input => input.disabled = true);
    } else {
        submitBtn.textContent = 'Send';
        submitBtn.disabled = false;
        formInputs.forEach(input => input.disabled = false);
    }
}