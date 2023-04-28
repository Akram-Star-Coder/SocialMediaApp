const contact = require('../models/contact');


const contactMe = async (req, res) => {
    try{
        
        const isSent = await contact.create({
            idUser :  req.user._id, 
            message : JSON.stringify(req.body)
        })
        if(isSent){
            res.status(200).send('Sent Successfully');
            

        }
        else{
            res.status(666).send('Not Sent');
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
}


module.exports = contactMe;