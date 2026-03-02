document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.cabecalho');
        if (nav) nav.classList.toggle('scroll', window.scrollY > 100);
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animacao').forEach(el => observer.observe(el));

    const selects = document.querySelectorAll('.select-quarto');
    const grandTotalDisplay = document.getElementById('total-geral');

    function calculateTotal() {
        if (!grandTotalDisplay) return;
        
        let total = 0;
        document.querySelectorAll('.linha-quarto').forEach(row => {
            const price = parseInt(row.getAttribute('data-price'));
            const quantity = parseInt(row.querySelector('.select-quarto').value);
            const subtotal = price * quantity;
            
            row.querySelector('.total-linha').innerText = subtotal.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
            });
            total += subtotal;
        });
        
        grandTotalDisplay.innerText = total.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        });
    }

    if (selects.length > 0) {
        selects.forEach(s => s.addEventListener('change', calculateTotal));
        calculateTotal();
    }
});