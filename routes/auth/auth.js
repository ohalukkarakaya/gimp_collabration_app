// Import Express
import express from "express";

// Import Controllers
import signUpController from "../../controllers/authRoutesControllers/authControllers/signUpController.js";
import logInController from "../../controllers/authRoutesControllers/authControllers/logInController.js";


// Set Env Parser
import dotenv from "dotenv";
dotenv.config();

// Set Router
const router = express.Router();

//######################################################################################################


// ~/auth
// |
// |___ Sign Up Route
    router.post( "/signUp", signUpController );
// |
// |___ Log In Route
    router.post( "/login", logInController );


//######################################################################################################

// Export Router
export default router;


