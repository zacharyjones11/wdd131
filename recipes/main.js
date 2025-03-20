import recipes from "./recipes.mjs";

// ---------- Helper Functions ----------

function random(num) {
  return Math.floor(Math.random() * num);
}

function tagsTemplate(tags) {
  // Build HTML spans for each tag.
  return tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
}

function ratingTemplate(rating) {
  // Build star rating HTML; our loop displays 5 stars
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += "</span>";
  return html;
}

function recipeTemplate(recipe) {
  // Uses the recipe object properties to build the HTML for one recipe.
  return `<article class="recipe">
    <img class="recipe-img" src="${recipe.image}" alt="${recipe.name}" />
    <div class="recipe-info">
      ${tagsTemplate(recipe.tags)}
      <h2>${recipe.name}</h2>
      ${ratingTemplate(recipe.rating)}
      <p class="recipe__description">${recipe.description}</p>
    </div>
  </article>`;
}

function renderRecipes(recipeList) {
  // Render the array of recipes in the container.
  const container = document.getElementById("recipes-section");
  if (!container) return;
  // If no recipes to display, show a message.
  container.innerHTML =
    recipeList.length > 0
      ? recipeList.map((recipe) => recipeTemplate(recipe)).join("")
      : "<p>No recipes to display</p>";
}

// Initially hide recipes by rendering an empty list.
renderRecipes([]);

// ---------- Filtering based on Search Input ----------

function filterRecipes(query) {
  // Filter recipes by searching in name, description, tags, and ingredients.
  return recipes
    .filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        (recipe.recipeIngredient &&
          recipe.recipeIngredient.some((ingredient) =>
            ingredient.toLowerCase().includes(query)
          ))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
  e.preventDefault();
  // Get the query from the input and trim/modify for consistent matching.
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = filterRecipes(query);
  renderRecipes(filtered);
}

// ---------- Event Listener ----------
document.getElementById("searchButton").addEventListener("click", searchHandler);
