// ==========================================================================
// Modern Portfolio Website JavaScript
// Vansh Diora Portfolio - Professional Implementation
// ==========================================================================

'use strict';

// ==========================================================================
// Utility Functions
// ==========================================================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// ==========================================================================
// Navigation Functionality
// ==========================================================================
class Navigation {
    constructor() {
        this.navbar = $('.navbar');
        this.navToggle = $('.nav-toggle');
        this.navMenu = $('.nav-menu');
        this.navLinks = $$('.nav-link');
        this.sections = $$('section[id]');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleScrollSpy();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Handle scroll events for navbar styling
        window.addEventListener('scroll', throttle(() => this.handleNavbarScroll(), 16));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar?.contains(e.target) && this.navMenu?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');
        document.body.style.overflow = this.navMenu?.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleNavbarScroll() {
        const scrolled = window.scrollY > 50;
        this.navbar?.classList.toggle('scrolled', scrolled);
    }

    handleScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = $(targetId);

                if (targetSection) {
                    const navHeight = this.navbar?.offsetHeight || 0;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ==========================================================================
// Scroll Animations
// ==========================================================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = $$('[data-animate], .timeline-item, .project-card, .stat, .skill-tag');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
    }

    addAnimationClasses() {
        // Add data-animate attributes to elements that should animate
        const elementsToAnimate = [
            { selector: '.timeline-item', animation: 'fadeInLeft' },
            { selector: '.project-card', animation: 'fadeInUp' },
            { selector: '.stat', animation: 'fadeInUp' },
            { selector: '.about-paragraph', animation: 'fadeInUp' },
            { selector: '.skills-category', animation: 'fadeInRight' },
            { selector: '.contact-item', animation: 'fadeInLeft' }
        ];

        elementsToAnimate.forEach(({ selector, animation }) => {
            $$(selector).forEach((el, index) => {
                el.setAttribute('data-animate', animation);
                el.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
}

// ==========================================================================
// Form Handling
// ==========================================================================
class ContactForm {
    constructor() {
        this.form = $('.contact-form');
        this.inputs = $$('.form-group input, .form-group textarea');
        this.submitBtn = $('.contact-form button[type="submit"]');

        this.init();
    }

    init() {
        if (!this.form) return;

        this.setupEventListeners();
        this.setupInputAnimations();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.inputs.forEach(input => {
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
            input.addEventListener('input', () => this.handleInputChange(input));
        });
    }

    setupInputAnimations() {
        this.inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (input.value.trim() !== '') {
                formGroup?.classList.add('has-value');
            }
        });
    }

    handleInputFocus(input) {
        const formGroup = input.closest('.form-group');
        formGroup?.classList.add('focused');
    }

    handleInputBlur(input) {
        const formGroup = input.closest('.form-group');
        formGroup?.classList.remove('focused');

        if (input.value.trim() === '') {
            formGroup?.classList.remove('has-value');
        }
    }

    handleInputChange(input) {
        const formGroup = input.closest('.form-group');
        if (input.value.trim() !== '') {
            formGroup?.classList.add('has-value');
        } else {
            formGroup?.classList.remove('has-value');
        }

        // Remove error state when user starts typing
        formGroup?.classList.remove('error');
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            this.setSubmitState('loading');

            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);

            this.setSubmitState('success');
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
            this.inputs.forEach(input => this.handleInputChange(input));

        } catch (error) {
            this.setSubmitState('error');
            this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const value = field.value.trim();

            if (!value) {
                formGroup?.classList.add('error');
                isValid = false;
            } else if (field.type === 'email' && !this.isValidEmail(value)) {
                formGroup?.classList.add('error');
                isValid = false;
            } else {
                formGroup?.classList.remove('error');
            }
        });

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setSubmitState(state) {
        const states = {
            loading: { text: 'Sending...', disabled: true, class: 'loading' },
            success: { text: 'Sent!', disabled: false, class: 'success' },
            error: { text: 'Try Again', disabled: false, class: 'error' },
            default: { text: 'Send Message', disabled: false, class: '' }
        };

        const currentState = states[state] || states.default;

        if (this.submitBtn) {
            this.submitBtn.textContent = currentState.text;
            this.submitBtn.disabled = currentState.disabled;
            this.submitBtn.className = `btn btn-primary ${currentState.class}`;
        }

        if (state === 'success' || state === 'error') {
            setTimeout(() => this.setSubmitState('default'), 3000);
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Simulation error'));
                }
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-in-out',
            maxWidth: '400px',
            wordWrap: 'break-word'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM and animate in
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// ==========================================================================
// Interactive Elements
// ==========================================================================
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkillTags();
        this.setupProjectCards();
        this.setupScrollToTop();
        this.setupTypingEffect();
        this.setupParallaxEffect();
    }

    setupSkillTags() {
        const skillTags = $$('.skill-tag');

        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });

            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupProjectCards() {
        const projectCards = $$('.project-card');

        projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const links = card.querySelectorAll('.project-link');

            if (overlay && links.length > 0) {
                // Add ripple effect on click
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        if (link.getAttribute('href') === '#') {
                            e.preventDefault();
                            this.createRippleEffect(link, e);
                        }
                    });
                });
            }
        });
    }

    createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        Object.assign(ripple.style, {
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');

        Object.assign(scrollButton.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #f59e0b)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.3s ease',
            zIndex: '1000',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        });

        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', throttle(() => {
            const showButton = window.scrollY > 500;
            scrollButton.style.opacity = showButton ? '1' : '0';
            scrollButton.style.transform = showButton ? 'translateY(0)' : 'translateY(20px)';
        }, 16));

        // Scroll to top on click
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupTypingEffect() {
        const subtitle = $('.hero-subtitle');
        if (!subtitle) return;

        const text = subtitle.textContent;
        subtitle.textContent = '';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        };

        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }

    setupParallaxEffect() {
        const hero = $('.hero');
        if (!hero) return;

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;

            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 16));
    }
}

// ==========================================================================
// Performance Optimization
// ==========================================================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.preloadCriticalResources();
        this.optimizeImages();
    }

    setupLazyLoading() {
        const images = $$('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    preloadCriticalResources() {
        const criticalResources = [
            'styles/main.css',
            'assets/profile-placeholder.jpg'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'image';
            document.head.appendChild(link);
        });
    }

    optimizeImages() {
        const images = $$('img');

        images.forEach(img => {
            // Add loading="lazy" to non-critical images
            if (!img.closest('.hero')) {
                img.loading = 'lazy';
            }

            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
                console.warn(`Failed to load image: ${img.src}`);
            });
        });
    }
}

// ==========================================================================
// Animation Styles (injected via JavaScript)
// ==========================================================================
function injectAnimationStyles() {
    const animationCSS = `
        <style>
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .animate-on-scroll[data-animate="fadeInLeft"] {
            transform: translateX(-30px);
        }

        .animate-on-scroll[data-animate="fadeInRight"] {
            transform: translateX(30px);
        }

        .animate-on-scroll[data-animate="fadeInLeft"].animate,
        .animate-on-scroll[data-animate="fadeInRight"].animate {
            transform: translateX(0);
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .form-group.error input,
        .form-group.error textarea {
            border-color: #ef4444;
            animation: shake 0.3s ease-in-out;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }

        .btn.loading {
            position: relative;
            color: transparent !important;
        }

        .btn.loading::after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            margin-left: -8px;
            margin-top: -8px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', animationCSS);
}

// ==========================================================================
// Main Application
// ==========================================================================
class PortfolioApp {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Inject animation styles
            injectAnimationStyles();

            // Initialize components
            this.components = [
                new Navigation(),
                new ScrollAnimations(),
                new ContactForm(),
                new InteractiveElements(),
                new PerformanceOptimizer()
            ];

            // Setup global error handling
            this.setupErrorHandling();

            // Initialize analytics (if needed)
            this.initializeAnalytics();

            console.log('Portfolio website initialized successfully');

        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    initializeAnalytics() {
        // Placeholder for analytics initialization
        // Replace with your preferred analytics solution
        if (window.gtag) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: 'Vansh Diora Portfolio',
                page_location: window.location.href
            });
        }
    }
}

// ==========================================================================
// Initialize Application
// ==========================================================================
const app = new PortfolioApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Navigation, ContactForm };
}