# About 
A simple Quiz web app about coding made with React - inspired by The Ultimate React Course by Jonas Schmedtmann.

# What I learned
- using useReducer in complex applications
- Creating fake API
- Trick : ```<progress max={numQuestion} value={index + Number(answer !== null)} ```
if the answer equals null then it will return false, then converted to a number to 0
if the answer is not null then it will return true, then converted to number 1
- Use of clean up function on useEffect.
- Never make component parents keep re-rendering, as it will affect performance


# Alert
This application uses a fake API, where JSON data is executed on the server side, and then in the application we need to fetch the data.

# Installation
1. Install JSON Server pada terminal: ```npm i json-server ```
2. Setting package.json to: ```
   "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "test": "react-scripts test",
       "eject": "react-scripts eject",
       "server": "json-server --watch data/questions.json --port 9000"
   }```
4. run the server with the command: ```bash npm run server ```
5. if successfully run it will appear like this:
   ![screencapture-localhost-9000-questions-2024-07-03-14_59_13](https://github.com/Yogihafidh/The-React-Quiz/assets/100673796/62d69b59-fcf6-454f-9276-cf81ea8b3e8d)
