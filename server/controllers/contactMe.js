const contact = require('../models/contact');


const contactMe = async (req, res) => {
    try{
        const data = req.body;
        const idUser = data.idUser;
        const message = data.message;

        const isSent = await contact.create({
            idUser : idUser, 
            message: message
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