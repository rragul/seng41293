import { MongoClient } from 'mongodb';

const MONGO_URL = "mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true";

export const getDb = async () => {
    const client: MongoClient = await MongoClient.connect(MONGO_URL);
    return client.db();
};