# D&D Crafter

### Pitch

Application to help create and trade items in Dungeon & Dragons games. Players will use natural resources such as gold and silver to trade basic tools, craft weapons, synthesize potions, etc.

### Details

The goal of the project is for me to learn how to build on blockchain and native.

- Game -> Private ledger network (honestly not sure how that works, could also be thati make 1 single network for all games?)
- Players -> Nodes (again, still not sure how this works)
- Gold -> Crypto currency
- Tools, weapons, potions, etc. -> NFTs

I will use React Native to build a wallet with authentication via GitHub, Google or similar. Players will be able to create a game/network, add other players. They will also receive some initial gold to spend on a catalogue of some readily available tools. After they have tools they can exchange them or use them to create new items. The specific crafting rules will be few and simple, but based on official D&D game rules. Item creation should be somewhat randomized so that each item has unique properties: durability, strength, quality, etc.

### Deliverables

- Native app launched via iOS simulator or via Expo app
- Private ledger network running locally for development and testing
- Checked in to Github as open source project

### Nice to Have

- Multi-platform React Native app that works on iOS, Android and Web
- Deploy ledger on the cloud and have a downloadable app
- Ability to run the entire solution with a single command for better DX
- Documentation

### To think about

- What open source solutions are available to implement the solution, or part of it
- Is it possible to have a small network of blockchain nodes that are not always available and still have trusted, non-hackable tokens?
- Environmental impact - evaluate impact of having constantly running nodes VS regular database solution
- Private vs public ledger like etherium or Flow
- Cost of service - how much does it cost to keep the network up and running

### Stretch Goals

- Integrate with existing wallets so customers can save their items with their current apps and not worry about having to save new wallet passwords
- Ability to exchange rare items with players from other games (private networks)
- “Collaborative crafting” to improve in-game user interaction and experience
- “Master Dashboard” to allow Game Masters to generate their own content for the game
