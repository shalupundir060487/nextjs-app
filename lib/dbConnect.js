import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI =  'mongodb+srv://shalupundir70:U8y17MOANCL99ehR@cluster0.wscva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

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
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
