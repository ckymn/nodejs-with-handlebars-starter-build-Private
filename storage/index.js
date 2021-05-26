const { Storage } = require("@google-cloud/storage");
const path = require("path");

// creates a client 
const storage = new Storage({ keyFilename: `storage/key.json`, projectId: `blog-h-images`});

// storage.getBuckets().then(x => console.log("blog-h-images:", x));

const bucketName = `blog-h`;

// bir kova olustur verileri icerisine at.
async function create_bucket() {

	try {
		await storage.createBucket(bucketName);
	} catch (error) {
		console.error("storage_foult : ", error);
	}
};

let bucket = null;

// olusturulan kovadan veri cekme 
async function get_bucket() {
	if(bucket)	
		return bucket;
	await create_bucket();
	bucket = await storage.bucket(bucketName);
	return bucket;
};

module.exports = get_bucket;