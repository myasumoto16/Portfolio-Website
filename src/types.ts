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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt?: string;
  tags?: string[];
  cover_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  content: string;
  created_at: string;
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
