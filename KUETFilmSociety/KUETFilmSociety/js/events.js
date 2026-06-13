/**
 * EVENT CARD AUTO-PLAY VIDEO SYSTEM
 * 
 * Features:
 * - Intersection Observer API for efficient visibility detection
 * - Auto-play videos when 60% of the card is visible
 * - Auto-pause when scrolling past or card leaves viewport
 * - Prevents multiple videos from playing simultaneously
 * - SOUND ENABLED: Videos play with audio
 * - Graceful fallback to muted autoplay if browser blocks sound autoplay
 * - Smooth fade-in/fade-out animations
 * - Fully responsive (desktop & mobile)
 * - Vanilla JS, no frameworks
 */

class EventVideoManager {
    constructor() {
        this.currentPlayingVideo = null;
        this.videoElements = new Map();
        this.intersectionObserver = null;
        this.init();
    }

    /**
     * Initialize the video manager and set up observers
     */
    init() {
        this.cacheVideoElements();
        this.setupIntersectionObserver();
        this.setupPageVisibilityListener();
    }

    /**
     * Cache all video elements for faster access
     */
    cacheVideoElements() {
        const videos = document.querySelectorAll('.event-trailer');
        videos.forEach(video => {
            const trailerID = video.getAttribute('data-trailer-id');
            if (trailerID) {
                this.videoElements.set(trailerID, video);
                // Set up video event listeners
                this.setupVideoListeners(video);
            }
        });
    }

    /**
     * Set up event listeners for individual videos
     */
    setupVideoListeners(video) {
        const videoContainer = video.closest('.video-container');
        const soundToggle = videoContainer ? videoContainer.querySelector('.sound-toggle') : null;

        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.enableSound(video);
            });
        }

        // Add playing state class when video plays
        video.addEventListener('play', () => {
            this.onVideoPlay(video);
        });

        // Remove playing state when video pauses or ends
        video.addEventListener('pause', () => {
            this.onVideoPause(video);
        });

        video.addEventListener('ended', () => {
            this.onVideoEnd(video);
        });

        // Handle errors gracefully
        video.addEventListener('error', () => {
            console.warn(`Video playback error for: ${video.dataset.trailerId}`);
            this.pauseVideo(video);
        });
    }

    /**
     * Set up Intersection Observer for viewport detection
     * Threshold set to 60% visibility as per requirements
     */
    setupIntersectionObserver() {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.6 // 60% of the card must be visible
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.handleIntersection(entry);
            });
        }, observerOptions);

        // Observe all event cards
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            this.intersectionObserver.observe(card);
        });
    }

    /**
     * Handle intersection changes for event cards
     * @param {IntersectionObserverEntry} entry
     */
    handleIntersection(entry) {
        const card = entry.target;
        const video = card.querySelector('.event-trailer');

        if (!video) return;

        if (entry.isIntersecting) {
            // Card entered viewport with 60% visibility
            this.playVideo(video);
        } else {
            // Card left viewport
            this.pauseVideo(video);
        }
    }

    /**
     * Play a video and pause any currently playing video
     * @param {HTMLVideoElement} video
     */
    playVideo(video) {
        // Stop previously playing video
        if (this.currentPlayingVideo && this.currentPlayingVideo !== video) {
            this.pauseVideo(this.currentPlayingVideo);
        }

        // Play the video with sound enabled
        video.muted = false;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Video playback started successfully
                    this.currentPlayingVideo = video;
                    video.classList.remove('muted-fallback');
                    video.classList.add('playing');
                })
                .catch(error => {
                    // Autoplay with sound was blocked by browser
                    // Fall back to muted autoplay for better UX
                    console.warn('Autoplay with sound blocked by browser. Retrying with muted:', error);
                    video.muted = true;
                    video.play().then(() => {
                        this.currentPlayingVideo = video;
                        video.classList.add('muted-fallback');
                        video.classList.add('playing');
                    }).catch(err => {
                        console.warn('Video playback error:', err);
                    });
                });
        }
    }

    /**
     * Enable sound for a video that is already playing muted
     * @param {HTMLVideoElement} video
     */
    enableSound(video) {
        if (!video) return;

        video.muted = false;
        video.volume = 1;
        video.classList.remove('muted-fallback');

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    this.currentPlayingVideo = video;
                    video.classList.add('playing');
                })
                .catch(error => {
                    console.warn('Unable to enable sound for video:', error);
                });
        }
    }

    /**
     * Pause a video
     * @param {HTMLVideoElement} video
     */
    pauseVideo(video) {
        if (!video) return;

        video.pause();
        video.classList.remove('playing');

        if (this.currentPlayingVideo === video) {
            this.currentPlayingVideo = null;
        }
    }

    /**
     * Called when a video starts playing
     * @param {HTMLVideoElement} video
     */
    onVideoPlay(video) {
        video.classList.add('playing');
        
        // Log analytics event if needed
        const trailerID = video.getAttribute('data-trailer-id');
        console.log(`Video started playing: ${trailerID}`);
    }

    /**
     * Called when a video pauses
     * @param {HTMLVideoElement} video
     */
    onVideoPause(video) {
        video.classList.remove('playing');
    }

    /**
     * Called when a video ends
     * @param {HTMLVideoElement} video
     */
    onVideoEnd(video) {
        // Optional: replay or show message
        const trailerID = video.getAttribute('data-trailer-id');
        console.log(`Video ended: ${trailerID}`);
    }

    /**
     * Handle page visibility changes (tab switching)
     * Pause videos when tab is not visible
     */
    setupPageVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Page is hidden, pause current video
                if (this.currentPlayingVideo) {
                    this.pauseVideo(this.currentPlayingVideo);
                }
            } else {
                // Page is visible again, resume if card is still in viewport
                if (this.currentPlayingVideo) {
                    this.playVideo(this.currentPlayingVideo);
                }
            }
        });
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.videoElements.clear();
        this.currentPlayingVideo = null;
    }
}

/**
 * Initialize Event Video Manager when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    window.eventVideoManager = new EventVideoManager();
    console.log('Event Video Manager initialized');
});

/**
 * Clean up on page unload
 */
window.addEventListener('beforeunload', () => {
    if (window.eventVideoManager) {
        window.eventVideoManager.destroy();
    }
});

/**
 * Handle dynamic content loading (if needed for future use)
 * Call this if new event cards are added to the DOM dynamically
 */
function addEventCardsObserver(newCards) {
    if (window.eventVideoManager && window.eventVideoManager.intersectionObserver) {
        newCards.forEach(card => {
            window.eventVideoManager.intersectionObserver.observe(card);
        });
        // Re-cache video elements
        window.eventVideoManager.cacheVideoElements();
    }
}
