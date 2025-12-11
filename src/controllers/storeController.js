const storeService = require("../services/storeService");
const storeController ={
    async createStore(req,res){
        try{
            // const newStore = req.body;
            const{name, email, address, ownerId}=req.body;
            const newStore = await storeService.createStore({name, email, address, ownerId});
            res.status(201).json({
                message:"Store created successfully",
                store:newStore
            })
        }catch(error){
            res.status(400).json({
                error:error.message
            });
        }
    },
    async getAllStores(req,res){
        try{
            const stores = await storeService.getAllStores(); // Correctly call the function
            res.status(200).json({
                message:"Stores fetched successfully",
                stores:stores
            })
        }catch(error){
            console.error("Error in storeController.getAllStores:", error);
            // Use 500 for internal server errors
            res.status(500).json({ error: "Failed to fetch stores" });
        }
    }
};
module.exports = storeController;