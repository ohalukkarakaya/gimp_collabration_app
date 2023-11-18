// Import Router From Express
import { Router } from "express";

// Import Controllers
import getNewAccessTokenController from "../../controllers/authRoutesControllers/refreshtokenControllers/getNewAccessTokenController.js";
import logoutController from "../../controllers/authRoutesControllers/refreshtokenControllers/logoutController.js";

// Set Router
const router = Router();

//######################################################################################################


// ~/api/refreshToken
// |
// |___ Get New Access Token Route
    router.post( "/", getNewAccessTokenController );
// |
// |___ Log Out Route
    router.delete( "/", logoutController );


//######################################################################################################

// Export Router
export default router;

