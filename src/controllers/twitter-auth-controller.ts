const User = require('../models/User');


const loginSuccessCallback = async (req, res) => {
    try {
        // Successful authentication, redirect to success screen.
        res.status(300).redirect('/auth/twitter/success');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const loginSuccess = async (req, res) => {
    try {
        //   const userInfo = {
        //     id: req.session.passport.user.id,
        //     displayName: req.session.passport.user.displayName,
        //     provider: req.session.passport.user.provider,
        //   };
        res.status(200).send('Twitter login success!');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const error = async (req, res) => {
    try {
        res.status(500).send('Error logging in via Twitter..');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const signout = async (req, res) => {
    try {
        req.session.destroy(function (err) {
            console.log('session destroyed.');
        });
        res.status(300).redirect('/');
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out twitter user' });
    }
};

// function (token, tokenSecret, profile, done) {
// await User.findOrCreate({ twitterId: profile.id },
//     function (err, user) {
//         return done(err, user);
//     });
// }

const handleTwitterAuthentication = async function (token, tokenSecret, profile, cb) {
    try {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });

        // console.log(user);
        // } else {
        //   console.log('Twitter User already exist in DB..');
        // console.log(profile);
        //   return cb(null, profile);
        // }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { loginSuccessCallback, loginSuccess, error, signout, handleTwitterAuthentication }