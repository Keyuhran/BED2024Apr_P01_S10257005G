const { Food } = require("../dbConfig.js");
const Food = require("../models/Food");


async function updateAvailability(req, res) {
        const foodId = parseInt(req.params.id);
        const newFoodAvailability = req.body;
      
        try {
          const updatedFood = await Food.updateAvailability(foodId, newFoodAvailability);
          if (!updatedFood) {
            return res.status(404).send("Food not found");
          }
          res.json(updatedFood);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error updating Food");
        }
      };



      const getAvailableByCategory = async (req, res) => {
        const foodCategory = String(req.params.category);
        try {
          const category = Food.getAvailableByCategory(category)
          if (!category) {
            return res.status(404).send("category not found");
          }
          res.json(Food);
        } catch (error) {
          console.error(error);
          res.status(500).send("Error retrieving category");
        }
      };

module.exports = {
 
};

  
  
 
  
