export interface ProjectSection {
  title: string;
  bullets: string[];
  images?: { url: string; description: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repo: string;
  demo: string;
  detail: boolean;
  intro?: string[];
  techStack?: string[];
  sections?: ProjectSection[];
  mainImage?: string;
  fullDescription?: string;
  videoDemo?: string;
  github?: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  ingredients: string[];
  directions: string[];
}
