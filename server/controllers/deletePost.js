const posts = require('../models/posts');


const deletePost = async (req, res) => {
    try{
        
        const {id} = req.params;

        const isDeleted = await posts.findByIdAndDelete(id);
        if(isDeleted){
            res.status(200).send('DELETED Successfully');
        }
        else{
            res.status(401).send('Not deleted');
        }
        
    }
    catch(e){
        res.status(500).send(e.message);
    }
}


module.exports = deletePost;