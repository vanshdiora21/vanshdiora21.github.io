// ==========================================================================
// ENHANCED PORTFOLIO JAVASCRIPT - CUTTING-EDGE INTERACTIONS
// Advanced animations, smooth transitions, and modern web interactions
// ==========================================================================

'use strict';

// ==========================================================================
// UTILITY FUNCTIONS & HELPERS
// ==========================================================================
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

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

const lerp = (start, end, factor) => start + (end - start) * factor;

// ==========================================================================
// ADVANCED CURSOR EFFECTS
// ==========================================================================
class CustomCursor {
    constructor() {
        this.cursor = this.createCursor();
        this.cursorTrail = this.createTrail();
        this.isVisible = true;
        this.targetScale = 1;
        this.currentScale = 1;

        this.bindEvents();
        this.animate();
    }

    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(240, 147, 251, 0.6));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.15s ease-out;
        `;
        document.body.appendChild(cursor);
        return cursor;
    }

    createTrail() {
        const trail = [];
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${8 - i * 0.5}px;
                height: ${8 - i * 0.5}px;
                background: rgba(102, 126, 234, ${0.3 - i * 0.03});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(dot);
            trail.push({ element: dot, x: 0, y: 0 });
        }
        return trail;
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale cursor on interactive elements
        $$('a, button, .project-card, .social-link').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.targetScale = 1.5;
                this.cursor.style.background = 'radial-gradient(circle, rgba(79, 172, 254, 0.8), rgba(0, 242, 254, 0.6))';
            });

            el.addEventListener('mouseleave', () => {
                this.targetScale = 1;
                this.cursor.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(240, 147, 251, 0.6))';
            });
        });
    }

    animate() {
        this.currentScale = lerp(this.currentScale, this.targetScale, 0.15);
        this.cursor.style.transform = `scale(${this.currentScale})`;

        // Update trail
        this.cursorTrail.forEach((dot, index) => {
            const delay = index * 0.02;
            setTimeout(() => {
                const rect = this.cursor.getBoundingClientRect();
                dot.element.style.left = rect.left + rect.width / 2 - dot.element.offsetWidth / 2 + 'px';
                dot.element.style.top = rect.top + rect.height / 2 - dot.element.offsetHeight / 2 + 'px';
            }, delay * 1000);
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// ADVANCED NAVIGATION
// ==========================================================================
class EnhancedNavigation {
    constructor() {
        this.navbar = $('.navbar');
        this.navToggle = $('.nav-toggle');
        this.navMenu = $('.nav-menu');
        this.navLinks = $$('.nav-link');
        this.sections = $$('section[id]');
        this.isScrolling = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollSpy();
        this.setupSmoothScrolling();
        this.setupMagneticEffect();
    }

    setupEventListeners() {
        // Mobile menu toggle with enhanced animation
        this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar?.contains(e.target) && this.navMenu?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Enhanced scroll handling
        window.addEventListener('scroll', throttle(() => this.handleScroll(), 10));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    toggleMobileMenu() {
        const isActive = this.navMenu?.classList.toggle('active');
        this.navToggle?.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';

        // Animate menu items
        if (isActive) {
            this.navLinks.forEach((link, index) => {
                link.style.animation = `slideInFromRight 0.3s ease-out ${index * 0.1}s both`;
            });
        }
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (this.isScrolling) return;

        const scrolled = window.scrollY > 50;
        this.navbar?.classList.toggle('scrolled', scrolled);

        // Add scroll direction detection
        if (!this.lastScrollY) this.lastScrollY = window.scrollY;
        const isScrollingDown = window.scrollY > this.lastScrollY;

        if (window.scrollY > 200) {
            this.navbar?.classList.toggle('nav-hidden', isScrollingDown);
        }

        this.lastScrollY = window.scrollY;
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
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
                    this.smoothScrollTo(targetSection);
                    this.closeMobileMenu();
                }
            });
        });
    }

    smoothScrollTo(target) {
        this.isScrolling = true;
        const navHeight = this.navbar?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    setupMagneticEffect() {
        this.navLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0)';
            });
        });
    }

    handleKeyboard(e) {
        if (e.key === 'Escape' && this.navMenu?.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }
}

// ==========================================================================
// TYPING ANIMATION
// ==========================================================================
class TypeWriter {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000,
            loop: true,
            ...options
        };
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isWaiting = false;

        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isWaiting) {
            setTimeout(() => {
                this.isWaiting = false;
                this.type();
            }, this.options.delayBetweenWords);
            return;
        }

        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;

            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
                this.isWaiting = true;
            }
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;

            if (this.charIndex === currentWord.length) {
                this.isDeleting = true;
                this.isWaiting = true;
            }
        }

        const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// ==========================================================================
// ANIMATED COUNTERS
// ==========================================================================
class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.hasAnimated = false;

        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(this.element);
    }

    animate() {
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (this.target - startValue) * easeOutCubic);

            this.element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };

        requestAnimationFrame(updateCounter);
    }
}

// ==========================================================================
// ADVANCED SCROLL ANIMATIONS
// ==========================================================================
class ScrollAnimations {
    constructor() {
        this.elements = $$('[data-aos]');
        this.skillBars = $$('.skill-progress');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxElements();
        this.animateSkillBars();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');

                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('aos-animate');
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));
    }

    setupParallaxElements() {
        const parallaxElements = $$('[data-parallax]');

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }

    animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItem = entry.target.closest('.skill-item');
                    const level = skillItem.dataset.level;
                    const progressBar = skillItem.querySelector('.skill-progress');

                    setTimeout(() => {
                        progressBar.style.width = level + '%';
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }
}

// ==========================================================================
// ADVANCED CONTACT FORM
// ==========================================================================
class EnhancedContactForm {
    constructor() {
        this.form = $('.contact-form');
        this.inputs = $$('.form-group input, .form-group textarea');
        this.submitBtn = $('.submit-btn');

        if (!this.form) return;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFloatingLabels();
        this.setupRealTimeValidation();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.handleInputChange(input));
            input.addEventListener('focus', () => this.handleInputFocus(input));
            input.addEventListener('blur', () => this.handleInputBlur(input));
        });
    }

    setupFloatingLabels() {
        this.inputs.forEach(input => {
            const label = input.nextElementSibling;
            if (input.value.trim() !== '') {
                label?.classList.add('active');
            }
        });
    }

    setupRealTimeValidation() {
        this.inputs.forEach(input => {
            input.addEventListener('input', debounce(() => {
                this.validateField(input);
            }, 300));
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;

        // Remove previous error states
        formGroup.classList.remove('error', 'success');

        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
        }

        formGroup.classList.add(isValid ? 'success' : 'error');
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleInputChange(input) {
        const label = input.nextElementSibling;
        label?.classList.toggle('active', input.value.trim() !== '');
    }

    handleInputFocus(input) {
        const formGroup = input.closest('.form-group');
        formGroup?.classList.add('focused');
    }

    handleInputBlur(input) {
        const formGroup = input.closest('.form-group');
        formGroup?.classList.remove('focused');
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate all fields
        let isFormValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors before submitting.', 'error');
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            this.setSubmitState('loading');

            // Simulate form submission
            await this.simulateSubmission(data);

            this.setSubmitState('success');
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();

            // Reset labels
            this.inputs.forEach(input => {
                const label = input.nextElementSibling;
                label?.classList.remove('active');
                input.closest('.form-group')?.classList.remove('success', 'error');
            });

        } catch (error) {
            this.setSubmitState('error');
            this.showNotification('Failed to send message. Please try again.', 'error');
        }
    }

    setSubmitState(state) {
        this.submitBtn.classList.remove('loading', 'success', 'error');

        if (state !== 'default') {
            this.submitBtn.classList.add(state);
        }

        const stateConfig = {
            loading: { disabled: true },
            success: { disabled: false },
            error: { disabled: false },
            default: { disabled: false }
        };

        this.submitBtn.disabled = stateConfig[state]?.disabled || false;

        if (state === 'success' || state === 'error') {
            setTimeout(() => this.setSubmitState('default'), 3000);
        }
    }

    async simulateSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve(data) : reject(new Error('Simulation error'));
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            maxWidth: '400px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });

        const colors = {
            success: 'linear-gradient(135deg, #43e97b, #38f9d7)',
            error: 'linear-gradient(135deg, #fa709a, #fee140)',
            info: 'linear-gradient(135deg, #667eea, #764ba2)'
        };

        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// ==========================================================================
// INTERACTIVE PARTICLES
// ==========================================================================
class ParticleSystem {
    constructor() {
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        document.body.appendChild(canvas);
        return canvas;
    }

    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
            }

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// PROJECT SHOWCASE ENHANCEMENTS
// ==========================================================================
class ProjectShowcase {
    constructor() {
        this.projectCards = $$('.project-card');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupTiltEffect();
        this.setupLightboxEffect();
    }

    setupHoverEffects() {
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createRippleEffect(card);
                this.enhanceGlowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.resetEffects(card);
            });
        });
    }

    setupTiltEffect() {
        this.projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    createRippleEffect(card) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        card.style.position = 'relative';
        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    enhanceGlowEffect(card) {
        const glow = card.querySelector('.project-glow');
        if (glow) {
            glow.style.opacity = '0.7';
            glow.style.filter = 'blur(20px)';
        }
    }

    resetEffects(card) {
        const glow = card.querySelector('.project-glow');
        if (glow) {
            glow.style.opacity = '';
            glow.style.filter = '';
        }
    }

    setupLightboxEffect() {
        const projectImages = $$('.project-image img');

        projectImages.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt);
            });
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;

        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
        `;

        document.body.appendChild(lightbox);

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => lightbox.remove(), 300);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeBtn.click();
            }
        });
    }
}

// ==========================================================================
// MAIN APPLICATION INITIALIZATION
// ==========================================================================
class EnhancedPortfolioApp {
    constructor() {
        this.components = new Map();
        this.isInitialized = false;

        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize enhanced cursor (only on desktop)
            if (window.innerWidth > 768) {
                this.components.set('cursor', new CustomCursor());
            }

            // Initialize core components
            this.components.set('navigation', new EnhancedNavigation());
            this.components.set('scrollAnimations', new ScrollAnimations());
            this.components.set('contactForm', new EnhancedContactForm());
            this.components.set('projectShowcase', new ProjectShowcase());

            // Initialize particle system (only on desktop for performance)
            if (window.innerWidth > 1024) {
                this.components.set('particles', new ParticleSystem());
            }

            // Initialize typing animation
            const typingElement = $('.typing-text');
            if (typingElement) {
                this.components.set('typewriter', new TypeWriter(typingElement, [
                    'Quantitative Finance Expert',
                    'Software Developer',
                    'Private Equity Analyst',
                    'CFA Level I Candidate',
                    'Machine Learning Enthusiast'
                ]));
            }

            // Initialize animated counters
            $$('.stat-number').forEach(el => {
                const target = el.dataset.target;
                if (target) {
                    new AnimatedCounter(el, target);
                }
            });

            // Add custom animations
            this.addCustomAnimations();

            // Setup performance monitoring
            this.setupPerformanceMonitoring();

            // Setup error handling
            this.setupErrorHandling();

            this.isInitialized = true;
            console.log('Enhanced Portfolio initialized successfully');

        } catch (error) {
            console.error('Error initializing enhanced portfolio:', error);
        }
    }

    addCustomAnimations() {
        // Add slideInFromRight animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInFromRight {
                from {
                    transform: translateX(50px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes ripple {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }

            @keyframes fadeIn {
                to { opacity: 1; }
            }

            @keyframes fadeOut {
                to { opacity: 0; }
            }

            .navbar.nav-hidden {
                transform: translateY(-100%);
                transition: transform 0.3s ease-in-out;
            }

            .form-group.success input,
            .form-group.success textarea {
                border-color: #43e97b;
            }

            .form-group.error input,
            .form-group.error textarea {
                border-color: #fa709a;
                animation: shake 0.3s ease-in-out;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }

            .lightbox-content img {
                width: 100%;
                height: auto;
                border-radius: 1rem;
            }

            .lightbox-close {
                position: absolute;
                top: -40px;
                right: -40px;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    setupPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;

        const measureFPS = (currentTime) => {
            frameCount++;
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });
    }

    // Public API for external access
    getComponent(name) {
        return this.components.get(name);
    }

    isReady() {
        return this.isInitialized;
    }
}

// ==========================================================================
// INITIALIZE APPLICATION
// ==========================================================================
const portfolioApp = new EnhancedPortfolioApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedPortfolioApp,
        EnhancedNavigation,
        EnhancedContactForm,
        TypeWriter,
        AnimatedCounter
    };
}

// Global access
window.PortfolioApp = portfolioApp;
