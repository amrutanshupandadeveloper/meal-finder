import { getCategories } from './api.js';
import { initSidebar, renderSidebarCategories } from './sidebar.js';
import { renderCategoryGrid, loadCategoryMeals } from './categories.js';
import { initSearch } from './search.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize UI Event Handlers
  initSidebar();
  initSearch();

  // Handle Home Button Click
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      const dynamicContent = document.getElementById('dynamic-content');
      if (dynamicContent) dynamicContent.innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Load and Render Categories
  const categories = await getCategories();
  renderCategoryGrid(categories, loadCategoryMeals);
  renderSidebarCategories(categories, loadCategoryMeals);
});