document.addEventListener('DOMContentLoaded', () => {

    // 1. Barra de Progresso de Leitura (Scroll)
    window.onscroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("scroll-progress-bar");
        if(progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    };

 // 2. Extração de Entidades (Highlights por Categoria)
    const sentimentBtn = document.getElementById('sentiment-analysis-btn');
    const profileText = document.getElementById('profile-text');
    const nlpLegend = document.getElementById('nlp-legend');
    
    if (sentimentBtn && profileText) {
        let isNlpActive = false;
        const originalContent = profileText.innerHTML;

        // Mapeamento das categorias, classes CSS e os termos exatos
        const categories = [
            {
                class: 'hl-strategy',
                terms: ["Customer Experience \\(CX\\)", "Social Listening", "decisões Data-Driven"]
            },
            {
                class: 'hl-tool',
                terms: ["Buzzmonitor", "Looker Studio"]
            },
            {
                class: 'hl-result',
                terms: ["dados não estruturados", "KPIs acionáveis", "otimização da jornada do cliente"]
            }
        ];

        sentimentBtn.addEventListener('click', () => {
            isNlpActive = !isNlpActive;
            
            if (isNlpActive) {
                // Estado ATIVO
                sentimentBtn.classList.add('active');
                sentimentBtn.innerHTML = '<i class="fas fa-check"></i> Dados Extraídos';
                if (nlpLegend) nlpLegend.style.display = 'flex';
                
                let newText = originalContent;
                categories.forEach(category => {
                    category.terms.forEach(term => {
                        // Regex dinâmico para substituir mantendo maiúsculas e minúsculas originais
                        const regex = new RegExp(`(${term})`, 'gi');
                        newText = newText.replace(regex, `<span class="${category.class}">$1</span>`);
                    });
                });
                profileText.innerHTML = newText;
            } else {
                // Estado INATIVO (Retorna ao original)
                sentimentBtn.classList.remove('active');
                sentimentBtn.innerHTML = '<i class="fas fa-filter"></i> Extrair Insights';
                if (nlpLegend) nlpLegend.style.display = 'none';
                profileText.innerHTML = originalContent;
            }
        });
    }

    // 3. Dark Mode / Light Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            
            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.title = 'Mudar para modo claro';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.title = 'Mudar para modo escuro';
            }
        });
    }

    // 4. Acordeão da Timeline
    const expTriggers = document.querySelectorAll('.exp-header, .timeline-dot');
    expTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            if (targetId) {
                const content = document.getElementById(targetId);
                if (content) {
                    content.classList.toggle('collapsed');
                }
            }
        });
    });

    // 5. Sticky Bar Horizontal
    const toggleBarBtn = document.getElementById('toggle-bar-btn');
    const stickyBar = document.getElementById('sticky-bar');

    if (toggleBarBtn && stickyBar) {
        toggleBarBtn.addEventListener('click', () => {
            stickyBar.classList.toggle('minimized');
            const icon = toggleBarBtn.querySelector('i');
            
            if (stickyBar.classList.contains('minimized')) {
                icon.className = 'fas fa-chevron-left';
                toggleBarBtn.title = 'Expandir contatos';
            } else {
                icon.className = 'fas fa-chevron-right';
                toggleBarBtn.title = 'Minimizar contatos';
            }
        });
    }

    // 6. Efeito de entrada em cascata dos Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background 0.5s ease, border 0.5s ease';
            }, 600);
            
        }, 150 * index); 
    });

});