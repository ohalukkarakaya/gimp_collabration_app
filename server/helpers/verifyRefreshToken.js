// Import Models
import UserToken from "../models/UserToken.js";

// Import Dependencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Set ".env" Conf
dotenv.config();

const verifyRefreshToken = ( refreshToken ) => {
    try{
        const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

        return new Promise(
            ( resolve, reject ) => {
                // Find Token
                UserToken.findOne(
                    { token: refreshToken }, 
                    ( err, doc ) => {
                        // Return Error
                        if( err ){
                            console.log( err );
                            return reject({
                                error: true, 
                                message: "Internal server error"
                            });
                        }

                        // Return Error If Token Doesn't Exists
                        if( !doc ){ return reject({ error: true, message: "Invalid Refresh Token" }); }

                        // Validate Token
                        const tokenDetails = jwt.verify( refreshToken, privateKey );
                        resolve(
                            {
                                tokenDetails,
                                error: false,
                                message: "Valid Refresh Token"
                            }
                        );
                    }
                );
            }
        );
    }catch( err ){
        if( err.name === 'TokenExpiredError' ) {
            // Token Expired
            return {
                        error: true,
                        message: "Access Denied: token expired"
                   }
          } else {
            // General Errors
            return {
                        error: true,
                        message: "Access Denied: No token provided"
                   }
          }
    }
};

export default verifyRefreshToken;