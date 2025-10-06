const express = require('express')
const {register,login, getCurrentUser, googleCallback} = require('../controllers/authController');
const authMiddleware = require('../middleware/AuthMiddleware');
const passport = require('passport');

const router = express.Router();


//Register New user
router.post('/register', register)
//login users
router.post('/login', login)
//Obtener el usuario actual
router.get('/me', authMiddleware,getCurrentUser)


//Google Oauth routes
router.get('/google',passport.authenticate('google', { scope: ['profile','email']}))

router.get('google/callback/', passport.authenticate('google', {session:false},{ failuRedirect:'/sign-in'}), googleCallback)

router.post('/logout', (req,res) =>{
    res.clearCookie('auth_token',{
        httpOnly:true,
        saveSite:'none',
        secure:true
        
    })
     return res.status(201).json({message:"user logout success"})
})

module.exports= router;

