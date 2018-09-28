Start up a light client:
geth --rpc --ws --wsorigins {"window.location"} --light

Where window.location is where the app will be served (default "http://localhost:3000").

git clone the repo and
cd react-ethereum-wallet

npm install --save && npm start
