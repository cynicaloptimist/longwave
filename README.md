# Longwave
Real-time online adaptation of the Wavelength party game

## Purpose

The game is an online adaptation of the social game Wavelength, which can be played via telephone or video conference. In times of remote work, home office work and social distancing in the wake of the Corona pandemic, this adaptation supports virtual teaming and shared enjoyment.

In the game, one player describes the other players with a hint, on a scale between which a mark is placed. The aim is to relate the value system of the tipster to one's own value system. The other players discuss how the tipster might understand the clue and where his clues might lie on this scale.

## How is the game played?

In the game, two teams take turns playing against each other. One team member is shown two opposing terms. A point is marked on a scale between these two terms. This point is now to be described to the other team members as precisely as possible with a word, a term or a short sentence.

Their own team does not know this position and now tries to hit the point as accurately as possible. The closer the team has placed the marker to the point, the more points it wins. Up to four points are possible here.

After the team's guess attempt, the other team also has the opportunity to score a point by guessing whether the marker is to the left or right of the other team's guess. If the team is correct, they receive one point.

The first team to score 10 points wins.

## Translations

For a translation, the following steps are (currently) still necessary. 1:

1. Add the language you want in the `src/app.tsx` in the app scaffold
2. Add a `src/state/SpectrumCards-xx.ts`, where `xx` corresponds to the language code in `app.tsx
3. Add a file `public/locales/xx/translation.json` where `xx` corresponds to the language code from the `app.tsx`. Use the default `en` file as a template and copy it to the location of the new language you want to add.
4. Modify the file `src/state/BuildGameModel.ts` so that the command line `import { AllCards } from "./SpectrumCards";` is commented out and the new command `import { AllCards } from "./SpectrumCards-xx";` is included. `xx` describes the country code that was previously selected.
5. Translate the files `translation.json` and `SpectrumCards-xx.ts` into the prefered language
6. Test the adapted language by starting the local server, selecting the new language and testing the correct display.

If the language is correct, make the customised files `src/app.tsx`, `src/state/SpectrumCards-xx.ts`, `src/state/BuildGameModel.ts` and `public/locales/xx/translation.json` available to the upstream as PR.

### Structure of the translation.json
The file is in JSON format. The entries are stored in two hierarchies.

The first hierarchy indicates the file in which the translation is implemented. This information may not be relevant for the user, but it helps to locate the position of the translation more easily in later developments.

The second hierarchy describes the text to be translated. The keys stored here are to be translated into the respective language. Placeholders are possible here, which can be specified with `{{ ... }}` and can be placed anywhere in the entry to be translated, depending on the language.

Sample:

```json
{
    "commonfooter": {
        "developed_by": "was developed by Wolfgang Warsch, Alex Hague and Justin Vickers.",
        "adapted_for_web": "Adapted for web",
        "adapted_for_web_by": "by Evan Bailey and Margarethe Schoen.",
        "support_patreon": "Support us on Patreon!"
    },
    "landingpage": {
    ...
```

Meaning:

`commonfooter`: filename of affected file

`developedby`: string to be translated

...

#### Notes to adding or replacing language strings

You can easily find the positions where the replacements take place via the first and second hierarchy. To do this, open the respective file (example: `commonfooter`) and search for `commonfooter.developed_by`. You can then easily find the context of the replacement.

## Installation

You can simply run the project on your computer. The following steps are necessary:

1. Clone or fork the repository
2. Install node.js and npm
3. Change to the project directory
4. Start the command `npm outdated` and check the outdated packages
5. Run `npm update --save` to update all obsolete packages to the latest minor version
6. Run the command `npm install` to install dependent and maybe missing packages
7. Launch the application on the local system via `npm start
8. The default browser will be called with the address `http://localhost:3000`

### Available Scripts

In the project directory, you can run:

#### `npm outdated` / `npm update --save` / `npm install`

Checks the included packages for up-to-dateness , updates them and installs required dependencies.

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
