const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');  // for token 


//POST route to add a person
router.post('/signup', async (req, res) => {
    try {
        const data = req.body // assuming the req body contains the person data

        //create a new person doc using the mongoose model
        const newPerson = new Person(data);

        //save new person to the db
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {            //payload
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);  //token
        console.log("Token is:", token);

        res.status(200).json({response: response , token: token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Login routes
router.post('/login' , async(req , res) =>{
    try{
       // Extract username and password from request body
        const {username, password} = req.body;

        // Find the user by username
        const user = await Person.findOne({username: username});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // re turn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// GET method to -> get the person info
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//GET method for workType or Parametric call
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// UPDATE method to update the data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the ID from the URL parameter
        const updatedPersonData = req.body; // Updated data for the  person
        // Assuming you have a Person model
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!updatedPerson) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        // Send the updated person data as a JSON response
        console.log('data updated')
        res.status(200).json(updatedPerson);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//DELETE method 
router.delete('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID  from the URL parameter
        // Assuming you have a Person model
        const deletedPerson = await Person.findByIdAndRemove(personId);

        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        console.log('data delete');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
