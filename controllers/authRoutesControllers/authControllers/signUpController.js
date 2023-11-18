// Import Models
import User from "../../../models/User.js";

// Import Dependencies
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

//  *                *         .                      *            .   *           .    *
//                                *                  *  .                .
//  *                *        .       *                ☾         *.             *.     .  *.   .
//      *           .       *                *                 .               *.        *   .
//     . signUpController   *       .         * .                  .  *       ø      .

// This controller is inserting user data to DB, it doesn't generates any JWT Token so you have to
// Send a second request to login controller if you get succes from this one. You might want to keep
// Users password and userName on your Front-End so you won't need to get those data from user again.
// Note that; on success, even you won't need, controller will return userId as well.


// No Header Param
// // Body -> { userName: ${ String }, password: ${ String } }

const signUpController = async ( req, res ) => {
    try{
      // Validate Body Parameters and Return Error If There Is Mıssing Param
      if( !req.body.userName || !req.body.password ){  
            return res.status( 400 ).json({ error: true, message: "Missing Params" }); 
      }

      // Check If There Is Any User With Same User Name
      const user = await User.findOne({ userName: req.body.userName, });

      //  Return Error If There Is Any User With Same User Name
      if( user ){ 
            return res.status( 400 ).json({ error: true, message: "User Allready Exists" }); 
      }
  
      // Encrypt Users Password
      const salt = await bcrypt.genSalt( Number( process.env.SALT ) );
      const hashPassword = await bcrypt.hash( req.body.password, salt );
  
      // Create User
      await new User({ userName: req.body.userName, password: hashPassword })
       .save() // Handle account verification.
       .then(
        ( result ) => { 
            // Return Success Message and User Id
            return res.status( 200 )
                      .json({
                        error: false,
                        message: "User Created Succesfully",
                        userId: result._id.toString()
                      });
        }
       );

    }catch( err ){

      // General Error Message
      console.log( "ERROR: signUpController - ", err );
      return res.status( 500 ).json({  error: true, message: "Internal Server Error" });

    }
}

export default signUpController;

