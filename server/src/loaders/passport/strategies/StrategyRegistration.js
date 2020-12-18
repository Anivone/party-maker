const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, userService, to) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userService
            .getUser(id)
            .then(user => {
                done(null, user);
                return null
            });
    });

    passport.use(
        'user-registration',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, next) => {
                process.nextTick(async () => {
                    const [err, user] = await to(
                        userService.Register({
                            ...req.body,
                            email,
                            password
                        })
                    );
                    if (err) return next(err);

                    return next(null);
                });
            }
        )
    )
}