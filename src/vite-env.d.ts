/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_SANITY_PROJECT_ID: string;
  readonly VITE_SANITY_DATASET: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Image asset type declarations
declare module '*.png' { const src: string; export default src; }
declare module '*.PNG' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }
declare module '*.JPG' { const src: string; export default src; }
declare module '*.jpeg' { const src: string; export default src; }
declare module '*.JPEG' { const src: string; export default src; }
declare module '*.gif' { const src: string; export default src; }
declare module '*.svg' { const src: string; export default src; }
declare module '*.webp' { const src: string; export default src; }
