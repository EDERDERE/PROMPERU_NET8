document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.cards-container');
    const sortable = new Sortable(container, {
        animation: 150,
        handle: '.sortable-handle',
        ghostClass: 'sortable-ghost',
        onEnd: () => {
            updateCardNumbers();
        },
    });

    const updateCardNumbers = () => {
        const cards = container.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const cardNumberElement = card.querySelector('.card-number');
            if (cardNumberElement) {
                cardNumberElement.textContent = index + 1;
            }
        });
    };

    updateCardNumbers();
});
