*Any instructions/notes in italics should be removed from the template before submitting* 

# Project 1
+ By: Lawrence Weru
+ Production URL: <http://project1.roflmao.me/>

## Outside resources

Arena backgrounds from: https://graphicriver.net/item/battle-backgrounds-pixel-art/23369613.

Reproduced under fair use for educational purposes. 

## Notes for instructor

### Original on-time submission:

https://github.com/LDubya/e28/commit/ef23903201424d29ec7e24febe25a23741ad8aec

A direct VueJs port of https://jsfiddle.net/zs0Lx4e9/

### Changes after submission: 

(this commit)

- Forgot this README file. 
- Although I have an in-game, real-time scoreboard and kept a record of past wins in the scoreboard, I did not include the multi-round score tally, nor the "clear scoreboard" button. 
- Added some new campaign strategies seen in the wild this past month.
- The pre-vue version was using a DOM manipulation to add a `hit` class to the `<body>` tag for that screen flash animation when a fight button was clicked. I kept that in this Vue port since I couldn't mount a Vue instance to `<body>`. But after submission I decided that this went against the Vue ethos of avoiding direct DOM manipulations. So I added some CSS to make the Vue-mounted `app` element full-screen and full-bleed like the `<body>` tag was, and then bound the `hit` class to the `app` element instead of the `<body>`.

These changes make this a substantial commit so I'll resubmit.