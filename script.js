document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enter-btn");
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");
    const music = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn");
    const petalsContainer = document.querySelector(".petals");

    // Caminhos das suas flores do print
    const flowerImages = [
        './img/pink.png',
        './img/white.png',
        './img/purple.png',
        './img/purple02.png'
    ];

    // 1. Iniciar Experiência
    enterBtn.addEventListener("click", () => {
        introScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");
        music.play();
        startPetalFall();
    });

    // 2. Controle de Música
    musicBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            musicBtn.innerText = "🔊";
        } else {
            music.pause();
            musicBtn.innerText = "🔇";
        }
    });

    // 3. Chuva de Pétalas/Flores
    function startPetalFall() {
        setInterval(() => {
            const petal = document.createElement("img");
            const randomImg = flowerImages[Math.floor(Math.random() * flowerImages.length)];
            
            petal.src = randomImg;
            petal.classList.add("petal");
            
            // Posição e tamanho aleatório
            petal.style.left = Math.random() * 100 + "vw";
            petal.style.width = Math.random() * 20 + 15 + "px";
            petal.style.opacity = Math.random();
            
            // Velocidade aleatória
            const duration = Math.random() * 5 + 5;
            petal.style.animationDuration = duration + "s";
            
            petalsContainer.appendChild(petal);

            // Remove a flor depois que ela cair
            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
        }, 400); // Cria uma flor a cada 400ms
    }

    // 4. Animação ao rolar (Scroll Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".card").forEach(card => {
        observer.observe(card);
    });

    

    // Adicione isso dentro do DOMContentLoaded no script anterior
const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".chapter-header").forEach(header => {
    chapterObserver.observe(header);
});
});