const KeyValueCacheClient = require('./KeyValueCacheClient');

// Instantiate client SDK
const client = new KeyValueCacheClient('http://localhost:7171');

// Test PUT operation
async function testPut() {
    const response = await client.put('key1', 'value1');
    console.log('PUT Response:', response);
}

// Test GET operation
async function testGet() {
    const response = await client.get('key1');
    console.log('GET Response:', response);
}

// Run tests
async function runTests() {
    await testPut();    // Test inserting/updating a key-value pair
    await testGet();    // Test retrieving the value of the key
}

runTests();
