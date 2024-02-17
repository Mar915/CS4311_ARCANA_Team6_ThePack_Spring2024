
// creating a client 
const { MongoClient } = require("mongodb")
require("dotenv").config({path: "./config.env"})


// function to connect to the MongoDB database
async function connectDatabase() {

    // environment configuration from our config.env file
    const Db = process.env.ATLAS_URI
    const client = new MongoClient(Db)


    try {

        // awaiting to get connection
        await client.connect()

        // gets collections from our Database
        const collections = await client.db("ARCANA").collections()
        // prints out the collections names
        collections.forEach((collection) => console.log(collection.s.namespace.collection))

    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

// calling the function to connect
connectDatabase()