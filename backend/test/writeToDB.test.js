const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

describe('Basic DB fetching using mongoose', () => {
  let mongod = null;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    // The Server can be stopped again with
    await mongod.stop();
  });
  test('fetch users from database', (done) => {
    done(null, true);
  });
});
