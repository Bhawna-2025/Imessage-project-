export async function checkAuth(req, res,next) {
    if(!req.user){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    return res.status(200).json({user:req.user})
}