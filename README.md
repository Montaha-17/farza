# Farza Brand Guidelines

An Arabic RTL brand guidelines website for Farza, built with React, Vite, and Tailwind CSS. Cairo is bundled locally.

## Development

Use Node.js 22. Run `npm ci` followed by `npm run dev`. Run `npm run build` for the production bundle and `npm run preview` to serve it locally under `/farza/`.

## Original brand assets

Place the unmodified official logo and supplied reference images in `public/brand/`. Set `officialLogo` to the logo filename and add each moodboard entry as `{ file, title, alt }` in `src/brand.js`. The website displays labeled placeholders until the originals are supplied.

## GitHub Pages

Set the repository's Pages source to **GitHub Actions**. The included workflow builds and publishes `dist` on pushes to `main` or by manual dispatch. Vite is configured to serve the website under `/farza/`.
