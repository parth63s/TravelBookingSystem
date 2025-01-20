const User = require("../models/user");

// render signup page
module.exports.renderSignupform = (req, res) => {
    res.render("Users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        })
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

//  render login page
module.exports.renderLoginform = (req, res) => {
    res.render("Users/login.ejs");
}

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";

    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
    })
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
}