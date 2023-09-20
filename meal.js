const searchInput = document.getElementById("search-input");
const mealList = document.getElementById("meal-list");
const favoritesList = document.getElementById("favorites-list");

const favorites = []; // Array to store favorite meals

// Function to fetch and display meal data
async function searchMeals(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        mealList.innerHTML = ''; // Clear previous results

        if (data.meals) {
            data.meals.forEach((meal) => {
                const li = document.createElement("li");

                // Create an <img> element for the meal's image
                const img = document.createElement("img");
                img.src = meal.strMealThumb;
                img.alt = meal.strMeal;

                // Create a "Favorite" button for each meal
                const favoriteBtn = document.createElement("button");
                favoriteBtn.textContent = "Favorite";
                favoriteBtn.addEventListener("click", () => addToFavorites(meal));

                // Append the image, meal name, and button to the list item
                li.appendChild(img);
                li.appendChild(document.createTextNode(meal.strMeal));
                li.appendChild(favoriteBtn);

                mealList.appendChild(li);
            });
        } else {
            mealList.innerHTML = '<li>No results found</li>';
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Function to add a meal to favorites
function addToFavorites(meal) {
    favorites.push(meal);
    updateFavoritesList();
}

// Function to update the favorites list
function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach((meal) => {
        const li = document.createElement("li");
        li.textContent = meal.strMeal;

        // Create a "Remove" button for each favorite meal
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromFavorites(meal));

        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Function to remove a meal from favorites
function removeFromFavorites(meal) {
    const index = favorites.indexOf(meal);
    if (index !== -1) {
        favorites.splice(index, 1);
        updateFavoritesList();
    }
}

// Event listener for search input
searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    if (query.length >= 3) {
        searchMeals(query);
    }
});

// Initial update of favorites list
updateFavoritesList();
