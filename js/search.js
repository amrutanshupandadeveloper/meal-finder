import { searchMeals } from './api.js';
import { renderMealDetails } from './details.js';

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const dynamicContent = document.getElementById('dynamic-content');

export function initSearch() {
  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }
}

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  const meals = await searchMeals(query);

  let html = `
    <h2 class="section-title">SEARCH RESULTS FOR "${query.toUpperCase()}"</h2>
    <div class="meals-grid">
  `;

  if (meals.length > 0) {
    html += meals.map(meal => `
      <div class="card meal-card" data-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <span class="badge">${meal.strCategory || 'Recipe'}</span>
        <div class="card-title">${meal.strMeal}</div>
      </div>
    `).join('');
  } else {
    html += `<p>No recipes found matching "${query}".</p>`;
  }

  html += `</div>`;
  dynamicContent.innerHTML = html;

  dynamicContent.querySelectorAll('.meal-card').forEach(card => {
    card.addEventListener('click', () => {
      const mealId = card.getAttribute('data-id');
      renderMealDetails(mealId);
    });
  });

  dynamicContent.scrollIntoView({ behavior: 'smooth' });
}