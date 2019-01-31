let admin = (req, res, next) => {

    if(req.user.role===0){
        return res.send('You are not authorised to perform this request');
    }
    
    next();
}

module.exports = { admin }