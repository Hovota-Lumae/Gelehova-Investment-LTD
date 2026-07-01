// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================
       Hamburger Menu
    ========================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        const toggleMobileMenu = () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow =
                mobileMenu.classList.contains('active') ? 'hidden' : '';
        };
        
        const closeMobileMenu = () => {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) closeMobileMenu();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
    
    /* ==========================
       Testimonial Slider
    ========================== */
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector('div');
            return card ? card.offsetWidth + 24 : 350;
        };
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
        
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
    
    /* ==========================
       Contact Form
    ========================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Contact form submitted:', formValues);
            alert('Thank you for your message! We will contact you within 24 hours.');
            this.reset();
        });
    }
    
    /* ==========================
       Multi-Step Quote Form
    ========================== */
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const quoteForm = document.getElementById('quoteForm');
    
    if (formSteps.length && progressSteps.length) {
        
        const showStep = (stepNumber) => {
            const currentStep = document.getElementById(`form-step-${stepNumber}`);
            if (!currentStep) return;
            
            formSteps.forEach(step => {
                step.classList.remove('active');
                step.style.display = 'none';
            });
            
            currentStep.classList.add('active');
            currentStep.style.display = 'block';
            
            progressSteps.forEach((step, index) => {
                if (index < stepNumber) {
                    step.classList.add('bg-primary', 'text-gray-900');
                    step.classList.remove(
                        'bg-gray-200',
                        'dark:bg-gray-700',
                        'text-gray-500',
                        'dark:text-gray-400'
                    );
                } else {
                    step.classList.remove('bg-primary', 'text-gray-900');
                    step.classList.add(
                        'bg-gray-200',
                        'dark:bg-gray-700',
                        'text-gray-500',
                        'dark:text-gray-400'
                    );
                }
            });
        };
        
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const nextStep = button.getAttribute('data-next');
                const currentStep = document.querySelector('.form-step.active');
                if (!currentStep) return;
                
                let isValid = true;
                
                currentStep.querySelectorAll('[required]').forEach(field => {
                    if (
                        !field.value &&
                        field.type !== 'checkbox' &&
                        field.type !== 'radio'
                    ) {
                        isValid = false;
                        field.classList.add('border-red-500');
                    } else {
                        field.classList.remove('border-red-500');
                    }
                });
                
                const radioNames = new Set(
                    [...currentStep.querySelectorAll('input[type="radio"][required]')]
                    .map(radio => radio.name)
                );
                
                radioNames.forEach(name => {
                    if (!currentStep.querySelector(`input[name="${name}"]:checked`)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    showStep(nextStep);
                    const formTop = document.getElementById('quote-form');
                    if (formTop) {
                        window.scrollTo({
                            top: formTop.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    alert('Please fill in all required fields before proceeding.');
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const prevStep = button.getAttribute('data-prev');
                showStep(prevStep);
                
                const formTop = document.getElementById('quote-form');
                if (formTop) {
                    window.scrollTo({
                        top: formTop.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(quoteForm);
                const data = Object.fromEntries(formData.entries());
                
                console.log('Form submitted:', data);
                alert('Thank you for your quote request! We will contact you within 24 hours.');
                quoteForm.reset();
                showStep(1);
            });
        }
        
        showStep(1);
    }
    
    /* ==========================
       Budget Slider
    ========================== */
    const budgetSlider = document.getElementById('budget-slider');
    const budgetValue = document.getElementById('budget-value');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value, 10);
            budgetValue.textContent = `$${value.toLocaleString()}`;
        });
    }
    
    /* ==========================
       FAQ Accordion
    ========================== */
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.material-icons-outlined');
            if (!answer || !icon) return;
            
            answer.style.display =
                answer.style.display === 'block' ? 'none' : 'block';
            icon.style.transform =
                icon.style.transform === 'rotate(180deg)' ?
                'rotate(0deg)' :
                'rotate(180deg)';
        });
    });
    
    /* ==========================
       Counter Animation
    ========================== */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const counter = entry.target;
                const target = parseInt(counter.dataset.count, 10);
                const suffix =
                    counter.textContent.includes('+') ? '+' :
                    counter.textContent.includes('%') ? '%' : '';
                
                let current = 0;
                const increment = target / (2000 / 16);
                
                const update = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(update, 16);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                update();
                observer.unobserve(counter);
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    /* ==========================
       Projects Filter Functionality
    ========================== */
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.querySelector('input[placeholder*="Search projects"]');
    
    if (projectCards.length > 0) {
        // Add transition styles to project cards
        projectCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        // Filter by category
        if (filterButtons.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-primary', 'text-gray-900', 'font-bold');
                        btn.classList.add('bg-gray-100', 'hover:bg-gray-200', 'dark:bg-gray-800',
                            'dark:hover:bg-gray-700', 'text-gray-700', 'dark:text-gray-300', 'font-medium');
                    });
                    
                    // Add active class to clicked button
                    this.classList.remove('bg-gray-100', 'hover:bg-gray-200', 'dark:bg-gray-800',
                        'dark:hover:bg-gray-700', 'text-gray-700', 'dark:text-gray-300', 'font-medium');
                    this.classList.add('bg-primary', 'text-gray-900', 'font-bold');
                    
                    const filterValue = this.textContent.trim();
                    filterProjects(filterValue);
                });
            });
        }
        
        // Filter projects function
        function filterProjects(filter) {
            projectCards.forEach(card => {
                const categoryElement = card.querySelector('.absolute.top-3.right-3');
                const category = categoryElement ? categoryElement.textContent.trim() : '';
                
                if (filter === 'All Projects' || category === filter) {
                    card.style.display = 'block';
                    // Force reflow
                    card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // Search functionality
        if (searchInput) {
            const searchButton = searchInput.nextElementSibling;
            
            const performSearch = () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                projectCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const categoryElement = card.querySelector('.absolute.top-3.right-3');
                    const category = categoryElement ? categoryElement.textContent.toLowerCase() : '';
                    
                    if (searchTerm === '' ||
                        title.includes(searchTerm) ||
                        description.includes(searchTerm) ||
                        category.includes(searchTerm)) {
                        card.style.display = 'block';
                        // Force reflow
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            };
            
            if (searchButton) {
                searchButton.addEventListener('click', performSearch);
            }
            
            searchInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    performSearch();
                }
            });
        }
        
        // Initialize all projects as visible
        projectCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
    }
    
});

/* ==========================
   Theme Toggle
========================== */
window.toggleTheme = function() {
    document.documentElement.classList.toggle('dark');
    
    const icon = document
        .querySelector('.theme-toggle .material-icons-outlined');
    
    if (icon) {
        icon.textContent =
            document.documentElement.classList.contains('dark') ?
            'brightness_5' :
            'brightness_4';
    }
};
