import { getDb } from '../migrations-utils/database.helpers';
import bcrypt from 'bcryptjs';

const USER_COLLECTION = 'users';

export const up = async () => {
    const db = await getDb();
    const collection = db.collection(USER_COLLECTION);

    const hashedPassword = await bcrypt.hash('password', 10);

    collection.insertOne({
        email: 'admin@example.com',
        password: hashedPassword,
        username: 'admin',
        roles: ['ADMIN'],
        status: 'ACTIVE',
    });
};

export const down = async () => {
    const db = await getDb();
    db.dropCollection(USER_COLLECTION);
};
