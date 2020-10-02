const { exec } = require('child_process');

const status = async () => {
    // Status Node
    exec('docker ps -q --filter ancestor="purestake/moonbase"', (error, stdout, stderr) => {
        if (error) {
            if (error.message.includes('permission denied')) {
                console.log(`Connect: permission denied. Permission issues, try again with sudo`);
            } else {
                console.log(`Error: ${error.message}`);
            }
            return;
        }
        if (stderr) {
            console.log(`Error: ${stderr}`);
            return;
        }

        if (stdout === '') {
            console.log(`Node is not running\n`)
        } else {
            console.log(`Node is running - RPC endpoint http://127.0.0.1:9933 - Container ID ${stdout.substr(0, 12)} \n`)
        }
    });
};

module.exports = status;
