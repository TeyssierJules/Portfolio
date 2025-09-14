/**
 * CARROUSEL CENTRES D'INTÉRÊT - Version Interactive
 * Gestion du carrousel avec background flou adaptatif et navigation complète
 */

document.addEventListener('DOMContentLoaded', function() {
  // Récupération des éléments DOM
  const track = document.getElementById('carousel-track');
  const bg = document.getElementById('carousel-bg');
  const descTitle = document.getElementById('desc-title');
  const descText = document.getElementById('desc-text');
  const descPanel = document.getElementById('description-panel');
  const indicators = document.querySelectorAll('.indicator');
  const navLeft = document.getElementById('nav-left');
  const navRight = document.getElementById('nav-right');
  
  // Vérification que tous les éléments existent
  if (!track || !bg || !descTitle || !descText) {
    console.error('Certains éléments du carrousel sont introuvables');
    return;
  }

  const slides = Array.from(track.children);
  let currentIndex = 0;
  
  // Images de fond HD pour le background flou
  const backgroundImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop', // Trail/Nature
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=800&fit=crop', // IoT/Tech
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop', // Automobile
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop', // Musique
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop'  // Philosophie
  ];
  
  // Données pour les descriptions détaillées
  const slideData = [
    {
      title: "⛰️ Trail & Endurance",
      description: "Les activités en plein air comme la course à pied me permettent de développer ma discipline et ma persévérance. Je prépare actuellement le Trail des Gorges de l'Ardèche (76 km) pour 2026, un défi qui demande rigueur dans l'entraînement et gestion du temps."
    },
    {
      title: "🏠 Domotique / IoT",
      description: "Je m'intéresse aux technologies connectées et à l'automatisation domestique. Cela me permet d'explorer l'intersection entre matériel et logiciel, de résoudre des problèmes concrets d'efficacité énergétique et de sécurité, tout en développant mes compétences en réseau et en programmation embarquée."
    },
    {
      title: "🚗 Mécanique automobile",
      description: "L'entretien et le diagnostic de véhicules me permettent de développer ma capacité d'analyse, ma rigueur méthodologique et ma patience. Cette passion m'aide à comprendre des systèmes complexes, à identifier les causes profondes des dysfonctionnements et à apporter des solutions durables."
    },
    {
      title: "🎵 Musique",
      description: "Écouter de la musique m'accompagne souvent dans mes moments de concentration ou de repos. C'est un moyen efficace pour rester motivé, améliorer ma productivité et parfois même stimuler la créativité quand je travaille sur un projet technique ou visuel."
    },
    {
      title: "📚 Lecture de philosophie",
      description: "Je m'intéresse à la philosophie, car elle m'invite à prendre du recul, à remettre en question les évidences et à mieux comprendre les enjeux humains. Cela me pousse à réfléchir plus profondément, à écouter différents points de vue et à développer une pensée structurée."
    }
  ];

  /**
   * Met à jour l'état complet du carrousel
   */
  function updateCarousel() {
    // Mise à jour des slides - activation de la slide courante
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === currentIndex) {
        slide.classList.add('active');
      }
    });
    
    // Mise à jour du background flou full-screen
    if (backgroundImages[currentIndex]) {
      bg.style.backgroundImage = `url('${backgroundImages[currentIndex]}')`;
    }
    
    // Mise à jour des indicateurs
    if (indicators.length > 0) {
      indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentIndex) {
          indicator.classList.add('active');
        }
      });
    }
    
    // Mise à jour de la description détaillée avec animation fluide
    if (slideData[currentIndex] && descPanel) {
      descPanel.classList.remove('active');
      setTimeout(() => {
        descTitle.textContent = slideData[currentIndex].title;
        descText.textContent = slideData[currentIndex].description;
        descPanel.classList.add('active');
      }, 200);
    }
    
    // Mise à jour de la position et des boutons
    updateTrackPosition();
    updateNavigationButtons();
  }

  /**
   * Met à jour la position du track pour centrer la slide active
   */
  function updateTrackPosition() {
    const slideWidth = 320 + 24; // largeur de slide + gap
    const containerWidth = track.parentElement.offsetWidth;
    const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    
    track.style.transform = `translateX(${offset}px)`;
  }

  /**
   * Met à jour l'état des boutons de navigation
   */
  function updateNavigationButtons() {
    if (navLeft) {
      navLeft.disabled = currentIndex === 0;
    }
    if (navRight) {
      navRight.disabled = currentIndex === slides.length - 1;
    }
  }

  /**
   * Navigue vers une slide spécifique
   * @param {number} index - Index de la slide cible
   */
  function goToSlide(index) {
    if (index >= 0 && index < slides.length && index !== currentIndex) {
      currentIndex = index;
      updateCarousel();
    }
  }

  /**
   * Navigue vers la slide précédente
   */
  function goToPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  /**
   * Navigue vers la slide suivante
   */
  function goToNext() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  // Navigation par flèches gauche/droite
  if (navLeft) {
    navLeft.addEventListener('click', goToPrevious);
  }

  if (navRight) {
    navRight.addEventListener('click', goToNext);
  }

  // Navigation par indicateurs
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Navigation par clic sur les slides
  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => goToSlide(index));
  });

  // Navigation au clavier (flèches)
  document.addEventListener('keydown', (e) => {
    // Vérifier si un champ de saisie est actif pour éviter les conflits
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(slides.length - 1);
        break;
    }
  });

  // Gestion responsive : recalcul de la position au redimensionnement
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateTrackPosition();
    }, 150);
  });

  // ========================================
  // SUPPORT TACTILE POUR MOBILE
  // ========================================

  let startX = 0;
  let isDragging = false;
  const swipeThreshold = 50; // Distance minimale pour déclencher un swipe

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // Détection du sens du swipe
    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        // Swipe vers la gauche - slide suivante
        goToNext();
      } else {
        // Swipe vers la droite - slide précédente
        goToPrevious();
      }
    }
    
    isDragging = false;
  }, { passive: true });

  // Empêcher le scroll horizontal pendant le swipe
  track.addEventListener('touchmove', (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  });

  // ========================================
  // INITIALISATION
  // ========================================

  // Vérification cohérence des données
  if (slides.length !== slideData.length) {
    console.warn(`Nombre de slides (${slides.length}) différent du nombre de descriptions (${slideData.length})`);
  }

  if (slides.length !== backgroundImages.length) {
    console.warn(`Nombre de slides (${slides.length}) différent du nombre d'images de fond (${backgroundImages.length})`);
  }

  // Initialisation du carrousel
  updateCarousel();

  console.log(`Carrousel centres d'intérêt initialisé avec ${slides.length} slides`);

  // ========================================
  // API PUBLIQUE (optionnel)
  // ========================================
  
  // Exposer certaines fonctions pour une utilisation externe
  window.centresInteretCarousel = {
    goToSlide: goToSlide,
    goToNext: goToNext,
    goToPrevious: goToPrevious,
    getCurrentIndex: () => currentIndex,
    getSlidesCount: () => slides.length,
    updateBackgroundImage: (index, imageUrl) => {
      if (index >= 0 && index < backgroundImages.length) {
        backgroundImages[index] = imageUrl;
        if (index === currentIndex) {
          bg.style.backgroundImage = `url('${imageUrl}')`;
        }
      }
    }
  };
});