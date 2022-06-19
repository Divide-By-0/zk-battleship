# ZK Battleship on Ethereum
Zero Knowledge Battleship. Based off paper: https://courses.csail.mit.edu/6.857/2020/projects/13-Gupta-Kaashoek-Wang-Zhao.pdf
Course project, not production ready.

## Battleship.sol Contract
Some progress made on the contract. More TODOs in the comments. See battleshiptest.js for which parts I've tested. 
Note that the contract is not fully integrated with the circuit and is not verified or tested yet to be correct.

## Details

built using truffle. and drizzle in theory (install doesnt work with NPM).

anyways there's a helloworld contract that's deployable (onto ganache) and testable. it's compiled into battleship/src/contracts. the idea behind drizzle is that you can listen to the state of a smart contract using drizzlestore and then just propagate that state through your react components. there's some extra framework code that you need to add to be able to do this, so i've edited battleship/src/app.js and battleship/src/index.js. 

https://www.trufflesuite.com/tutorials/getting-started-with-drizzle-and-react

## Todo:
- integrate everything?
- incorporate battleship logic into zk circuit: given opponent's selected target choice, prove your response is valid. 
  - Isn't there a thing in battleship where you have to notify the opponent when your ship is sunk? That might be a pain
- solidity contract that matchmakes each candidate player with another random candidate player, and stores all of the hashed static boards w/piece placements (or just 1 game total? idk, but mining latency scales linearly with # of games). 
  - it additionally maintains a public(?) state of each game board tracking the hits & misses at each location (also whether something is sunk i guess)
  - within each game, it inputs a players proof, verifies it, and updates the hits/misses of each game board
  - declares victory when all pieces have been hit
- frontend that tracks a player and opponent's game board's hits/misses (stored in the contract) and updates states accordingly
  - displays message after hit/miss and also after victory
