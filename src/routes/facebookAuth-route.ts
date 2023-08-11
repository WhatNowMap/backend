const router = require('express').Router();
const facebookAuthController = require('../controllers').facebookAuthController;
const passport = require('passport');

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  facebookAuthController.loginSuccessCallback
);

router.get('/success', facebookAuthController.loginSuccess);

router.get('/error', facebookAuthController.error);

router.get('/signout', facebookAuthController.signout);

module.exports = router;
