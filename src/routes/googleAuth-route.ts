const router = require('express').Router();
const googleAuthController = require('../controllers').googleAuthController;
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth-middleware')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

<<<<<<< HEAD
const successRoute = process.env.FRONTEND_PORT
  ? `${process.env.FRONTEND_PORT}/list`
  : '/auth/google/success'
const failureRoute = process.env.FRONTEND_PORT
  ? `${process.env.FRONTEND_PORT}/`
  : '/auth/google/failure'

router.get('/', (req, res)=>{
    res.sendFile(appDir + '/index.html')
})
router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
  )
);
router.get('/auth/google/callback',
    passport.authenticate( 'google', {
      successRedirect: successRoute,
      failureRedirect: failureRoute
    })
);
router.get('/auth/google/failure', (req, res)=>{
    res.send("Something went wrong!")
});
router.get('/auth/protected', isLoggedIn, (req, res)=>{
    let name = req.user.userName;
    res.send(`Hello ${name}`);
});
=======
router.get('/test', (req, res)=>{
  res.sendFile(appDir + '/index.html')
})
>>>>>>> f68ce671e96d1d661eb15cd5889a1613d8d85f3b

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
