import { Server, server} from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;



const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://management:blVd1Rlz3YzKhsi4@cluster0.fw34o.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connect to DB!!")

        server = app.listen( 5000, () => {
            console.log("server is listening to port 500")
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()

// process.on("SIGTERM", () => {
//     console.log("SIGTERM signal received.... Server shutting down..");
//     if(server) {
//         server.close(() => {
//             process.exit(1)
//         });
//     }
//     process.exit(1)
// })
// process.on("SIGINT", () => {
//     console.log("SIGINT signal received.... Server shutting down..");
//     if(server) {
//         server.close(() => {
//             process.exit(1)
//         });
//     }
//     process.exit(1)
// })

// process.on("unhandledRejection", (err) => {
//     console.log("Unhandled Rejection detected.... Server shutting down..", err);
//     if(server) {
//         server.close(() => {
//             process.exit(1)
//         });
//     }
//     process.exit(1)
// })
// process.on("uncaughtException", (err) => {
//     console.log("Uncaught Exception detected.... Server shutting down..", err);
//     if(server) {
//         server.close(() => {
//             process.exit(1)
//         });
//     }
//     process.exit(1)
// })

// Unhandled Rejection
// Promise.reject( new Error ("I forgot to catch this promise"))
// Uncaught Exception
// throw new Error (" I forgot to handle this local erro")