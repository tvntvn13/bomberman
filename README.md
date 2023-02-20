# Bombman-JS

## Welcome to our solution to 01 Edu's make-your-game project!

In this project, the background logic of the game is written in Javascript, on the front end we used HTML & CSS. No Javascript frameworks, nor the use of canvas was allowed.

The goal of the project was to recreate our own version of a classic game (chosen from a pre-approved list) using Javascript. We had to use requestAnimationFrame, use some kind of scoring system and some kind of level progression, keep the framerate between 50-60 frames-per-second, avoid excessive repaint and excessive use of layers.

In the game, you control the Bombman who can place bombs on empty fields to blow up enemies, soft walls, and by mistake, the player itself. The level is cleared when all the enemies are dead and the player reaches the goal field (hidden randomly behind one of the soft walls on the map). Every enemy killed grants a 100 point reward to the player, and there is a time bonus upon finishing the level (based on how much time is left on the timer). If the 200 second timer runs out or the player loses all 3 lives, it's game over.

The game has 10 levels with one more enemy every new level (13 in the end). The timer resets every level. After clearing level 10 you get bonus points for every remaining life.

Aside from using this verson on your own system locally, you can play the online version [here](https://bombman-js.herokuapp.com/).

### *Bomb behaviour:*

When a player places a bomb on the field, it will blow up after 3 seconds, blowing every enemy up in a maximum 3x3 radius (going only up-down-left-right). If the explosion reaches a soft wall, the wall blows up, but the range of the bomb stops there. If an explosion reaches another bomb, that bomb explodes immediately as well (creating a chain reaction).

### *Controls:*

- **Movement:** Arrow keys
- **Place bomb:** Space
- **Pause:** Escape

### *Authors:*

Taneli Mäkihannu (tvntvn) & Péter Vékony (petrus_ambrosius)

### *License:*

GNU General Public License v3