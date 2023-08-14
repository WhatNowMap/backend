const router = require('express').Router();
const googleAuthController = require('../controllers').googleAuthController;
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth-middleware')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const successRoute = process.env.FRONTEND_PORT
  ? `${process.env.FRONTEND_PORT}/list`
  : '/auth/google/success'
const failureRoute = process.env.FRONTEND_PORT
  ? `${process.env.FRONTEND_PORT}/`
  : '/auth/google/failure'

router.get('/test', (req, res)=>{
  res.sendFile(appDir + '/index.html')
});

router.get('/', passport.authenticate('google', { scope: [ 'email', 'profile' ]}));

router.get('/callback',
  passport.authenticate( 'google', {
    successRedirect: successRoute,
    failureRedirect: failureRoute,
  }),
  googleAuthController.loginSuccessCallback
);

router.get('/success', isLoggedIn, googleAuthController.success);

router.get('/failure', googleAuthController.failure);

router.get('/signout', googleAuthController.signout);

module.exports = router;
