const router = require('express').Router();
const twitterAuthController = require('../controllers').twitterAuthController;
const passport = require('passport');

router.get('/',
    passport.authenticate('twitter', {
        scope: ['email', 'profile']
    }));

router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    twitterAuthController.loginSuccessCallback
);

router.get('/success', twitterAuthController.loginSuccess);

router.get('/error', twitterAuthController.error);

router.get('/signout', twitterAuthController.signout);

module.exports = router;
