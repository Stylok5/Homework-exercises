![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
​
#### DIGITAL CLOCK
​
The first watch face is a simple clock:
​
1. Add the current time to the watch face when the page is loaded (in the format `HH:MM:SS`)
2. Make the clock tick every second.
​
#### STOPWATCH TIMER
​
The watch face is a timer with start(black) and reset(red) buttons

​
1. Make the timer start when you click the black start button, counting down from 10 to 0.
1. When the timer reaches 0, add the class of `ringing` to the timer to make it shake
1. Reset the timer when you click the red reset button, removing the class of "ringing" and setting the display back to 10
1. Bonus - See if you can get the countdown to pause and resume if the start button is clicked again whilst the timer is already running
