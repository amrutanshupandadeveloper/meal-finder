const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarCategories = document.getElementById('sidebar-categories');

export function initSidebar() {
  const openBtn = document.getElementById('open-sidebar');
  const closeBtn = document.getElementById('close-sidebar');

  if (openBtn) openBtn.addEventListener('click', toggleSidebar);
  if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);
}

export function toggleSidebar() {
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
}

export function renderSidebarCategories(categories, onSelectCategory) {
  if (!sidebarCategories) return;

  sidebarCategories.innerHTML = categories.map(cat => `
    <li data-category="${cat.strCategory}">
      ${cat.strCategory}
    </li>
  `).join('');

  // Add click handlers for menu items
  sidebarCategories.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const categoryName = li.getAttribute('data-category');
      const categoryObj = categories.find(c => c.strCategory === categoryName);
      onSelectCategory(categoryName, categoryObj ? categoryObj.strCategoryDescription : '');
      toggleSidebar();
    });
  });
}