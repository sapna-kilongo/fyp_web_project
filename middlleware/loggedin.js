module.exports={
 ensureAuth: function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    } 
    else{
        res.redirect("/account/login")
    }    

},

ensureGuest: function(req,res,next){
    if(req.isAuthenticated()){
        res.redirect("/account/profile")
    } 
    else{
        return next();
    }

}


}