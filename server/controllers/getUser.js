const users = require('../models/users');


const getUser = async (req, res) => {
    try{
        const id = req.user._id;
        const isFound = await users.findById(id);
        if(isFound){
            res.status(200).json(isFound);
        }
        else{
            res.status(404).send('No user found..');
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
}


module.exports = getUser;