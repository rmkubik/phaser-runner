# Phaser Runner
This is a demo project used to demonstrate how easy and fun it can be to learn JavaScript game development with Phaser. Specifically, I've used this project in a few talks as a demo to mess with. The [presentation](https://docs.google.com/presentation/d/1l-C_2OgK3waIpKCz0fzCj7ychK2YEHZ3-8xIAvjKhbg/edit?usp=sharing) and [live project](http://clumsy-story.surge.sh/) (hosted on Surge.sh) are out on the interenet for viewing!

## Usage - Phaser ES6 Boilerplate
This project was bootstrapped using an [ES6 Boilreplate Projectt](https://github.com/belohlavek/phaser-es6-boilerplate) by belohlavek. The instructions for using this bootstrap project are below, more details on the boilerplate can be found in the link above. In addition to the provided boilerplate, I've modified a few things in this demo, including an `npm deploy` command using Surge.sh and importing bootstrap and font-awesome via npm and gulp.

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/belohlavek/phaser-es6-boilerplate.git`

Install dependencies

`npm install`

Run a development build...

`npm start`

...or a production build.

`npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.
