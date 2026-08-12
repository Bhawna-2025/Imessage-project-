import User from "../models/user.model.js";

export async function getUseForSidebar(req,res){
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await user.find({_id: {$ne : loggedInUserId}}).select("-clerkId");
        
        res.status(200).json(filteredUsers)

    }catch(err){
        console.error("Error in getUseForSidebar : ",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}