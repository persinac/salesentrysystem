This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Adding unique dimensions
Steps to create unique dims for components:
1. Insert the max number of components allowed into the DB (follow the nomenclature of cabinets/tops)
   * Ensure that the `quantity` short_name is: `<component_abbr>_quantity`
     * Check the respective enum's quantity attribute in `InterfaceMapping.ts`
   * Ensure that *all* questions that are part of the multiple unique dims have unique_dim field populated
   * The grouping should be in numerical order. The unique dims should come after other component questions
2. Add `measurement?: MeasurementDetails[];` to the interface of the question in `State.ts`
3. In `InterfaceMapping.ts`, modify the specific enum by removing redundant fields (`*_height`) and create a new 
enum called: `<Component>MeasurementShortNames`
   * Attributes: 
     * `<component_abbr>_lngth` = 'length'
     * `<component_abbr>_wdth` = 'width'
     * `<component_abbr>_height` = 'height'
4. For each quantity of component, create a respective TypeGuard enum in `TypeGaurds.ts`
    * Create the appropriate component: `COMPONENT_X` (no `_x` if first one)
    * Create the corresponding validation_errors as well
5. In `Mapper.ts`, in the respective case statement in `mapProductComponent`, copy the maxQuantityOfComponent code into
the specific case and set the MAX_ to the appropriate component
   * Adjust the *MeasurementShortNames enum reference in the .forEach
   * After the `returnObject = ...` statement, add the statement that creates the measurement array (see cabinet / top)
   * Create respective `determine<component>Num` function (see `determineCabinetNum`)
6. Now we'll need to update the validation for the component
7. Basically mimic TopValidation or CabinetValidation for the specific component
8. Update `SalesEntryState` to have errors for each quantity of component
9. Add the new validation error attributes to `this.setState` in `\NewSalesEntry\index.tsx` on line 304
10. In `SalesEntryForm.tsx`, update the attachError function to handle the separate errors
11. In `Mapper.ts`, update the mapError function to handle your new validation types
12. In `\NewSalesEntry\index.tsx`, add the state attributes per validation type in the initial state const
13. Create the respective component helpers/utilities in `QuestionUtility.ts`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
