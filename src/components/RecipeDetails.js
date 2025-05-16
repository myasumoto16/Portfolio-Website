import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails({recipes}) {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const recipe = Array.isArray(recipes) ? recipes.find((p) => toString(p.id) === toString(recipeId)) : null;

  if (!recipe) {
    return (
      <div className="project-detail-container">
        <h2>Recipe Not Found</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back to Recipes</button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/other/recipes');
  };

  return (
    <section className="recipe-details-section">
      <button className="back-button" onClick={handleBack}>← Back to Recipes</button>
      
      <h1 className="recipe-title">{recipe.title}</h1>
      
      <div className="recipe-hero">
        <img src={recipe.image} alt={recipe.title} className="recipe-image-large" />
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Prep Time:</span>
            <span className="meta-value">{recipe.prepTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Cook Time:</span>
            <span className="meta-value">{recipe.cookTime} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Servings:</span>
            <span className="meta-value">{recipe.servings}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty:</span>
            <span className="meta-value">{recipe.difficulty}</span>
          </div>
        </div>
      </div>
      
      <div className="recipe-description">
        <p>{recipe.description}</p>
      </div>
      
      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="directions-section">
          <h2>Directions</h2>
          <ol className="directions-list">
            {recipe.directions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;