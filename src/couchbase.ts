
import { Cluster } from 'couchbase';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.COUCHBASE_CONNECTION_STRING as string;
const username = process.env.COUCHBASE_USERNAME as string;
const password = process.env.COUCHBASE_PASSWORD as string;
const bucketName = process.env.COUCHBASE_BUCKET_NAME as string;

if (!connectionString || !username || !password || !bucketName) {
    throw new Error('Couchbase configuration is missing in .env file');
}

async function initializeCouchbase() {
    // console.log('Initializing Couchbase connection...');
    // console.log('Connection String:', connectionString);
    // console.log('Username:', username);
    // console.log('Bucket Name:', bucketName);

    const cluster = await Cluster.connect(connectionString, {
        username,
        password,
        configProfile: 'wanDevelopment',
    });

    // console.log('Couchbase cluster connected');

    const bucket = cluster.bucket(bucketName);
    const collection = bucket.scope('_default').collection('_default');

    //console.log('Couchbase bucket and collection initialized');

    return { cluster, bucket, collection };
}

const dbPromise = initializeCouchbase();

export default dbPromise;
