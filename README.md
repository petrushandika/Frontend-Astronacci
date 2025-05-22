# Frontend Project Documentation

This repository contains the frontend codebase of a web application that integrates social media authentication, displays articles and videos, manages user membership, and provides a personalized dashboard experience.

## 📁 Project Structure

```
project-root/
├── public/                  # Static files like index.html and manifest.json
├── src/                     # Main source code directory
│   ├── assets/              # Images, icons, and other static assets
│   ├── components/          # UI components (Atomic Design: Atoms, Molecules, Organisms)
│   ├── contexts/            # Global state management using React Context API
│   ├── hooks/               # Custom Hooks (e.g., auth, membership logic)
│   ├── pages/               # Application pages
│   │   ├── Auth/            # Login and registration pages (with Google/Facebook)
│   │   ├── Articles/        # Article list and detail pages
│   │   ├── Videos/          # Video list and detail pages
│   │   ├── Membership/      # Membership types and upgrade options
│   │   └── Dashboard.tsx    # User dashboard after login
│   ├── services/            # API utility functions (auth, articles, videos, etc.)
│   ├── styles/              # Tailwind CSS config and global CSS
│   └── App.tsx              # Main application component
├── .env                     # Environment variables (e.g., backend URL)
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This documentation file
```

## 🛠️ Technologies Used

- **React** with **TypeScript**
- **Tailwind CSS** – For styling
- **React Context API** – For global state management
- **Custom Hooks** – For reusable logic
- **Google / Facebook Auth** – For social login integration
- **RESTful API** – Communicates with the backend via `services/`

---

## 📝 Description of Key Folders

### `public/`

Contains static files served directly by the browser:

- `index.html`: Main HTML template
- `manifest.json`: Web app manifest for PWA support

> Files here are not processed by webpack. Use this folder for robots.txt, favicons, etc.

---

### `src/assets/`

Holds all static media such as:

- Images
- Icons
- SVGs
- Fonts

---

### `src/components/`

Reusable UI components organized following **Atomic Design principles**:

- **Atoms**: Basic UI elements (buttons, inputs, labels)
- **Molecules**: Combinations of atoms (form groups, cards)
- **Organisms**: Complex layouts made from molecules (headers, sidebars)

---

### `src/contexts/`

Global state management using React Context API. Handles:

- Authentication state
- Membership type
- Theme preferences

---

### `src/hooks/`

Custom React hooks for shared logic:

- `useAuth()` – Manages login/logout and token handling
- `useMembership()` – Checks user access level
- `useFetch()` – General-purpose data fetching

---

### `src/pages/`

Top-level views of the application:

- **Auth/**: Login and register pages including social login integrations
- **Articles/**: Article listing and detailed view
- **Videos/**: Video listing and playback page
- **Membership/**: Displays available plans and allows upgrades
- **Dashboard.tsx**: Personalized view after successful login

---

### `src/services/`

Utility functions to communicate with the backend API:

- Handles HTTP requests (GET, POST, etc.)
- Centralized error handling
- Interceptors for auth tokens

---

### `src/styles/`

Includes:

- `globals.css`: Global CSS resets and base styles
- `tailwind.css`: Tailwind directives
- Tailwind configuration (`tailwind.config.js`) for custom theming

---

### `.env`

Environment variables used throughout the app:

```env
VITE_API_URL="https://api.yourbackend.com"
GOOGLE_CLIENT_ID="your-google-client-id"
FACEBOOK_APP_ID="your-facebook-app-id"
```

> ⚠️ Never commit this file to version control. Add it to `.gitignore`.

---

## 🧪 How to Run the Project

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/your-frontend-repo.git
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
VITE_API_URL="https://api.yourbackend.com"
GOOGLE_CLIENT_ID="your-google-client-id"
FACEBOOK_APP_ID="your-facebook-app-id"
```

4. **Start development server:**

```bash
npm run dev
```

5. **Build for production:**

```bash
npm run build
```
