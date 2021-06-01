import 'reseter.css';
import './style.css';
import home from './UI';
import footer from './footer';

(() => {
  localStorage.clear();
  document.body.appendChild(home());
  document.body.appendChild(footer());
})();
