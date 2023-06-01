const Redis = require("ioredis");
const { defineDatabase } = require("./database.js");
const express = require("express");

const redis = new Redis({
  port: 6379,
  host: "localhost",
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});

const app = express();

defineDatabase(redis, app, express)