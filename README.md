# BeProd

## Get started

To get started just visit [noteup.dev](https://noteup.dev) or [download a build](https://github.com/elementsinteractive/Noteup/releases) or clone the repo and run the install and start scripts

```properties
yarn install
```

```properties
yarn dev
```

To run the desktop version, after installing run

```properties
yarn tauri dev
```

To make a desktop build run

```properties
yarn build
yarn tauri build
```

## Roadmap

- [x] Tandem scroll for side-by-side editing
- [x] Quick command bar (WYSIWYG style)
- [x] Add a landing page to the website
- [x] Extra download options (like `.pdf`)
- [ ] Add a page with markdown help commands
- [ ] Note sharing
- [ ] Account sync
- [ ] Cross-platform sync

## Scripts

An explanation of the `package.json` scripts.

| Command       | Description                              |
| ------------- | ---------------------------------------- |
| `build`       | Create a production build of Noteup      |
| `dev`         | Run Noteup in a testing environment      |
| `format`      | Run prettier on all the project's files  |
| `lint`        | Run ESlint on all the project's files    |
| `postinstall` | Run post-install package patches         |
| `test`        | Run unit and component tests             |
| `test:e2e`    | Run end-to-end tests in the command line |

## Technologies

This project is possible thanks to all these open source languages, libraries, and frameworks.

| Tech                                                | Description                               |
| --------------------------------------------------- | ----------------------------------------- |
| [Codemirror](https://codemirror.net/)               | Browser-based text editor                 |
| [TypeScript](https://www.typescriptlang.org/)       | Static type-checking programming language |
| [React](https://reactjs.org/)                       | Front end user interface                  |
| [Recoil](https://recoiljs.org/)                     | Global state management                   |
| [Vite](https://vitejs.dev/)                         | Dev server and build tool                 |
| [Styled-components](https://styled-components.com/) | JavaScript styling                        |
| [ESLint](https://eslint.org/)                       | TypeScript linting                        |
| [Jest](https://jestjs.io/)                          | Unit testing framework                    |
| [Cypress](https://www.cypress.io/)                  | End-to-end testing framework              |

## Inspirations

This project was visually inspired by another markdown note app called [Takenote](https://github.com/taniarascia/takenote) and the macOS notes app.

## Author

- [Lucas](https://github.com/lluc2397)

## License

This project is open source and available under the [MIT License](LICENSE).