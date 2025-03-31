import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        
        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized Login again" });
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SERCET);

        req.body.docId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default authDoctor;