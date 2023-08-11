const FacebookStrategy = require('passport-facebook').Strategy;
const router = require('express').Router();
const facebookConfig = require('../config/passport.js');
const passport = require('../controllers/facebook-auth-controller.ts');

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect('/auth/facebook/success');
  }
);
router.get('/success', async (req, res) => {
  //   const userInfo = {
  //     id: req.session.passport.user.id,
  //     displayName: req.session.passport.user.displayName,
  //     provider: req.session.passport.user.provider,
  //   };
  res.send('facebook login success');
});

router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

router.get('/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.redirect('/');
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router;
