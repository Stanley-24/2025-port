import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServerInstance: MongoMemoryServer | null = null;

export const getMongoServer = async (): Promise<MongoMemoryServer> => {
  if (!mongoServerInstance) {
    mongoServerInstance = await MongoMemoryServer.create();
  }
  return mongoServerInstance;
};

export const stopMongoServer = async (): Promise<void> => {
  if (mongoServerInstance) {
    await mongoServerInstance.stop();
    mongoServerInstance = null;
  }
};