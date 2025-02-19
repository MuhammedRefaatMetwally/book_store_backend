const process = require('process');
const { app } = require("./app");//bad?!
const { connectToDatabase } = require('./shared/config/mongodb');


const PORT = process.env.PORT || 3000;

const startSever= async()=>{
   await connectToDatabase()
    app.listen(PORT, (error) => {
        if (!error) {
            console.log(`Server is Running on http://localhost:${PORT}/`);
        } else {
            console.log("Server can't start", error);
        }
    });
}


startSever()