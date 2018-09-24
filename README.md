This project is a rewrite of the Ethereum browser wallet (found at https://wallet.ethereum.org/) from Meteor into React/Redux.

Steps:

Start up a light client:
geth --rpc --ws --wsorigins {PORT} --light

Where port is where the app will be served (default "http://localhost:3000").

git clone the repo and
cd react-ethereum-wallet

npm install --save && npm start
