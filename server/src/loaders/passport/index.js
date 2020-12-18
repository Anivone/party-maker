const container = require("../../container")();
const { passport } = container.cradle;

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    require('./strategies/StrategyRegistration')(passport);
    require('./strategies/StrategyLogin')(passport);
}