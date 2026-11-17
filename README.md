# Project Name

Measuring Bamboo Project

# Project Description

A beautiful project that creates an app on Linux and Windows that shows the images and steps required to measure a piece bamboo by pacing out the length.

## Dedication

                   بسمالله الرحمان الرحيم

Keep up your dzikr.

## Tauri App

### Linux Version

This part of the project is a Tauri built app for Linux, built using Tauri on the laptop from the terminal. It has already succeeded in three previous Tauri bamboo projects.

### Windows Version Using GitHub Actions

This part of the project is a Tauri built app for Windows, built using GitHub Actions because I don't have either Windows or a virtual machine with Windows.

### Development Mode

For the linux build, use 'npm run tauri dev' in the command line to open a dev version.

### Webview Using Webkit

On Ubuntu, WebKit is already there in the OS. It is a webview. It provides views like a browser does, but without an internet connection. This webview engine is used by the app, like an html document uses a browser.

### Webview Issue in Dev Mode

🟥 In the previous project, I loaded the app with 'npm run tauri dev' and the Webkit viewer did not load the graphics. Upon inspection with the command line, the curl command showed that the port 1430, on the local server 127.0.0.1, actually had the right files and their types. So, with help from AI, I tried to trace the problem. Using the command 'npm run tauri dev -- --no-dev-server', the app window showed the layout fine.

### Debugging

Look at the Tauri docs. It has a debugging guide.The first two debugging options are perhaps above me at the moment.

1. First is to write debugging markers in the code itself. The docs say: "One of the most useful tools in your toolkit for debugging is the ability to add debugging statements in your code. However, you generally don’t want these to end up in production, which is where the ability to check whether you’re running in development mode or not comes in handy."

2. The second option is the Rust console. That is part of Rust, which is already installed on my laptop. 🟨 I should learn how to use the Rust cli, God willing.

3. The third debugging option mentioned is Webview Inspector. Right click the app window to open an inspector that WebKit supplies, if it is activated. That way you can inspect source, console, elements in view, etc.

4. Debugging The Core Process. This is beyond me for now. The Tauri guide to debugging says: The Core process is powered by Rust so you can use GDB or LLDB to debug it. You can follow the Debugging in VS Code guide to learn how to use the LLDB VS Code Extension to debug the Core Process of Tauri applications.

### Help

For help in building a Tauri app, look at the documentation: https://v2.tauri.app/develop/debug/linux-graphics/

## File Tree Structure

### root folder

The root folder is on my laptop.

It is file:///home/abdullah-reed/Bamboo%20Measuring%20Project/src/index.html.

### src folder

The project has an src folder. The src folder contains:

1.  an html file
2.  a css file
3.  a javascript file
4.  this README file

### src-tauri folder

The project contains standard files from Tauri in a src-tauri folder which were installed by running npm tauri dev on my own computer from the project folder.

1.  .gitignore
2.  tauri.conf.json
3.  package-lock.json
4.  package.json
5.  other files Tauri installed at dev run

### node-modules folder

This was installed by the Tauri dev installation as well.

It contains:

1.  .bin folder, which creates a binary file
2.  @tauri-apps folder, which has the cli files, and they just take from github, I think
3.  package-lock.json, which contains data for work with github, like the project name, I think

🟥 Check the projet name is right. The name could be either "Bamboo Measuring Project" or "bamboo-measuring-project".
