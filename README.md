# AngularSignupForm

## Task

- Build a single page app with a sign-up form.
- The form should allow users to enter first name, last name, email, and password.
- All fields are required.
- Password validation:
  - Should be a minimum of eight characters,
  - Should contain lower and uppercase letters,
  - Should not contain user’s first or last name.
- Email should be validated but there are various ways of accomplishing this. So, show us what
  you consider as a proper email validation.
- The form should send a POST request to https://demo-api.now.sh/users. The request body
  example:

```
{
    firstName: "Thomas",
    lastName: "Shelby",
    email: "thomas@shelby.co.uk"
}
```

## Implementation

Implemented accordingly with the specification.

Additional improvements implemented:

- Unit `Karma` and end-to-end `Playwright` tests with **100%** coverage
- Email validation using regexp pattern
- Bootstrap styling
- Git pre-commit hook which runs tests and code quality checks / autocorrect: `husky`, `lint-staged`, `eslint` and `prettier`
- Internationalization using `i18next`

## Installation

Run `npm install --force` to install dependencies.

Force option used due to version incompatibility of the latest Angular 16 and `angular-i18next`.

## Development server

Run `npm start` for a dev server.

You will be navigated to `http://localhost:4200/`

The application will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run tests

Run `npm test` to execute unit and end-to-end tests.

## Run unit tests

Run `npm run unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Run end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Playwright](https://playwright.dev).

Make sure the development server is up and running.

## Unit test coverage

Run `npm run coverage` to generate [coverage report](./coverage/angular-signup-form/index.html).

## Run code quality checks

Run `npm run lint` for code quality checks.

Run `npm run lintfix` for code quality fixes. It happens automatically in pre-commit hook.

## Update library versions

Run `npm run update` to update libraries to the latest versions.
