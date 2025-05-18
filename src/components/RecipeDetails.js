import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetails.css';

function RecipeDetails({recipes}) {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const recipe = recipes[recipeId - 1];

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
        <table className="ingredients-table">
          <tbody>
            {recipe.ingredients.map((ingredient, index) => {
              const [name, amount] = ingredient.split(/:(.+)/); // Split at the first colon
              return (
                <tr key={index}>
                  <td className="ingredient-name">{name.trim()}</td>
                  <td className="ingredient-amount">{amount ? amount.trim() : ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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