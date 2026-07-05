const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // Normalize line endings to avoid mismatch between Windows (CRLF) and JS/AI (LF)
    html = html.replace(/\r\n/g, '\n');

    const labBlock = `        <div class="card" style="text-align: center; border-color: var(--neon); background: rgba(188, 111, 241, 0.05);">
            <h2 style="justify-content: center;"><i class="fas fa-flask"></i> Intelligence Lab</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">
                Explore exemplos práticos da minha atuação analítica. Acesse a página dedicada para interagir com dashboards de Social Listening e Benchmarks de mercado.
            </p>
            <a href="lab.html" class="lab-btn">
                Acessar Dashboards <i class="fas fa-arrow-right"></i>
            </a>
        </div>\n\n`;

    if (html.includes(labBlock)) {
        html = html.replace(labBlock, '');
    } else {
        console.log("labBlock not found with newlines, trying fallback");
        const fallbackLabBlock = `        <div class="card" style="text-align: center; border-color: var(--neon); background: rgba(188, 111, 241, 0.05);">
            <h2 style="justify-content: center;"><i class="fas fa-flask"></i> Intelligence Lab</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">
                Explore exemplos práticos da minha atuação analítica. Acesse a página dedicada para interagir com dashboards de Social Listening e Benchmarks de mercado.
            </p>
            <a href="lab.html" class="lab-btn">
                Acessar Dashboards <i class="fas fa-arrow-right"></i>
            </a>
        </div>`;
        html = html.replace(fallbackLabBlock + '\n\n', '');
        html = html.replace(fallbackLabBlock + '\n', '');
        html = html.replace(fallbackLabBlock, '');
    }

    const projBlock = `        <div class="card">
            <h2><i class="fas fa-project-diagram"></i> Projetos e Atuação</h2>`;

    if (html.includes(projBlock)) {
        html = html.replace(projBlock, labBlock + projBlock);
    } else {
        console.log("projBlock not found");
    }

    const oldContacts = `<a href="mailto:barbarahscp@gmail.com"><i class="fas fa-envelope"></i> barbarahscp@gmail.com</a>
                <a href="tel:11941544590"><i class="fas fa-phone"></i> 11 9 4154 4590</a>`;
    const newContacts = `<a href="mailto:barbarahscp@gmail.com" target="_blank"><i class="fas fa-envelope"></i> barbarahscp@gmail.com</a>
                <a href="https://wa.me/5511941544590" target="_blank"><i class="fab fa-whatsapp"></i> 11 9 4154 4590</a>`;
    
    if (html.includes(oldContacts)) {
        html = html.replace(oldContacts, newContacts);
    } else {
        console.log("oldContacts not found");
    }

    const oldBar = `<a href="mailto:barbarahscp@gmail.com" class="bar-icon" title="E-mail"><i class="fas fa-envelope"></i></a>
        <a href="tel:11941544590" class="bar-icon" title="Telefone"><i class="fas fa-phone"></i></a>`;
    const newBar = `<a href="mailto:barbarahscp@gmail.com" target="_blank" class="bar-icon" title="E-mail"><i class="fas fa-envelope"></i></a>
        <a href="https://wa.me/5511941544590" target="_blank" class="bar-icon" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>`;

    if (html.includes(oldBar)) {
        html = html.replace(oldBar, newBar);
    } else {
        console.log("oldBar not found");
    }

    fs.writeFileSync('index.html', html);
    console.log("Updates applied successfully.");
} catch (error) {
    console.error("Error:", error);
}