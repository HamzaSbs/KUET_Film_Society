// Function to handle animations on scroll
function handleScrollAnimations() {
    const section = document.getElementById('facebook-follow');
    const elementsToAnimate = section.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to all elements within the section
                elementsToAnimate.forEach(element => {
                    element.classList.add('animate-active');
                });
                // Once triggered, unobserve to save performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Start animation when 20% of the section is visible
    });

    observer.observe(section);
}

// Start the observer when the DOM content has loaded
document.addEventListener('DOMContentLoaded', handleScrollAnimations);