const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;


const contact = new mongoose.Schema(
    {
        idUser : {
            type : String, 
            required : true
        }, 
        message : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)


module.exports = mongoose.model('contact', contact);




