// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const textArray = [
    'Pre-final year Computer Science Student',
    'Full Stack Developer',
    'Data Analytics Enthusiast',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }
    
    setTimeout(type, typeSpeed);
}

type();

// Initialize AOS
AOS.init({
    duration: 1000,
    offset: 100,
    once: true,
    mirror: false
});

// Progress Bars Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-progress');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Smooth Scrolling
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

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Magnetic Hover Effect for Social Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});


// Page Transition Effects
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add number counter animation
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.innerText;
            const data = +counter.getAttribute('data-target') || value;
            const time = data / speed;

            if (value < data) {
                counter.innerText = Math.ceil(value + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = data;
            }
        };

        // Start animation when in viewport
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        };

        const counterObserver = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });

        counterObserver.observe(counter);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image lazy loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add glitch effect to hero title on hover
const heroTitle = document.querySelector('.text-animate');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.setAttribute('data-text', this.textContent);
        this.classList.add('glitch');
    });

    heroTitle.addEventListener('mouseleave', function() {
        this.classList.remove('glitch');
    });
}

// Particle animation for hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 3 + 2;
    const left = Math.random() * 100;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    
    hero.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add particle styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: absolute;
        bottom: -10px;
        background: rgba(233, 30, 99, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: floatUp linear infinite;
    }

    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }

    .glitch {
        position: relative;
        color: var(--primary-color);
        animation: glitch 0.3s infinite;
    }

    .glitch::before,
    .glitch::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .glitch::before {
        animation: glitch-1 0.3s infinite;
        color: #00ffff;
        z-index: -1;
    }

    .glitch::after {
        animation: glitch-2 0.3s infinite;
        color: #ff00ff;
        z-index: -2;
    }

    @keyframes glitch {
        0%, 100% {
            text-shadow: 0 0 0 transparent;
        }
        50% {
            text-shadow: 2px 2px 0 rgba(233, 30, 99, 0.5);
        }
    }

    @keyframes glitch-1 {
        0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
        }
        50% {
            clip-path: inset(33% 0 0 0);
            transform: translate(-2px, -2px);
        }
    }

    @keyframes glitch-2 {
        0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
        }
        50% {
            clip-path: inset(0 0 33% 0);
            transform: translate(2px, 2px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Enhanced scroll animations
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Parallax for different elements
    document.querySelectorAll('.element').forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrollTop * speed}px)`;
    });
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Text scramble effect for project titles
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerText = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble to project titles on hover
document.querySelectorAll('.project-card h3').forEach(title => {
    const fx = new TextScramble(title);
    const originalText = title.innerText;
    
    title.parentElement.parentElement.addEventListener('mouseenter', () => {
        fx.setText(originalText);
    });
});

// Mouse trail effect
const trail = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(233, 30, 99, ${1 - i / trailLength});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
}

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    trail.forEach((dot, index) => {
        const nextDot = trail[index + 1] || trail[0];
        
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        
        x += (nextDot.offsetLeft - dot.offsetLeft) * 0.3;
        y += (nextDot.offsetTop - dot.offsetTop) * 0.3;
    });
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
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
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll event code here
}, 100));

console.log('Portfolio website loaded successfully! 🎉');