# responsive-app [beta]
Core functionalities for plugins that will automatically handle your app responsiveness.
You must install a wrapper plugin to use it:

[Rollup plugin](https://www.npmjs.com/package/rollup-plugin-responsive-app) or [Webpack plugin](https://www.npmjs.com/package/webpack-plugin-responsive-app)

This package will be installed as a dependency.

Check below the documentation for demo, options and notes:

## Demo
The plugin will make sure your app proportions are the same across all screen resolutions:

![Responsive app demo](demo.gif)

## Options

You can pass an options object to the constructor:

| Name  | Type | Description | Default | 
| ------------- |:-------------:| ------------- |:-------------:|
| appEntry  | undefined \| string | Your application entry point | Will try to resolve as `index.html`, `app.js`, `main.js`, `bundle.js` or `src/index.js` | 
| transformPixels  | boolean \| TransformPixelsOptions | Convert `pixel` definitions to `rem` | true | 
| handleMobile  | boolean \| HandleMobileOptions | Auto-adapt the interface for mobile screens [experimental] | true |

#### TransformPixelsOptions

| Name  | Type | Description | Default | 
| ------------- |:-------------:| ------------- |:-------------:|
| ignoreAttributes  | string[] | List of CSS attributes to be bypassed. You can set as `['box-shadow', 'border-radius']` for example | [] | 
| ignoreSelectors  | string[] | List of CSS selectors to be bypassed| [] | 

#### HandleMobileOptions

| Name  | Type | Description | Default | 
| ------------- |:-------------:| ------------- |:-------------:|
| ignoreSelectors  | string[] | List of CSS selectors to be bypassed| [] | 
| centralizeText | string[] | List of elements to be centralized | ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] |
| breakpoint | string | Max screen width (when to consider as "mobile") | 480px


#### Bypassing transformations

You can also add the `ignore-responsive-app` class to any HTML element so the above transformations do not have effect. Example:

```HTML
<style>
.width-300 {
    width: 300px;
}
.width-300:not(.ignore-responive-app) {
    width: 18.75rem;
}
</style>

<div class="width-300 ignore-responsive-app">
  My width will remain in pixels!
</div>
```

Note: Inline styles transformations (e.g. `<div style="font-size: 24px">...` to `<div style="font-size: 1.5rem">...`) are not supported yet.

## Beta phase

We are aiming to make the web responsive by one-line installation 🚀🚀

The packages currently sits on the beta version. Next step is to test it around in different project setups, contexts and frameworks.

Install either plugin (Rollup or Webpack) in your fresh app and check multiple resolutions.

Open a Github issue if it is not working on your context.