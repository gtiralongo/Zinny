// ===================================
// ZINNY - Main JavaScript
// ===================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
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

// ===================================
// Sticky Navbar - Always Visible
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide navbar based on scroll direction
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;

    // Show/hide scroll to top button
    toggleScrollToTopButton(currentScroll);
});

// ===================================
// Scroll to Top Button
// ===================================
function toggleScrollToTopButton(scrollPosition) {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollPosition > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe service cards and property cards
document.querySelectorAll('.service-card, .property-card').forEach(card => {
    observer.observe(card);
});

// ===================================
// Property Carousel
// ===================================
const track = document.getElementById('propertiesTrack');
const nextBtn = document.getElementById('carouselNext');
const prevBtn = document.getElementById('carouselPrev');

if (track && nextBtn && prevBtn) {
    let originalCards = Array.from(track.children);
    let autoSlideInterval;
    let currentIndex = 0;
    let isTransitioning = false;

    // Clone first and last cards for infinite effect
    function setupCarousel() {
        const visibleCards = 3; // Max visible

        // Clear clones if any
        track.innerHTML = '';
        originalCards.forEach(card => track.appendChild(card.cloneNode(true)));

        const cards = Array.from(track.children);

        // Add clones at the end
        for (let i = 0; i < visibleCards; i++) {
            track.appendChild(cards[i].cloneNode(true));
        }

        // Add clones at the beginning
        for (let i = 0; i < visibleCards; i++) {
            track.insertBefore(cards[cards.length - 1 - i].cloneNode(true), track.firstChild);
        }

        currentIndex = visibleCards;
        track.style.transition = 'none';
        updateCarousel();
    }

    function getVisibleCards() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const firstCard = track.children[0];
        const cardWidth = firstCard.offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        const visibleCards = 3; // Based on setup
        currentIndex++;
        track.style.transition = 'transform 0.5s ease-in-out';
        updateCarousel();

        track.addEventListener('transitionend', function handleTransition() {
            if (currentIndex >= originalCards.length + visibleCards) {
                track.style.transition = 'none';
                currentIndex = visibleCards;
                updateCarousel();
            }
            isTransitioning = false;
            track.removeEventListener('transitionend', handleTransition);
        });
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        const visibleCards = 3;
        currentIndex--;
        track.style.transition = 'transform 0.5s ease-in-out';
        updateCarousel();

        track.addEventListener('transitionend', function handleTransition() {
            if (currentIndex <= visibleCards - 1) {
                track.style.transition = 'none';
                currentIndex = originalCards.length + visibleCards - 1;
                updateCarousel();
            }
            isTransitioning = false;
            track.removeEventListener('transitionend', handleTransition);
        });
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
        startAutoSlide();
    }, { passive: true });

    // Update on resize
    window.addEventListener('resize', () => {
        track.style.transition = 'none';
        updateCarousel();
    });

    // Initialize
    setupCarousel();
    setTimeout(() => {
        startAutoSlide();
    }, 500);
}
