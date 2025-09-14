/* ========================================
   MODAL PROJETS - JavaScript
   ======================================== */

// Données des projets avec Lorem Ipsum
const projectsData = {
    'flutter-app': {
        category: 'DÉVELOPPEMENT',
        title: 'APP FLUTTER — ASSOCIATION DE MALFAITEURS',
        status: 'Projet terminé',
        statusClass: 'termine',
        image: 'https://picsum.photos/800/600?random=1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'API REST'],
        features: [
            'Lorem ipsum dolor sit amet consectetur',
            'Sed do eiusmod tempor incididunt ut labore',
            'Ut enim ad minim veniam quis nostrud',
            'Exercitation ullamco laboris nisi ut aliquip',
            'Duis aute irure dolor in reprehenderit',
            'Excepteur sint occaecat cupidatat non proident'
        ],
        links: [
            { text: 'GitHub', url: '#', available: false },
            { text: 'Demo', url: '#', available: false }
        ]
    },
    'portfolio-web': {
        category: 'DÉVELOPPEMENT',
        title: 'PORTFOLIO EN LIGNE',
        status: 'Projet actuel',
        statusClass: 'actuel',
        image: 'https://picsum.photos/800/600?random=2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Grid/Flexbox', 'SVG'],
        features: [
            'Lorem ipsum dolor sit amet consectetur',
            'Sed do eiusmod tempor incididunt',
            'Ut enim ad minim veniam quis',
            'Exercitation ullamco laboris nisi',
            'Duis aute irure dolor in',
            'Excepteur sint occaecat cupidatat'
        ],
        links: [
            { text: 'Site Web', url: '#', available: false },
            { text: 'GitHub', url: '#', available: false }
        ]
    },
    'simulation-reseau': {
        category: 'RÉSEAU & SYSTÈME',
        title: 'SIMULATION RÉSEAU PME',
        status: 'Projet académique',
        statusClass: 'termine',
        image: 'https://picsum.photos/800/600?random=3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
        technologies: ['Packet Tracer', 'VLAN', 'OSPF', 'ACL', 'QoS'],
        features: [
            'Lorem ipsum dolor sit amet',
            'Sed do eiusmod tempor incididunt ut',
            'Ut enim ad minim veniam quis nostrud',
            'Exercitation ullamco laboris nisi ut',
            'Duis aute irure dolor in reprehenderit',
            'Excepteur sint occaecat cupidatat non'
        ],
        links: [
            { text: 'Documentation', url: '#', available: false },
            { text: 'Schéma réseau', url: '#', available: false }
        ]
    },
    'etude-signal': {
        category: 'TÉLÉCOM',
        title: 'ÉTUDE DE SIGNAL',
        status: 'Projet académique',
        statusClass: 'termine',
        image: 'https://picsum.photos/800/600?random=4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        technologies: ['MATLAB', 'Signal Processing', 'FFT', 'Simulink'],
        features: [
            'Lorem ipsum dolor sit amet consectetur',
            'Sed do eiusmod tempor incididunt',
            'Ut enim ad minim veniam',
            'Exercitation ullamco laboris',
            'Duis aute irure dolor',
            'Excepteur sint occaecat'
        ],
        links: [
            { text: 'Code MATLAB', url: '#', available: false },
            { text: 'Rapport', url: '#', available: false }
        ]
    },
    'automatisation-vba': {
        category: 'DÉVELOPPEMENT',
        title: 'AUTOMATISATION VBA',
        status: 'En cours de développement',
        statusClass: 'en-cours',
        image: 'https://picsum.photos/800/600?random=5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.',
        technologies: ['VBA', 'Excel', 'Access', 'SQL', 'UserForms'],
        features: [
            'Lorem ipsum dolor sit amet',
            'Sed do eiusmod tempor incididunt',
            'Ut enim ad minim veniam quis',
            'Exercitation ullamco laboris nisi',
            'Duis aute irure dolor in',
            'Excepteur sint occaecat cupidatat'
        ],
        links: [
            { text: 'Code VBA', url: '#', available: false },
            { text: 'Documentation', url: '#', available: false }
        ]
    },
    'infrastructure-domotique': {
        category: 'RÉSEAU - SYSTÈME',
        title: 'INFRASTRUCTURE DOMOTIQUE',
        status: 'En cours de développement',
        statusClass: 'en-cours',
        image: 'https://picsum.photos/800/600?random=6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
        technologies: ['Raspberry Pi', 'Node-RED', 'MQTT', 'Home Assistant', 'Docker'],
        features: [
            'Lorem ipsum dolor sit amet consectetur',
            'Sed do eiusmod tempor incididunt ut',
            'Ut enim ad minim veniam quis',
            'Exercitation ullamco laboris nisi',
            'Duis aute irure dolor in reprehenderit',
            'Excepteur sint occaecat cupidatat'
        ],
        links: [
            { text: 'GitHub', url: '#', available: false },
            { text: 'Documentation', url: '#', available: false }
        ]
    }
};

// Classe pour gérer les modals
class ProjectModal {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Événement sur les cartes de projet
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const projectId = item.getAttribute('data-project');
                this.openModal(projectId);
            });
        });
        
        // Événement de fermeture
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Fermeture avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;
        
        // Remplir le contenu du modal
        this.populateModal(project);
        
        // Afficher le modal
        this.modal.classList.add('active');
        this.body.style.overflow = 'hidden';
        
        // Focus sur le bouton de fermeture pour l'accessibilité
        setTimeout(() => this.closeBtn.focus(), 300);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        this.body.style.overflow = '';
    }
    
    populateModal(project) {
        // Catégorie
        this.modal.querySelector('.modal-category').textContent = project.category;
        
        // Titre
        this.modal.querySelector('.modal-title').textContent = project.title;
        
        // Status
        const statusEl = this.modal.querySelector('.modal-status');
        statusEl.textContent = project.status;
        statusEl.className = `modal-status ${project.statusClass}`;
        
        // Image
        const imgEl = this.modal.querySelector('.modal-img');
        imgEl.src = project.image;
        imgEl.alt = project.title;
        
        // Description
        this.modal.querySelector('.modal-description').textContent = project.description;
        
        // Technologies
        const techContainer = this.modal.querySelector('.tech-tags-container');
        techContainer.innerHTML = project.technologies
            .map(tech => `<span class="tech-tag-modal">${tech}</span>`)
            .join('');
        
        // Fonctionnalités
        const featuresList = this.modal.querySelector('.features-list');
        featuresList.innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
        
        // Liens
        const linksContainer = this.modal.querySelector('.project-links');
        linksContainer.innerHTML = project.links
            .map(link => {
                const disabledClass = !link.available ? ' disabled' : '';
                const href = link.available ? link.url : '#';
                const target = link.available ? '_blank' : '';
                return `<a href="${href}" target="${target}" class="project-link${disabledClass}">${link.text}</a>`;
            })
            .join('');
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});