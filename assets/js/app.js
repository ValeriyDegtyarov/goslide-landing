document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');

    if (!header || !hero) {
        return;
    }

    const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= heroHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });

    // reviews fade slider
    const reviewSlider = document.querySelector('[data-slider="reviews"]');
    if (reviewSlider) {
        const reviews = reviewSlider.querySelectorAll('.reviews-item');
        const btnPrev = document.querySelector('.slider-arrows-prev');
        const btnNext = document.querySelector('.slider-arrows-next');

        if (reviews.length > 0) {
            let currentIndex = 0;
            const delay = parseInt(reviewSlider.dataset.delay, 10) || 5000;
            const autoplay = reviewSlider.dataset.autoplay !== 'false';
            let autoplayTimer = null;

            const showSlide = (index) => {
                const safeIndex = (index + reviews.length) % reviews.length;
                reviews.forEach((item, idx) => {
                    item.classList.toggle('active', idx === safeIndex);
                });
                currentIndex = safeIndex;
            };

            const nextSlide = () => showSlide(currentIndex + 1);
            const prevSlide = () => showSlide(currentIndex - 1);

            if (btnPrev) {
                btnPrev.addEventListener('click', () => {
                    prevSlide();
                    resetAutoplay();
                });
            }

            if (btnNext) {
                btnNext.addEventListener('click', () => {
                    nextSlide();
                    resetAutoplay();
                });
            }

            const startAutoplay = () => {
                if (!autoplay || delay <= 0) return;
                stopAutoplay();
                autoplayTimer = window.setInterval(nextSlide, delay);
            };

            const stopAutoplay = () => {
                if (autoplayTimer !== null) {
                    window.clearInterval(autoplayTimer);
                    autoplayTimer = null;
                }
            };

            const resetAutoplay = () => {
                stopAutoplay();
                startAutoplay();
            };

            reviewSlider.addEventListener('mouseenter', stopAutoplay);
            reviewSlider.addEventListener('mouseleave', startAutoplay);

            showSlide(0);
            startAutoplay();
        }
    }

    // burger menu toggle
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('.nav');

    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
});