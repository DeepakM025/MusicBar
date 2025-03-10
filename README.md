# MusicBar

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/intro#learn-nx?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Monorepo Tool**: Nx
- **Testing**: Jest, @testing-library/react
- **Styling**: CSS
- **CI/CD**: GitHub Actions
- **Language**: TypeScript

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above)
- [npm](https://www.npmjs.com/) (version 6 or above)

### Steps

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/music-bar.git
    cd music-bar
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Run the development server**:

    ```sh
    npx nx serve core-app
    ```

    This will start the development server for the `core-app` on `http://localhost:3000`.

4. **Run tests**:

    ```sh
    npx nx test core-app
    ```

    This will run the unit tests for the `core-app`.

5. **Build the project**:

    ```sh
    npx nx build core-app
    ```

    This will build the `core-app` for production.

## Key Design Decisions and Trade-offs

- **Monorepo Structure**: We chose Nx for managing our monorepo to streamline the development process, allowing us to share code and configurations across multiple applications and libraries.

- **React with Vite**: React was selected for its component-based architecture and large ecosystem. Vite was chosen for its fast build times and modern development experience.

- **TypeScript**: TypeScript was used to provide type safety, which helps catch errors early in the development process and improves code maintainability.

- **Jest for Testing**: Jest was chosen for its comprehensive testing capabilities and ease of integration with React and TypeScript.

- **GitHub Actions for CI/CD**: GitHub Actions was selected for its seamless integration with GitHub repositories, allowing us to automate testing and deployment workflows.

## Running Tests and Viewing Test Coverage

1. **Run tests**:

    ```sh
    npx nx test core-app
    ```

    This will run the unit tests for the `core-app`.

2. **View test coverage**:

    ```sh
    npx nx test core-app --coverage
    ```

    This will generate a test coverage report for the `core-app`. You can view the coverage report by opening the generated `coverage/lcov-report/index.html` file in your browser.

## Project Structure

```plaintext
.DS_Store
music-bar/
    .editorconfig
    .github/
        workflows/
    .gitignore
    .nx/
        cache/
        workspace-data/
    .prettierignore
    .prettierrc
    .vscode/
        extensions.json
    core-app/
        index.html
        jest.config.ts
        project.json
        public/
        src/
        tsconfig.app.json
        tsconfig.json
        tsconfig.spec.json
        vite.config.ts
    jest.config.ts
    jest.preset.js
    music-library/
        index.html
        jest.config.ts
        project.json
        public/
        src/
        tsconfig.app.json
        ...
    nx.json
    package.json
    README.md
    tsconfig.base.json


CI/CD
This project uses GitHub Actions for continuous integration and deployment. The workflows are defined in the .github/workflows directory.

CI Workflow
The CI workflow runs on every push to the main and develop branches. It performs the following steps:

Checkout the repository
Setup Node.js
Install dependencies
Lint the project
Run unit tests
Build all apps
CD Workflow
The CD workflow runs on every push to the main branch. It performs the following steps:

Checkout the repository
Setup Node.js
Install dependencies
Build the application
Deploy the application



## Requirements of the project

### Core Features:

- **Music Library**:
    - Build a simple music library where the user can view, group, filter, and sort a collection of songs.
    - The library should be able to be grouped or sorted by album, artist, and title. Filtering should be done by these categories as well. 
        > DONE
    - Use JavaScript array functions (map, reduce, filter, etc.) to manipulate and manage the collection of songs.
        > DONE

- **Micro Frontend Architecture**:
    - Split the application into two parts:
        - Core Application: This will be the base application that loads the micro frontend.
            > DONE
        - Music Library Micro Frontend: This will contain the music library functionality (e.g., song listing, sorting, filtering) and be loaded into the core app.
            > DONE
    - The micro frontend should be integrated into the core app dynamically using a framework like Module Federation (Webpack), Vite, or an alternative build tool of your choice.
        > DONE

- **User Authentication & Authorization**:
    - Implement an in-memory JSON Web Token (JWT) to represent user authentication and authorization.
        > USING AUTH_TOKEN TO CHECK USER AUTHENTICITY
    - Create at least two user roles (admin and user).
        - admin: Should have access to all features, including adding/removing songs.
        - user: Should only be able to view and filter the music library.
        > DONE
    - Use role-based authorization to restrict access to certain features (e.g., only admins can add new songs).
        > DONE

- **Unit Testing**:
    - Write unit tests for your components and services, targeting 80% or higher code coverage. Ensure all key functionalities (authentication, filtering, sorting, etc.) are tested.
    - Use a testing framework like Jest or React Testing Library.
    - Use a testing framework that outputs code coverage in HTML, console, and LCOV formats.
    - Ensure key functionalities (authentication, filtering, sorting, etc.) are thoroughly tested.
     > DONE

- **Build Tool & Performance**:
    - The application should use either Vite or Webpack for bundling. You should be able to explain why you chose one over the other.
    - Ensure the application is optimized for performance, e.g., lazy loading the micro frontend and minimizing unnecessary re-renders.
    >DONE

### Technical Requirements

- **React**: The application must be built using React (functional components preferred with hooks).
    > DONE
- **Micro Frontend**: Use either Webpack Module Federation or a Vite-compatible solution for integrating micro frontends.
   > DONE
- **State Management**: Use React’s built-in useState or useReducer for state management. Avoid external libraries unless absolutely necessary.
   > DONE
- **Built-in JavaScript Functions**: Use map, filter, reduce, and similar methods to manipulate the song collection.
    > DONE
- **Testing**: Write unit tests for core functionalities and achieve 80% code coverage.
    > DONE
- **Authentication**: Implement a basic authentication and role-based authorization system.
    > DONE
- **CSS/Styling**: You can use any CSS framework or write custom styles, but the UI should be clean and functional.
    > DONE

### Bonus Points

- Implementing lazy loading of micro frontends to improve performance.
    > DONE
- Using TypeScript for type safety and better developer experience.
    > DONE
- Responsive design for mobile and desktop.
    > DONE
- Demonstrating proper use of React Context or other advanced state management strategies.
    > DONE
- Use GitHub actions (or equivalent) to build the app and push a release artifact to GitHub.
    > DONE

### Deliverables

1. A fully functional music library application that meets the above requirements.
2. A README.md file explaining:
     - How to install and run the project.
     - Key design decisions and trade-offs.
     - Instructions for running the tests and viewing the test coverage.
3. A link to the source code (preferably hosted on GitHub or GitLab).
4. A detailed explanation of how you implemented micro frontends and how the authentication/authorization system works.



