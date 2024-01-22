const User = require('../model/userSchema')

const readAllUsers = async (req, res) => {
    try {
        let allUsers = await User.find({});
        res.json({ data: allUsers });
    } catch (error) {
        console.error("Error reading users:", error);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}

const readSingleUser = async (req, res) => {
    try {
        let id  =req.params.id
        let readsingleuser = await User.findById({_id : id})

        if(!readsingleuser)
            return res.status(400).json({msg : 'Could not find the user'})

        res.status(200).json({data:readsingleuser})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

const createUser = async (req, res) => {
    try {
        let { email } = req.body;

        // Check if email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Create a new user
        let newUser = await User.create(req.body);

        res.status(200).json({ msg: 'New User Created', data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let id = req.params.id
        let readsingle = await User.findById({_id :id})
        if(!readsingle)
            return res.status(404).json({msg:"Requested id not found"})
        await User.findByIdAndUpdate({_id:id}, req.body)
        res.json({msg :'User Updated'})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        let single = await Contact.findById({_id:id})
        if(!single)
            return res.status(404).json({msg:"Requested id not found"})
        await User.findByIdAndDelete({_id:id})
        res.status(200).json({msg : "User Deleted"})
    } catch (error) {
        res.status(500).json({msg : error})
    }
}
module.exports = { readAllUsers,createUser, readSingleUser, updateUser, deleteUser}