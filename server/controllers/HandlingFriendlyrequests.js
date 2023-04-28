const users = require('../models/users');

const HandlingFriendlyrequests = async (req, res) => {
    try {
        const { id } = req.params;
        const idWhoMakeAction = req.user._id;

        // find both users by their ids
        const user1 = await users.findById(id);
        const user2 = await users.findById(idWhoMakeAction);

        // check if the friend id exists in user1's friends array
        const isFriendInUser1 = user1.friends.includes(idWhoMakeAction);

        // check if the friend id exists in user2's friends array
        const isFriendInUser2 = user2.friends.includes(id);

        if (isFriendInUser1 && isFriendInUser2) {
            // if the friend is already in both users' friends arrays, remove it
            await users.updateMany(
                { _id: { $in: [id, idWhoMakeAction] } },
                { $pull: { friends: { $in: [id, idWhoMakeAction] } } }
            );
            res.status(200).send("Friend removed");
        } else {
            // if the friend is not already in both users' friends arrays, add it
            await users.updateOne(
                { _id: id },
                { $addToSet: { friends: idWhoMakeAction } }
            );
            await users.updateOne(
                { _id: idWhoMakeAction },
                { $addToSet: { friends: id } }
            );
            res.status(200).send("Friend added");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
};

module.exports = HandlingFriendlyrequests;
