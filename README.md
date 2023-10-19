# InfCompanionWebComponents

## Development

For a development purpose you can run a preview of the project with `npm start`.

### Development tips and hints

You should not define any global stylings injected trough angular.json. The web-components should be self contained and not leak any styling in the context they are placed.

You should never define a component with ViewEncapsulation.None - this will leak out to the global styling any style that you have imported or defined in this component.

You can use only some of the angular-material library components. Components like the mat-dialog and mat-tooltip are not usable in because they create new DOM elements that attaches directly to the <body> tag of the website. This makes them unstylable from the point of our custom element, becase we do not apply any global styles.

## Build custom elements and npm package

For local testing of the package you can run `pack:web-components` that will build the custom elements, put the prerequisite files in the `dist/package` and create the npm package `pixelmatic-inf-web-components-x.x.x.tgz` in the root directory of the project.

---

Run `npm run publish:web-components` to build the custom web elements and publish them as an npm package. The build artifacts will be stored in the `dist/build` directory. The custom elements artefacts will be stored in the `dist/package`.You can access the published packages [here](https://gitlab.pixelmatic.com/pixelmatic/infinite-fleet/web/inf-companion-web-components/-/packages)

## Using the custom elements in other projects

In order for this npm package to be installed in another project an .npmrc configuration file is needed to point to the correct registry:

```
registry=https://gitlab.pixelmatic.com/api/v4/packages/npm/
//gitlab.pixelmatic.com/api/v4/packages/npm/:_authToken=<GITLAB_READ_PACKAGE_TOKEN>
```

And then you can install the package with or without specific version: `npm i @pixelmatic/inf-web-components@x.x.x`

The package includes multiple bundles inside:
`inf-wcomp-warehouse.js`
`inf-wcomp-registry.js`
`inf-wcomp-ship-withdraw.js`
`inf-wcomp-ship-deposit.js`
`inf-wcomp-combined.js`
`...`

The first few are standalone components, that export only a single web-component from their bundles. The `inf-wcomp-combined` is a web-component that has bundled all the web-components and exports them.
Theere is a tradeof when choosing one over the other approaches to use the web-components (multiple imports of the individuals or single import of the combined bundle).
If the individual components are loaded on a different web pages, it might be beneficial to use the individual imports per every page needed.
The tradeoff is that the combined bundle is only slightly larger than the individual bundles, so if there is a need to use more than 1 web-component on the same view, the combined bundle is the one to choose for best performance.

An example of how to lazy load a custom element: in the method that you use to initialize the custom web element `<inf-wcomp-warehouse></inf-wcomp-warehouse>` you can dynamically import it by calling `import('@pixelmatic/inf-web-components/inf-comp-combined.js').then(module => ...)`

An alternative to the dynamic import is to inject the library by putting it in the `angular.json` file in `projects.<PROJECT_NAME>.architect.build.options.scripts` array. If you list it as s file dependancy there, the script will be loaded dirung the initialization of your app.

---

Required artefacts:

- You should provide the `base_qr_code.png` image inside the `src/assets/images/base_qr_code.png` of the application that you are going to use the component. This is needed, because there is no way to make the `qartjs` library to generate a QR code withouth an image, and it does accept it only as a path parameter. If you do not do this, the Deposit functionality wont work.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
