const users = require("../models/users");
const bcrypt = require('bcrypt');

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName, 
            username,
            email,  
            password, 
            gender, 
            birthdayYear, 
            birthdayMonth, 
            birthdayDay
            } = req.body;
        if(!firstName || !lastName || !email || !password || !gender){
            res.status(499).send('Empty Field');
        }
        else{
            if(email){
                //we check first if the email exists
                const isExisting = await users.findOne({email});
                
                if(isExisting){
                    res.status(406).send('User Already Exists.');
                }
                else{
                    //we hash the password and create the use 
                    const hashedPassword = await bcrypt.hash(password, 12)
                    if(hashedPassword){
                        
                        const usernameModified = firstName+lastName+getRandomNumber(1, 99);
                        const usernameLastModify = usernameModified.toLowerCase();
                        const isCreated = await new users( 
                            {
                                firstName  : firstName,
                                lastName : lastName,
                                username : usernameLastModify,
                                email : email, 
                                password: hashedPassword, 
                                gender : gender, 
                                birthdayYear : birthdayYear, 
                                birthdayMonth : birthdayMonth , 
                                birthdayDay : birthdayDay
                            }
                            ).save();
                        if(isCreated){
                            res.status(200).json(isCreated);
                        }
                        else{
                            res.status(400).send('An Error Occuried');
                        }
                    }
                    else{
                        res.status(400).send('An Error Occuried');
                    }
                }     
            }   
            else{
                res.status(404).send('Email Not found');
            } 
        }
                
    }
    catch(e){
        res.status(666).send(e.message)
    }
}



module.exports = register;