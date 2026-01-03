import { MongoMemoryServer } from 'mongodb-memory-server';


let mongoServerInstance: MongoMemoryServer | null = null;
let initializationPromise: Promise<MongoMemoryServer> | null = null;
 
 export const getMongoServer = async (): Promise<MongoMemoryServer> => {
  if (initializationPromise) {
    return initializationPromise;
  }

   if (!mongoServerInstance) {
   mongoServerInstance = await MongoMemoryServer.create();
    initializationPromise = MongoMemoryServer.create();
    try {
      mongoServerInstance = await initializationPromise;
    } finally {
      initializationPromise = null;
    }
   }
   return mongoServerInstance;
 };

