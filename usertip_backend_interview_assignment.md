## Make an API for a Player vs Player (PvP) Game.

## Description
Shark Game Studios want to make a multiplayer Player vs Player (PvP) game, where users are **Sharks**, where they can train themselves and do battle to compete with other Sharks to be in the top leaderboards. The PvP system has a simple Rock, Paper, Scissors logic where Rock=Strength Paper=Intelligence and Scissors=Speed. We need your help to create an API based on the requirements listed below:

## GAME REQUIREMENTS
1. Login
   - a **User** is required to login with a username and password (DONE)
2. Sign up: When a **User** registers, they need to sign up with the following **User** record properties: (DONE)
   - **username** (must be unique in the database)
   - **password**
   - **user_id** (must be randomly generated and unique)
   - **date_time_created** (date and time where user was registered)
   - **color** (color of their Shark in hex format)
3. Every **Shark** record will have these game properties: Upon registration each user is assigned a shark with the following data: (DONE)
   - **user_id** (must be linked to the registered user)
   - **intelligence** (each new registered Shark starts with 5 points). **Intelligence always defeats Strength**
   - **strength** (each new registered Shark starts with 5 points)      **Strength always defeats Speed**
   - **speed** (each new registered Shark starts with 5 points)         **Speed always defeats Intelligence**
   - **stamina** (each new registered Shark starts with 10 points)       **Stamina is used to train and make your Shark stronger. LIMIT TO 10 POINTS**
   - **color** (color of the Shark that the user chose in **(3)** in hex format)
   **IMPORTANT** Each user can only be on Shark, and each Shark can only be assigned to one user
4. Training API:
   - Every Shark can do **training** and consume **1 point of Stamina** to increase another stat (either intelligence, strength or speed) by 1 point
   - If the stamina reaches 0 points, the Shark cannot do any more training
   - Every **1 min**, a Shark regenerates **1 point of Stamina**, if the Shark has regenerated 10 points of Stamina, they will not gain anymore Stamina points (DONE, kinda)
5. Shark PvP API, how to start a PvP battle with an API call:
   - A route will need to be created where we will use 2 existing user_ids, and they will do battle with one another with their Sharks
   - Example: 
    Route: /pvp
    Request: POST
    body: {
      player_1: "abc_123",
      player_2: "456_xyz"
    }
   - Upon sending this request, we will retrieve the **Shark** from the DB that both players have created and pit them against each other, the rules of combat are listed below in **(7)**
   - The API request will also need to return the winner in the BODY RESPONSE, example:
   RESPONSE body : {
     winner: "abc_123",
   }
6. Shark PvP rules
   - Every **Battle** with have **3 rounds**
   - Each **Battle** record needs to have the following properties:
      - **battle_id** (must be unique amongst other Battle records)
      - **player_1_id** (must be an existing user_id in the database, cannot be the same as **player_2_id**)
      - **player_2_id** (must be an existing user_id in the database, cannot be the same as **player_1_id**)
      - **winner**      (the winner is determined after the rounds must be an existing user_id)
      - **rounds** -> A list of round records (see below for more information), must contain 3 records in the list
   - In each **Round** a stat (intelligence, strength, speed) will be **selected randomly** from each Shark
   - The rules following the selected stats are then compared against each other as such:
      - If Player 1 Randomly selected stat: **Intelligence** vs Player 2 Randomly selected stat:**Strength**, in this scenario Player 1 wins this round no matter how high Player 2's strength stat is as **Intelligence defeats Strength**
      - If Player 1 Randomly selected stat: **Intelligence** vs Player 2 Randomly selected stat:**Intelligence**, in this scenario if both the selected stats are the same type, the player with the higher **Intelligence** stat will win this round
      - If Player 1 Randomly selected stat: **Intelligence** vs Player 2 Randomly selected stat:**Intelligence**, in this scenario if both the selected stats are the same type BUT the values of the stats are the same (e.g. 5 intelligence vs 5 intelligence), it will be a 50/50 chance for one of the players to win, and the other will lose
      
   - Each **Round** record needs to be stored and recorded with the following properties:
      - **player_1_random_stat**  (the randomly selected stat from Player 1's **Shark** record)
      - **player_1_stat_value**   (the value of the randomly selected stat from Player 1's **Shark** record)
      - **player_2_random_stat**  (the randomly selected stat from Player 2's **Shark** record)
      - **player_2_stat_value**   (the value of the randomly selected stat from Player 2's **Shark** record)
      - **winner**                (the user_id of the winner)
      - **battle_id**             (the battle_id that the rounds belong to)

   - Once the battle has concluded and a winner is decided, make sure to return the winner of this battle through the RESPONSE body as stated in **(5)**
 (DONE)
7. Leaderboards API: (DONE)
   - Finally we want a way to GET the list of the **Top 5 Sharks** in our game
   - We rank them by the number of times that they have won their **Battles**
   - When we retrieve the list of the top 5 **Sharks** in our game, we need them to be sorted from the highest number of **Battles** won to the lowest
8. Other APIs that we will need:
   - We need a way to GET a **Shark** by user_id
   - We need a way to DELETE a **User** record, by user_id. If a user is deleted, their **Shark** record also gets deleted. This allows us to BAN cheaters
   - We need a way to GET the entire list of **Battle** records by user_id

9. **The entire app must be build with these systems implemented in mind:**

    **- The whole app is built using Node.js.**
    **- You are allowed to use any NoSQL or SQL database that you are comfortable with.**
    **- You are also allowed to use any third party library for this project to help you as well.**

10. **You have 72 hours after this brief is sent to complete this task.**

11. Submit your code via email at **shafiq@usertip.com**. You can either zip/rar your code excluding the _node-modules_ or you can send a Github link to your project.

12. **Bonus points awarded if you figured out end-to-end encryption for your APIs!**

13. **Make any assumption that is not mentioned in this brief. Be sure to mention any assumption made in your README.md**

14. **Document the installation process, how to use your code, and your overall thought process inside README.md (if you decided to submit this via github), or send the file alongside the zip/rar/**

15. **Submit your project BEFORE THE DEADLINE, whether it's finished or not.**

## Good luck!
