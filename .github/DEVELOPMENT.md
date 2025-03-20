# Development

## Table of Contents

- [Development](#development)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
    - [Client Env Variables](#client-env-variables)
    - [Server Env Variables](#server-env-variables)
  - [Installing the dependencies](#installing-the-dependencies)
  - [Running the project locally](#running-the-project-locally)
  - [Building the project](#building-the-project)
  - [Deploying the project](#deploying-the-project)
  - [Detailed information on technologies used](#detailed-information-on-technologies-used)
  - [More DX scripts](#more-dx-scripts)
    - [Prettier](#prettier)
    - [Eslint](#eslint)
    - [Check Types](#check-types)
    - [Check unused dependencies, exports \& types](#check-unused-dependencies-exports--types)
    - [Stylelint](#stylelint)
    - [Markdown](#markdown)
    - [Cspell](#cspell)
    - [PNPM Dedupe](#pnpm-dedupe)

## Prerequisites

Before you get started, you will need to have the following tools installed on your machine:

- **[Git](https://git-scm.com/)** (recommended for version control)
- **[Node.js](https://nodejs.org/en/)** (see [.nvmrc](../.nvmrc) for the version)
- **[pnpm](https://pnpm.io/)** (latest version)

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Getting Started

## Configuration

The project uses environmental variables for configuration. Create a **`.env`** file in the root directory with the following key-value pairs:

### Client Env Variables

**-**`NEXT_PUBLIC_SITE_URL`**(required**: The URL of the frontend App of the project

**-**`NEXT_PUBLIC_SENTRY_DSN`**(optional**: The URL of the Sentry service used for error logging and reporting.

### Server Env Variables

**-**`SENTRY_AUTH_TOKEN`**(optional**: The authentication token for the Sentry service.

**Note:** There is already**`.env.example`** which can be used to setup the env quickly by removing the **`.example`** in their filename.

> Adding a new environmental variable requires a zod schema update in the `env` folder and a new entry in the `schema.js` file in the `serverSchema` variable or `clientSchema` variable.

## Installing the dependencies

After you have set the environmental variables in the **`.env`** file, you can run the project locally by

```shell
git clone https://github.com/timelessco/next-ts-app-template
```

```shell
cd next-ts-app-template
```

```shell
pnpm install
```

This will download and install all the required dependencies for the project.

## Running the project locally

```bash
pnpm dev
```

Open <http://localhost:3000> with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`.
The page auto-updates as you edit the file.

## Building the project

To build the project to a production environment, you can use the

```bash
pnpm build
```

to build the production-ready version of the project.
This will create a **`.next`** directory with the compiled code and static assets.

Run the above built application locally using

```bash
pnpm start
```

## Deploying the project

You can then deploy the **`.next`** directory to your production environment using a static file server, such as **[NGINX](https://www.nginx.com/)**.

[Deploy using NGINX](../docs/deploy-nginx.md)

Guide on how to deploy Next.js to various [hosting providers](https://nextjs.org/docs/deployment).

## Detailed information on technologies used

[Configurations & Setup Required](../docs/configs.md)

[Client Side stack](../docs/client-side.md)

[Server Side stack](../docs/server-side.md)

## More DX scripts

> Check for all the below errors in one command using [Turbo Repo](https://turbo.build/repo)

`pnpm lint`

> AutoFix all the linting errors in one command using [Turbo Repo](https://turbo.build/repo)

`pnpm fix`

### Prettier

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

> Check the formatting errors

`pnpm lint:prettier`

> AutoFix the formatting errors

`pnpm fix:prettier`

> This package includes several forms of linting to enforce consistent code quality and styling.
> Each should be shown in VS Code, and can be run manually on the command-line.

### Eslint

**[ESLint](https://eslint.org)**: Extends recommended rules for the Next.js project that lints JavaScript/TypeScript source files and other files

> Check for the linting errors

`pnpm lint:eslint`

> AutoFix the linting errors

`pnpm fix:eslint`

### Check Types

**[TypeScript](https://www.typescriptlang.org)**: Type checks all the files

> Check for type errors

`pnpm lint:types`

### Check unused dependencies, exports & types

**[knip](https://github.com/webpro-nl/knip)**: Checks all unused dependencies, exports & types

> Check the spelling errors

`pnpm lint:knip`

### Stylelint

**[Stylelint](https://stylelint.io/)**: Checks all css files

> Check the css linting errors

`pnpm lint:css`

> AutoFix the css linting errors

`pnpm fix:css`

### Markdown

**[Markdownlint](https://github.com/DavidAnson/markdownlint)**: Checks all Markdown files

> Check the markdown linting errors

`pnpm lint:md`

> AutoFix the markdown linting errors

`pnpm fix:md`

### Cspell

**[cspell](https://cspell.org)**: Spell checks across all source files

> Check the spelling errors

`pnpm lint:spelling`

> AutoFix the spelling errors

`pnpm fix:spelling`

### PNPM Dedupe

**[pnpm dedupe --check](https://pnpm.io/cli/dedupe)**: Lints the `pnpm-lock.yml` file

> Check for unnecessarily duplicated packages

- `pnpm lint:packages`
