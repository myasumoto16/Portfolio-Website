## Check out the website below:
[My Portfolio Website](https://masakazuyasumoto.netlify.app/)

### Tech Stack

- **Framework**: React 18 + TypeScript, bundled with Vite
- **Styling**: CSS custom properties (design tokens), dark/light mode
- **Routing**: React Router v7
- **Contact form**: EmailJS
- **Deployment**: Netlify (SPA redirects via `public/_redirects`)

### Getting Started

```bash
npm install
npm run dev      # dev server at http://localhost:3001
npm run build    # TypeScript check + production build → dist/
npm run preview  # preview the production build locally
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```
