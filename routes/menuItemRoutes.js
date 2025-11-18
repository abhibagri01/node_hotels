const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


//POST method for menuitem
router.post('/', async (req, res) => {
    try {
        const menuItemData = req.body; // Assuming the request body contains menu item data
        // Create a new menu item using the Mongoose model
        const menuItem = new MenuItem(menuItemData);
        // Save the new menu item to the database
        const menu_data = await menuItem.save();
        console.log('Menu item saved');
        res.status(201).json(menu_data);
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// GET method to get the menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        // Send the list of menu items as a JSON response
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Parametric call for individual 
router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy') {

            const response = await MenuItem.find({ taste: tasteType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Taste type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Update method for update menu items
router.put('/:id' , async(req , res) =>{
    try{
        const menuId = req.params.id;
        const updateMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error: 'Menu Item not found'});
        }

        console.log('data update');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//DELETE method
router.delete('/:id' , async (req , res) => {
    try{
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndRemove(menuId);
        if(!response){
            return res.status(404).json({error: 'Menu item not found'});
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted successfully'});
    }catch(err){
        console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
})


module.exports = router;