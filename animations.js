// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
    };

    // Facebook section - repeatable animation
    const facebookSection = document.getElementById('facebook-follow');
    if (facebookSection) {
        const facebookObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate-active class when in view
                    entry.target.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right').forEach(el => {
                        el.classList.add('animate-active');
                    });
                } else {
                    // Remove animate-active class when out of view
                    entry.target.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right').forEach(el => {
                        el.classList.remove('animate-active');
                    });
                }
            });
        }, observerOptions);

        facebookObserver.observe(facebookSection);
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', initScrollAnimations);