// Import Dependencies
import jwt from "jsonwebtoken";

// Import Models
import UserToken from "../models/UserToken.js" ;

const generateTokens = async ( user ) => {
    try{
        // Prepare Payload Wıch Gonna Passed In To JWT Token
        const payload = { _id: user._id }

        // Generate Access Token
        const accessToken = jwt.sign( payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "5m" } );

        // Generate Refresh Token
        const refreshToken = jwt.sign( payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: "60d" } );

        // Check and Delete If User Has Any Remained Token
        const userToken = await UserToken.findOne({ userId: user._id });
        if( userToken ){ await userToken.remove(); }

        // Insert New Token Data To DB
        await new UserToken({ userId: user._id, token: refreshToken }).save();

        // Return New Generated Tokens
        return Promise.resolve({ accessToken, refreshToken });
    }catch( err ){

        // Return Rejection If Any Error Occurs
        return Promise.reject( err );

    }
};

export default generateTokens;