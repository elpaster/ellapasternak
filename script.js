// Typing animation for multilingual hello (for home page)
const greetings = ['Hello,', 'Hola,', 'Bonjour,', 'Ciao,', 'Hallo,', '你好,', 'こんにちは,', 'Привет,'];
let greetingIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');

    // Only run typing animation if element exists (home page only)
    if (typingText) {
        console.log('Typing element found, starting animation...');
        const typingSpeed = 150;
        const deletingSpeed = 100;
        const pauseBeforeDelete = 2000;
        const pauseBeforeType = 500;

        function type() {
            const currentGreeting = greetings[greetingIndex];
            
            if (isDeleting) {
                typingText.textContent = currentGreeting.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentGreeting.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentGreeting.length) {
                timeoutDuration = pauseBeforeDelete;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                greetingIndex = (greetingIndex + 1) % greetings.length;
                timeoutDuration = pauseBeforeType;
            }

            setTimeout(type, timeoutDuration);
        }

        // Start typing animation
        type();
    } else {
        console.log('Typing element not found on this page');
    }
});

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

// Scroll animations for content blocks (about page)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe content blocks if they exist
document.querySelectorAll('.content-block').forEach(block => {
    observer.observe(block);
});

// Scroll animations for case study cards (home page)
document.querySelectorAll('.case-study-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});