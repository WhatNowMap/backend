const router = require('express').Router();
const twitterAuthController = require('../controllers').twitterAuthController;
const passport = require('passport');

router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/success', twitterAuthController.loginSuccess);

router.get('/error', twitterAuthController.error);

router.get('/signout', twitterAuthController.signout);

module.exports = router;
