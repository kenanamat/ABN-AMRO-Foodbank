# ABN AMRO FoodBank

Welcome to FoodBank! This is a simple, user-friendly, single-page web application that allows users to browse and find their favorite recipes using the open API provided by TheMealDB.

## Features

- A dashboard showcasing a random meal to inspire your culinary adventures.
- A search bar allowing you to find a specific meal.
- Upon selecting a meal from the search results, you can view:
  - The name of the dish.
  - An enticing image of the dish.
  - A video on how to prepare the dish.
  - A list of ingredients along with the required measures.
  - Detailed instructions on how to prepare the dish.

_Bonus Features:_

- _Three_ random meals on the homepage, that you can refresh for if you're feeling adventurous.
- You can automagically start typing on any page with a search bar
- Animations throughout the application
- Ingredients have their image next to them and a checkbox to keep track.
- Three extra pages, each meant for a type of search:
  - They contain an ordered list of possibilities. When one of these is clicked, it searches for that option.
  - The search bar for these pages dynamically searches the list of possibilities and shows the options based on what is already typed.
  - The API filter only accepts queries that exactly match one of it's strings. So if there remains only one option from the list of possibilities, it searches for that option instead of what was typed in the search bar.
  - Area has a world map that shows the area you searched for.

## Getting Started

### Prerequisites

To run this project locally, you need the latest version of Node.js and npm installed.

### Installation

1. Clone the repo:

```sh
git clone https://github.com/kenanamat/ABN-AMRO-Foodbank.git
```

2. Navigate to the project directory:

```sh
cd ABN-AMRO-Foodbank
```

3. Install project dependencies:

```sh
npm i
```

4. Start the application:

```sh
npm run dev
```

The application should open in your default browser at `http://127.0.0.1:5173/`.

## Testing

To run unit tests, open a separate terminal and type:

```sh
npm run test
```

## Architecture and Design Decisions

- This project is built with **Vue**, a popular JavaScript framework for building interactive user interfaces, due to its component-based architecture, flexibility, and readability with script setup.
- **Vite** primarily for a faster startup.
- **Pinia** is used for state management to handle the state of our application effectively.
- **Vue-Router** is used to handle navigation on a single-page web application.
- **Axios** to make API calls simpler.
- **flush-promises** for testing, when called it awaits all promises before continuing a test .
- **Vitest** and **happy-dom** for testing, Vitest was chosen because of it's seamless integration with Vite and Typescript. happy-dom was chosen because it has more documentation than jsdom...
- **axios-mock-adapter** to help mocking API calls when testing.

Tests are not kept in a separate folder, instead they are right next to the file they're testing. This helps

The folder structure is kept extremely minimal and has no deeper layers. This is due to the scope of the project, where scalability is considered lightly. To keep some structure, components meant for a single page are named `PageNameComponentName.vue`. This also reduces the amount of keystrokes when using `ctrl + p`. The folders (and types) are organized as follows:

- `src/components`: This is where all the reusable components are stored.
- `src/stores`: This contains all the Pinia stores.
- `src/pages`: This is where the different page components (e.g., Home, MealDetails) are located.
- `src/data`: This holds mock data.
- `src/assets`: Assets.
- `src/types.d.ts`: Holds the types used in the project.

For styles, I used **TailwindCSS**, as it allows CSS to be written at the elements themselves making development time a lot shorter. On top of this, they provide **TailwindUI**. A library with templates using Tailwind for both Vue and React, further reducing development time. These templates are kept consistently update to keep in line with the best practices in frontend development.
