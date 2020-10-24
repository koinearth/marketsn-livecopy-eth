const fs = require('fs');
const envFile = fs.existsSync('./.env');

// checks if .env file exists
let currentEnvFromFile;
if (envFile) {
  currentEnvFromFile = require('./.env').environment;
}

const currentEnvFromEnvironment = process.env.NODE_ENV;

if (!currentEnvFromFile && !currentEnvFromEnvironment) {
  throw new Error(
      '.env file not found and NODE_ENV not set please set environment or create .env file at project root'
  );
}

const currentEnv = currentEnvFromEnvironment
  ? currentEnvFromEnvironment
  : currentEnvFromFile;

const config = require(`./config/config.${currentEnv}.json`);

if (!config) {
  throw new Error(
      'env based config file not found, please check .env file and create config.{environment_name}.json file with server config'
  );
}

module.exports = config;
