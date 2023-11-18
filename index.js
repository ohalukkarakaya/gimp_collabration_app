// ____________________________________________________________________________________________________
// |                                                                                                  |                            
// |                                                                                                  |                            
// |                                                                                  -::.            |                            
// |                                                                              ..-*.               |                            
// |                                                                    .=  .:...  :* .=              |                            
// |                                                                  .+#::.     .:-::=               |                            
// |                                                      .=     ::::=#.     .: :.=#--..              |                            
// |                    :                       .:       -*:::::.   :=. : :-.:%-  #     ::::          |                            
// |                  :+.     -             .===::*-..:=%=:  .::. . -::+*:*:                ::.       |                           
// |                :*:     ::           .--:    #@:.:-+=  :*--%:.  +-  :                     .=      |                           
// |              .+=    ::.            +=.    :#%. :.=- .:%-=+=                               :-     |
// |            .+#-:--*+.            .+.    .+-+ :: :+..  :.                                 :-      |                            
// |        ..:=%-:::.    ..:.       :=     == +=:   ..                                   ...:        |                            
// |        :=+:.            :: :.  :#    --                                         .....            |                            
// |       .+-                =     .=-:::                                   .......                  |                            
// |      =-                 .+                      .-==---.      .........                          |                            
// |    -=            :    .=+                      .#=:::........                                    |                            
// |                  :::--:                                                                          |                            
// |                                                                                                  |                            
// |                                                                                                  |
// |__ Öğün, Çalış, Güven! ___________________________________________________________________________|

// Import Dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import http from 'http';

// Import Routes
import authRoutes from './routes/auth/auth.js';
import refreshTokenRoutes from './routes/auth/refreshToken.js';

// Conf
const app = express();
dotenv.config();

//######################################################################################################

// DB Connection
const connect = () => {
    mongoose.set("strictQuery", false);
    
    mongoose.connect(process.env.DB).then(() => { console.log("MongoDB Status: Connected");})
            .catch( (err) => { throw err; } );
}

//######################################################################################################

// Build Server
app.use(express.static('src'));
app.use( express.json() );

//######################################################################################################

// Init Routes
app.use("/auth", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);

//######################################################################################################

// Prepare Error Message
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status( status ).json({
      success: false,
      status: status,
      message: message,
    })
});

//######################################################################################################

// Listen Port
app.listen(8800, () => {
    connect();
    console.log("Server Status: Connected");
});