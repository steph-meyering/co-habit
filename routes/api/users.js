const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Household = require('../../models/Household');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateHouseholdInput = require('../../validation/household');
const validateLoginInput = require('../../validation/login');

// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email,
        household: req.user.household
    });
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { herrors, hisValid } = validateHouseholdInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    if (!hisValid) {
        return res.status(400).json(herrors);
    }
    
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                let newUser;
                let newHousehold;
                Household.findOne({ name: req.body.housename })
                    .then(household => {
                        // debugger
                        if (household) {
                            newUser = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: req.body.password,
                                household: household.id,
                                //need approval by household owner to be accepted
                                //conditionally render based on this variable
                                acceptedIntoHousehold: false,
                                adminPriveleges: false 
                            })
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser.save()
                                        .then(user => {
                                            // sign in user
                                            const payload = { id: user.id, name: user.name, household: user.household };
                                            jwt.sign(
                                                payload,
                                                keys.secretOrKey,
                                                // Tell the key to expire in one day
                                                { expiresIn: 86400 },
                                                (err, token) => {
                                                    res.json({
                                                        success: true,
                                                        token: 'Bearer ' + token
                                                    });
                                                });
                                            // return res.json(user)
                                        })
                                        .catch(err => console.log(err));
                                })
                            })
                        } else {
                            // debugger
                            newHousehold = new Household({
                                name: req.body.housename,
                                // owner: ObjectId("5e711b58535b2144985b4696")
                            })
                            // debugger
                            newHousehold.save().then(household => {
                                // debugger
                                newUser = new User({
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: req.body.password,
                                    household: household.id,
                                    //the person who created the house is automatically accepted into the house
                                    acceptedIntoHousehold: true,
                                    adminPriveleges: true
                                })
                                // debugger
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                                        if (err) throw err;
                                        newUser.password = hash;
                                        newUser.save()
                                            .then(user => {
                                                // sign in user
                                                const payload = { id: user.id, name: user.name, household: user.household };
                                                jwt.sign(
                                                    payload,
                                                    keys.secretOrKey,
                                                    // Tell the key to expire in one day
                                                    { expiresIn: 86400 },
                                                    (err, token) => {
                                                        res.json({
                                                            success: true,
                                                            token: 'Bearer ' + token
                                                        });
                                                    });
                                                // return res.json(user)
                                            })
                                            .catch(err => console.log(err));
                                    })
                                })
                            })
                            // debugger
                        
                        }
                        
                    })

                
            }
        })
})


router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name, household: user.household };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one day
                            { expiresIn: 86400 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})

module.exports = router;