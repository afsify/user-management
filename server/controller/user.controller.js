const userModel = require('../model/user.model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


//! =============================================== Verify SignUp ===============================================

const signUp = async (req, res, next) => {

    try {

        const userExists = await userModel.findOne({ email: req.body.email })

        if (userExists) {

            return res.status(200).send({ message: 'User Already Exist', success: false })

        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        req.body.password = hashPassword

        const newUser = new userModel(req.body)
        await newUser.save()

        res.status(200).send({ message: 'User Created Successfully', success: true })

    } catch (error) {

        next(error)
        res.status(500).send({ message: 'Error Creating User', success: false })

    }

}

//! =============================================== Verify SignIn ===============================================

const signIn = async (req, res, next) => {

    try {

        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {

            return res.status(200).send({ message: 'User Does not Exist', success: false })

        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {

            res.status(200).send({ message: 'Password is Incorrect', success: false })

        } else {

            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {
                expiresIn: '1d'
            })

            res.status(200).send({ message: 'Sign In Successful', success: true , data: token })

        }

    } catch (error) {

        next(error)
        res.status(500).send({ message: 'Error Sign In', success: false })

    }

}

//! =============================================== Authorization ===============================================

const getInfo = async (req , res , next) => {

    try {

        const user = await userModel.findOne({_id:req.userId})

        if(!user){

            return res.status(200).send({ message: 'User does not exist' , success: false})

        } else {

            return res.status(200).send({success: true ,

                data:{

                    name: user.name,
                    email: user.email

                }

            })

        }

    } catch (error) {

        next(error)
        return res.status(500).send({ message: 'Error getting user info' , success: false})

    }

}

//! =============================================== Update Picture ===============================================

const uploadPic = async (req, res, next) => {

    try {

        console.log('here');
        const filePath = req.file.filename
        const userId = req.userId;
        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        user.image = filePath
        await user.save()

        res.status(200).json({ success: true, message: 'Profile picture uploaded successfully' })

    } catch (error) {

        next(error);
        res.status(500).json({ success: false, message: 'Error uploading profile picture' })

    }

}

//! =============================================== Profile ===============================================

const getProfile = async (req , res , next) => {

    try {

        const user = await userModel.findOne({_id:req.userId})

        if(!user){

            return res.status(200).send({ message: 'User does not exist' , success: false})

        } else {

            return res.status(200).send({success: true ,

                data:{

                    profilePic : user.image

                }

            })

        }

    } catch (error) {

        next(error)
        return res.status(500).send({ message: 'Error getting user profile' , success: false})

    }

}


module.exports = {

    signUp,
    signIn,
    getInfo,
    uploadPic,
    getProfile

}