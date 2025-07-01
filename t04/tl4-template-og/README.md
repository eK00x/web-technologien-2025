# Svelte + Vite

This template should help get you started developing with Svelte in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

-----------------------------------------------------------------------------------

# T04 Single-Page Application for Festival Experience Reports (Web Technologien)

Authors: Alice Alferink & Emilia Kistowski

## Description
The website "Rock am See – Experience Reports" is a Single-Page Application (SPA) developed using Svelte and Bootstrap. It enables festival visitors to share and view experience reports. All submitted reports are stored locally in the browser’s localStorage to prevent data loss.

The app includes a form for entering feedback (username, rating, title, and message). It performs basic validation and displays the submitted entries below the form as styled cards arranged in a responsive grid. Star ratings are visualized, with full ratings (5 stars) highlighted in yellow and partial ratings displayed with grey stars.

## Technologies Used
- Svelte 5
- Bootstrap
- JavaScript (ES6+)
- HTML/CSS
- localStorage
- Vite (Development Server)

## Folder Structure
- Teilleistung_04
    - 

## Setup Backend
1. Install VS Code or another IDE with terminal support.
2. Install Node.js (v18 or later recommended).
3. Open the project folder in your IDE.
4. Run npm install to install all required packages.
5. Start the development server with: npm run dev
6. The application should open automatically in your browser. If not, visit http://localhost:5173.

## How to Start/Use the Website
1. Step: Download the folder.
2. Step: If needed, unzip the folder.
3. Step: Open the folder in VS Coder or an other IDE with a terminal. 
5. Step: Run the command: "npm run server" .
6. Step: Open a second teminal and run: "npm run client" . The SPA should open itself automatically in the browser. 
7. Step: Enjoy! 😊

## Testing
The application was tested on
- Brave Browser
- Firefox
- Chrome