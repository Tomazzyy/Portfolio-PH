// Dados dos Clientes (As "Pastas")
const clientData = {
    'scsp': {
        title: 'SC São Paulo',
        videos: [
            { src: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544272/An%C3%BAncio_F%C3%A1bio_Recife_4_tiidjj.mp4', thumb: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544272/An%C3%BAncio_F%C3%A1bio_Recife_4_tiidjj.jpg' }
        ]
    },
    'tilinho': {
        title: 'Tilinho Lanches',
        videos: [
            { src: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544275/Tilinho_Lanches_-_20_anos_o_sabor_da_nossa_hi_1_ommuqz.mp4', thumb: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544275/Tilinho_Lanches_-_20_anos_o_sabor_da_nossa_hi_1_ommuqz.jpg' }
        ]
    },
    'minuano': {
        title: 'Minuano Fertilizantes',
        videos: [
            { src: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544275/Minuano_Vacina%C3%A7%C3%A3o_Gripe_p2fgbu.mp4', thumb: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544275/Minuano_Vacina%C3%A7%C3%A3o_Gripe_p2fgbu.jpg' }
        ]
    },
    'tomaz': {
        title: 'Tomaz Systems',
        videos: [
            { src: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544274/Criativos_-_Tomaz_System_sfm9no.mp4', thumb: 'https://res.cloudinary.com/duh9xhjsh/video/upload/v1779544274/Criativos_-_Tomaz_System_sfm9no.jpg' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Personalizado Azul
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
        });

        // Efeito de clique e hover no cursor
        document.addEventListener('mousedown', () => {
            cursor.classList.add('scale-75', 'bg-[#0049b1]/20');
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('scale-75', 'bg-[#0049b1]/20');
        });

        // Hover em links e botões
        const hoverables = document.querySelectorAll('a, button, [onclick], .portfolio-item');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('scale-150', 'border-[#0066ff]', 'bg-[#0049b1]/10');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('scale-150', 'border-[#0066ff]', 'bg-[#0049b1]/10');
            });
        });
    }

    // Inicializa animações de Scroll
    if (window.initInViewAnimations) {
        window.initInViewAnimations();
    }
});

// 2. Lógica das Pastas (Modais)
function openFolder(clientKey) {
    const data = clientData[clientKey];
    const modal = document.getElementById('folder-modal');
    const content = document.getElementById('modal-content');
    const title = document.getElementById('modal-title');

    if (!data) return;

    title.innerText = data.title;
    content.innerHTML = ''; // Limpa a galeria anterior

    // Injeta os vídeos dinamicamente usando a estética premium do design system
    data.videos.forEach(video => {
        content.innerHTML += `
            <div class="portfolio-item floating-card relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 group aspect-[9/16] transition-all duration-500 shadow-2xl">
                <video 
                    src="${video.src}" 
                    poster="${video.thumb}"
                    controls 
                    class="w-full h-full object-cover"
                    preload="none">
                </video>
            </div>
        `;
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Trava o scroll da página ao fundo
}

function closeFolder() {
    const modal = document.getElementById('folder-modal');
    const videos = modal.querySelectorAll('video');
    
    // Pausa todos os vídeos antes de fechar para não continuar o áudio
    videos.forEach(v => v.pause());
    
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Libera o scroll
}

// Fechar modal ao clicar fora do conteúdo (na área escura)
window.onclick = function(event) {
    const modal = document.getElementById('folder-modal');
    if (event.target == modal) {
        closeFolder();
    }
}

// 3. Sistema de Animação sob Scroll (IntersectionObserver)
(function () {
    const once = true;
    if (!window.__inViewIO) {
        window.__inViewIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    if (once) window.__inViewIO.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    }
    
    window.initInViewAnimations = function (selector = ".animate-on-scroll") {
        document.querySelectorAll(selector).forEach((el) => {
            window.__inViewIO.observe(el);
        });
    };
})();


// 5. Animação 3D da foto "Sobre mim" ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    const sobremim3D = document.getElementById('sobremim-3d');
    if (!sobremim3D) return;

    window.addEventListener('scroll', () => {
        // Usa requestAnimationFrame internamente via navegador para performance, 
        // mas vamos calcular diretamente
        const rect = sobremim3D.parentElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Verifica se a seção está visível na tela
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calcula o progresso do scroll de -1 (topo da tela) a 1 (fim da tela)
            // Quando rect.top == windowHeight/2, está no meio da tela (progress = 0)
            const progress = (rect.top - (windowHeight / 2)) / (windowHeight / 2);
            
            // Aplica rotações baseadas no progresso
            // Limita os ângulos para não ficar estranho
            const rotateX = progress * 20; // 20 graus
            const rotateY = progress * -15; 
            const translateZ = Math.abs(progress) * 50; 
            
            sobremim3D.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        }
    }, { passive: true });
});
