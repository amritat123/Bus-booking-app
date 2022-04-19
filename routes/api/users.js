const express = require('express');
const router = express.Router();
const config = require ('config');
const jwt = require ('jsonwebtoken');

const { check , validationResult } = require('express-validator');

// routes post api/users
//@desc Register user
// @access public

router.post(
    '/',
    [
    check(
        'name' , 'Name is required')
        .not()
        .isEmpty(),
    // checking whether email formet right or wrong
    check(
        'email', 'Please include a valid email')
    .isEmail(),

    check(
        'gender' , 'gender is requird')
    .isGender(),

    check(
        'phone' , 'phone is required')
    .not()
    .isEmpty()
    

    //Checking password length. it should not more than 6 digits
    check(
        'password','Please enter a password with 6 or more characters')
        .isLength({ min: 6})
],
    async (req, res) => {
        // set errors and validationresult which takes in the request
        const errors = validationResult(req);  

        // if any of the required info is missing it will be a bad request
        if (!errors.isEmpty()) { 

            //which is 400 and array is a method here to send the errors back
            return res.status(400).json({errors: errors.array() }); 
        }

        //pulling name email & pw from req.body
        const { name, email, password , dob, phone, gender, booking ,address } = req.body;  

    try {
    // see if user exists
    // it tells like await and findOne will earch the user by email
        let user= await User.findOne({ email}); 

        if (user) {
            return res;
            res.status (400)
            .json({errors: [ { msg: 'User already exists'}]});
        }
    //user which is created above and set tat to new User
    user = new User({  
        name,
        email,
        dob,
        password,
        phone,
        address,
        gender,
        booking
    });

    // Encrypt password
    // salt is a variable , 10 ia weight(round) more we use pw will be secure more
    // salt ia a key used to excrpt our data, here we give password.
    const salt = await bcrypt.genSalt(10);    

    // used to create a hash password 
    user.password = await bcrypt.hash(password, salt);  

    // saving the password to database
    await user. save();   

    // payload is the object. As we need user id for jwt.. getting userid
    const payload = {    
        user: {
            id: user.id
        }
    };

    // for jsonwebtoken signature we need payload and jwtsecret..
    jwt.sign( 
        payload,
        config.get('jwtSecret'), 
        { expiresIn: 360000 },
        (err, token)=> {
            if(err) throw err;
            res.json({ token });
        } 
        );
    } catch (err){
        console.error(err.message);
        // if something goes wrong it going to be server error
        res.status(500).send('Server error');     
     }
}
);
module.exports = router;


