import jwt from 'jsonwebtoken';

// docotr authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        
        // Attach userId to req.user
        req.body.docId = token_decode.id
        
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authDoctor;
