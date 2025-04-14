# Vue Movie Platform Showcase

## Overview

This project is a frontend application built with **Vue 3**, **TypeScript**, and **Tailwind CSS** designed to showcase modern frontend development practices. It simulates a movie browsing platform where users can view movie details, add movies to a shopping cart, and proceed through a checkout form. The primary goals were to demonstrate proficiency in the Vue ecosystem, create a highly responsive and visually appealing UI with smooth animations, and manage application state effectively.

*(Optional: Add a link to a live demo here)*
`[Live Demo](your-deployment-link)`

*(Optional: Add a screenshot or GIF here)*
`![Screenshot](path/to/your/screenshot.png)`

## Key Features

* **Movie Browsing:** Displays a grid of movies fetched from an external API.
* **Infinite Scrolling:** Dynamically loads more movies as the user scrolls down the page using Intersection Observer.
* **Skeleton Loading:** Shows skeleton placeholders while movie data is being fetched for improved perceived performance.
* **Shopping Cart:** Users can add/remove movies from a persistent cart.
* **Checkout Form:** A detailed checkout form with client-side validation using VeeValidate and Zod.
* **Responsive Design:** Fully responsive layout adapting seamlessly to different screen sizes (mobile, tablet, desktop) using Tailwind CSS.
* **Animations:** Utilizes libraries like `motion-v` and `animate.css` for engaging UI transitions and effects.
* **Type-Safe Code:** Built entirely with TypeScript for better maintainability and developer experience.

## Technical Skills Showcase

This project highlights experience with:

* **Framework:** Vue 3 (Composition API, `<script setup>`)
* **Language:** TypeScript
* **Build Tool:** Vite
* **State Management:** Pinia for centralized, type-safe, and scalable state management (managing movies, cart, auth state).
* **Routing:** Vue Router for client-side navigation, including navigation guards for route protection (e.g., preventing access to checkout with an empty cart).
* **Styling:** Tailwind CSS for rapid, utility-first UI development and responsiveness. `clsx` and `tailwind-merge` for conditional class management.
* **Animations:** Implementing UI animations and transitions (`motion-v`, `animate.css`).
* **Forms:** Building complex forms with robust validation using VeeValidate and Zod schemas. Input masking (`maska`) for improved UX.
* **Asynchronous Operations:** Handling API calls (`fetch` or similar in Pinia stores), managing loading/error states.
* **Composables:** Leveraging VueUse (`useIntersectionObserver`) and custom composables (`useCurrency`) for reusable logic.
* **Component Architecture:** Structuring components logically (base, ui, features, layout).
* **Code Quality:** Using ESLint and Prettier for consistent code style and quality.
* **Environment Variables:** Managing configuration like API keys/endpoints via `.env` files.

## Problem Solving Example: Infinite Scroll Implementation

* **Challenge:** Efficiently display a potentially large list of movies fetched from an API without impacting initial page load time or requiring manual pagination clicks.
* **Solution:** Implemented an infinite scrolling feature on the home page.
    1. The initial set of movies is fetched on component mount (`movieStore.fetchMovies()`).
    2. The `@vueuse/core` composable `useIntersectionObserver` monitors a target element placed near the bottom of the movie list.
    3. When this target element becomes visible in the viewport (user scrolls down), and if data isn't already loading, the `fetchMovies` action in the Pinia store is triggered again with the next page number (`movieStore.fetchMovies(currentPage.value + 1)`).
    4. Loading states (`isRecommendationsLoading`, `loadingMore`) prevent duplicate fetches and provide visual feedback (e.g., skeleton loaders).
* **Outcome:** This provides a smooth, seamless browsing experience for the user, loading data progressively as needed, while keeping the initial load fast.

## Project Setup

1. **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <repository-name>
    ```

2. **Install dependencies:**

    ```bash
    # Using npm
    npm install

    # Or using bun
    bun install
    ```

3. **Environment Variables:**
    * Create a `.env` file in the root directory.
    * Add any necessary environment variables (e.g., API keys, base URLs used in your Pinia stores). Example:

        ```env
        VITE_API_BASE_URL=https://your.api.endpoint
        VITE_API_KEY=your_api_key
        ```

4. **Run the development server:**

    ```bash
    # Using npm
    npm run dev

    # Or using bun
    bun dev
    ```

5. Open your browser to `http://localhost:5173` (or the port specified by Vite).
