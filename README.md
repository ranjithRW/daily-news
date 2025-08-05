# News Search App

A modern React + TypeScript web application to search and display the latest news articles from around the world using the [NewsAPI](https://newsapi.org/). Styled with Tailwind CSS and built with Vite for lightning-fast development.

## Features

- 🔍 **Search** for news articles by topic or keyword
- 📰 **Responsive grid** of news cards with images, titles, and descriptions
- ⚡ **Loading spinner** and clear error messages
- 🎨 **Beautiful UI** with Tailwind CSS
- 🛡️ Handles CORS and API key errors gracefully

## Demo

![screenshot](screenshot.png)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- A free [NewsAPI](https://newsapi.org/) API key

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/news-search-app.git
   cd news-search-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure your API key:**
   - Create a `.env` file in the project root:
     ```sh
     cp .env.example .env
     ```
   - Add your NewsAPI key to `.env`:
     ```env
     VITE_NEWS_API_KEY=your_newsapi_key_here
     ```

4. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

## Build

To build for production:
```sh
npm run build
# or
yarn build
```

## Tech Stack
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NewsAPI](https://newsapi.org/)

## Environment Variables
- `VITE_NEWS_API_KEY` – Your NewsAPI key (required)

## Notes
- NewsAPI does **not** support client-side requests in production due to CORS. For production, use a backend proxy or serverless function.
- This project is for educational/demo purposes.

## License

[MIT](LICENSE)
