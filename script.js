// Dados dos Clientes (As "Pastas")
const clientData = {
    'bruma': {
        title: 'Canto da Bruma',
        videos: [
            { src: 'assets/videos/bruma/1 ANO CANTO DA BRUMA.mp4', thumb: 'assets/thumb/bruma_1.jpg' },
            { src: 'assets/videos/bruma/A cura está dentro de vocês! - corrigido.mp4', thumb: 'assets/thumb/bruma_2.jpg' }
        ]
    },
    'conecta': {
        title: 'Conecta Cassino',
        videos: [
            { src: 'assets/videos/conecta/3 coisas que a gente ama no Cassino.mp4', thumb: 'assets/thumb/conecta_1.jpg' },
            { src: 'assets/videos/conecta/Conecta Carnaval.mp4', thumb: 'assets/thumb/conecta_2.jpg' },
            { src: 'assets/videos/conecta/mito x verdade.mp4', thumb: 'assets/thumb/conecta_3.jpg' }
        ]
    },
    'documenta': {
        title: 'Documenta+',
        videos: [
            { src: 'assets/videos/documenta/4 dicas carnaval - d+.mp4', thumb: 'assets/thumb/doc_1.jpg' },
            { src: 'assets/videos/documenta/Ar condicionado Documenta mais.mp4', thumb: 'assets/thumb/doc_2.jpg' },
            { src: 'assets/videos/documenta/Carnaval - Documenta+.mp4', thumb: 'assets/thumb/doc_3.jpg' },
            { src: 'assets/videos/documenta/D+ - Curriculo.mp4', thumb: 'assets/thumb/doc_4.jpg' }
        ]
    },
    'nilmar': {
        title: 'Nilmar Eletrônicos',
        videos: [
            { src: 'assets/videos/nilmar/Antes e Depois.mp4', thumb: 'assets/thumb/nilmar_1.jpg' },
            { src: 'assets/videos/nilmar/Atendimento Rápido - Nilmar Eletrônicos.mp4', thumb: 'assets/thumb/nilmar_2.jpg' },
            { src: 'assets/videos/nilmar/Carnaval - Nilmar Eletrônicos.mp4', thumb: 'assets/thumb/nilmar_3.jpg' },
            { src: 'assets/videos/nilmar/Lara - A GENTE TEM.mp4', thumb: 'assets/thumb/nilmar_4.jpg' },
            { src: 'assets/videos/nilmar/Lara - Capas e Películas.mp4', thumb: 'assets/thumb/nilmar_5.jpg' },
            { src: 'assets/videos/nilmar/POV; BASTIDORES.mp4', thumb: 'assets/thumb/nilmar_6.jpg' }
        ]
    },
    'scsp': {
        title: 'Sport Club São Paulo',
        videos: [
            { src: 'assets/videos/scsp/Churrascaria Leão - SEM V.O.mp4', thumb: 'assets/thumb/sc_1.jpg' },
            { src: 'assets/videos/scsp/Reels - Anúncio Camisas - Oficial.mp4', thumb: 'assets/thumb/sc_2.jpg' },
            { src: 'assets/videos/scsp/São Paulo - Vídeo Vertical - Ghostpost.mp4', thumb: 'assets/thumb/sc_3.jpg' },
            { src: 'assets/videos/scsp/Vídeo YT São Paulo - mais um atualizado.mp4', thumb: 'assets/thumb/sc_4.jpg' }
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
