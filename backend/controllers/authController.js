const User = require("../models/User")
const jwt = require('jsonwebtoken')



exports.register = async(req,res) => {
    try{

        console.log("👉 Datos que llegaron en req.body:", req.body); // 👈 log

        const {name,email,password} = req.body;
        if(!name || !email || !password ){
            return res.status(400).json({error:'please provide all required fields'})
        }

        //check if user already exit
        const existingUser = await User.findOne({email});
        console.log("🔍 Usuario existente:", existingUser);

        if(existingUser){
            console.log("❌ Usuario ya existe, no se puede registrar");
            return res.status(400).json({error:'User already exists'})

        }

        //create new user
        const user = await User.create({
            name,
            email,
            password,
            provider:"credentials",
        })
        console.log("✅ Nuevo usuario creado:", user);

        const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.cookie('auth_token',token,{
            httpOnly:true,
            samesite:'name',
            secure:true //la cookie solo se envía en HTTPS (no en HTTP).
        })

        res.status(201).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture,
                provider:user.provider
            },
            message:'user register succesfully',
        })
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}



exports.login= async(req,res) => {
    try{
        //1️⃣ Extraer datos del body
        //Si no se mandan ambos campos → devuelve 400 Bad Request.
        const {email,password} = req.body;
        if(!email || !password ){
            return res.status(400).json({error:'please provide email and password'})
        }


        //2️⃣ Buscar al usuario en la base de datos
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({error:'Invalid credentials'})
        }

        //compara la contraseña
        const isMatch = await user.comparePassword(password);
         if(!isMatch){
            return res.status(401).json({error:'Invalid password'})
        }

        const token = jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        );
        res.cookie('auth_token',token,{
            httpOnly:true,
            samesite:'none',
            secure:true
        })

        res.status(201).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture,
                provider:user.provider
            },
            message:'user login succesfully',
        })
    }catch (error) {
        res.status(500).json({error:error.message})
    }
}


exports.getCurrentUser = async(req,res) => {
    try{
        const userId = req.user.id
        console.log(userId)
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({error:'User not found'})
        }
        res.status(201).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                profilePicture:user.profilePicture,
                provider:user.provider
            },
            message:'user profile get succesfully',
        })
    }catch (error){
        res.status(500).json({error:error.message})
    }
}


exports.googleCallback = async(req,res) => {
    try{

        const token = jwt.sign(
            {id:req.user._id, email:req.user.email},
            process.env.JWT_SECRET,
            {expiresIn:'30d'}
        );
        res.cookie('auth_token',token,{
            httpOnly:true,
            samesite:'none',
            secure:true
        })

        res.redirect(`${procces.env.FRONTEND_URL}/auth/succes?token=${token}`)
    }catch (error){
        res.status(500).json({error:error.message})

    }
}