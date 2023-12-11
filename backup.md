## Introduction

Hello there! Having found your way to this blog, you probably want to know how to make your app or website multilingual.

Specifically, you want to internationalize your web application and localize the translation to specific languages and or cultures.

As a software engineer, it's likely something you’ll need to learn, as making your content available in more languages will make your content more accessible, allow you to grow your customer base, and or increase reach.

In some geopolitical regions, there are laws requiring governments and companies to offer services in more than one language, and internationalizing your web application and localizing content is a must, not a choice.

This blog will walk you through step by step how to internationalize and localize your static content using `Next.js` and `next-i18next`.

In case you didn't know, internationalizing has to do with making your web application able to support several languages while localization takes care of the actual language translation aspects.

## Overview of technologies used

In this guide, we’ll be using Next.js, Typescript, Tailwind CSS, a next-i18next, Node.js NPM, Vercel & Playwright.

Having some basic React, Javascript, HTML & CSS skills is a requirement for this tutorial.

You'll also need to have \[Node.js, and NPM\]([https://nodejs.org/en/download](https://nodejs.org/en/download)) installed to complete this tutorial.

\[Next.js\]([https://nextjs.org/](https://nextjs.org/)) is a popular open-source framework for building web applications with React.

If you've ever had the pleasure of building applications only using vanilla React web applications you'll come to appreciate how Next.js makes it easy to build server-side rendered or static-site-generation, automatic code splitting, zero-configuration web applications with a rich echo system, and developer experience.

\[Typescript\]([https://www.typescriptlang.org/](https://www.typescriptlang.org/)) is a language superset of Javascript. It enforces type safety which makes your applications robust, and scalable. It provides a powerful intelligence tool for finding and solving type safety errors pre-build.

\[Tailwind\]([https://tailwindcss.com/](https://tailwindcss.com/)) CSS is a very popular utility-first, customizable, responsive posts-CSS-based framework.

\&gt;"\[Node.js\]([https://nodejs.org/en](https://nodejs.org/en)) is an open-source JavaScript runtime environment based on Chrome's V8 engine, enabling server-side scripting with a non-blocking I/O model, asynchronous programming, a rich ecosystem of modules through NPM, and an event-driven architecture for efficient handling of concurrent connections. "

\-- Courtesy of chatGPT! :)

\[NPM\]([https://www.npmjs.com/](https://www.npmjs.com/)) is a javascript dependencies package manager tool primarily used with Node.js

And finally, \[Next-i18next\]([https://next.i18next.com/](https://next.i18next.com/)) enables internationalization and localization seamlessly with Next.js and uses i18next & react-i18next under the hood.

\[i18next\]([https://www.i18next.com/](https://www.i18next.com/)) is the core:

"...**internationalization framework**... ...written in and for JavaScript. ..."

While react-i18next provides support for the i18n standard for react apps, it requires more configuration.

## Project Setup

First, we will need to create a `Next.js` application.

In your chosen terminal type the following and then press enter:

```bash
npx create-next-app next-blog
```

\[NPX\]([https://docs.npmjs.com/cli/v8/commands/npx](https://docs.npmjs.com/cli/v8/commands/npx)) is a package runner that comes with NPM that allows you to run packages without installing them globally.

\[Create-next-app\]\[[https://nextjs.org/docs/pages/api-reference/create-next-app](https://nextjs.org/docs/pages/api-reference/create-next-app)\] is a package utility to set up a `Next.js` app.

Next.js supports many of the tools we will be using out of the box and are configured for you.

You will be prompted with the following:

```bash
npx create-next-app next-blog
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in ...
```

To follow along with this tutorial choose yes for Typescript, Tailwind CSS, no for `src` directory (we'll cover how to set the SRC directory once basic setups are covered), and the App Router, and click on yes for the default import alias(Choose the default "@/\*" import alias).

From the root of the project `next-blog` We will also need to install the following packages:

```bash
npm i next-i18next
```

Next-i18next is a library that simplifies internationalization (i18n) in Next.js applications. It provides tools and utilities to manage translations, language switching, and localization in your Next.js projects.

Now we are ready to internationalize & localize the application.

### Namespaces, loading namespaces, nesting & sub-directories...

Let's organize our translation content with simple French and English namespaces, which will also be used to demonstrate loading, nesting, and sub-directories to understand the organization's capacities in the context of a larger application.

Create the below directory and file structure in `public` directory:

```bash
public/
|-- locales/
|   |-- en/
|   |   |-- hero.json
|   |   |-- navigation/
|   |       |-- navbar.json
|   |       |-- language-selector.json

|   |-- fr/
|   |   |-- hero.json
|   |   |-- navigation/
|   |       |-- navbar.json
|   |       |-- language-selector.json
```

Your respective `en` and `fr` directories `hero.json` file will contain:

```json
{
    "helloworld":"Hello World!",
    "title": "Implementing internationalisation in Next.js using \"next-i18next\"",
    "first-paragraph":"This blog will walk you through step by step how to internationalize and localize your static content using Next.js and next-i18next.",
    "links":{
      "blog-link":"Read the full blog",
      "github-blog-link":"Github"
    }
  }
```

```json
{
    "helloworld":"Bonjour Monde!",    
    "title": "Mise en place de l'internationalisation dans Next.js avec \"next-i18next\"",
    "first-paragraph": "Ce blog vous guidera étape par étape dans l'internationalisation et la localisation de votre contenu statique à l'aide de Next.js et next-i18next.",
    "links": {
        "blog-link": "Lire le blog complet",
        "github-blog-link": "Github"
    }
}
```

... and the respective `navbar.json`:

```json
{
    "product": "Nested Directory",
    "features":"Features",
    "main":"Principale"
  }
```

```json
{
    "product": "Produit",
    "features": "Fonctionnalités",
    "main": "Principale"
}
```

And finally the language selector translation files:

```json
{
  "english": "English",
  "french":"French",
  "languageselector":"Language Selector"
  }
```

```json
{
  "english":"Anglais",
  "french":"Francais",
  "languageselector":"Sélecteur de langue"
  }
```

### Configuration

Create a `next-i18next.config.js` file at the root of your project:

```typescript
module.exports = {
    i18n: {
      locales: ["en", "fr"],
      defaultLocale: "en",
    },
    defaultNS: 'hero'
  };
```

Our configuration file specifies the default locale language and which locale languages are available in this application. The default namespace file is `common.json` but since we are not using it in this project we must include a `defaultNS` property and the file name in the config file. We are exporting this i18n configured object so that it is available to our next.config.js file.

The i18n configuration object is provided by the next-i18next package.

Modify your `next.config.js` file:

```typescript
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n
}
module.exports = nextConfig
```

We are importing the configured i18n object for internationalization settings, which can be used to support localized content.

Next.js links your locales(i.e.: JSON translation files) with internationalized routing in sync out of the box, however, it doesn't assist in the actual translation of the content or establish the framework for supporting internationalizing your web application.

Some important functions provided by next-i18next are:

`useTranslation` hook

`appWithTranslation` HOC(Higher Order Component)

`withTranslation` HOC

`appWithTranslation` is used at the top level of your application to enable internationalization across all pages and components.

The `useTranslation` hook and `withTranslation` HOC is used within your components. `withTranslation` is used with class components while `useTranslation` is used with functional components. Since newer versions of React implementation tend to favor functional programming we will use `useTranslation`.

First in `_app.tsx`, which normally is where we find the common layout and component structures we can replace the entire file with:

```typescript
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
          <Component {...pageProps} />
    </>
  );
}
export default appWithTranslation(MyApp);
```

We are essentially wrapping the entire application and enabling i18n internationalization features to be available everywhere in the application.

In our tutorial let's imagine that our data is static, meaning it won't change and doesn't need to be rebuilt every time the content is accessed by the user. This will make it faster to access.

(In upcoming Part 2 of this blog we will cover cases where the data is dynamic and stems for a Database.)

In your main `index.tsx` file, which is the main entry point of your app:

```javascript
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Index = () => {
  const { t } = useTranslation("hero");

  return (
    <div>
        <h1>{t("helloworld")}</h1>
    </div>
  );
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, "hero")),
    },
  };
};

export default Index;
```

The translation content from hero.json for French and English language props will now be available to all our components found in the index. js through the use of...

`const { t } = useTranslation("hero");` which provides translation functionality within the respective functional components.

`getStaticProps` is using `serverSideTranslations` to preload translations at build time for better performance.

Because we have several translation files we will instead pass an array so all of them are accessible within our app.

Modify this portion of the main `index.tsx` file.

```javascript
//...

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["hero", "navigation/navbar","navigation/language-selector"])),
    },
  };
};

export default Index;
```

A very subtle change:

`...(await serverSideTranslations(locale as string, ["hero", "navigation/navbar", "navigation/language-selector"])),`

One namespace is in its specific locale (e.g., "en" or "fr"), and the others are nested within the locales `navigation` folder.

This array structure allows you to fetch translations from several namespaces, for your components or pages.

We are ready to give our application its first run!

From the root of your project...

```bash
npm run dev
```

The above is a default script found in package.json which compiles your app and should do so continually as you make changes to the app without needing to restart the developer server for many changes.

Check \`[http://localhost:3000](http://localhost:3000/fr)\` and then \`[http://localhost:3000/fr](http://localhost:3000/fr)\` in your browser to make sure it's working. You can also change the language settings in your browser of choice to obtain the same results.

Ok, let's make it a bit more aesthetically pleasing!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1697064841291/725debca-c98d-492e-81ca-5bf06522fed0.jpeg align="center")

## Code polishing

Create the following file structure from the root of the project:

```bash
components/
    |-- Hero.tsx
    |-- Navbar.tsx
    |-- Layout.tsx
    |-- Container.tsx
```

Replace `index.tsx` with the following:

```typescript
...
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"


const Index = () => {
  return (
    <Layout> 
      <Navbar />
      <Hero />
  </Layout>
  );
};
...
```

The `Layout.tsx` component is to improve esthetics and define the overall structure of the application while most of the implementation of internationalization will happen inside the Navbar and Hero components respectively.

Add code snippets to these files respectively:

`Layout.tsx`

```typescript
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
      {children}
    </div>
  );
};

export default Layout;
```

This code is a React component named `Layout` that takes a single prop called `children` which is of type ReactNode. The component renders a div element with a CSS class for centering content and providing different padding sizes based on the screen size.

`Hero.tsx`

```typescript
import Image from "next/image";
import Container from "../components/Container";
import heroImg from "../public/img/translation.jpg";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            Implementing internationalisation in Next.js using "next-i18next"
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            This blog will walk you through step by step how to internationalize and localize your static content using Next.js and next-i18next.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://github.com/kbventures/next-i18next-blog"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                Read the full blog
              </a>
              <a
                href="https://github.com/kbventures/next-i18next-blog"
                target="_blank"
                rel="noopener"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <svg
                  role="img"
                  width="24"
                  height="24"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span> View on Github</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="400"
              height="400"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Hero;
```

This code defines a React component named `Hero` that represents a section of a website's landing page, containing text and an image, with responsive styling and links to a blog and a GitHub repository.

You will need to download an image from this repository and name it `translation`.

[Image Link](https://github.com/kbventures/next-i18next-blog-edit/blob/main/src/public/img/translation.jpg)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1702071383059/c1c34843-506f-47c7-8e41-9573cb37f7cb.png align="center")

And move that image to the `public` directory from the root of the project.

We also have a `Container.tsx` utility component.

```typescript
import React, { ReactNode } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div
      className={`container p-4 mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
```

This code creates a reusable box for content with optional styling, so you can easily place different things inside it, like text or images, in a web application.

And finally our `Navbar.tsx` component:

// TO BE DELETED LATER //

```typescript
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Navbar = () => {

  const navigation = [
    "product",
    "features",
    "main",
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                  <Link
                  href={menu === "main" ? "/" : `/${menu}`}
                  className={`inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover-text-indigo-500 focus-text-indigo-500 focus-bg-indigo-100 focus-outline-none dark-focus-bg-gray-800 ${
                    router.pathname === (menu === "main" ? "/" : `/${menu}`) ? "highlighted-link" : ""
                  }`}
                >
                  {navbarT(`${menu}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href="/" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Language Selector Will Go Here
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
```

```typescript
import Link from "next/link";

const Navbar = () => {

  const navigation = [
    "Product",
    "Features",
    "Main",
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                  <Link
                  href="/"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href="/" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Language Selector Will Go Here
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
```

This code generates a responsive navigation bar with a list of links: "Product," "Features," "Blog," and a language selector.

You'll need to create `styles/custom-styles.css`

```typescript
/* custom-styles.css */

.highlighted-link {
    background-color: #AF87EA;
    color: #000;
    font-weight: bold;
    /* Add more custom styling as needed */
  }
```

You will need to import this file in `styles/global.css`

```typescript
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import your custom CSS here */
@import './custom-styles.css';
...
```

So now we have the aesthetics basics in place.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695746790174/7cbfe37a-b3dd-4a94-a61e-40079c21087c.png align="center")

### Organizing things...

What if your web app is really large and you'd like more options to organize your translation files and would like to know how to access them in different ways?

Let's replace the `Hero.tsx` component with the following code :

```typescript
import Image from "next/image";
import Container from "../components/Container";
import heroImg from "../public/img/translation.jpg";
import { useTranslation } from "next-i18next";

const Hero = () => {

  const { t } = useTranslation("hero");

  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            {t("title")}
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
            {t("first-paragraph")}
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md ">
                {t("links.blog-link")}
              </a>
              <a
                href="https://github.com/kbventures/next-i18next-blog"
                target="_blank"
                rel="noopener"
                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <svg
                  role="img"
                  width="24"
                  height="24"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <title>{t("links.github-blog-link")}</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>{t("links.github-blog-link")}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="400"
              height="400"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Hero;
```

So we are again demonstrating a simple component translation but this time we are also demonstrating the use of nested JSON properties.

// WORKING UNTIL HERE

Okay now replace the code in the `Navbar.tsx` component:

```typescript
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Navbar = () => {
  const { t: navbarT } = useTranslation("navigation/navbar");
  const { t: languageSelectorT } = useTranslation("navigation/language-selector");

  const navigation = [
    "product",
    "features",
    "main",
  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                 <Link
                  href={menu === "main" ? "/" : `/${menu}`}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover-text-indigo-500 focus-text-indigo-500 focus-bg-indigo-100 focus-outline-none dark-focus-bg-gray-800"
                >
                  {navbarT(`${menu}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
         <div className="hidden mr-3 space-x-4 lg:flex nav__item">
              Language Selector Will Go Here
         </div>
      </nav>
    </div>
  );
}

export default Navbar;
```

`{ t: navbarT }` destructures the result of `useTranslation("navigation/navbar")`. The `t` property is the translation function, and it's being assigned to the variable `navbarT`. This allows you to use `navbarT` to access translated strings specific to the "navigation/navbar" namespace within your `Navbar` component. The same destructuring is happening for `const { t: languageSelectorT } = useTranslation("navigation/language-selector");`.

These variables (`navbarT` and `languageSelectorT`) can then be used to access translated strings within your `Navbar` component or the language selector component(which we haven't set yet).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695831154304/587e38b1-98e8-4f0f-8e07-546a359558fb.jpeg align="center")

We could have picked to have all our project files in an SRC directory when selecting the configuration settings of our next.js project while using create-next-app but we didn't.

Having all your project files in the SRC is a very common and popular way to organize your project files by separating project files and configuration files.

First, create a `src` directory in your root project folder.

Then, you'll need to modify next-i18next.config.js:

```javascript
const path = require('path');

module.exports = {
    i18n: {
      locales: ["en", "fr"],
      defaultLocale: "en",
    },
    defaultNS: 'hero',
    localePath: 'src/public/locales',
  };
```

After that, you'll need to update your `tsconfig.json` file:

```typescript
...
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["src/components/*"],
      "@lib/*": ["src/lib/*"],
      "@pages/*": ["src/pages/*"],
      "@styles/*": ["src/styles/*"]
    }
...
```

... and your `tailwind.config.ts file` :

```typescript
...
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
...
```

And finally,

Move your component, public, styles, and pages directory inside the newly created `src` directory.

You may need to delete your node\_modules directory and package-lock.json and then the following in your terminal In order for your app to run without errors.:

```bash
npm cache clean --force
npm install
```

Okay so now we have some basic file organization strategies.

What if the user would like to change the language himself?

## Language Selector

Create `LanguageSelector.tsx` in your components directory:

Add the following code to our newly created LanguageSelector component:

```typescript
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useTranslation } from "next-i18next";

const LanguageSelector = () => {
  const { pathname, push, route, asPath, locale } = useRouter();

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    push(route, asPath, {
      locale: value,
    });
  };

   const { t } = useTranslation("navigation/language-selector")
  return (
        <div>
            <h2>{t("languageselector")}</h2>
            <select value={locale} onChange={handleLocaleChange}>
               <option value="en">{t("english")}</option>
               <option value="fr">{t("french")}</option>
            </select>
        </div>
  );
};

export default LanguageSelector;
```

As mentioned before next.js has a URL routing setup for internationalization built under the hood. To take advantage of URL routing we'll be using the `useRouter` hook which gives you access to the router object. You can use it to manage navigation and access route information.

Let's break down the destructured variables and the function in the provided code:

```javascript
{ pathname, push, route, asPath, locale } = useRouter();
```

1. `pathname`**:**
    
    * This variable holds the current path of the URL.
        
    * "[**https://example.com/**](https://example.com/products)**example**"
        
2. `push`**:**
    
    * This variable holds a function that allows you to navigate to different routes.
        
3. `route`**:**
    
    * This variable holds the current route pattern.
        
    * \[Routing\]([https://nextjs.org/docs/pages/building-your-application/routing](https://nextjs.org/docs/pages/building-your-application/routing))
        
4. `asPath`**:**
    
    * This variable holds the full URL path, including query parameters and hash.
        
    * "[**https://example.com/search?q=keyword&page=2**](https://example.com/search?q=keyword&page=2)"
        
5. `locale`**:**
    
    * This variable holds the current locale (language) of the route if i18n (internationalization) is being used.
        
    * `en` or `fr` for this tutorial
        

The React component we just created allows users to select a language using a dropdown menu that updates the URL path accordingly and navigates to the chosen language.

You need to update your Hero component and import the `LanguageSelector` component.

```typescript
...
import LanguageSelector from "@/src/components/LanguageSelector";

const Navbar = () => {
...
     <div className="hidden mr-3 space-x-4 lg:flex nav__item">
              <LanguageSelector />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
...
```

You should now be able to select a language using the drop-down menu.

Now what happens if we switch the language but go to another page?

Let's find out:

Create `pages/product/index.tsx`:

```typescript
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Hero from "@components/Hero";
import Navbar from "@components/Navbar";
import Layout from "@components/Layout";

const Product = () => {

  return (
    <Layout> 
      <Navbar />
      <Hero />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["hero", "navigation/navbar", "navigation/language-selector"])),
    },
  };
};

export default Product;
```

We already set up links for our navigation bar links in earlier steps which will support the root and products page. We are using `next/link` which is a component in Next.js that enables client-side navigation between pages in your application by preloading the linked page for improved user experience.

Create the following subdirectory in pages and add a new index.tsx file:

Next.js will automatically recognize these URL paths.

\[Linking and navigating\]([https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating](https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating))

Navigate by either using the URL or clicking on the `Product` the link we just created.

`http://localhost:3000/product`

Now try changing the language to French using our newly created dropdown menu, and then click on the `Principale` link to take us back to the home page `/`, Notice the language changes survive the navigation to new pages.

Now CTRL-C in your terminal and restart your app and restart your app from localhost:3000.

You'll notice your language changes aren't persisting. To do that you'll have to save the changes to your browser.

So how do we make these changes persist?

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698768477628/f48e8dc1-c7af-4f5d-b96c-4e3cbc876998.jpeg align="center")

### Persistence

In this tutorial, we will be using \[local storage\]([https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)) which allows web applications to store key-value pairs using a browser API.

Modify components/LanguageSelector/index.tsx:

```typescript
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const LanguageSelector = () => {
  const { pathname, push, route, asPath, locale } = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);

    useEffect(() => {
    const storedLocale = localStorage.getItem("selectedLocale");
    if (storedLocale) {
      setSelectedLocale(storedLocale);
      push(route, asPath, { locale: storedLocale });
    }
  }, []);

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLocale(value);
    localStorage.setItem("selectedLocale", value);
    push(route, asPath, {
      locale: value,
    });
  };
  const { t } = useTranslation("navigation/language-selector");
  return (
        <div>
            <h2>{t("languageselector")}</h2>
            <select value={locale} onChange={handleLocaleChange}>
               <option value="en">{t("english")}</option>
               <option value="fr">{t("french")}</option>
            </select>
        </div>
  );
};

export default LanguageSelector;
```

This revised component manages language selection for the web application by utilizing local state management with `useState`, utilizing router information with `useRouter`, saving and retrieving language preferences with `localStorage`which is part of the browser API.

There are severe limitations to this implementation. Local storage will be specific to every browser & device you use. If you restart the app and use it on the same browser and device it will remember the selected language but not on other browsers & devices.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1695833275160/e6ba07e3-f035-4e00-98db-6307067993c8.png align="center")

So how do we solve this problem?

First, you'll need to implement user authentication. The user's language selection will be stored in the back-end database. If you want this persisted selection to only apply during the current session you can use sessionStorage instead of localStorage.

This implementation will be covered in the upcoming part two of this blog!

Before we end this tutorial, what self-respecting web application doesn't have any tests and isn't deployed? Let's add some tests and then deploy the application!

## Testing

We will be testing our simple application using three different types of tests. Unit tests, integration tests and & end-to-end(e2e) tests.

Unit tests verify individual code components such as functions, methods, and classes, integration tests check out components are playing nice together, while end-to-end tests check the entire system's behavior from a user's viewpoint, covering multiple parts.

### Unit Tests

Unit tests focus on isolated testing of small code components, like functions or methods, to ensure their correctness, and execution, and verify that specific functions behave as expected under various conditions, often using mocks and stubs for isolation.

#### Installation

1. **Install Jest and Testing Dependencies**:
    
    ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest jest-environment-jsdom wait-on
    ```
    
    * `jest`is a widely used JavaScript testing framework with test runners, assertions, and mocking features. Test runners execute your tests, assertions validate expected outcomes, and mocking features help you simulate external dependencies for more controlled and isolated testing.
        
    * `@testing-library/react` simplifies testing React apps by providing tools that mimic user interactions with your components.
        
    * `@testing-library/jest-dom` is an extension for Jest that simplifies testing React components by providing custom DOM element matchers and utilities.
        
    * `@type/jest` references to jest Typescript types.
        
    * `@testing-library/user-event` is a JavaScript library for simulating user interactions with web applications in a testing environment.
        
    * `ts-jest` is a tool used with Jest to facilitate the testing of TypeScript code, offering features like type-checking and TypeScript support within the testing environment.
        
    * `jest-environment-jsdom`
        
2. **Create a Jest Configuration File**:
    
    Create a `jest.config.js` file in the root of your project with the following content
    
    ```typescript
    module.exports = {
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
      testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
      },
      testEnvironment: 'jest-environment-jsdom',
      setupFilesAfterEnv: ['<rootDir>__tests__/setupTests.ts'], 
      testPathIgnorePatterns: ['<rootDir>/__tests__/setupTests.ts', '<rootDir>/e2e/', ],
    };
    ```
    
3. Update package.json scripts:
    
    ```typescript
    "scripts": {
    // ...
        "test": "jest",
        "test:unit": "jest __tests__",
        "test:integration": "jest __integration_tests__",
        "test:watch": "jest --watch",
        "test:e2e": "concurrently \"npm run dev\" \"npx wait-on http://localhost:3000 && npx playwright test\""
    }
    ```
    
4. **Create a Jest Configuration File**:
    
    Create a `ts.config.js` file in the root of your project with the following content
    
    ```typescript
    {
        "extends": "./tsconfig.json",
        "compilerOptions": {
          "jsx": "react"
        }
      }
    ```
    
5. **Create a** `__tests__` **Directory in the root directory and write your Tests**:
    
    Inside the `tests` directory, create `languageSelector.en.test.tsx` and `languageSelector.fr.test.tsx` .
    
    ```typescript
    // languageSelector.en.test.tsx
    import React from 'react';
    import { fireEvent, render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import LanguageSelector from '../src/components/LanguageSelector';
    
    // Mock the translation hook with a mocked implementation
    jest.mock('next-i18next', () => ({
      useTranslation: (namespace: string) => {
        if (namespace === 'navigation/language-selector') {
          const translations = {
            languageselector: 'Language Selector',
            english: 'English',
            french: 'French',
          };
    
          return {
            t: (key: keyof typeof translations) => translations[key],
            i18n: { language: 'en' },
            ready: true,
          };
        }
    
        // Return a default implementation for other namespaces
        return {
          t: (key: string) => key,
          i18n: { language: 'en' },
          ready: true,
        };
      },
    }));
    
    describe('LanguageSelector', () => {
      it('renders in english', async () => {
        await render(<LanguageSelector />);
      
        // Use the translated strings you expect to be rendered
        expect(screen.getByText('Language Selector')).toBeInTheDocument();
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('French')).toBeInTheDocument();
    
         // Check if localStorage is initially empty
         expect(localStorage.getItem('selectedLocale')).toBeNull();
    
         // Simulate changing the language to French
         // screen.getByRole('combobox'): This part of the code uses the screen object provided by the
         // @testing-library/react library. It looks for an element with the ARIA role of 'combobox'.
         //  In HTML, a <select> element typically has this role when rendered.
         fireEvent.change(screen.getByRole('combobox'), { target: { value: 'fr' } });
     
         // Check if the selectedLocale is updated in state
         expect(localStorage.setItem).toHaveBeenCalledWith('selectedLocale', 'fr');
         expect(localStorage.getItem('selectedLocale')).toBe('fr');
      });
    });
    ```
    
    ```typescript
    // languageSelector.fr.test.tsx
    import React from 'react';
    import { fireEvent, render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import LanguageSelector from '../src/components/LanguageSelector';
    
    jest.mock('next-i18next', () => ({
      useTranslation: (namespace: string) => {
        if (namespace === 'navigation/language-selector') {
          const translations = {
            languageselector: 'Sélecteur de langue',
            english: 'Anglais',
            french: 'Français',
          };
    
          return {
            t: (key: keyof typeof translations) => translations[key],
            i18n: { language: 'fr' },
            ready: true,
          };
        }
    
        // Return a default implementation for other namespaces
        return {
          t: (key:string) => key,
          i18n: { language: 'fr' },
          ready: true,
        };
      },
    }));
    
    describe('LanguageSelector - French', () => {
      it('renders in French', async () => {
        render(<LanguageSelector />);
      
        expect(screen.getByText('Sélecteur de langue')).toBeInTheDocument();
        expect(screen.getByText('Anglais')).toBeInTheDocument();
        expect(screen.getByText('Français')).toBeInTheDocument();
    
         // Check if localStorage is initially empty
         expect(localStorage.getItem('selectedLocale')).toBeNull();
    
         // Simulate changing the language to French
         // screen.getByRole('combobox'): This part of the code uses the screen object provided by the
         // @testing-library/react library. It looks for an element with the ARIA role of 'combobox'.
         //  In HTML, a <select> element typically has this role when rendered.
         fireEvent.change(screen.getByRole('combobox'), { target: { value: 'en' } });
     
         // Check if the selectedLocale is updated in state
         expect(localStorage.setItem).toHaveBeenCalledWith('selectedLocale', 'en');
         expect(localStorage.getItem('selectedLocale')).toBe('en');
      });
    });
    ```
    
6. Create `setupTests.ts` in `__test__` directory:
    
    ```typescript
    import { jest } from '@jest/globals';
    
    // Mock the useRouter hook
    jest.mock('next/router', () => ({
        useRouter: () => ({
          pathname: '/',
          push: jest.fn(),
          route: '/',
          asPath: '/',
          locale: 'en', 
        }),
      }));
    
      const localStorageMock = (() => {
        let store: { [key: string]: string } = {};
      
        return {
          getItem: jest.fn((key: string) => store[key] || null),
          setItem: jest.fn((key: string, value: string) => {
            store[key] = value.toString();
          }),
          removeItem: jest.fn((key: string) => {
            delete store[key];
          }),
          clear: jest.fn(() => {
            store = {};
          }),
        };
      })();
      
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    ```
    
7. **Run Tests**:
    
8. ```typescript
          npm test
    ```
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1700577311002/5c300053-22ca-4f93-807e-2d7bb89b26d0.jpeg align="center")

### Integration tests

Integration testing is like checking that all the pieces of a puzzle fit together properly to make the complete picture. It ensures that different parts of software work well when they're connected and used together.

Create a \_\_intergration\_tests\_\_ directory in the root folder and a `Navbar.en.test.tsx` and `Navbar.fr.test.tsx` file inside.

Add the following to respective English and French integration test files:

```typescript
// Navbar.en.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Navbar from '../src/components/Navbar';

jest.mock('react-i18next', () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string): string => {
      const translations: Record<string, string> = {
        'languageselector': 'Language Selector',
        'english': 'English',
        'french': 'French',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Navbar Langauge Selector Integration Test', () => {
  it('English translation', async () => {
    render(<Navbar />);
      const languageSelector = screen.getByRole('combobox'); 
    expect(languageSelector).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument(); 
    expect(screen.getByText('English')).toBeInTheDocument(); 
    expect(screen.getByText('Language Selector')).toBeInTheDocument(); 
  });
});
```

```typescript
// Navbar.fr.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Navbar from '../src/components/Navbar';

jest.mock('react-i18next', () => ({
  useTranslation: (): { t: (key: string) => string } => ({
    t: (key: string): string => {
      const translations: Record<string, string> = {
        'languageselector': 'Sélecteur de langue',
        'english': 'Anglais',
        'french': 'Francais',
      };
      return translations[key] || key;
    },
  }),
}));

describe('French Navbar Integration Test', () => {
  it('French translation', async () => {
    render(<Navbar />);
      const languageSelector = screen.getByRole('combobox'); 
    expect(languageSelector).toBeInTheDocument();
    expect(screen.getByText('Francais')).toBeInTheDocument(); 
    expect(screen.getByText('Anglais')).toBeInTheDocument(); 
    expect(screen.getByText('Sélecteur de langue')).toBeInTheDocument(); 
  });
});
```

```typescript
npm run test:integration
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1701100851055/aa8a9232-ee82-44c6-b639-3f66c4cb8ca0.jpeg align="center")

### End to end(e2e) tests

We will be using \[Playwright\]([https://playwright.dev/](https://playwright.dev/)) for end-to-end testing.

Software end-to-end testing (E2E) simulates real user scenarios to test an application's functionality from start to finish. An end-to-end test ensures that all the components of an application work together and behave correctly in a production-like environment.

```typescript
npm init playwright@latest
```

Choose a directory where your test files will live(ie: e2e), choose yes for GitHub actions, and finally yes to install playwright browsers.

```typescript
Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
√ Where to put your end-to-end tests? · e2e   
√ Add a GitHub Actions workflow? (y/N) · true
√ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
```

We created an `e2e` directory for our end-to-end tests. The GitHub Workflow we'll explain later in this tutorial and finally, we install Playwright browsers which will use to automate browser interactions in your tests

`Playwright` will create the following files:

```javascript
playwright.config.ts
package.json
package-lock.json
e2e/
  example.spec.ts
tests-examples/
  demo-todo-app.spec.ts
```

Let's create a e2e test for our language selector component in `e2e/LanguageSelector.spec.ts` file:

```javascript
import { test, expect } from '@playwright/test';

test('LanguageSelector component E2E test', async ({ page }) => {
  await page.goto('http://localhost:3000'); 

  const selectElement = await page.$('select'); 
  expect(selectElement).not.toBeNull(); 

  if (selectElement) {
    await selectElement.click();
    await selectElement.selectOption('fr');

    await page.waitForURL("http://localhost:3000/fr");

    const selectedOption = await page.$('select option:checked');

    const selectedOptionText = await selectedOption?.textContent() ?? null;

    expect(selectedOptionText?.trim()).toBe('Francais');
  }
});
```

In the terminal:

```javascript
 npm run test:e2e

> next-blog-edit@0.1.0 test:e2e
> concurrently "npm run dev" "npx wait-on http://localhost:3000 && npx playwright test"

[0] 
[0] > next-blog-edit@0.1.0 dev
[0] > next dev
[0] 
[0]   ▲ Next.js 13.5.4
[0]   - Local:        http://localhost:3000
[0]   - Experiments (use at your own risk):
[0]      · forceSwcTransforms
[0]
[0]  ✓ Ready in 6.1s
[0]  ✓ Compiled /_error in 2.9s (360 modules)
[0]  ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
[0]  ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
[1]
[1] Running 1 test using 1 worker
      1 passed (3.6s)
[1]
[1] To open last HTML report run:
[1]
[1]   npx playwright show-report
[1]
[1] npx wait-on http://localhost:3000 && npx playwright test exited with code 0
```

We are using a script in `package.json` named `test:e2e` which concurrently runs the application and the e2e but uses `wait-on` which makes this process wait for the application to be running first to begin.

### Tada! :)

I would also recommend installing the developer extension for VS Code. Playwright Chrome extension facilitates web automation and testing by enabling direct control and interaction with the Chrome browser, offering enhanced functionalities and debugging capabilities

\[Playwright VS Code Extension\]([https://playwright.dev/docs/getting-started-vscode](https://playwright.dev/docs/getting-started-vscode))

%[https://youtu.be/Xz6lhEzgI5I] 

Before deploying you'll need to set up your project with Git and push the code to a GitHub repository.

"Git is a widely employed distributed version control system utilized in software development for the management and monitoring of alterations in source code, documents, and additional files."

A guide to installing Git:

\[Git\]([https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

Then...

1. **Initialize a Git Repository**:
    
    * Open your terminal/command prompt.
        
    * Navigate to your project root directory.
        
    * Run the following command to initialize a new Git repository:
        
        ```javascript
        git init
        ```
        
2. **Add and Commit Your Project**:
    
    * Use the following commands to add your files and make an initial commit:
        
        ```javascript
        git add .
        git commit -m "Initial commit"
        ```
        
3. **Create a Repository on GitHub**:
    
    * Go to the GitHub website ([**https://github.com**](https://github.com)).
        
    * Sign up or log in to your GitHub account.
        
    * Click on the "+" sign in the top right corner and select "New Repository."
        
    * Fill in the repository name, description, and other settings.
        
    * Click on the "Create repository" button.
        
4. **Link Your Local Repository to the GitHub Repository**:
    
    * On the GitHub repository page, you will see instructions for pushing an existing repository from the command line. It should look something like this:
        
        ```javascript
        git remote add origin <repository_url>
        git branch -M main
        git push -u origin main
        ```
        
    * Copy and paste these commands into your terminal, replacing `<repository_url>` with the URL of your GitHub repository. This links your local repository to the remote GitHub repository.
        
5. **Push Your Code to GitHub**:
    
    * After setting the remote, push your code to GitHub by running:
        
        ```javascript
        git push -u origin main
        ```
        
    
    This command pushes your code to the GitHub repository's `main` branch.
    
6. **Verify on GitHub**:
    
    * Visit your GitHub repository in a web browser to confirm that your code has been successfully pushed.
        

Your project is now on GitHub!

Ok back to vercel!

## Deploying!

You can log in or signup @ \[Vercel\]([https://vercel.com/dashboard](https://vercel.com/dashboard))

You will need to connect to a Git provider. If you followed the steps in regards to Git and GitHub earlier you can choose that account.

"Vercel is a popular cloud platform for deploying web applications and websites, with a strong focus on hosting modern frontend projects like React, Next.js, and Vue.js. It provides developers with a flexible and streamlined infrastructure for quick and easy web project deployment."

Click on "Add New Project":

Input your GitHub repository name in the search tab.

Click on the "Import" button.

Click on the "Deploy" button.

Once all the deployment steps are completed:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1696536604709/f084fb68-9b68-44ac-a605-803500d10928.png align="center")

Click on "Continue to Dashboard"

Click on "Visit"

Your project is now deployed and available for showing to anyone using the URL in the browser.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698854081434/df615bd1-4531-442e-a974-ea7c8c2e09dc.jpeg align="center")

## Summary

# Bonus Section!

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1698854171950/43a15021-c702-4b40-a4e7-f301b70dd20c.jpeg align="center")

## CI GitHub Actions

You might recall earlier when we installed Playwright we picked yes when asked `√ Add a GitHub Actions workflow? (y/N)` . This created a `playwright.yml` file inside a `.github/workflows` folder containing everything you need so that your tests run on each push and pull request into the main/master branch.

So if you make a change to your project and push your code to GitHub the tests will be completed on the cloud.

If you click on actions in your project repo tab:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1701966279679/c47157e0-7ddf-4d15-85fa-3b4d4cf6e3e4.png align="center")

And then ...

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1701966528536/9ca05e7d-15a9-4fd8-a0f8-486845e7f719.png align="center")

And Finally...

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1701966582917/59cc2b1c-0644-4982-a31e-650df52d74ff.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1701966634176/3edf9be3-34d2-4b2f-ae0c-821f0e6b9aa6.png align="center")

Oh oh!

Our tests are set to run locally. We need an app running on the cloud for our CI Git Actions setup to work.

## Important Links

\[Project Repository\]([https://github.com/kbventures/next-i18next-blog](https://github.com/kbventures/next-i18next-blog))

\[Node.js\]([https://nodejs.org/en](https://nodejs.org/en))

\[Next.js\]([https://nextjs.org/](https://nextjs.org/))

\[Typescript\]([https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/))

\[Next-i18next\]([https://github.com/i18next/next-i18next](https://github.com/i18next/next-i18next))

\[Tailwind\]([https://v2.tailwindcss.com/docs](https://v2.tailwindcss.com/docs))

\[Next.js + Playwright installation\]([https://nextjs.org/docs/pages/building-your-application/optimizing/testing#playwright](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#playwright))

\[Git\]([https://git-scm.com/](https://git-scm.com/))

\[Github\]([https://github.com/](https://github.com/))

\[Vercel\]([https://vercel.com/](https://vercel.com/))

## Special mentions & credits

\[Dmitry Khulakov\]([https://dmitrykulakov.vercel.app/](https://dmitrykulakov.vercel.app/)) Proofreading, Testing and Technical Input

1. **Additional Features and Best Practices:**
    
    * Suggestions for enhancing the blog's user experience with features like pagination, categories, tags, and search functionality.
        
    * Best practices for performance optimization, including lazy loading and code splitting.
        
    * Consideration of accessibility (a11y) practices to ensure an inclusive experience for all users.
        

[https://www.freecodecamp.org/news/technical-blogging-basics/](https://www.freecodecamp.org/news/technical-blogging-basics/)

Next-i18next is a popular internationalization (i18n) library for Next.js applications. When testing Next-i18next in your Next.js app, it's important to ensure that the internationalization features are functioning correctly and providing a seamless experience for users speaking different languages. Here are some valuable tests you should consider performing:

1. **Basic Language Switching Test:** Ensure that you can switch the language of your app using the i18n library's provided mechanisms, such as buttons or dropdowns. Verify that the text content and UI elements update correctly according to the selected language.
    
2. **Translation Tests:** Check that all translated text is being displayed correctly based on the selected language. Make sure that placeholders, variables, and dynamic content within translations are being replaced correctly.
    
3. **Pluralization and Formatting Tests:** Test the pluralization rules and formatting for languages that have different plural forms. Verify that numeric values and placeholders are properly formatted according to the chosen language's rules.
    
4. **Date and Time Formatting Tests:** Ensure that date and time formatting is accurate for different languages. Test various date and time formats to confirm that they match the expectations of each language/locale.
    
5. **Fallback Language Test:** Test the behavior when translations are missing for a specific language. Verify that the app falls back to a default language or a specified fallback language and still functions correctly.
    
6. **RTL (Right-to-Left) Language Test:** If your app supports RTL languages, check that the UI layout, alignment, and behavior switch to RTL mode when a right-to-left language is selected.
    
7. **SEO Tests:** Verify that the translated content is being correctly indexed by search engines. Check the source code to ensure that the appropriate HTML tags (like hreflang tags) are being generated for different languages.
    
8. **Linking and Routing Tests:** Test that language switching doesn't break your app's routing and navigation. Verify that URLs, routing, and links function as expected when switching between languages.
    
9. **Context Switching Test:** If your app has user authentication or personalized content, test that language preferences are maintained when users log in or switch between authenticated and non-authenticated states.
    
10. **Performance Tests:** Test the performance impact of loading translations. Check if loading translations asynchronously or using code splitting impacts the app's load time.
    
11. **Unit and Integration Tests:** Write unit and integration tests that specifically target the i18n functionality. These tests can help catch regressions when making changes to the app's codebase.
    
12. **Cross-Browser Tests:** Test your i18n features across different browsers to ensure compatibility and consistent behavior.
    
13. **Accessibility (a11y) Tests:** Verify that language changes do not introduce accessibility issues, such as broken focus or navigation.
    

Use this example to improve your blog esthetics:

[https://dev.to/adrai/static-html-export-with-i18n-compatibility-in-nextjs-8cd](https://dev.to/adrai/static-html-export-with-i18n-compatibility-in-nextjs-8cd)

Embedding stuff

[https://support.hashnode.com/en/articles/6420731-adding-embeds-to-your-blog-post](https://support.hashnode.com/en/articles/6420731-adding-embeds-to-your-blog-post)

[https://hashnode.com/post/adjust-image-size-in-blog-cksn9i4930yf01ws1d5q53glj](https://hashnode.com/post/adjust-image-size-in-blog-cksn9i4930yf01ws1d5q53glj)
