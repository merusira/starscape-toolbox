// patch-manager.js
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

class PatchManager extends EventEmitter {
    constructor(rootDir) {
        super();
        this.rootDir = rootDir;
        this.currentPatch = '100.02 Starscape';
        this.moduleCache = new Map(); // Cache for loaded modules
    }

    // Get the appropriate folder path - always use default folders
    getPath(folderType) {
        // Always use default folders regardless of patch
        return path.join(this.rootDir, folderType);
    }

    getModuleListUrl() {
        return 'https://raw.githubusercontent.com/merusira/moduleLists/master/moduleList-10002.json';
    }

    // Clean up resources - simplified since we only use default folders
    cleanupPatchResources() {
        // Clean up require cache for modules
        Object.keys(require.cache).forEach(modulePath => {
            if (modulePath.includes(this.rootDir)) {
                delete require.cache[modulePath];
            }
        });
        
        // Run garbage collection if available
        if (global.gc) {
            global.gc();
        } else {
            console.warn('Garbage collection not available. Run with --expose-gc flag for better memory management.');
        }
    }

    // Patch switching is no longer needed, but keep a simplified version for compatibility
    async switchPatch(newPatch, proxy) {
        // Always use Starscape patch
        this.currentPatch = '100.02 Starscape';
        
        // Emit event for compatibility
        this.emit('patchChanging', this.currentPatch, this.currentPatch);
        
        if (proxy) {
            // Update paths
            proxy.dataFolder = this.getPath('data');
            proxy.modFolder = this.getPath('mods');
        }
        
        // Emit event for compatibility
        this.emit('patchChanged', this.currentPatch, this.currentPatch);
    }
}

module.exports = PatchManager;