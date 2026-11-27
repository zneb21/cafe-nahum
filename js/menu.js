document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    const menuStatus = document.getElementById('menu-status');

    if (filterButtons.length === 0 || menuCards.length === 0) return;

    // Show the full menu when the page first loads
    updateStatus('all', menuCards.length, countDrinks(menuCards));

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const selected = button.dataset.filter;
            let visibleCards = [];

            // Highlight the clicked button and reset the others
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            // Show matching cards and hide the rest
            menuCards.forEach(function (card) {
                const matches = selected === 'all' || card.dataset.category === selected;

                card.classList.remove('is-showing');
                card.classList.toggle('is-hidden', !matches);

                if (matches) {
                    // Restart the fade-in animation on the cards that stay visible
                    void card.offsetWidth;
                    card.classList.add('is-showing');
                    visibleCards.push(card);
                }
            });

            updateStatus(selected, visibleCards.length, countDrinks(visibleCards));
        });
    });

    // Counts the drink rows inside the given cards
    function countDrinks(cards) {
        let total = 0;
        cards.forEach(function (card) {
            total += card.querySelectorAll('tbody tr').length;
        });
        return total;
    }

    // Updates the text below the filter buttons
    function updateStatus(filter, categoryCount, drinkCount) {
        if (!menuStatus) return;

        const drinkWord = drinkCount === 1 ? 'drink' : 'drinks';

        if (filter === 'all') {
            menuStatus.textContent = `Showing all ${drinkCount} ${drinkWord} in ${categoryCount} categories.`;
        } else {
            const labels = {
                'coffee': 'coffee',
                'matcha': 'matcha',
                'fruit-tea': 'fruit tea',
                'milk': 'milk'
            };
            const label = labels[filter] || filter;
            menuStatus.textContent = `Showing ${drinkCount} ${label} ${drinkWord}.`;
        }
    }
});
