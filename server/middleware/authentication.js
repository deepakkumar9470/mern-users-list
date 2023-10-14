
const jwt = require('jsonwebtoken')
const User = require('../models/User')



const authProtect =  async (req,res,next) =>{
    let token;
    token = req.cookies.jwttoken;

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decode.userId).select('-password')
            next()
        } catch (error) {
            res.status(401).json('Token Invalid!')
        }
        return res.status(401).json('Not authenticated, not valid token')
  
    }else{
       res.status(401).json('Token Invalid!')
    }
    
   
  }
    
   module.exports = authProtect


// const authProtect =  (req,res,next) =>{
//   const token = req.header('x-auth-token')
//   if(!token){
//       return res.status(401).json('Not authenticated, not valid token')

//   }
  
//   try {
//       const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
//       req.user = user
//       next()
//   } catch (error) {
//       res.status(400).json('Token Invalid!')
//   }
// }
  
//  module.exports = authProtect