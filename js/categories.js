import { getMealsByCategory } from './api.js';
import { renderMealDetails } from './details.js';

const categoryGrid = document.getElementById('category-grid');
const dynamicContent = document.getElementById('dynamic-content');

export function renderCategoryGrid(categories, onCategoryClick) {
  if (!categoryGrid) return;

  categoryGrid.innerHTML = categories.map(cat => `
    <div class="card" data-category="${cat.strCategory}">
      <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
      <span class="badge">${cat.strCategory}</span>
      <div class="card-title">${cat.strCategory.toUpperCase()}</div>
    </div>
  `).join('');

  categoryGrid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const categoryName = card.getAttribute('data-category');
      const categoryObj = categories.find(c => c.strCategory === categoryName);
      onCategoryClick(categoryName, categoryObj ? categoryObj.strCategoryDescription : '');
    });
  });
}

export async function loadCategoryMeals(category, description = '') {
  if (!dynamicContent) return;

  const meals = await getMealsByCategory(category);

  let html = `
    <div class="breadcrumb-bar"># ${category.toUpperCase()}</div>
    ${description ? `<div class="category-desc-box"><p>${description}</p></div>` : ''}
    <h2 class="section-title">MEALS</h2>
    <div class="meals-grid">
  `;

  if (meals.length > 0) {
    html += meals.map(meal => `
      <div class="card meal-card" data-id="${meal.idMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="card-title">${meal.strMeal}</div>
      </div>
    `).join('');
  } else {
    html += `<p>No meals available under this category.</p>`;
  }

  html += `</div>`;
  dynamicContent.innerHTML = html;

  // Attach click listeners to meal cards
  dynamicContent.querySelectorAll('.meal-card').forEach(card => {
    card.addEventListener('click', () => {
      const mealId = card.getAttribute('data-id');
      renderMealDetails(mealId);
    });
  });

  dynamicContent.scrollIntoView({ behavior: 'smooth' });
}