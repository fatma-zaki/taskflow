import mongoose from 'mongoose';

/**
 * Serverless functions are frozen and thawed between requests, so the connection is cached
 * on globalThis and reused instead of dialing MongoDB on every invocation.
 *
 * connectDB throws on failure rather than exiting, so each caller decides what to do:
 * server.js exits, the serverless handler returns 503.
 */
const globalForMongoose = globalThis;
const cache = globalForMongoose.__taskflowMongoose ?? { conn: null, promise: null };
globalForMongoose.__taskflowMongoose = cache;

const connectDB = async () => {
  if (cache.conn) return cache.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        // family: 4 forces IPv4; on some networks the IPv6 attempt stalls and connects take 20s+
        family: 4,
        serverSelectionTimeoutMS: 15000,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((error) => {
        cache.promise = null; // let the next request retry
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};

export default connectDB;
