import { getMealById } from './api.js';

const dynamicContent = document.getElementById('dynamic-content');

export async function renderMealDetails(mealId) {
  if (!dynamicContent) return;

  const meal = await getMealById(mealId);
  if (!meal) {
    dynamicContent.innerHTML = `<p>Failed to load meal details.</p>`;
    return;
  }

  // Parse ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== '') {
      ingredients.push({
        name: ing.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  const html = `
    <div class="breadcrumb-bar">&raquo; ${meal.strMeal.toUpperCase()}</div>
    <div class="meal-details-card">
      <h2 class="section-title">MEAL DETAILS</h2>
      <div class="meal-header-grid">
        <div>
          <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div>
          <h2 style="margin-bottom:10px; color:var(--text-dark);">${meal.strMeal}</h2>
          <p style="margin-bottom:6px;"><strong>CATEGORY:</strong> ${meal.strCategory.toUpperCase()}</p>
          ${meal.strSource ? `<p style="margin-bottom:12px;"><strong>Source:</strong> <a href="${meal.strSource}" target="_blank" style="color:var(--primary-color); word-break:break-all;">${meal.strSource}</a></p>` : ''}
          
          <div class="ingredients-container">
            <h3>Ingredients</h3>
            <div class="ingredient-badges">
              ${ingredients.map((ing, idx) => `
                <span class="ing-badge">
                  <span class="ing-num">${idx + 1}</span> ${ing.name}
                </span>
              `).join('')}
            </div>
          </div>

          <div style="margin-top:18px;">
            <strong>Measure:</strong>
            <ul class="measures-list">
              ${ingredients.map(ing => `<li><strong>${ing.measure}</strong> ${ing.name}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="instructions-box">
        <h3>Instructions:</h3>
        <div>
          ${meal.strInstructions.split('\r\n').filter(step => step.trim().length > 0).map(step => `
            <div class="instruction-step">
              <input type="checkbox">
              <span>${step}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  dynamicContent.innerHTML = html;
  dynamicContent.scrollIntoView({ behavior: 'smooth' });
}