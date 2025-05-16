import React, { useState } from 'react';
import './Recipes.css';
import { useNavigate } from 'react-router-dom';
import recipes_data from '../data/recipes-data.json'

function Recipes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const recipes = recipes_data;


  const handleRecipeClick = (id) => {
    navigate(`/other/recipes/${id}`);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="recipes-section">
      <h2>Recipes</h2>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search recipes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="recipe-search"
        />
      </div>
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <div 
            className="recipe-card" 
            key={recipe.id}
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <div className="recipe-image">

              <img src={recipe.image} alt={recipe.title} />
            </div>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <div className="recipe-details">
              <span className="prep-time">{recipe.prepTime} min</span>
              <span className="difficulty">{recipe.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recipes;