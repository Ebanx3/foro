import mongoose from "mongoose";

const DB_CONNECTION_URL: string = process.env.DB_CONNECTION_URL || "";

if (!DB_CONNECTION_URL) {
  throw new Error(
    "Please define the DB_CONNECTION_URL environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: false,
      // useCreateIndex: true,
    };

    cached.promise = mongoose
      .connect(DB_CONNECTION_URL, opts)
      .then((mongoose) => {
        console.log("connected to db")
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
