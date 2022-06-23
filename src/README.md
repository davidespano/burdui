# burdUI

A low quality JavaScript User Interface Toolkit rendering on HTML5 
Canvas. The objective of the library is not supporting real-world 
projects, but only showing the main UI architecture design 
principles in a HCI course at the University of Cagliari.

## Installation

Clone or download the repository and run 

    npm install
    
## Build

The library compiles into a single JavaScript file, which is 
unfortunately not minimised (remember, it's low quality).

For building the library on Linux or MacOS please use

    npm run-script build
    
On Windows please use

    npm run-script build-win
    
The output is available in `build/burdui.js` 

## Running the examples

There are (and there will be more in the future) a few usage 
examples in the `examples` folder. For running them, just run 

    npm start
    
The script builds the library and launches an http-server node 
the `examples` folder. You can try the different examples 
concatenating the name of the HTML file to the base localhost URL.
For instance

    http://127.0.0.1:8080/procedural1.html
    

