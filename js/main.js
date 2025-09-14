// ========================================
//    NAVIGATION INTELLIGENTE & RESPONSIVE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === ÉLÉMENTS DOM ===
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // === CONFIGURATION DE LA DÉTECTION DES SECTIONS ===
    const sections = [
        { id: 'accueil', element: document.getElementById('accueil'), navLink: document.querySelector('a[href="#accueil"]') },
        { id: 'formations', element: document.getElementById('formations'), navLink: document.querySelector('a[href="#formations"]') },
        { id: 'competences', element: document.getElementById('competences'), navLink: document.querySelector('a[href="#competences"]') },
        { id: 'projets', element: document.getElementById('projets'), navLink: document.querySelector('a[href="#projets"]') },
        { id: 'centres-interet', element: document.getElementById('centres-interet'), navLink: document.querySelector('a[href="#centres-interet"]') },
        { id: 'contact', element: document.getElementById('contact'), navLink: document.querySelector('a[href="#contact"]') }
    ].filter(section => section.element && section.navLink); // Filtrer les sections existantes

    let currentSection = 'accueil';
    let isScrolling = false;
    let scrollTimeout;

    // === NAVIGATION RESPONSIVE ===
    
    // Toggle du menu mobile
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Fermer le menu au clic sur un lien (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // Fermer le menu en cliquant en dehors (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navLinksContainer.classList.contains('active') &&
            !navLinksContainer.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // === DÉTECTION DE SECTION AMÉLIORÉE ===
    
    function updateActiveNavigation() {
        if (isScrolling) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculer quelle section est la plus visible
        let maxVisibility = 0;
        let activeSection = 'accueil';
        
        sections.forEach(section => {
            const element = section.element;
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Calculer la visibilité de la section
            let visibleTop = Math.max(elementTop, scrollTop);
            let visibleBottom = Math.min(elementBottom, scrollTop + windowHeight);
            let visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            // Normaliser par rapport à la hauteur de la fenêtre
            let visibility = visibleHeight / windowHeight;
            
            // Bonus pour la section qui contient le centre de l'écran
            const screenCenter = scrollTop + (windowHeight / 2);
            if (screenCenter >= elementTop && screenCenter <= elementBottom) {
                visibility += 0.3;
            }
            
            // Bonus pour la section en haut de l'écran (navbar offset)
            if (rect.top <= 100 && rect.bottom > 100) {
                visibility += 0.2;
            }
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                activeSection = section.id;
            }
        });
        
        // Cas spécial : si on est tout en haut, forcer l'accueil
        if (scrollTop < 50) {
            activeSection = 'accueil';
        }
        
        // Cas spécial : si on est tout en bas, forcer contact
        if (scrollTop + windowHeight >= documentHeight - 50) {
            activeSection = 'contact';
        }
        
        // Mettre à jour l'état seulement si nécessaire
        if (currentSection !== activeSection) {
            currentSection = activeSection;
            updateNavLinks(activeSection);
        }
    }
    
    function updateNavLinks(activeSection) {
        sections.forEach(section => {
            if (section.navLink) {
                section.navLink.classList.toggle('active', section.id === activeSection);
            }
        });
    }

    // === SCROLL OPTIMISÉ AVEC THROTTLING ===
    
    function throttleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(updateActiveNavigation);
        }
        isScrolling = true;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            updateActiveNavigation(); // Une dernière vérification
        }, 50);
    }

    // === EVENT LISTENERS ===
    
    // Scroll avec throttling
    window.addEventListener('scroll', throttleScroll, { passive: true });
    
    // Resize pour recalculer les positions
    window.addEventListener('resize', function() {
        clearTimeout(scrollTimeout);
        setTimeout(updateActiveNavigation, 100);
    }, { passive: true });
    
    // Navigation par clic avec scroll smooth
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Désactiver temporairement la détection automatique
                    isScrolling = true;
                    
                    // Calculer la position avec offset pour la navbar
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    // Scroll smooth
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    // Mettre à jour immédiatement l'état
                    currentSection = targetId;
                    updateNavLinks(targetId);
                    
                    // Réactiver la détection après le scroll
                    setTimeout(() => {
                        isScrolling = false;
                    }, 1000);
                }
            }
        });
    });
    
    // === EFFET NAVBAR AU SCROLL ===
    
    function updateNavbarState() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollTop > 50);
    }
    
    window.addEventListener('scroll', updateNavbarState, { passive: true });
    
    // === INITIALISATION ===
    updateActiveNavigation();
    updateNavbarState();
    
    // Intersection Observer comme fallback pour une meilleure performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (!isScrolling) return;
            
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const sectionId = entry.target.id;
                    if (sectionId && currentSection !== sectionId) {
                        currentSection = sectionId;
                        updateNavLinks(sectionId);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            if (section.element) {
                observer.observe(section.element);
            }
        });
    }
});

// ========================================
// EFFETS DE SCROLL
// ========================================

function initScrollEffects() {
    // Animation d'apparition progressive des éléments
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.formation-item, .skill-group, .project-item, .interest-card, .formation-card, .certification-badge'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
}

// ========================================
// SYSTÈME DE MODALES
// ========================================

function initModals() {
    // Fonction globale pour ouvrir une modale
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus trap pour l'accessibilité
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    };

    // Fonction globale pour fermer une modale
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }
    };

    // Fermeture des modales avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const modalId = activeModal.id;
                closeModal(modalId);
            }
        }
    });

    // Fermeture des modales en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
}

// ========================================
// ANIMATIONS
// ========================================

function initAnimations() {
    // Animation du titre PORTFOLIO au chargement
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }

    // Animation des compteurs/statistiques
    animateCounters();
    
    // Animation des barres de progression (si présentes)
    animateProgressBars();
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000; // 2 secondes
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function pour une animation plus naturelle
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            
            counter.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Observer pour démarrer l'animation quand visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.dataset.progress;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.transform = `scaleX(${progress / 100})`;
                    observer.unobserve(bar);
                }
            });
        });
        
        observer.observe(bar);
    });
}

// ========================================
// SYSTÈME DE PARTICULES
// ========================================

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Créer des particules flottantes subtiles
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(245, 243, 240, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    
    // Position initiale aléatoire
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animation flottante
    animateParticle(particle);
}

function animateParticle(particle) {
    const duration = Math.random() * 20000 + 10000; // 10-30 secondes
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    
    particle.animate([
        {
            left: startX + '%',
            top: startY + '%',
            opacity: 0.1
        },
        {
            left: endX + '%',
            top: endY + '%',
            opacity: 0.3
        },
        {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.1
        }
    ], {
        duration: duration,
        easing: 'ease-in-out',
        iterations: Infinity
    });
}

// ========================================
// GESTIONNAIRE DE FORMULAIRE
// ========================================

function initFormHandler() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // État de chargement
        submitBtn.textContent = 'ENVOI...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulation d'envoi (remplacer par votre logique d'envoi)
        try {
            await simulateFormSubmission();
            
            // Succès
            submitBtn.textContent = 'ENVOYÉ ✓';
            submitBtn.style.background = 'var(--color-accent-electric)';
            
            // Reset du formulaire après 2 secondes
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                submitBtn.style.background = '';
            }, 2000);
            
        } catch (error) {
            // Erreur
            submitBtn.textContent = 'ERREUR';
            submitBtn.style.background = '#ff4444';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simuler un succès dans 90% des cas
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Erreur simulée'));
            }
        }, 1500);
    });
}

// ========================================
// UTILITAIRES
// ========================================

// Debounce function pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function pour les événements de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Détection de support pour les animations avancées
function supportsAdvancedAnimations() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
           !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
}

// ========================================
// GESTION DES ERREURS
// ========================================

window.addEventListener('error', (e) => {
    console.log('Erreur JavaScript:', e.error);
    // En production, envoyer à un service de monitoring
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Temps de chargement:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}