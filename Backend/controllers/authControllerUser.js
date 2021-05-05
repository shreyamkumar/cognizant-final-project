const crypto = require('crypto');
const {promisify} = require('util');
const User = require('./../Models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET='my-cts-final-internship-project-secret';
const sendEmail = require('./../utils/email');
const signToken = id=>{
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '2h'
    });
}
exports.signup = async (req, res, next) =>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address
        });
    
        const token = signToken(newUser._id);

        res.status(201).json({
            status : 'Success',
            token,
            data: {
                user: newUser
            }
        });


    }catch(err)
    {
        res.status(404).json({
            status: "fail",
            message: err,
          });
    }
}

exports.login = async (req, res, next) => {
   try{
        const {email, password} = req.body;
        const user = await  User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password)))
        {
            return res.status(401).json({
                message: 'Email or Password is incorrect'
            });
        }

        const token= signToken(user._id);
        res.status(200).json({
            status: 'Success',
            token
        });
    }catch(err)
    {
        res.status(404).json({
            status: "fail",
            message: err,
          });
    }
}

exports.protect = async (req, res, next)=>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1]; 
        }
        if(!token)
        {
            return res.status(401).json({
                status: "Failed",
                message: 'You are not logged in',
              });
        }

       try{
        const decoded = await promisify(jwt.verify)(token, JWT_SECRET);
       }catch(err)
       {
        res.status(401).json({
            status: "Failed",
            message: 'Invalid Token Please Login Again',
          });
       }
        // try{
        // const freshUser = await User.findById(decoded.id);
        // if(!freshUser)
        // {
        //     return res.status(401).json({
        //         status: 'failed',
        //         message: 'User belonging to this token does no longer exist'
        //     })
        // }
        // }catch(err)
        // {
        //     res.status(404).json({
        //         status: 'failed',
        //         message: 'User belonging to this token does no longer exist'
        //       });
        // }
        // req.user= await User.findById(decoded.id);
        next();
    }catch(err)
    {
        res.status(404).json({
            status: "fail",
            message: err,
          });
    }
}

// exports.restrictTo = (...roles) =>{
//     return (req, res, next)=>{
//         console.log("aa"+req.user.role);
//         if(!roles.includes(req.user.role))
//         {
//             res.status(403).json({
//                 status: 'failed',
//                 message: 'You dont have permission to perform this action'
//             });
//         }
//         next();
//     };
// };


exports.forgetPassword = async (req, res, next) =>{
   try{
    const user = await User.findOne({email: req.body.email});
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    const resetUrl = `${req.protocol}://${req.get(
        'host'
      )}/users/resetPassword/${resetToken}`;
    const message = `Forgot Your Password. Reset It Now: ${resetUrl}`;
   try{
        await sendEmail({
        email: user.email,
        subject: 'Your Password reset token is valid for 10 mins',
        message
    });
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email'
    });
}catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
        status: 'fail',
        message: 'There was an error sending the email. Try again later'
    });
}
}catch(err)
   {
    res.status(404).json({
        status: "fail",
        message: "Not valid email"
      });
   }
}
exports.resetPassword = async(req, res, next) =>{
    try{
        const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');
    
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });
    
      // 2) If token has not expired, and there is user, set the new password
      if (!user) {
        return res.status(400).json({
            status: 'fail',
            message: 'Token is invalid or has expired'
        });
      }
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
    
      // 3) Update changedPasswordAt property for the user
      // 4) Log the user in, send JWT
      const token = signToken(user._id);
      res.status(200).json({
          status: 'success',
          token
      });
     }catch(err)
    {
        res.status(404).json({
            status: 'fail',
            message: err
          });
    }
}

exports.updatePassword = async (req, res, next) => {
    try{
        // 1) Get user from collection
    const user = await User.findById(req.body._id).select('+password');
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return res.status(401).json({
          status:'fail',
          message:'Your current password is wrong.'
      });
    }
  
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!
  
    // 4) Log user in, send JWT
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });
    }catch(err)
    {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
          });
    }
  };
  