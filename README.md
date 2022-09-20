# Assembly Voting VerifyMyBallot Site

This is the repository regarding the example implementation of a VerifyMyBallot site built upon js-client.

## Contents

- [Assembly Voting VerifyMyBallot Site](#assembly-voting-verifymyballot-site)
  - [Contents](#contents)
  - [Installing](#installing)
  - [Environment variables](#environment-variables)
  - [Running](#running)
  - [Building](#building)
  - [Testing](#testing)
  - [Strict mode](#strict-mode)
  - [Documentation](#documentation)
    - [JS Client](#js-client)
      - [MockVerifierClient](#mockverifierclient)
    - [Routing](#routing)
    - [Timeout handling](#timeout-handling)
      - [useTimeout](#usetimeout)
      - [usePollingScreenTimeout](#usepollingscreentimeout)
    - [Modal component](#modal-component)
    - [Multitenancy](#multitenancy)
      - [ClientContext](#clientcontext)
      - [VerifierClientProvider](#verifierclientprovider)
      - [Link resolver](#link-resolver)

## Installing

Start by installing the required node modules with

```bash
yarn
```

## Environment variables

To tailor the project to your setup, you should double check the use of environment variables in relation to js-client, as explained in the documentation of the project's use of [JS Client](#js-client).

You're welcome to either use the docker-compose enviroment setting or use the comand below to set up your local ENV file.

To work in testing mode with a mocked version of the Verifier Client, set a `REACT_APP_TESTING` flag in your enviroment or docker-compose file. If you want to use the JS-client verifier instead, make sure that flag does not exist. 

```bash
$ cp .env{.example,}
```

## Running

You can start the local development server with:

```bash
yarn start
```

... or with a mocked version of js-client:

```bash
REACT_APP_TESTING=true yarn start
```

## Building

To build the static assets for hosting on a CDN, you can build the project with:

```bash
yarn build
```

## Testing

We use [Cypress](https://www.cypress.io/) for testing purposes, mostly in terms of end-to-end integration tests, which are found in `cypress/integration/*.ts`.

To run the integration tests, first start the local server with the mocked version of js-client, as explained in the [Running](#running) section. Then run the end-to-end integration tests with:

```bash
yarn e2e
```

You can also open the test development environment with hot-reloading with:

```bash
yarn e2e-dev
```

## Strict mode

By default the web app is being run without Strict Mode enabled in development - if you wish to test out the app in strict mode, you can do so by running:

```bash
yarn start-strict
```

## Documentation

The project is written in React with TypeScript, bootstrapped with [Create React App](https://create-react-app.dev/) and styled using [Tailwind](https://tailwindcss.com/).

### JS Client

To verify and check the ballots, we utilize [js-client](https://github.com/aion-dk/js-client).

Changing the election URL used by js-client should be done with the environment variable: `REACT_APP_BASE_ELECTION_URL`.

Alternatively, if you'd just want to test out the project on a mocked js-client, it is possible to use the provided [MockVerifierClient](#mockverifierclient) by setting the environment variable: `REACT_APP_TESTING=true` - this is also what the tests are using.

#### MockVerifierClient

There is a provided `MockVerifierClient` found in `src/MockVerifierClient.ts`, which is a primitive mocked version of `AVVerifier` client found in js-client.

It exposes and provides the same methods as `AVVerifier` by extending the class, but overrides these methods, to not perform any network calls, but still simulate the asynchronous nature of network calls, and the longer response time when polling.

The mocked client mocks the flow by requiring to be initialized (by called `initialize()`), but also by using the code provided in the `findBallot()` method, to return the matching mocked ballot as defined in the `MOCKED_BALLOTS_DB` constant. The `submitVerifierKey()` method, always returns the static verifier key: `6z5VThK`.


### Routing

For routing, we utilize [React Router](https://reactrouter.com/), wrapped with [oaf-react-router](https://github.com/oaf-project/oaf-react-router), for better accessibility during SPA navigation.

We patch the router as SPA navigation is only simulated page navigation, and some screen readers still have trouble announcing page changes to their users. The patched router will fix this, and properly change the page title on navigation, announce when navigation occurs, and correctly set the focus to a meaningful DOM element, this being either `main` or `h1` elements.

All of the routing is done in `src/AppRouter.tsx`, which also provides an overview of the different screens used in the application. All the screens are logically separated and found in `src/screens/*.tsx`.

### Timeout handling

#### useTimeout

To handle timeouts properly with intervals, we use a hook found in `src/hooks/useTimeout.ts`, which simply handles the logic of starting a timeout interval timer and what to do when the timeout reaches 0 - such as clearing the interval.

The hook takes as parameters an object where you can define the `intervalTimeout` in ms, the number of `retries`, and an `onTimeout` function, which defines the action to take when the time is up.

The hook gives back a tuple, the first element being the current time left in seconds, and the second being a function to start the timer.

The amount of retries can be configured with the `REACT_APP_TIMEOUT_RETRIES` environment variable, with each retry equating to 1 second.

#### usePollingScreenTimeout

To handle timeouts on screens such as when the ballot is found, where js-client is polling for a response, we use a custom hook for re-usability, found in `src/hooks/usePollingScreenTimeout.ts`.

This hook is used to setup the logic regarding setting an interval and hooking it properly into the component's lifecycle, doing the neccesary cleanups upon component mounts/dismounts.

The hook is used for screens that require polling, such as `BallotFoundScreen` and `PasskeyScreen`. It starts to timeouts, one for polling, which navigates to `/expired` upon expiry, and another which opens a "reminder" modal to remind the user of the remaining time.

It takes as parameters a `pollingAction` which is an asynchronous function that runs while the page is polling, optionally returning a generic type to be used for the other parameter, `nextPage`, which is a function to define the page to navigate to once the promise from `pollingAction` is resolved. Whatever is returned from `pollingAction` is fed into `nextPage` as its payload, allowing for more flexibility.

**An important note** is to always remember to wrap the two functions, `pollingAction` and `nextPage`, in a `useCallback`, as they are used in the lifecycle dependency array of the hook - this is to avoid them being created and instantiated unnecessarily.

The hook returns an array of exactly length 3, including, in order, the base timeout, a boolean defining whether the "reminder" modal should be open, and a function to set the modal open state (used to close the modal).


### Modal component

The component for our "reminder" modal is found in `src/components/TimeoutModal.tsx`, which uses the [react-modal](https://reactcommunity.org/react-modal/) library at its core - this is due to its focus on accessibility and the popularity of the library.

### Multitenancy

To support multitenancy, allowing the client to support multiple different boards by changing the URL routes, we have a couple of helpers to manage the shared `AVVerifier` throughout the app (initialized with the correct board URL).

#### ClientContext

We use a React Context to manage the shared `AVVerifier` client throughout the application, this is found in `src/contexts/ClientContext.ts`. It is just providing a shell for the context, which is filled at the start of the application lifecycle in `VerifierClientProvider`, as such, the initialized `defaultValue` is only relevant in uses that isn't covered by the provider (for example, in isolated unit tests, etc.).

#### VerifierClientProvider

This is the main provider of the correct `AVVerifier` initialization with the correct board URL, being built from the board slug provided in the route parameters - as such, this needs to be a descendant of the application's routing (as it needs to grab the board slug from there).

#### Link resolver

As board slug based routing is used in many different parts of the system, and it is crucial how it is being constructed and concatenated, we abstract away the resolving of links between routes of the application. This is done in `useBoardSlugLinkResolver`, found in `src/hooks/useBoardSlugLinkResolver.ts`. Using this hook, provides a component with a function to resolve properly links within the application, making sure to correctly preserve the active board slug.