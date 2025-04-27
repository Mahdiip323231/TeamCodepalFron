window.addEventListener('load', () => {
  // Hide loader after a short delay
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
    } else {
      console.warn('Loader element not found.');
    }
  }, 800);
});

// Wait for DOM to be fully loaded before running main script logic
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Set initial icon based on current theme
            const currentTheme = document.documentElement.dataset.theme;
            themeToggle.innerHTML = currentTheme === 'dark' ?
                '<i class="fa-solid fa-sun fa-lg"></i>' :
                '<i class="fa-solid fa-moon fa-lg"></i>';

            themeToggle.addEventListener('click', () => {
                const isDark = document.documentElement.dataset.theme === 'dark';
                const newTheme = isDark ? 'light' : 'dark';
                document.documentElement.dataset.theme = newTheme;
                // Update icon based on the new theme
                themeToggle.innerHTML = newTheme === 'dark' ?
                    '<i class="fa-solid fa-sun fa-lg"></i>' :
                    '<i class="fa-solid fa-moon fa-lg"></i>';
                // Optional: Save theme preference to localStorage
                // localStorage.setItem('theme', newTheme);
            });
        } else {
            console.warn('Theme toggle button not found.');
        }

        // Mobile Menu Functionality
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Optional: Add ARIA attribute changes for accessibility
                // const isExpanded = !mobileMenu.classList.contains('hidden');
                // mobileMenuButton.setAttribute('aria-expanded', isExpanded);
            });
            // Close menu when a link is clicked
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    // mobileMenuButton.setAttribute('aria-expanded', 'false');
                });
            });
        } else {
            console.warn('Mobile menu button or menu element not found.');
        }

        // Typed.js Initialization
        if (typeof Typed !== 'undefined') {
            try {
                new Typed('#typed-text', {
                    strings: ['توسعه وب‌سایت', 'طراحی رابط کاربری', 'بهینه‌سازی عملکرد'],
                    typeSpeed: 80,
                    backSpeed: 40,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true, // Optional: show cursor
                    cursorChar: '|', // Optional: customize cursor
                });
            } catch (typedError) {
                console.error('Error initializing Typed.js:', typedError);
            }
        } else {
            console.warn('Typed.js library not loaded or available.');
        }

        // Vanilla Tilt Initialization
        if (typeof VanillaTilt !== 'undefined') {
            try {
                const tiltElements = document.querySelectorAll('.glass-card');
                if (tiltElements.length > 0) {
                    VanillaTilt.init(tiltElements, {
                        max: 15,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.3,
                        scale: 1.02
                    });
                } else {
                    console.warn('No elements found with the class .glass-card for Vanilla Tilt.');
                }
            } catch (tiltError) {
                console.error('Error initializing VanillaTilt:', tiltError);
            }
        } else {
            console.warn('VanillaTilt library not loaded or available.');
        }

        // Project Filter Functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        if (filterButtons.length > 0 && projectCards.length > 0) {
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button state
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.dataset.filter;

                    // Filter project cards
                    projectCards.forEach(card => {
                        const cardCategory = card.dataset.category;
                        const shouldShow = (filter === 'all' || cardCategory === filter);
                        card.style.display = shouldShow ? '' : 'none'; // Use display none/block
                        // Or toggle a 'hidden' class if preferred
                        // card.classList.toggle('hidden', !shouldShow);
                    });
                });
            });
        } else {
            if (filterButtons.length === 0) console.warn('Filter buttons not found.');
            if (projectCards.length === 0) console.warn('Project cards not found.');
        }

        // GSAP Animations Initialization
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            try {
                gsap.registerPlugin(ScrollTrigger);

                // Animate glass cards
                gsap.from('.glass-card', {
                    scrollTrigger: {
                        trigger: '#team', // Trigger when the team section enters view
                        start: 'top 80%', // Start animation when 80% of the trigger is visible
                        toggleActions: 'play none none reverse' // Play on enter, reverse on leave
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8, // Slightly faster duration
                    stagger: 0.2,
                    ease: 'power2.out' // Add easing
                });

                // Animate project cards
                gsap.from('.project-card', {
                    scrollTrigger: {
                        trigger: '#projects', // Trigger when the projects section enters view
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out'
                });
            } catch (gsapError) {
                console.error('Error initializing GSAP animations:', gsapError);
            }
        } else {
            console.warn('GSAP or ScrollTrigger library not loaded or available.');
        }

        // Update Current Year in Footer
        const currentYearFooter = document.getElementById('current-year-footer');
        if (currentYearFooter) {
            currentYearFooter.textContent = new Date().getFullYear();
        } else {
            console.warn('Footer year element not found.');
        }

        // Optional: Initialize theme from localStorage on load
        // const savedTheme = localStorage.getItem('theme');
        // if (savedTheme) {
        //     document.documentElement.dataset.theme = savedTheme;
        //     if (themeToggle) {
        //         themeToggle.innerHTML = savedTheme === 'dark' ?
        //             '<i class="fa-solid fa-sun fa-lg"></i>' :
        //             '<i class="fa-solid fa-moon fa-lg"></i>';
        //     }
        // }

    } catch (error) {
        console.error('Error initializing page scripts:', error);
        // Optionally display a user-friendly error message on the page
        // document.body.innerHTML = 'An error occurred while loading the page. Please try again later.';
    }
});

// Global error handler (already present in HTML, keep or move here)
window.onerror = function(msg, url, line, col, error) {
    console.error(`Unhandled Error: ${msg}\nURL: ${url}\nLine: ${line}:${col}`, error);
    // Prevent default browser error handling
    return true;
};

// Optional: Handle unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason);
});
