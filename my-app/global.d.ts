// global.d.ts
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// If this file is a module, it must import/export something to ensure TypeScript treats it as a module
export {};
