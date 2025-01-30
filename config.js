const fs = require('fs');
require('dotenv').config();
const path = require('path');

// Default config
const defaultConfig = {
    // Your wallet's private key (keep this secure!)
    PRIVATE_KEY: process.env.PRIVATE_KEY,
};

function loadPersistedConfig() {
  try {
    const filePath = path.join(__dirname, 'trader-config.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error loading user config:', error);
    return {};
  }
}

// Merge default config + any persisted overrides
const config = loadPersistedConfig();
// const config = { 
//   ...defaultConfig,
//   ...persistedConfig
// };


// Function to update and optionally save to file
function updateConfig(newConfig) {
  // newConfig.PRIVATE_KEY = config.PRIVATE_KEY
  Object.assign(config, newConfig);
  saveConfig();
  console.log('✅ Config updated:', config);
}

function saveConfig() {
  try {
    const filePath = path.join(__dirname, 'trader-config.json');
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving user config:', error);
  }
}

module.exports = { config, defaultConfig, updateConfig };
