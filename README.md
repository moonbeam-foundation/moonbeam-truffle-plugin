# Moonbeam Truffle Plugin

This is meant to be used with the Moonbeam Truffle box: https://github.com/PureStake/moonbeam-truffle-box.git

The plugin is used to get you started with a local development Moonbeam node quickly. You can check all available commands with the help flag:

```
./node_modules/.bin/truffle run moonbeam --help
```

The following commands are available:

## Install
In this context, installing means downloading the Docker image of the Moonbeam development node (requires Docker to be installed).

```
node_modules/.bin/truffle run moonbeam install
```

## Start
Start the development Moonbeam node.

```
node_modules/.bin/truffle run moonbeam start
```

The start command comes with custom options:
- `--rpc-port`: For setting a custom HTTP port. Accepts a port number to the right of the command.
- `--ws-port`: For setting a custom WS port. Accepts a port number to the right of the command.

```
node_modules/.bin/truffle run moonbeam start --rpc-port 8545
```

## Stop
Stop the development Moonbeam node. This will remove the container, thus purging the chain.

```
node_modules/.bin/truffle run moonbeam stop
```

## Pause
Pause the development Moonbeam node.

```
node_modules/.bin/truffle run moonbeam pause
```

## Unpause
Unpause the development Moonbeam node.

```
node_modules/.bin/truffle run moonbeam unpause
```

## Status
Shows the status of the development Moonbeam node.

```
node_modules/.bin/truffle run moonbeam status
```

## Remove
Removes the Docker image of the Moonbeam development node.

```
node_modules/.bin/truffle run moonbeam remove
```

# Contact Us
We welcome any feedback, so feel free to reach out through our official [Discord Channel](https://discord.gg/PfpUATX).