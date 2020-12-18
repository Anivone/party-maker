module.exports = (app, {passport, userService, to}) => {
    app.use(passport.initialize());
    app.use(passport.session());
    require('./strategies/StrategyRegistration')(passport, userService, to);
    require('./strategies/StrategyLogin')(passport, userService, to);
}