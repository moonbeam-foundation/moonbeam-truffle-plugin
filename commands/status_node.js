const { exec } = require('child_process');

const status = async (version) => {
    // Status Node
    exec(`docker ps -q --filter ancestor="purestake/moonbase:${version}"`, (error, stdout, stderr) => {
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
            console.log(`Node has started - Endpoints: HTTP http://127.0.0.1:9933  WS ws://127.0.0.1:9944 - Container ID ${stdout.substr(0, 12)} \n`)
        }
    });
};

module.exports = status;
