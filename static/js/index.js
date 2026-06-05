window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');
    
    if (container && !container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    
    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');
    
    if (carouselVideos.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is in view, play it
                video.play().catch(e => {
                    // Autoplay failed, probably due to browser policy
                    console.log('Autoplay prevented:', e);
                });
            } else {
                // Video is out of view, pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });
    
    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

function setupExecutionCarousel() {
    const carousel = document.querySelector('.execution-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.execution-track');
    const cards = Array.from(carousel.querySelectorAll('.execution-card'));
    const filterButtons = Array.from(document.querySelectorAll('.execution-filter-btn'));
    const prevButton = carousel.querySelector('.execution-nav-prev');
    const nextButton = carousel.querySelector('.execution-nav-next');
    let currentFilter = carousel.dataset.currentFilter || 'simulation';
    let currentIndex = 0;

    function visibleCards() {
        return cards.filter(card => card.dataset.type === currentFilter);
    }

    function itemsPerView() {
        return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
    }

    function pauseHiddenVideos() {
        cards.forEach(card => {
            const video = card.querySelector('video');
            if (!card.classList.contains('is-visible') && video) {
                video.pause();
            }
        });
    }

    function updateCarousel() {
        const filteredCards = visibleCards();
        const maxIndex = Math.max(filteredCards.length - itemsPerView(), 0);
        currentIndex = Math.min(currentIndex, maxIndex);

        cards.forEach(card => {
            card.classList.toggle('is-visible', card.dataset.type === currentFilter);
        });

        const firstCard = filteredCards[0];
        const trackStyle = window.getComputedStyle(track);
        const parsedGap = parseFloat(trackStyle.columnGap || trackStyle.gap);
        const gap = Number.isNaN(parsedGap) ? 0 : parsedGap;
        const step = firstCard ? firstCard.getBoundingClientRect().width + gap : 0;
        track.style.transform = `translateX(-${currentIndex * step}px)`;

        pauseHiddenVideos();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = button.dataset.filter;
            carousel.dataset.currentFilter = currentFilter;
            currentIndex = 0;
            filterButtons.forEach(item => item.classList.toggle('is-active', item === button));
            updateCarousel();
        });
    });

    prevButton.addEventListener('click', function() {
        const maxIndex = Math.max(visibleCards().length - itemsPerView(), 0);
        currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', function() {
        const maxIndex = Math.max(visibleCards().length - itemsPerView(), 0);
        currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

function initializePage() {
    var options = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    if (window.bulmaCarousel) {
        bulmaCarousel.attach('.carousel', options);
    }
	
    if (window.bulmaSlider) {
        bulmaSlider.attach();
    }
    
    // Setup video autoplay for carousel
    setupVideoCarouselAutoplay();
    setupExecutionCarousel();
}

if (window.jQuery) {
    $(document).ready(initializePage);
} else {
    document.addEventListener('DOMContentLoaded', initializePage);
}
