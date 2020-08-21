import 'devtools-detect';
import { setHighscore } from './functions.js';

// initial check for webdriver, possible automation
if (navigator.webdriver === true) {
  location.reload();
  //window.location.replace('https://github.com/ninest/typer');
  window.location.replace('https://github.com/omediodomonte38/typer-gal');
  setHighscore(0);
}

// open github repo if dev tools opened
if (process.env.NODE_ENV === 'development') {
  // nothing here
} else {
  window.addEventListener('devtoolschange', event => {
    location.reload();
	window.location.replace('https://github.com/omediodomonte38/typer-gal');
    setHighscore(0);
  });
}
