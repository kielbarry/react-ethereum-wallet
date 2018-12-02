<h1> Ethereum Browser Wallet </h1>

<h2> A React / Redux version of the original Meteor browser wallet.</h2>

<h3>Goals</h3>

There are several goals for this project. All of them have simplicity in mind:
To provide modernized and straightfoward access to interacting with Ethereum for _not quite grandma_, but maybe _mom_.
To provide a welcoming environment for newer developers, whether that means little professional experience,
only React experience, no Ethereum experience, or whatever 'new' means to you, the potential contributor. This means both welcoming with open arms any level of contribution, as well as providing an introductory 'how-to' by example when beginning to work with Web3 technologies. This is no way, shape, or form, meant to exclude developers (or any groups) who don't identify as 'new' - I encourage those 'not-new' to kick ass every way you want to. A priority for me with this project is that I have accessible and fixable challenges at the ready.
To provide an easy GUI for smart contract developers to sanity-check code on test net before implementing test coverage.

<h3>Getting Started</h3>

The project is currently only configured for my developer experience, which is by using a local light geth node. Planned support is for Geth, Parity, Metamask, Infura, and Ganache, as well as all operational test networks.

To run on localhost

```
geth --ws --wsport {YOUR_PORT} --wsorigins "_" --rpc --rpcport {YOUR_PORT} --rpccorsdomain "_" --syncmode "light"
--unlock {AN_ACCOUNT_OF_YOURS} --rinkeby

git clone https://github.com/kielbarry/react-ethereum-wallet {YOUR_DESIRED_PATH}
cd {YOUR_DESIRED_PATH}

npm install --save
npm start
```

NOTE:
This repo will increasingly rely on the ethereum-react-components, which can be found here: https://github.com/PhilippLgh/ethereum-react-components

The above library is under very active development, and so if you contribute to this repo, be sure to follow the steps in the read me for ethereum-react-components to set-up a local sym linked version of the repo.

<h3>Contributions</h3>

... are welcome. As noted, they are a large part of one goal of this project - to provide an arena for anyone at any skill level to contribute. Contributions also provide wonderful feedback for myself in many ways just in being able to observe how others think.

Contributers will be acknowledged in a contributors file to honor in perpetuity everyone in support of the project's goals :).

<h3>Contribution Guidelines</h3>

While this is a small project with simplicity in mind, some non-stringent, and some fun, guidelines are as follows:

Pull request or issue titles are allowed to be vague - however, the level of detail affects the level of attention it may receive.
Pull request or issue descriptions require a thorough and accurate description of the intended functionality of the code.
Include tests. While I am light on tests at the moment and cannot be judgemental, tests you do not include, are tests that I don't know succeed, and are tests I have to write in the future for code I didn't write, and that may mean it's code I don't merge.
Pictures: whether they be of cats, memes, XKCD snippets, or other media intended to spread humour or joy are encouraged to be included with Pull Requests, issues, or any other form of human communication related to this github project or not.
There is no contribution too small or too large.
Did you find a typo? Do you want to document a function? Awesome. <em>Accepted</em>.
Did you write better code than what's in the project? Awesome. <em>Accepted</em>.
Did you create a great new feature? Awesome. <em>Accepted</em>. And, we probably want to EIP it with the input of a few other projects :)
