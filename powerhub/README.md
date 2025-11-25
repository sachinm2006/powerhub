# PowerHub — Static Multi-page Gym Site

This project is a responsive, multi-page gym/sports center landing site built with HTML, CSS, and vanilla JavaScript. The UI follows a futuristic 3D dark glassmorphism aesthetic and includes Firebase Auth scaffolding for email and phone sign-in.

Pages included:
- `index.html` — Home / hero / CTAs
- `login.html` — Email and Phone login UI + Firebase auth scaffolding
- `plans.html` — Owner card, pricing plans, equipment tiles
- `goodbye.html` — Goodbye/exit page

Files of interest:
- `style.css` — All styling (glassmorphism, neon accents, hover/tilt animations)
- `js/main.js` — UI interactions (tilt, drag-scroll)
- `js/login.js` — Login page logic + Firebase Auth calls (email/phone OTP scaffolding)
- `firebase-config.js` — Placeholder Firebase init; replace with your project values

Setup & run locally
1. Open this folder in Visual Studio Code.
2. Serve the static files locally. Using PowerShell, for example:

```powershell
# Use a simple Python server (Python 3.x)
python -m http.server 5500

# or use the VS Code Live Server extension (recommended)
```

3. Open http://localhost:5500 (or the port your server uses) to view the site.

Firebase setup (required for login functionality)
1. Create a Firebase project at https://console.firebase.google.com.
2. In the project settings, copy your Web SDK config and replace the placeholders in `firebase-config.js`.
3. In Authentication -> Sign-in method, enable Email/Password and Phone providers.
4. For Phone Auth testing, add test phone numbers in Firebase Console (recommended).

Notes
- The project uses the Firebase compat CDN SDK on `login.html`. For production, consider upgrading to the modular SDK and properly protecting API credentials.
- Phone sign-in requires reCAPTCHA and valid SMS sign-in configuration — test numbers are recommended during development.

Design & features
- Dark gradient background, neon cyan & purple accents, glass panels with `backdrop-filter: blur(10px)`.
- Button & card interactions: scale to 1.05 on hover, glow intensifies, border color shifts — smooth 0.3s transitions.
- Plans cards tilt with 3D hover and lift effect.
- Responsive layout using CSS Grid/Flexbox for mobile and desktop.

If you'd like, I can add additional features such as registration, password reset, or a fully modular Firebase integration. Tell me what you'd like next.
