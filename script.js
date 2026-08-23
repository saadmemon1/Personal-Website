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



// Track Toggling System
document.addEventListener('DOMContentLoaded', () => {
    const trackToggle = document.getElementById('track-toggle');
    const savedTrack = localStorage.getItem('saad-portfolio-track');
    
    if (trackToggle) {
        if (savedTrack === 'product') {
            trackToggle.checked = true;
            document.body.classList.remove('tech-track');
            document.body.classList.add('prod-track');
        } else {
            trackToggle.checked = false;
            document.body.classList.add('tech-track');
            document.body.classList.remove('prod-track');
        }
        
        trackToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('tech-track');
                document.body.classList.add('prod-track');
                localStorage.setItem('saad-portfolio-track', 'product');
            } else {
                document.body.classList.add('tech-track');
                document.body.classList.remove('prod-track');
                localStorage.setItem('saad-portfolio-track', 'technical');
            }
        });
    }
});

// Featured gallery auto-scroll
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.featured-gallery');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    galleries.forEach((gallery) => {
        const slides = gallery.querySelectorAll('.gallery-item');
        const carousel = gallery.closest('.featured-carousel');
        const prevButton = carousel ? carousel.querySelector('.carousel-button.prev') : null;
        const nextButton = carousel ? carousel.querySelector('.carousel-button.next') : null;

        if (slides.length < 2) {
            if (prevButton) prevButton.disabled = true;
            if (nextButton) nextButton.disabled = true;
            return;
        }

        let currentIndex = 0;
        let timerId = null;

        const scrollToIndex = (index) => {
            const width = gallery.clientWidth;
            gallery.scrollTo({ left: width * index, behavior: 'smooth' });
        };

        const startTimer = () => {
            if (prefersReducedMotion) {
                return;
            }
            if (timerId) {
                clearInterval(timerId);
            }
            timerId = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                scrollToIndex(currentIndex);
            }, 4500);
        };

        const syncIndex = () => {
            const width = gallery.clientWidth || 1;
            currentIndex = Math.round(gallery.scrollLeft / width);
        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                scrollToIndex(currentIndex);
                startTimer();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                scrollToIndex(currentIndex);
                startTimer();
            });
        }

        gallery.addEventListener('mouseenter', () => clearInterval(timerId));
        gallery.addEventListener('mouseleave', startTimer);
        gallery.addEventListener('touchstart', () => clearInterval(timerId), { passive: true });
        gallery.addEventListener('touchend', startTimer, { passive: true });
        gallery.addEventListener('scroll', syncIndex, { passive: true });

        window.addEventListener('resize', () => {
            scrollToIndex(currentIndex);
        });

        startTimer();
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');

    // Scoped image list — only images from the carousel that was clicked
    let lightboxItems = [];
    let lightboxIndex = 0;

    const buildItemList = (fromEl) => {
        // Scope to the parent .featured-gallery, falling back to document
        const scope = fromEl.closest('.featured-gallery') || document;
        lightboxItems = [];
        scope.querySelectorAll('.gallery-item[data-full], .gallery-item[data-video]').forEach((item) => {
            const imgSrc  = item.getAttribute('data-full');
            const vidSrc  = item.getAttribute('data-video');
            const alt     = item.querySelector('img')?.alt || 'Gallery media';
            lightboxItems.push({ imgSrc, vidSrc, alt, el: item });
        });
    };

    const showLightboxItem = (item) => {
        if (item.vidSrc) {
            // Video mode
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = item.vidSrc;
            lightboxVideo.load();
        } else {
            // Image mode
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = '';
            lightboxImage.src = item.imgSrc;
            lightboxImage.alt = item.alt;
        }
    };

    const openLightbox = (index) => {
        if (!lightboxItems.length) return;
        lightboxIndex = ((index % lightboxItems.length) + lightboxItems.length) % lightboxItems.length;
        showLightboxItem(lightboxItems[lightboxIndex]);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        updateNav();
    };

    const updateNav = () => {
        if (lightboxCounter) {
            lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
        }
        const hide = lightboxItems.length <= 1;
        if (lightboxPrev) lightboxPrev.classList.toggle('hidden', hide);
        if (lightboxNext) lightboxNext.classList.toggle('hidden', hide);
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightboxVideo.style.display = 'none';
        }
        lightboxImage.style.display = '';
    };

    if (lightbox) {
        // Image gallery items
        document.querySelectorAll('.gallery-item[data-full], .gallery-item[data-video]').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                buildItemList(item);
                const idx = lightboxItems.findIndex(i => i.el === item);
                openLightbox(idx >= 0 ? idx : 0);
            });
        });

        if (lightboxPrev) lightboxPrev.addEventListener('click', () => openLightbox(lightboxIndex - 1));
        if (lightboxNext) lightboxNext.addEventListener('click', () => openLightbox(lightboxIndex + 1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape')      closeLightbox();
            if (e.key === 'ArrowLeft')   openLightbox(lightboxIndex - 1);
            if (e.key === 'ArrowRight')  openLightbox(lightboxIndex + 1);
        });
    }

    // Video-aware carousel: play inline video when its slide is visible, pause when not
    document.querySelectorAll('.featured-gallery').forEach((gallery) => {
        if (!gallery.querySelector('video')) return;

        const allSlides = Array.from(gallery.children);

        const syncVideos = () => {
            allSlides.forEach((slide, i) => {
                const video = slide.querySelector('video');
                if (!video) return;
                const slideLeft = i * gallery.clientWidth;
                const isActive = Math.abs(gallery.scrollLeft - slideLeft) < gallery.clientWidth * 0.5;
                if (isActive) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        };

        gallery.addEventListener('scroll', syncVideos, { passive: true });
        const firstVideo = gallery.querySelector('video');
        if (firstVideo) firstVideo.play().catch(() => {});
    });
});

// Clickable featured cards — open data-href in new tab, skip clicks on media/interactive elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.featured-card[data-href]').forEach((card) => {
        card.addEventListener('click', (e) => {
            const ignored = e.target.closest(
                '.featured-media, .carousel-button, .gallery-item, video, a'
            );
            if (ignored) return;
            window.open(card.dataset.href, '_blank', 'noopener,noreferrer');
        });
    });
});
