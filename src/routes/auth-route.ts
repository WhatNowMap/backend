const router = require("express").Router();
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth-middleware')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

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
      successRedirect: '/auth/protected',
      failureRedirect: '/auth/google/failure'
    })
);
router.get('/auth/google/failure', (req, res)=>{
    res.send("Something went wrong!")
});
router.get('/auth/protected', isLoggedIn, (req, res)=>{
    let name = req.user.userName;
    res.send(`Hello ${name}`);
});

module.exports = router;