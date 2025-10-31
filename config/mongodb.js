import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    // Ensure we don't produce a double-slash in the connection string when
    // `MONGODB_URI` already ends with a trailing slash. Double slashes before
    // the database name cause an invalid namespace (leading '/').
    const rawUri = process.env.MONGODB_URI || ''
    const uri = rawUri.endsWith('/') ? rawUri.slice(0, -1) : rawUri
    const dbName = 'prescripto'
    const connectString = `${uri}/${dbName}`

    await mongoose.connect(connectString)

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.