// Base API Endpoints (TheMealDB API)
const API_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const API_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_FILTER_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const API_LOOKUP_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

// Fetch all categories
export async function getCategories() {
  try {
    const response = await fetch(API_CATEGORIES);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch meals filtered by category name
export async function getMealsByCategory(category) {
  try {
    const response = await fetch(`${API_FILTER_CATEGORY}${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for category ${category}:`, error);
    return [];
  }
}

// Fetch meals by search query
export async function searchMeals(query) {
  try {
    const response = await fetch(`${API_SEARCH}${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error searching meals for query ${query}:`, error);
    return [];
  }
}

// Fetch meal details by ID
export async function getMealById(id) {
  try {
    const response = await fetch(`${API_LOOKUP_ID}${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal details for ID ${id}:`, error);
    return null;
  }
}