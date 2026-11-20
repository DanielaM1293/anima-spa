# Ánima Spa
React + Vite + Tailwind + Framer Motion + lucide-react.
`npm install && npm run dev`

- Textos ES/EN en `src/i18n.js`; servicios y terapeutas también (ahí mismo).
- Tema y colores: variables CSS en `src/index.css`.
- Persistencia: idioma, tema, nombre y carrito en localStorage.

## Estructura
`src/context.jsx` (estado global: idioma, tema, carrito, reservas, puntos) · `src/hooks/useLocalStorage.js` · `src/lib/` (utils, payment) · `src/components/` (Nav, Hero, Services, Quiz, Gallery, Booking, Testi, MyBookings, Field) · `public/images/` (fotos).
Programa de puntos: 1 punto por $1.000; 500 puntos = $50.000 de descuento; niveles Semilla / Brote / Orquídea.
 https://anima-spa.netlify.app/
