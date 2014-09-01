var passport = require('passport');

module.exports = function(app){
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params[0]);
    });

//    app.post('/login', function(req, res, next){
//        var  auth = passport.authenticate('local', function (err, user) {
//            if(err) { console.log('route ' + err); return next(err); }
//            if(!user) { res.send({success:false}); }
//
//            req.logIn(user, function (err) {
//                if(err) { return next(err); }
//                res.send({success: true, user: user});
//            });
//        });
//        auth(req, res, next);
//    });

    app.post('/login', function(req, res, next) {

        passport.authenticate('local', function(err, user) {
            console.log('check route: user: ' + user);
            if (err) { return next(err) }
            if (!user) {
                res.send({success:false});
            }
            req.logIn(user, function(err) {
                if(err) { return next(err); }
                res.send({success: true, user: user});
            });
        })(req, res, next);
    });
    app.get('*', function  (req, res) {
        res.render('index');
    });
}