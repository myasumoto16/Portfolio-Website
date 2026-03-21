import recipesJson from './recipes-data.json';
import okonomiImage from '../assets/recipes/okonomi.jpg';
import karaageImage from '../assets/recipes/karaage.jpg';
import pokeImage from '../assets/recipes/poke.jpg';
import luroufanImage from '../assets/recipes/luroufan.jpg';
import { Recipe } from '../types';

const images = [okonomiImage, karaageImage, pokeImage, luroufanImage];

export const recipesWithImages: Recipe[] = (recipesJson as Omit<Recipe, 'image'>[]).map(
  (recipe, i) => ({ ...recipe, image: images[i] })
);
