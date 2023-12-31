const path = require('path');
const bcrypt = require('bcrypt');
const AdminModel = require(path.join(__dirname, '..', 'models', 'Admin.js'));


const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find({}).sort({ createdAt: -1 });
        res.json( admins );
    } catch (err) {
        res.json({ message: 'Error retrieving admins' });
        console.error(err);
    }
};

const createNewAdmin = async (req, res) => {
    const conflict = await AdminModel.findOne({ email: req.body.email }).exec();
    if (conflict) {
        res.status(409);
        res.json({
            message: 'Email conflict',
            conflict: true
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = await AdminModel.create(
        {
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            account_type: req.body.account_type
        }
    );
    res.json( newAdmin );
};

const updateAdmin = async (req, res) => {

};

const deleteAdmin = async (req, res) => {

};



const getAdmin = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.id);
        console.err( err );console.err( err );
    } catch (err) {
        res.json({ message: 'Error retrieving admin' });
        console.err( err );
    }
}

module.exports = {
    getAllAdmins,
    createNewAdmin,
    updateAdmin,
    deleteAdmin,
    getAdmin
};