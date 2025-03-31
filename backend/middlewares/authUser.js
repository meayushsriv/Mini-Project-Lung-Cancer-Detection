import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SERCET);

        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;