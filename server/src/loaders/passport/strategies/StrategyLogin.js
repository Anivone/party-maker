const container = require("../../../container")();
const LocalStrategy = require('passport-local').Strategy;

const {postgres, to} = container.cradle;

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        postgres.UserAccount
            .findOne(id)
            .then(user => {
                done(null, user);
                return null
            });
    });

    passport.use(
        'user-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, next) => {
                const {postgresRepository} = req.container.cradle;

                process.nextTick(async () => {
                    const [err, user] = await to(
                        postgresRepository.findOne('Person', {email})
                    );

                    if (err) return next(err);
                    if (!user)
                        return next(new Error('User with such email does not exist.'));

                    if (!postgres.UserAccount.isPasswordCorrect(password, user.password, user.salt))
                        return next(new Error('Incorrect email or password !'));

                    console.log('user: ', user);

                    req.session.userId = user.id;
                    req.session.authorized = true;

                    return next(null);
                });
            }
        )
    )
}