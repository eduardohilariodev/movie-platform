# Vue Movie Platform Showcase
>
> A modern Vue 3, TypeScript, and Tailwind CSS application simulating a movie browsing platform with a shopping cart and checkout.

## ✨ Visual Demonstration

*(Add screenshots or GIFs showcasing key features like the movie grid, infinite scroll, cart, and checkout form)*

## 📋 About the Project

This project serves as a practical demonstration of modern frontend development techniques using the Vue 3 ecosystem. It simulates a common e-commerce flow—browsing items (movies), adding them to a cart, and proceeding through a multi-step checkout process.

The primary motivation was to build a visually appealing, highly responsive application that showcases proficiency in:

- **Component-Based Architecture:** Structuring a Vue application logically.
- **State Management:** Effectively handling application state with Pinia.
- **Asynchronous Operations:** Managing API calls and loading states smoothly.
- **UI/UX Best Practices:** Implementing features like infinite scrolling, skeleton loading, and form validation for a better user experience.
- **Modern Tooling:** Utilizing Vite, TypeScript, and Tailwind CSS for an efficient development workflow.

## 🛠️ Technologies Used

This project leverages a modern frontend stack:

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia (for managing movies, cart, form state) - *Chosen for its simplicity, type safety, and integration with Vue DevTools.*
- **Routing:** Vue Router - *Handles client-side navigation and guards.*
- **Styling:** Tailwind CSS - *Utility-first CSS for rapid UI development and responsiveness.*
  - `clsx` & `tailwind-merge` for conditional class management.
- **Animations:**
  - `motion-v`: Simple declarative animations.
  - `animate.css`: Pre-built CSS animations.
- **Forms:**
  - VeeValidate: For declarative form validation.
  - Zod: For schema definition and validation, integrated with VeeValidate.
  - `maska`: Input masking for improved UX (e.g., credit card numbers).
- **Asynchronous Operations:** Native `fetch` API within Pinia actions.
- **Composables:**
  - VueUse (`useIntersectionObserver`, etc.)
  - Custom composables (e.g., `useCurrency`)
- **Code Quality:** ESLint & Prettier

## 🏗️ Project Architecture

The project follows a standard component-based architecture, organized for clarity and maintainability:

```
src/
├── components/      # UI Components (base, ui, features)
├── composables/     # Reusable Vue Composition API functions
├── lib/             # External libraries or integrations
├── router/          # Vue Router configuration
├── stores/          # Pinia state management modules
├── styles/          # Global styles, Tailwind config
├── types/           # TypeScript type definitions
├── views/           # Page-level components mapped to routes
├── App.vue          # Root Vue component
└── main.ts          # Application entry point
```

Key architectural decisions:

- **Composition API:** Enables better logic reuse and organization compared to the Options API.
- **Pinia:** Preferred over Vuex for its simpler API, better TypeScript support, and modularity.
- **Utility-First CSS:** Tailwind CSS allows for rapid development and consistent styling without leaving the HTML/template.

## ⚙️ Installation and Setup

### Prerequisites

- Node.js (Check `.nvmrc` or specify version, e.g., v18+)
- npm or bun

### Installation Steps

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
    - Create a `.env` file in the root directory by copying `.env.example` (if it exists).
    - Add necessary environment variables. Example:

        ```env
        VITE_API_BASE_URL=https://your.api.endpoint # e.g., TMDB API
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

## 🚀 Usage and Features

- **Movie Browsing:** Displays a grid of movies fetched from an API (e.g., TMDB).
- **Infinite Scrolling:** Automatically loads more movies as the user scrolls down, using `useIntersectionObserver` to trigger API calls for the next page.
- **Skeleton Loading:** Shows skeleton placeholders while movie data is being fetched, improving perceived performance.
- **Shopping Cart:**
  - Add/remove movies from the cart.
  - Cart state persists using Pinia and potentially local storage.
  - View cart details (items, total price).
- **Checkout Form:**
  - Multi-step form (e.g., Shipping, Payment).
  - Client-side validation using VeeValidate + Zod schemas.
  - Input masking for fields like credit card numbers.
- **Responsive Design:** Adapts seamlessly to various screen sizes using Tailwind CSS.
- **Animations:** Subtle UI animations enhance user interaction.

*(Consider adding small GIFs here to demonstrate specific features like adding to cart or the form validation)*

## 🧩 Challenges and Solutions

### Challenge 1: Implementing Smooth Infinite Scroll

- **Problem:** Efficiently displaying a potentially large list of movies fetched from an API without impacting initial page load or requiring pagination clicks, while providing clear loading feedback.
- **Solution:**
    1. Fetched the initial set of movies on component mount (`movieStore.fetchMovies()`).
    2. Used `@vueuse/core`'s `useIntersectionObserver` to monitor a target element near the bottom of the movie list.
    3. When the target became visible and data wasn't already loading (`!movieStore.loadingMore`), triggered the `fetchMovies` action again with the next page number.
    4. Managed distinct loading states (`isRecommendationsLoading` for initial load, `loadingMore` for subsequent fetches) to show appropriate feedback (skeleton vs. spinner) and prevent duplicate requests.
- **Outcome:** A seamless browsing experience where movies load progressively as the user scrolls, keeping the initial load fast and UI responsive.

*(Add another challenge if applicable, e.g., managing complex form state, synchronizing cart state, etc.)*

## 🔮 Next Steps

While this project serves as a demonstration, potential future enhancements could include:

- [ ] User authentication (login/signup).
- [ ] Saving cart/preferences to a backend.
- [ ] Implementing movie search/filtering functionality.
- [ ] Adding detailed movie view pages.
- [ ] Writing unit and end-to-end tests.
- [ ] Improving accessibility (WCAG compliance).
- [ ] Refactoring CSS for better custom property usage with Tailwind.

## 🤝 Contributing

This is primarily a showcase project, but contributions or suggestions are welcome! If you have ideas for improvement:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature/your-improvement`
3. **Make your changes.**
4. **Commit your changes:** `git commit -m 'feat: Add some feature'`
5. **Push to the branch:** `git push origin feature/your-improvement`
6. **Open a Pull Request.**

Please ensure any code contributions adhere to the existing style (ESLint/Prettier) and include relevant updates to documentation if necessary.

## 📄 License

*(Specify your license here, e.g., MIT)*
This project is licensed under the MIT License - see the `LICENSE` file for details (if you have one).

## 📬 Contact

Your Name - <your.email@example.com>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-YourName-blue)](https://linkedin.com/in/your-linkedin-profile)
[![Portfolio](https://img.shields.io/badge/Portfolio-yourwebsite.com-brightgreen)](https://yourwebsite.com)
[![GitHub](https://img.shields.io/badge/GitHub-YourUsername-gray)](https://github.com/YourUsername)

Project Link: [https://github.com/YourUsername/repository-name](https://github.com/YourUsername/repository-name)
