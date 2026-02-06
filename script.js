// ========================================
// CURSOR PERSONNALISÉ
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.body.style.setProperty('--mouse-x', mouseX + 'px');
        document.body.style.setProperty('--mouse-y', mouseY + 'px');
    });
});

// ========================================
// EXPLOSION DE CŒURS AU CLIC
// ========================================
document.addEventListener('click', function(e) {
    // Créer 8 cœurs qui explosent depuis le point de clic
    for (let i = 0; i < 8; i++) {
        createHeartExplosion(e.clientX, e.clientY, i);
    }
});

function createHeartExplosion(x, y, index) {
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = getRandomColor();
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);
    
    // Animation d'explosion
    setTimeout(() => {
        const angle = (index / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        heart.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg) scale(0)`;
        heart.style.opacity = '0';
    }, 10);
    
    // Supprimer après l'animation
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function getRandomColor() {
    const colors = ['#FF0000', '#FF1493', '#FF69B4', '#DC143C'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// PARALLAXE AU SCROLL
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallaxe sur la peluche hero
    const plush = document.querySelector('.plush-float');
    if (plush) {
        plush.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallaxe sur les orbes de background
    const hero = document.querySelector('.hero::before');
    document.documentElement.style.setProperty('--scroll-y', scrolled + 'px');
});

// ========================================
// ANIMATION AU SCROLL (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observer toutes les cartes et sections
document.querySelectorAll('.reason-card, .benefit-card, .testimonial-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ========================================
// EFFET MAGNÉTIQUE SUR LES BOUTONS
// ========================================
document.querySelectorAll('.cta-primary').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', function() {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ========================================
// HOVER 3D SUR LES CARTES
// ========================================
document.querySelectorAll('.reason-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ========================================
// COMPTEUR ANIMÉ JUSQU'À LA SAINT-VALENTIN
// ========================================
function updateCountdown() {
    const valentine = new Date('2025-02-14T00:00:00');
    const now = new Date();
    const diff = valentine - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // Chercher tous les éléments qui mentionnent "Saint-Valentin"
        document.querySelectorAll('.final-cta-note').forEach(note => {
            if (!note.dataset.original) {
                note.dataset.original = note.textContent;
            }
            note.textContent = `Plus que ${days}j ${hours}h avant la Saint-Valentin · Livraison garantie`;
        });
    }
}

updateCountdown();
setInterval(updateCountdown, 60000); // Mise à jour toutes les minutes

// ========================================
// PARTICULES DE CŒURS AMBIANTES (OPTIMISÉ)
// ========================================
let heartCount = 0;
const maxHearts = 5;

function createFloatingHeart() {
    if (heartCount >= maxHearts) return;

    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.color = getRandomColor();
    heart.style.fontSize = Math.random() * 15 + 10 + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    heart.style.transition = 'all ' + (Math.random() * 5 + 10) + 's linear';
    heart.style.willChange = 'transform, opacity';

    document.body.appendChild(heart);
    heartCount++;

    setTimeout(() => {
        heart.style.bottom = '110vh';
        heart.style.transform = `translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        heart.remove();
        heartCount--;
    }, 15000);
}

// Créer un cœur flottant toutes les 5 secondes (réduit pour performance)
setInterval(createFloatingHeart, 5000);

// ========================================
// SHAKE EFFECT SUR LA PELUCHE AU SURVOL
// ========================================
const plushImage = document.querySelector('.plush-float');
if (plushImage) {
    plushImage.addEventListener('mouseenter', function() {
        this.style.animation = 'plushShake 0.5s ease-in-out';
    });
    
    plushImage.addEventListener('animationend', function() {
        this.style.animation = 'plushShowcase 4s ease-in-out infinite';
    });
}

// Définir l'animation shake dans le CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes plushShake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg) scale(1.1); }
        75% { transform: rotate(10deg) scale(1.1); }
    }
`;
document.head.appendChild(style);

console.log('🎨 Site showcase activé - Tous les effets sont opérationnels !');