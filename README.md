# Webpack for Drupal 8

**Note -- This is still Project & readme are a work in progress**

#### What is this?

Webpack for Drupal 8 is my attempt to create the most hands off, reactive Webpack configuration for F/E developers to use when working on a Drupal 8 project. The goal was to have something that needed no tampering, no adding, no changes -- **something that just works on each project as it grows.** Webpack for Drupal 8 does that - recursively searching through your themes and modules within `docroot`, it will compile all CSS + JS within, only applying to your source code as it goes.

TL;DR -- It's an opinionated Webpack configuration allowing you to use modern tools within Drupal 8 without needing to alter.

#### Why?

Despite being incredibly powerful, Webpack is still an incredibly convulated tool to implement. Making things more difficult, between modules and themes Drupal has an intricate file structure that we need to gracefully maneuver within. This makes using modern tools -- such as React, TypeScript, SASS, etc. -- difficult to compile / transpile in a truly programatic way. Most developers resort to manually adding paths and files to their build tools.

#### How does it work?

Webpack for Drupal 8 relies on a naming convention for your modules and themes. We go into the basic usage below, but the rules you should know are:

- All developer source code for modules or themes should live within a `custom` directory, and each module and theme should have a `src` directory.
  - `docroot/themes/custom/your_theme`
  - `docroot/modules/custom/your_module`
- Within your theme or module folder, **you must have an entry point JS file for all source code.** All CSS or JS should imported _or_ made available recursively through this entry point, or it will not get compiled. This entry points name will always be the name of your compiled code, so it's recommended this be named the same as the module.
  - ex - A `my_module.js` entry point will produce `my_module.css` and `my_module.js` compiled code. We'll go into this more below.

and that's it! Follow those 2 rules and you're ready.

#### How can I use this?

There are currently 3 methods you can run this configuration:

- `npm run watch` - this starts the configuration in watch mode. Upon any saved change to a file that an entry file knows about, all code will recompile. This method gives you source-mapping.
- `npm run build:dev` - this gives you a Development build. Produces the exact same code as `npm run watch`
- `npm run build:prod` - this gives you a Production build. Code is minified and source-mapping is stripped out.

#### What does this support?

This currently supports:

- SCSS
- ES6
- TypeScript
- React + Styled Components

So long as these files are imported either directly or recursively into your entry file, you will recieve either ES5 output and auto-prefixed CSS.

Still a work in progress:

- Jest Testing Framework

#### I'm sold. Let's get started.

Place the configuration files in this repo in the root of your project, and follow the naming convention above.

- Theme example:
  ![Imgur](https://i.imgur.com/v5Lh1VL.png)
  - We have our `custom/new_theme` directory, and inside, a `src/new_theme.js`, with `new_theme.js` being our entry point for `new_theme`.
- Module example:
  ![Imgur](https://i.imgur.com/WjAipGk.png)
  - We have our `custom/new_module` directory, and inside, a `src/new_module.js`, with `new_module.js` being our entry for for `new_module`.

So long as you follow this convention, you can do this for as many modules or themes as you'd like. No manual configuration within Webpack is necessary.
