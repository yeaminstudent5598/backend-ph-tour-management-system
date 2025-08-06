/* eslint-disable no-console */
import { Server, server} from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seadSuperAdmin } from "./app/utils/seadSuperAdmin";

let server: Server;
 


const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log("connect to DB!!")

        server = app.listen( envVars.PORT, () => {
            console.log(`server is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

( async () => {
    await startServer()
    await seadSuperAdmin()
})()



process.on("SIGTERM", () => {
    console.log("SIGTERM signal received.... Server shutting down..");
    if(server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("SIGINT", () => {
    console.log("SIGINT signal received.... Server shutting down..");
    if(server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected.... Server shutting down..", err);
    if(server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected.... Server shutting down..", err);
    if(server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

// Unhandled Rejection
// Promise.reject( new Error ("I forgot to catch this promise"))
// Uncaught Exception
// throw new Error (" I forgot to handle this local erro")