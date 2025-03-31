const axios = require('axios');

class KeyValueCacheClient {
    constructor(host) {
        this.host = host;
    }

    async put(key, value) {
        try {
            const response = await axios.post(`${this.host}/put`, { key, value });
            return response.data;
        } catch (error) {
            return { status: 'ERROR', message: error.message };
        }
    }

    async get(key) {
        try {
            const response = await axios.get(`${this.host}/get`, { params: { key } });
            return response.data;
        } catch (error) {
            return { status: 'ERROR', message: error.response?.data?.message || error.message };
        }
    }
}

module.exports = KeyValueCacheClient;
