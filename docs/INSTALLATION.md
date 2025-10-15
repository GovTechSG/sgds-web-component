# Install SGDS web components

## Method 1: Local installation

### Step 1: Install library

Install SGDS web components locally with the following command

```js

npm install @govtechsg/sgds-web-component@3.5.3

```

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
```

### Step 2: Framework specific setup

Please refer to the respective framework setup before importing the components.

- [Angular](/docs/frameworks-angular--docs)
- [Vue](/docs/frameworks-vue--docs)
- [React](/docs/frameworks-react--docs)
- [NextJS](/docs/frameworks-nextjs--docs)

### Step 3: Import components

Once imported, the web components can be used throughout the project. You may import individual components or import all components at once. It is recommended to cherry pick components, rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

#### React users

Are you a react user? If so, skip to the <a href="/docs/frameworks-react--docs#importing-the-library" target="_self">react import instructions </a>

#### Importing individual component

```js
// import global css first (once)
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
//import button only
import "@govtechsg/sgds-web-component/components/Button";
```

#### Importing all components

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component";
```

## Method 2: Using CDN

This method registers all SGDS elements up front in the Custom Elements Registry.

> When using CDN, it is recommended to version control. On initial usage, pick the latest version of the library. See list of available npm versions [here](https://www.npmjs.com/package/@govtechsg/sgds-web-component?activeTab=versions)

> Stick to the version that works for you and make intentional updates on your end when you need the latest library updates. Versions are immutable and thus, stable.

> By not specifying the version, you are using the latest version and subjected to changes made by the library that are not tested on your end. While we do our best to ensure backward compatibility between patches and minor version updates, we cannot guarantee that we have covered all of our user's edge cases.

```js
// Load global css file
<link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.5.3/themes/day.css' rel='stylesheet' type='text/css' />
<link href='https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.5.3/css/sgds.css' rel='stylesheet' type='text/css' />

// it is recommended to load a particular version when using cdn e.g. https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@1.0.2
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.5.3" async crossorigin="anonymous" integrity="sha384-SxZxZ8UlZHmjmD7Oqz+OIyr9hKjr3NKl90zvWdeG9WbHn20QsSY0EfLEp42QIE/M"></script>

//or load a single component e.g. Masthead
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@3.5.3/components/Masthead/index.umd.min.js" async crossorigin="anonymous" integrity="sha384-YdC0gszPpfdu8dQ+hMBmQHfYdpgCI83jCKL8blU2LmQ7I44qGVzS1ud+Bb1hIMXD"></script>

```

## Start building your application

You are now ready to build your own application. You may refer to the <a href="/docs/components-accordion--docs" target="_self">components</a> page to find out more
