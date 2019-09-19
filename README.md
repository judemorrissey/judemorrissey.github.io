# judemorrissey.github.io

Hello!

This is my endeavor with trying to make a static website hosted by Github. Hopefully this helps me polish up my skills with front end engineering. This page utilizes client-side React, where a single point-of-entry `div` is what's in the HTML file initially, and as scripts get loaded, one of them puts a React element as the root of all things React in the single `#root` div. This technique can also be utilized elsewhere to introduce React into an existing webpage elsewhere. Please see https://reactjs.org/docs/add-react-to-a-website.html for the reference I used.

To run a local webserver:
- first make sure you have this module installed `npm install http-server`
- then cd into your project directory, and run `http-server -c-1`
- alternatively, feel free to use `npm start`, which basically does the same thing above :)
- if you want to make changes to the CSS, please edit .scss files only, and either restart the `http-server` above so the prestart npm script will run for compiling the CSS, or you can use `npm run auto-compile-css` to start a sass watcher for compiling the CSS as you make changes.

TODOs so I wouldn't forget:
- n-sided Dice Roller
- MoCkiNg TeXt TrAnSLaToR
- Text accenter (like character accents in Chrono Cross)
