module.exports = app => {

    app.use('/authentication', require('./authentication'));
    app.use('/parties', require('./parties'));

}