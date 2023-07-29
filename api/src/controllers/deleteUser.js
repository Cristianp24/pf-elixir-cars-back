const { users } = require("../db");

async function deleteUser(req, res){
    try{
        const userId = req.params.id;

        //verifico si existe el user

        const user = await users.findByPk(userId);
        if (!user){
            return res.status(404).send("User not found");
        }

        await user.destroy();

        res.status(200).send("Uses deleted successfully");
    }catch (error){
        res.status(500).jhson({message: "Error deleting user" });
    }
}

module.exports = deleteUser;