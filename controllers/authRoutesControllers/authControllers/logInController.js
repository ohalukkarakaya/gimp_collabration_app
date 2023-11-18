// Import Models
import User from "../../../models/User.js";
import UserToken from "../../../models/UserToken.js";

// Import Dependencies
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Import Helpers
import generateTokens from "../../../helpers/generateToken.js";

// Prepare Env Conf
dotenv.config();

//  *                *         .                      *            .   *           .    *
//                                *                  *  .                .
//  *                *        .       *                ☾         *.             *.     .  *.   .
//      *           .       *                *                 .               *.        *   .
//     . logInController   *       .         * .                  .  *       ø      .

// This controller is validating user data and returns access and refresh token if username and password
// Is correct. Access token expires at 5min, so you might need to get new access token for each of your
// Requests. You have to send refresh token as body param while log out and geting new access token. So
// you have to keep refresh token on your Front-End permanantly. Refresh tokens expires at 30 days. You can
// Delete refresh token when you get error while try to get new access token.

// No Header Param
// // Body -> { userName: ${ String }, password: ${ String } }

const logInController = async ( req, res ) => {
    try{
        // Validate Body Params and Return Error If There Is Missing Param
        if(
            !req.body.userName
            || !req.body.password
        ){
            return res.status( 400 ).json({ error: true, message: "Missing Param" });
        }

        // Find User From DB With UserName Data
        const user = await User.findOne({ userName: req.body.userName });

        // Return if user doesn't exist
        if( !user ){
          return res.status( 401 ).json({ error: true, message: "Invalid email or password" });
        }
        
        // Check If There Is Any Recorded JWT Token Remain From Past and Remove If So.
        const userToken = await UserToken.findOne({ userId: user._id.toString() });
        if( userToken ){
          await userToken.remove();
        }
  
        // Compare Received Password With Recorded One
        const verifiedPassword = await bcrypt.compare( req.body.password, user.password );
  
        // Return Error If Users Password Is Not Same With Recorded One
        if( !verifiedPassword ){
            return res.status( 401 ).json({ error: true,  message: "Invalid User Name Or Password" });
        }

        // Generate Tokens
        const { accessToken, refreshToken } = await generateTokens( user );
        
        // Return Success Message And Token Data
        return res.status( 200 ).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged In Successfully"
        });

    }catch( err ){

      // General Error Message
      console.log( "ERROR: logInController - ", err );
      return res.status( 500 ).json({  error: true, message: "Internal Server Error" });

    }
}

export default logInController;

