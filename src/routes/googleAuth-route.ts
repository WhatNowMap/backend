const router = require('express').Router();
const googleAuthController = require('../controllers').googleAuthController;
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth-middleware')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

router.get('/test', (req, res)=>{
  res.sendFile(appDir + '/index.html')
})

router.get('/', passport.authenticate('google', { scope: [ 'email', 'profile' ]}));

router.get('/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  }),
  googleAuthController.loginSuccessCallback
);

router.get('/success', isLoggedIn, googleAuthController.success);

router.get('/failure', googleAuthController.failure);

router.get('/signout', googleAuthController.signout);

module.exports = router;
