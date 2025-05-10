const path = require('path');
const fs = require('fs');
const ConfigFilePath = path.join(__dirname, '..', 'config.json');

function loadConfig() {
    let result = null;
    try {
        result = fs.readFileSync(ConfigFilePath, 'utf8');
    } catch (_) {
        return {
            branch: 'master',
            uilanguage: 'en',
            updatelog: false,
            devmode: false,
            noselfupdate: true,
            noupdate: false,
            noslstags: false,
            noserverautojoin: false,
            patchVersion: '100.02 Starscape'  // Always use Starscape
        };
    }

    return JSON.parse(result);
}

function saveConfig(newConfig) {
    fs.writeFileSync(ConfigFilePath, JSON.stringify(newConfig, null, 4));
}

module.exports = { loadConfig, saveConfig };
