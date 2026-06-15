document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.card'));
  const sortBtns = document.querySelectorAll('.sort-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const count = document.getElementById('count');

  let currentSort = 'newest';
  let currentFilter = 'all';

  function formatCount(n) {
    if (n === 1) return '1 projekt';
    if (n >= 2 && n <= 4) return n + ' projekty';
    return n + ' projektů';
  }

  function render() {
    const visible = cards.filter(c => currentFilter === 'all' || c.dataset.tag === currentFilter);

    visible.sort((a, b) => {
      const da = new Date(a.dataset.date);
      const db = new Date(b.dataset.date);
      return currentSort === 'newest' ? db - da : da - db;
    });

    cards.forEach(c => c.classList.add('hidden'));
    visible.forEach((c, i) => {
      c.classList.remove('hidden');
      c.style.order = i;
    });

    if (count) count.textContent = formatCount(visible.length);
  }

  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sortBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      render();
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  render();
});
