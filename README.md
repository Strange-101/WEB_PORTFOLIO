# Retro Pixel-Art Portfolio

A highly interactive, design-driven personal portfolio built on the MERN stack. Designed with a distinct retro-digital, 8-bit pixel art aesthetic, featuring meticulously crafted CSS animations, scroll scrubbing, and responsive layouts.

## 🌟 Key Features

*   **Pixel Art Aesthetic**: Complete with multi-step 8-bit notched corners, chunky drop shadows, and dithered gradients.
*   **Dynamic Scroll Animations**: 
    *   **Staggered Text Reveals**: Headings utilizing custom 3D 'wave' flip animations (`cubic-bezier` bounds).
    *   **Word-by-Word Highlight**: "About" section text lights up dynamically relative to your scroll position.
    *   **Elastic Bouncing Cards**: Project cards burst into view with a playful spring-tension arcade scale effect.
    *   **Scroll-Scrub Lens**: The Skills array acts as a continuous magnifying glass, seamlessly zooming the centered item based on precise viewport scroll coordinates.
*   **Live Pixel Decor**: Interactive SVG pixel birds looping naturally and an animated pixel-wave transition canvas in the footer.
*   **MERN Architecture**: Clean separation between the React Vite frontend and the Node/Express JSON API backend serving the portfolio content.

## 🛠️ Technology Stack

**Frontend:**
*   React (Vite)
*   Vanilla CSS (Advanced usages of `box-shadow` rendering, `IntersectionObserver`, and `clip-path`)

**Backend:**
*   Node.js
*   Express.js

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Strange-101/portfolio2.git
    cd portfolio2
    ```

2.  **Start the Backend Server**:
    The backend provides the JSON API necessary to populate the frontend data dynamically.
    ```bash
    cd server
    npm install
    npm start
    ```
    *The server runs locally on port `5000`.*

3.  **Start the Frontend Client**:
    Open a new integrated terminal window.
    ```bash
    cd client
    npm install
    npm run dev
    ```
    *The client runs on your local Vite port (usually `5173`).*

## 📁 Project Structure

```text
Portfolio2/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # React functional elements (Hero, About, Skills, etc.)
│   │   ├── styles/         # Discrete component-level CSS logic
│   │   └── App.jsx         # Root app assembly & fallback data
│   └── package.json
└── server/                 # Express Backend API
    ├── index.js            # Main backend entry point providing JSON REST API
    └── package.json
```

## 📬 Contact & Links
- **GitHub**: [Strange-101](https://github.com/Strange-101)
- **LinkedIn**: [Kunal Mahore](https://www.linkedin.com/in/kunal-mahore)
- **Email**: kunalmahore101@gmail.com
