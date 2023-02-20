import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import './scss/index.scss';
import './index.html';

import renderLoginPage from './pages/logInPage';
import renderInnerPage from './pages/innerPage';
import './eventListeners';
import { loginStatus } from './auth';

loginStatus()
  .then((user) => {
    if (user) {
      renderInnerPage();
    } else {
      renderLoginPage();
    }
  })
  .catch((error) => {
    console.log(error);
    renderLoginPage();
  });
