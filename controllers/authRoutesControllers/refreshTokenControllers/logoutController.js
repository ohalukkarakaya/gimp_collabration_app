// Import Models
import UserToken from "../../../models/UserToken.js";

// Import Dependencies
import dotenv from "dotenv";

dotenv.config();

//  *                *         .                      *            .   *           .    *
//                                *                  *  .                .
//  *                *        .       *                ☾         *.             *.     .  *.   .
//      *           .       *                *                 .               *.        *   .
//     . logoutController   *       .         * .                  .  *       ø      

// This controller deletes users registered refresh token. You can allso delete refresh token
// From your Front-End after get success from this end-point

// No Header Param.
// Body -> { refreshToken: ${ String } }

const logoutController = async ( req, res ) => {
    try{
        // Validate Refresh Token Param Coming From Body and Return Error If It Doesn't Exists
        const { refreshToken } = req.body;
        if( !refreshToken ){
            return res.status( 400 )
                      .json({
                            error: true,
                            message: error.details[ 0 ].message
                       });
        }

        // Check If User Has Any Token, If Does Not, Return Success Message Anyway.
        const userToken = await UserToken.findOne({ token: refreshToken });
        if( !userToken ){
            return res.status( 200 )
                      .json({
                            error: false,
                            message: "Logged Out Successfully"
                      });
        }

        // Delete Users Token
        await userToken.remove();

        // Return Success Message
        return res.status( 200 )
                  .json({
                        error: false,
                        message: "Logged Out Successfully"
                   });

    }catch( err ){

      // General Error Message
      console.log( "ERROR: signUpController - ", err );
      return res.status( 500 ).json({  error: true, message: "Internal Server Error" });

    }
}

export default logoutController;

