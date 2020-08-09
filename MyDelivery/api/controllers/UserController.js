module.exports = {
    validateUser: function(req,res){
        return User.findOne({
            username: req.body.username,password: req.body.password}).exec(function(err,user){
            if(err){
                console.log("Database Error: " + err);
                res.view('pages/error', {
                    message: "Database Error!"
                });
                return;
            }
            if(user){
                console.log(user);
                let order_id = req.body.order_id;

                res.view('pages/homepage',{
                    order_id: order_id,
                    username: user.id
                });
                return;
            }
            res.view('pages/login',{
                errorMessage: 'Please provide valid credentials',
                order_id: req.body.order_id
            });
        });
    }
};  