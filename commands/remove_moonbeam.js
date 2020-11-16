const { exec } = require('child_process');

const start = async (version) => {
   // Remove Docker Image
   exec(`docker rmi purestake/moonbase:${version}`, (error, stdout, stderr) => {
      if (error) {
         if (error.message.includes('permission denied')) {
            console.log(`Connect: permission denied. Permission issues, try again with sudo`);
         } else if (error.message.includes('No such image: purestake/moonbase')) {
            console.log(`Error: No purestake/moonbase Docker image found.`);
         } else {
            console.log(`Error: ${error.message}`);
         }
         return;
      }
      if (stderr) {
         console.log(`Error: ${stderr}`);
         return;
      }
      console.log(`${stdout} \n`);
   });
};

module.exports = start;
