// Smooth scrolling for anchor links
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



// Profile image fallback
const profileImg = document.getElementById('profile-img');
profileImg.addEventListener('error', function() {
    // Create a placeholder if the image fails to load
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'profile-placeholder';
    placeholder.innerHTML = '<i class="fas fa-user"></i>';
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 4rem;
    `;
    this.parentNode.appendChild(placeholder);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    // e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        e.preventDefault();
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        e.preventDefault();
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    message.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 6px;
        font-weight: 500;
        ${type === 'success' ? 
            'background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : 
            'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
        }
    `;
    
    // Insert message at the top of the form
    contactForm.insertBefore(message, contactForm.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.resume-item, .contact-method, .skill-tag');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    // Wait a bit after page load to start typing
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 100);
    }, 1000);
});

// Social links - prevent default if no real URLs are set
document.querySelectorAll('.social-link, .footer-social a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === 'https://github.com/your-github-username' || 
            href === 'https://linkedin.com/in/your-linkedin-username' ||
            href === 'mailto:your.email@example.com') {
            e.preventDefault();
            showMessage('Please update the social links with your actual profiles.', 'error');
        }
    });
});


