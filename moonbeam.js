const axios = require('axios');
const install = require('./commands/install_moonbeam');
const start = require('./commands/start_node');
const stop = require('./commands/stop_node');
const pause = require('./commands/pause_node');
const unpause = require('./commands/unpause_node');
const status = require('./commands/status_node');
const remove = require('./commands/remove_moonbeam');

const getReleaseVersion = async () => {
  try {
    const { data } = await axios.get('https://api.github.com/repos/purestake/moonbeam/releases/latest');
    return data.tag_name;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

module.exports = async (config) => {
  if (config.help) {
    console.log(`Usage: truffle run moonbeam [command]`);
    console.log(`Commands: install, start <start-options>, stop, pause, unpause, status, remove`);
    console.log(`Start options: --rpc-port <custom-port>, --ws-port <custom-port>`);
    console.log(`For example: truffle run moonbeam start --rpc-port 8545`);
    return;
  }

  if (config._.length < 2) {
    console.log('No command provided. Run truffle run moonbeam --help to see the full list.');
    return;
  }

  const version = await getReleaseVersion();

  switch (config._[1]) {
    case 'install':
      install(version);
      break;
    case 'start':
      start(version, config['rpc-port'], config['ws-port']);
      break;
    case 'stop':
      stop(version);
      break;
    case 'pause':
      pause(version);
      break;
    case 'unpause':
      unpause(version);
      break;
    case 'status':
      status(version);
      break;
    case 'remove':
      remove(version);
      break;
    default:
      console.log('Command not found. Run truffle run moonbeam --help to see the full list.');
  }
};
