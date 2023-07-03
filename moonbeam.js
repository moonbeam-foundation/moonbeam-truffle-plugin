const install = require('./commands/install_moonbeam');
const start = require('./commands/start_node');
const stop = require('./commands/stop_node');
const pause = require('./commands/pause_node');
const unpause = require('./commands/unpause_node');
const status = require('./commands/status_node');
const remove = require('./commands/remove_moonbeam');

module.exports = (config) => {
  if (config._[1] == 'help') {
    console.log(`Usage: truffle run moonbeam [command]`);
    console.log(`Commands: install, start <start-options>, stop, pause, unpause, status, remove`);
    console.log(`Start options: --ws-port <custom-port>`);
    console.log(`For example: truffle run moonbeam start --ws-port 8545`);
    return;
  }

  if (config._.length < 2) {
    console.log('No command provided. Run truffle run moonbeam help to see the full list.');
    return;
  }

  switch (config._[1]) {
    case 'install':
      install();
      break;
    case 'start':
      start(config['ws-port']);
      break;
    case 'stop':
      stop();
      break;
    case 'pause':
      pause();
      break;
    case 'unpause':
      unpause();
      break;
    case 'status':
      status();
      break;
    case 'remove':
      remove();
      break;
    default:
      console.log('Command not found. Run truffle run moonbeam help to see the full list.');
  }
};
