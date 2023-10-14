
const User  = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { hashedPassword,comparePassword } = require('../helper/auth');
const generateToken = require('../helper/generateToken');



//REGISTER

module.exports.signup = async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        gender,
        hearAbout,
        city,
        state} = req.body;
  if(!name || !email || !password || !phone) {
    res.status(400).json('Please fill all fields..')
  }
  try {
    const hashedPass = await hashedPassword(password)
    const user = await User.create({
      name,
      email,
      password:hashedPass,
      phone,
      gender,
      hearAbout,
      city,
      state
    });
    
    if(user){
      generateToken(res,user._id)
      res.status(200).json({
        _id : user._id,
        name : user.name,
        phone : user.phone,
        email : user.email,
        gender : user.gender,
        hearAbout : user.hearAbout,
        city : user.city,
        state : user.state,
      })
    }else{
      res.status(400).json('Invalid data')
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



  



// auth login user
module.exports.login = async (req, res) =>{
  const {email,password} = req.body;
  const user = await User.findOne({email})
  if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    res.status(201).json({
      _id : user._id,
      name : user.name,
      phone : user.phone,
      email : user.email,
      gender : user.gender,
      hearAbout : user.hearAbout,
      city : user.city,
      state : user.state,
    })
  }else{
    res.status(400).json('Invalid data')
  }
}



// Get Users
module.exports.getUsers = async (req, res) =>{   
 
  try {
    const {search,sort} = req.query
    let sortQuery ={}
 
     if (sort === "Last modified") {
        sortQuery ={updatedAt :-1}
      }
      if (sort === "Last Inserted") {
        sortQuery = { createdAt: 1 };
      }
      if (sort === "A-Z") {
        sortQuery = {createdAt :1}
      }
      if (sort === "Z-A") {
        sortQuery = {createdAt :-1}
      }
   
  const queryResult = await User.find({
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]
  }).sort(sortQuery);
  
 
    const users = await queryResult
       res.status(200).json(users);

  } catch (error) {
    res.status(404).json({ message: error.message })

  }
}

module.exports.getSingleUser = async (req, res) =>{ 
   try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user);
   } catch (error) {
    res.status(404).json({ message: error.message })

   }

}

module.exports.updateUser = async (req, res) =>{    
  const {id} = req.params
  const {name,phone,city,gender,state} = req.body
  
  try {
      
      const updateUser = await User.findByIdAndUpdate({_id:id},{
        name,phone,city,gender,state
              } ,{new : true})
       
       await updateUser.save()
       res.status(200).json(updateUser)
      } catch (error) {
     res.status(400).json(error)   
  }
 
  
}


// Update user
module.exports.deleteUser = async (req, res) =>{    
  const {id} = req.params   
  try {        
      await User.findByIdAndDelete({_id:id})
      res.status(200).json('User has been deleted')
      } catch (error) {
        res.status(400).json(error)   
  }
 
}


// Logout 
module.exports.logout = (req, res) =>{    
    res.cookie('jwttoken','', {
        httpOnly : true,
        expires : new Date(0)
    });
    res.status(200).json({message:'User logout'})
}