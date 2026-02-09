// Gallery Data
const galleryData = [
    {
        src: 'vid1.mp4',
        type: 'video',
        poster: 'vid1-poster.jpg', // Optional thumbnail for video
        title: 'Event Highlights',
        description: 'Events',
        category: 'projects'
    },
    {
        src: 'vid3.mp4',
        type: 'video',
        poster: 'vid2-poster.jpg',
        title: 'Event Highlights',
        description: 'Events',
        category: 'facilities'
    },
    {
        src: 'vid4.mp4',
        type: 'video',
        poster: 'vid4-poster.jpg',
        title: 'Event Highlights',
        description: 'Events',
        category: 'events'
    },
    
    {
        src: 'vid5.mp4',
        type: 'video',
        poster: 'vid5-poster.jpg',
        title: 'Event Highlights',
        description: 'Events',
        category: 'team'
    },
    {
        src: 'vid6.mp4',
        type: 'video',
        poster: 'vid4-poster.jpg',
        title: 'Event Highlights',
        description: 'Events',
        category: 'team'
    },
    {
        src: 'vid7.mp4',
        type: 'video',
        poster: 'vid7-poster.jpg',
        title: 'Event Highlights',
        description: 'Events',
        category: 'team'
    },
    
];

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// Lightbox functionality
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    const mediaData = galleryData[index];
    
    // Clear previous content
    lightboxMedia.innerHTML = '';
    
    if (mediaData.type === 'video') {
        // Create video element
        const video = document.createElement('video');
        video.src = mediaData.src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '80vh';
        video.style.borderRadius = '12px';
        video.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
        lightboxMedia.appendChild(video);
    } else {
        // Create image element
        const img = document.createElement('img');
        img.src = mediaData.src;
        img.alt = mediaData.title;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '80vh';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
        lightboxMedia.appendChild(img);
    }
    
    lightboxTitle.textContent = mediaData.title;
    lightboxDescription.textContent = mediaData.description;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryData.length - 1;
    } else if (currentImageIndex >= galleryData.length) {
        currentImageIndex = 0;
    }
    
    const lightboxMedia = document.getElementById('lightboxMedia');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const mediaData = galleryData[currentImageIndex];
    
    // Add fade effect
    lightboxMedia.style.opacity = '0';
    
    setTimeout(() => {
        // Clear previous content
        lightboxMedia.innerHTML = '';
        
        if (mediaData.type === 'video') {
            // Create video element
            const video = document.createElement('video');
            video.src = mediaData.src;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '80vh';
            video.style.borderRadius = '12px';
            video.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
            lightboxMedia.appendChild(video);
        } else {
            // Create image element
            const img = document.createElement('img');
            img.src = mediaData.src;
            img.alt = mediaData.title;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '80vh';
            img.style.borderRadius = '12px';
            img.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
            lightboxMedia.appendChild(img);
        }
        
        lightboxTitle.textContent = mediaData.title;
        lightboxDescription.textContent = mediaData.description;
        lightboxMedia.style.opacity = '1';
    }, 200);
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});

// Close lightbox when clicking outside image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Load More functionality
const loadMoreBtn = document.getElementById('loadMoreBtn');
let itemsToShow = 12;

loadMoreBtn.addEventListener('click', function() {
    // Simulate loading more items
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        // Here you would typically load more items from your backend
        // For demo, we'll just show a message
        this.innerHTML = '<i class="fas fa-check-circle"></i> All Images Loaded';
        this.disabled = true;
        this.style.opacity = '0.6';
        this.style.cursor = 'not-allowed';
    }, 1500);
});

// Add smooth scroll behavior
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add touch swipe support for mobile lightbox
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.getElementById('lightbox').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next image
        navigateLightbox(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous image
        navigateLightbox(-1);
    }
}

// Preload adjacent images for better performance
function preloadImages(index) {
    const nextIndex = (index + 1) % galleryData.length;
    const prevIndex = (index - 1 + galleryData.length) % galleryData.length;
    
    const nextImg = new Image();
    const prevImg = new Image();
    
    nextImg.src = galleryData[nextIndex].src;
    prevImg.src = galleryData[prevIndex].src;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page loaded successfully');
    
    // Preload first few images
    galleryData.slice(0, 3).forEach(item => {
        if (item.type === 'image') {
            const img = new Image();
            img.src = item.src;
        }
    });
    
    // Add hover play/pause for videos in gallery
    const galleryVideos = document.querySelectorAll('.gallery-video');
    galleryVideos.forEach(video => {
        const card = video.closest('.gallery-card');
        
        card.addEventListener('mouseenter', function() {
            video.play().catch(err => console.log('Video play failed:', err));
        });
        
        card.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    });
});