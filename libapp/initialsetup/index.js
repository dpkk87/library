var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var libraryRouter = require('../library/route');

exports.default = async (app, express) => {
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode < 400
        }, stream: process.stderr
    }));
    
    app.use(morgan('dev', {
        skip: function (req, res) {
            return res.statusCode >= 400
        }, stream: process.stdout
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    //app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', libraryRouter);

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.send(err.message || "Internal server error");
    });
}