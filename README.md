# Retro Pixel-Art Portfolio

A highly interactive, design-driven personal portfolio built on the MERN stack. Designed with a distinct retro-digital, 8-bit pixel art aesthetic, featuring meticulously crafted CSS animations, scroll scrubbing, and responsive layouts.

# Live at : https://strange-101.github.io/WEB_PORTFOLIO/

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
