import React, { useState } from 'react';
import './Recipes.css';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface RecipesProps {
  recipes: Recipe[];
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const navigate = useNavigate();
  const { ref, visible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`recipe-card animate-on-scroll${visible ? ' visible' : ''}`}
      onClick={() => navigate(`/other/recipes/${recipe.id}`)}
    >
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <div className="recipe-details">
        <span className="prep-time">{recipe.prepTime + recipe.cookTime} min</span>
        <span className="difficulty">{recipe.difficulty}</span>
      </div>
    </div>
  );
}

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(
    recipe =>
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
          onChange={e => setSearchTerm(e.target.value)}
          className="recipe-search"
        />
      </div>
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
};

export default Recipes;
