const router = require("express").Router();
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/auth-middleware')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

// router.get('/', (req, res)=>{
//     res.sendFile(appDir + '/index.html')
// })
router.get('/',
  passport.authenticate('google', { scope:
    [ 'email', 'profile' ] }
  )
);
router.get('/callback',
    passport.authenticate( 'google', {
      successRedirect: '/auth/google/success',
      failureRedirect: '/auth/google/failure'
    })
);
router.get('/failure', (req, res)=>{
    res.send("Something went wrong!")
});
router.get('/success', isLoggedIn, (req, res)=>{
    let name = req.user.userName;
    res.send(`Hello ${name}`);
});

module.exports = router;