# Key-Value Cache Service

This is an in-memory key-value cache service implemented in Node.js with Redis.

## Features
- Supports `PUT` and `GET` operations.
- Limits key and value length to **256 characters**.
- Uses Redis for in-memory caching.
- Packaged as a **Docker container**.

## **Setup Instructions**

### **1. Install Dependencies**
Ensure you have **Docker** and **Node.js** installed.

### **2. Run with Docker**
Build and run the Docker container:

```sh
docker build -t key-value-cache .
docker run -p 7171:7171 key-value-cache
# Key-Value-Cache
