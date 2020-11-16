# Moonbeam Truffle Plugin

This is meant to be used with the Moonbeam Truffle box: https://github.com/PureStake/moonbeam-truffle-box.git

The plugin is used to get you started with a local standalone Moonbeam node quickly. You can check all available commands with the help flag:

```
./node_modules/.bin/truffle run moonbeam --help
```

The following commands are available:

## Install
In this context, installing means downloading the Docker image of the Moonbeam standalone node (requires Docker to be installed).

```
node_modules/.bin/truffle run moonbeam install
```

## Start
Start the standalone Moonbeam node.

```
node_modules/.bin/truffle run moonbeam start
```

## Stop
Stop the standalone Moonbeam node. This will remove the container, thus purging the chain.

```
node_modules/.bin/truffle run moonbeam stop
```

## Pause
Pause the standalone Moonbeam node.

```
node_modules/.bin/truffle run moonbeam pause
```

## Unpause
Unpause the standalone Moonbeam node.

```
node_modules/.bin/truffle run moonbeam unpause
```

## Status
Shows the status of the standalone Moonbeam node.

```
node_modules/.bin/truffle run moonbeam status
```

## Remove
Removes the Docker image of the Moonbeam standalone node.

```
node_modules/.bin/truffle run moonbeam remove
```

# Contact Us
We welcome any feedback, so feel free to reach out through our official [Discord Channel](https://discord.gg/PfpUATX).