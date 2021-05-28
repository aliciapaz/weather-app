import 'reseter.css';
import './style.css';
import home from './UI';
import footer from './footer';

(() => {
  document.body.appendChild(home());
  document.body.appendChild(footer());
})();
