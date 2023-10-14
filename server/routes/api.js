const express  = require('express')

const router = express.Router()
const {signup,login,logout, getSingleUser, getUsers, updateUser,deleteUser}  = require('../controllers/userController');
const authProtect = require('../middleware/authentication');

// @ /api/user/resister 
router.post('/register',signup);


// @ /api/user/login 
router.post('/login', login);


// @ /api/user/getall 
router.get('/getall' ,getUsers)


// @ /api/user/123 
router.put('/:id', updateUser)
router.get('/:id', getSingleUser)
router.delete('/:id', deleteUser)

// @ /api/user/logout 
router.post('/logout', logout);

module.exports = router