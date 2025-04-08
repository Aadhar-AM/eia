// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const dropdowns = document.querySelectorAll('.dropdown');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Handle dropdowns on mobile
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset dropdowns
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }

            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Admissions Form Handling
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = admissionForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // File validation
        const fileInputs = admissionForm.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            if (input.required && !input.files.length) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields and upload required documents.');
            return;
        }

        // Create FormData object
        const formData = new FormData(admissionForm);

        try {
            // Here you would typically send the form data to your server
            // For now, we'll just log it and show a success message
            console.log('Form submitted successfully');
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for your interest in Eklavya International Academy. We will review your application and contact you soon.</p>
            `;
            
            admissionForm.innerHTML = '';
            admissionForm.appendChild(successMessage);
            
            // Add styles for success message
            const style = document.createElement('style');
            style.textContent = `
                .success-message {
                    text-align: center;
                    padding: 2rem;
                }
                .success-message i {
                    font-size: 4rem;
                    color: #2ecc71;
                    margin-bottom: 1rem;
                }
                .success-message h3 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }
                .success-message p {
                    color: var(--text-color);
                }
            `;
            document.head.appendChild(style);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your application. Please try again later.');
        }
    });
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
    }
    .error:focus {
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
    }
`;
document.head.appendChild(style);

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.program-card, .stat-item, .about-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Faculty Category Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const facultyCards = document.querySelectorAll('.faculty-card');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show/hide faculty cards based on category
            facultyCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Add animation styles for faculty cards
const facultyStyle = document.createElement('style');
facultyStyle.textContent = `
    .faculty-card {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(facultyStyle);

// Authentication Pages Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Sign In Form Validation
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show a success message
            alert('Sign in successful! Redirecting to dashboard...');
            // In a real application, you would redirect to a dashboard page
            // window.location.href = 'dashboard.html';
        });
    }

    // Sign Up Form Validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.getElementById('userType').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            if (!fullName || !email || !phone || !password || !confirmPassword || !userType) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show a success message
            alert('Account created successfully! Redirecting to sign in page...');
            // In a real application, you would redirect to the sign in page
            // window.location.href = 'signin.html';
        });
    }
});

// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    
    // Check if elements are found
    if (slides.length === 0) {
        console.error('No slides found');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
        console.log('Showing slide:', index);
    }

    // Function to show next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // Function to show previous slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    // Start automatic sliding
    function startSlideShow() {
        console.log('Starting slideshow');
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic sliding
    function stopSlideShow() {
        console.log('Stopping slideshow');
        clearInterval(slideInterval);
    }

    // Event listeners for controls
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow(); // Restart the timer
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow(); // Restart the timer
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow(); // Restart the timer
        });
    });

    // Pause slideshow when hovering over the slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);
    }

    // Show first slide and start slideshow
    showSlide(0);
    startSlideShow();
});

// Number animation function
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Intersection Observer for statistics animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-item h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateNumber(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe the about-stats section
const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Toppers Section Horizontal Scroll
const toppersTrack = document.querySelector('.toppers-track');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const topperCards = document.querySelectorAll('.topper-card');

let currentPosition = 0;
const cardWidth = topperCards[0].offsetWidth + 30; // card width + gap
let autoScrollInterval;

function updateScrollButtons() {
    scrollLeftBtn.style.opacity = currentPosition === 0 ? '0.5' : '1';
    scrollRightBtn.style.opacity = 
        currentPosition <= -(cardWidth * (topperCards.length - 3)) ? '0.5' : '1';
}

function scrollRight() {
    if (currentPosition > -(cardWidth * (topperCards.length - 3))) {
        currentPosition -= cardWidth;
        toppersTrack.style.transform = `translateX(${currentPosition}px)`;
        updateScrollButtons();
    } else {
        // Reset to start when reaching the end
        currentPosition = 0;
        toppersTrack.style.transform = `translateX(${currentPosition}px)`;
        updateScrollButtons();
    }
}

function scrollLeft() {
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        toppersTrack.style.transform = `translateX(${currentPosition}px)`;
        updateScrollButtons();
    }
}

function startAutoScroll() {
    autoScrollInterval = setInterval(scrollRight, 3000); // Scroll every 3 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Event listeners for manual controls
scrollLeftBtn.addEventListener('click', () => {
    stopAutoScroll();
    scrollLeft();
    startAutoScroll();
});

scrollRightBtn.addEventListener('click', () => {
    stopAutoScroll();
    scrollRight();
    startAutoScroll();
});

// Pause auto-scroll when hovering over the toppers section
toppersTrack.addEventListener('mouseenter', stopAutoScroll);
toppersTrack.addEventListener('mouseleave', startAutoScroll);

// Initialize scroll buttons and start auto-scroll
updateScrollButtons();
startAutoScroll();

// Update on window resize
window.addEventListener('resize', () => {
    const newCardWidth = topperCards[0].offsetWidth + 30;
    currentPosition = Math.min(0, Math.max(currentPosition, -(newCardWidth * (topperCards.length - 3))));
    toppersTrack.style.transform = `translateX(${currentPosition}px)`;
    updateScrollButtons();
});

// Navigation Bar Scroll Effect
let lastScrollTop = 0;
const scrollThreshold = 100; // Minimum scroll amount before hiding navbar

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only trigger if we've scrolled more than the threshold
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }
});