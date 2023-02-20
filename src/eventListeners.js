import { registerUser, resetPassword, signIn, signOut } from './auth';
import renderForgotPasswordPage from './pages/forgotPasswordPage';
import renderInnerPage from './pages/innerPage';
import renderLoginPage from './pages/logInPage';

// this file will have all the event listeners used in the app

// this technique is called event delegation or event bubbling
document.querySelector('#root').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.closest('#loginButton')) {
    console.log('login button clicked');
    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;
    console.log(email, password);
    signIn(email, password).then((user) => {
      if (user) {
        console.log('user is logged in', user);
        renderInnerPage();
      }
    });
  }
  if (e.target.closest('#signOutButton')) {
    signOut().then(() => {
      renderLoginPage();
    });
  }
  if (e.target.closest('.top-buttons .button-right')) {
    document.querySelector('.block-sign-up').classList.toggle('js-hidden');
    document.querySelector('.block-log-in').classList.toggle('js-hidden');
    document.querySelector('.top-buttons .active').classList.add('js-left-50');
  }
  if (e.target.closest('.top-buttons .button-left')) {
    document.querySelector('.block-sign-up').classList.toggle('js-hidden');
    document.querySelector('.block-log-in').classList.toggle('js-hidden');
    document.querySelector('.top-buttons .active').classList.remove('js-left-50');
  }
  if (e.target.closest('#signUpButton')) {
    const email = document.querySelector('#signUpEmail').value;
    const passwword = document.querySelector('#signUpPassword').value;
    const verifyPassword = document.querySelector('#verifySignUpPassword').value;
    if (passwword === verifyPassword) {
      registerUser(email, passwword)
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
    } else {
      window.alert('passwords do not match');
    }
  }
  if (e.target.closest('#forgotPassword')) {
    renderForgotPasswordPage();
  }
  if (e.target.closest('#backToLoginPage')) {
    renderLoginPage();
  }
  if (e.target.closest('#resetPasswordButton')) {
    const email = document.querySelector('#forgotPasswordEmail').value;
    resetPassword(email);
    renderLoginPage();
  }
});
