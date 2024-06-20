var homeController = function () { }

homeController.index = function (req, res) {
    req.flash('success', 'Welcome to Home')
    res.render('home/index', { title: 'You can save employees details' });
}

module.exports = homeController