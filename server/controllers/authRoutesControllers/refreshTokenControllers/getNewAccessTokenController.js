// Import Dependencies
import dotenv from "dotenv";

// ----------------------------------------------------------------------------------------------------|

// Import Helpers
import verifyRefreshToken from "../../../helpers/verifyRefreshToken.js";

// ----------------------------------------------------------------------------------------------------|

// Set ".env" Conf
dotenv.config();

//######################################################################################################

//  *                *         .                      *            .   *           .    *
//                                *                  *  .                .
//  *                *        .       *                ☾         *.             *.     .  *.   .
//      *           .       *                *                 .               *.        *   .
//     . getNewAccessTokenController   *       .         * .                  .  *       ø      

// This controller verifies refresh token and generates new access token. Each access token is expiring 
// In 5 min so you might need to send request to this route before every request.

// No Header Param.
// Body -> { refreshToken: ${ String } }

//######################################################################################################

const getNewAccessTokenController = async ( req, res ) => {
    try{
// |
// |
// |
// |___ Get Refresh Token From Body and Return Error If It Doesn't Exists
        const { refreshToken } = req.body;
        if ( !req.body.refreshToken ) {
            return res.status( 400 )
                      .json({ error: true, message: error.details[ 0 ].message });
        }
// ____________________________________________________________________________________________________|
// |
// |
// |___ Verify Refresh Token
        const tokenDetails = await verifyRefreshToken( refreshToken );
// ____________________________________________________________________________________________________|
// |
// |
// |___ Return Error
        if( tokenDetails.error ){
            return res.status( 400 )
                      .json(
                        {
                            error: true,
                            message: error.details[ 0 ].message
                        }
                      );
        }
// ____________________________________________________________________________________________________|
// |
// |
// |___ Prepare Payload For Token
        const payload = { _id: tokenDetails.tokenDetails._id };
        const accessToken = jwt.sign(
                                    payload, 
                                    env.ACCESS_TOKEN_PRIVATE_KEY, 
                                    { expiresIn: "5m" }
                                );
// ____________________________________________________________________________________________________|
// |
// |
// |___ Return New Access Token
        return res.status( 200 )
                  .json(
                    {
                        error: false,
                        message: "Access token created successfully",
                        accessToken,
                    }
                  );

// |____________________________________________________________________________________________________|

    }catch( err ){

      // General Error Message
      console.log( "ERROR: signUpController - ", err );
      return res.status( 500 ).json({  error: true, message: "Internal Server Error" });

    }
}

//######################################################################################################

export default getNewAccessTokenController;

