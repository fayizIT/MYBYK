import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from '../models/userModels.js';

const protect = AsyncHandler(async (req, res, next) => {
    let token;

    // Attempt to extract the JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            // Verify the token using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user based on the decoded user ID and exclude the password
            req.user = await User.findById(decoded.userId).select('-password');
            
            // Continue to the next middleware or route handler
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid Token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export {
    protect
};
