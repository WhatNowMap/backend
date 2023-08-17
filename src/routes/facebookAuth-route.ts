const router = require('express').Router();
const facebookAuthController = require('../controllers').facebookAuthController;
const passport = require('passport');

const successLoginUrl = 'http://localhost:5173/login/success';
const errorLoginUrl = 'http://localhost:5173/login/error';

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureMessage: 'Cannot login to Facebook, please try again later!',
    // failureRedirect: '/auth/facebook/error',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  facebookAuthController.loginSuccessCallback
);

router.get('/success', facebookAuthController.loginSuccess);

router.get('/error', facebookAuthController.error);

router.get('/signout', facebookAuthController.signout);

module.exports = router;
