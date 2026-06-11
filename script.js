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

    // 4. Animação ao rolar (Scroll Reveal Otimizado)
    const observerOptions = {
        threshold: 0.05, // Ativa assim que 5% da imagem aparecer (melhor para celular)
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de entrar na tela
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona AMBAS as classes para garantir compatibilidade com seu CSS antigo e novo
                entry.target.classList.add("show");
                entry.target.classList.add("active");
                
                // Opcional: para de observar após animar para economizar bateria do celular
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar Cards, Cabeçalhos de capítulos e itens do mural
    const elementsToAnimate = document.querySelectorAll(".card, .chapter-header, .mural-item, .final-box");
    elementsToAnimate.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Efeito Parallax Cinema (Otimizado para não travar)
    window.addEventListener('scroll', () => {
        const parallaxImg = document.querySelector('.parallax-img');
        if (parallaxImg && !mainContent.classList.contains('hidden')) {
            let scrollPosition = window.pageYOffset;
            // Move a imagem bem devagar (0.1) para não pesar no processador do celular
            parallaxImg.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    }, { passive: true }); // O 'passive: true' melhora absurdamente a rolagem no mobile

    // CORAÇÕES AO TOQUE
document.addEventListener("click", (e) => {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.classList.add("touch-heart");

    heart.style.left = e.clientX + "px";

    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000);

});

// PARTÍCULAS
function createSparkles(){

    setInterval(()=>{

        const sparkle = document.createElement("span");

        sparkle.classList.add("sparkle");

        sparkle.style.left = Math.random()*100 + "vw";

        sparkle.style.animationDuration =
        Math.random()*5 + 4 + "s";

        document.querySelector(".sparkles")
        .appendChild(sparkle);

        setTimeout(()=>{
            sparkle.remove();
        },9000);

    },300);

}

createSparkles();

// EFEITO 3D NAS FOTOS
document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY =
        (x - rect.width/2)/20;

        const rotateX =
        -(y - rect.height/2)/20;

        card.style.transform =
        `perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform = "";

    });

});
// EFEITO MÁQUINA DE ESCREVER
const title =
document.querySelector(".typing-title");

const text = title.innerText;

title.innerText = "";

let i = 0;

function typeWriter(){

    if(i < text.length){

        title.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,50);

    }

}

typeWriter();

enterBtn.addEventListener("click",()=>{

    if(navigator.vibrate){

        navigator.vibrate(100);

    }

});

window.addEventListener("scroll",()=>{

    document.body.style.backgroundPositionY =
    window.scrollY * .1 + "px";

},{passive:true});

musicBtn.classList.add("playing");
musicBtn.classList.remove("playing");

const scenes = document.querySelectorAll(".scene");

window.addEventListener("scroll",()=>{

    const scroll = window.scrollY;

    scenes.forEach((scene,index)=>{

        const start = index * window.innerHeight;

        const end = start + window.innerHeight;

        if(scroll >= start && scroll < end){

            scene.classList.add("fade-in");

        }else{

            scene.classList.remove("fade-in");

            scene.classList.add("fade-out");

        }

    });

});

});

    