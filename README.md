# full-stack
This repository contains my coursework for the course _Anytime-course: Software Development Skills: Full-Stack 2023-24_.<br>
You can access the deployed app from this link: [Link to app](https://mean-auth-app.onrender.com). **NOTE!: It might take a while for the website to load due to the spindown of free version of Render** <br>
You can view a demo of the app running here: [Link to demo](https://youtu.be/PAb-R03cHqQ).

## How to run
To run the final project locally you need to do the following: <br>
- Backend
  - configure the .env file using the provided .env.example (you can just remove the .example from the file name)
  - run npm install -command
  - optionally you can run the npm run lint -command
  - go to the file controllers/users.js
    - if you are planning to run the frontend and backend separately change the token -key of the authenticate route as per the comment
  - if running separately
    - run the command: npm run start
  - if running only the backend
    - follow the steps of frontend before running npm run start
- Frontend
  - first run the command: npm install
  - optionally you can run both npm run lint and npm run test
  - if running separately
    - run command: npm run start
    - then you can use the app by going to the url the terminal provides
    - **NOTE!: the app assumes that the backend is running at port 3000**
  - if running only backend
    - run the command: npm run build
    - once finished, go to backend and run npm start -command.
    - you can then use the app by going to http://localhost:3000/
