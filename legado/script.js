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
    // 1. Cursor Personalizado
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
        });
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

    // Injeta os vídeos dinamicamente
    data.videos.forEach(video => {
        content.innerHTML += `
            <div class="portfolio-item relative rounded-2xl overflow-hidden bg-black border border-white/10 group aspect-[9/16]">
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
    document.body.style.overflow = 'hidden'; // Trava o scroll da página ao fundo
}

function closeFolder() {
    const modal = document.getElementById('folder-modal');
    const videos = modal.querySelectorAll('video');
    
    // Pausa todos os vídeos antes de fechar para não continuar o áudio
    videos.forEach(v => v.pause());
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Libera o scroll
}

// Fechar modal ao clicar fora do conteúdo (na área escura)
window.onclick = function(event) {
    const modal = document.getElementById('folder-modal');
    if (event.target == modal) {
        closeFolder();
    }
}