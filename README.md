# DevTalk

- Create a vite + React application
- Remove unecessary code and create a hello world app
- Install tailwind Css
- Install DaisyUi
- Add Navbar component to App.jsx
- Create a Navbar.jsx seperate file 
- Routing in our application (Use - react router Package),
- Outlet in React Routing
- Create footer
- Create a Login Page
- Install Axios npm package to use apies
- CORS - install cors in backend => add middleware to with configuration : orgin:http://localhost:5173 and credential: true,
- whenever you're making any api call so pass axios=> {withCredential:true}
- Install react redux + toolkit toolkit => create configueStore => Provider => CreateSlice => addreducer to store

- Add redux devtools in chrome
- login and see if your data is properly coming in the store
- Navbar should update as soon as User loggedIn
- Refactor our code to add constants files + create a component folder
- You should not able to access other routes without Login
- if token is not present redirect user to login page
- Logout
- Profile
- make UI as better you can
- Get the feed and add the feed into the store
- built the user card on feed
- Edit profile Feature
- Show Toast Message on saveof Profile
- New Page - See all my connections
- New Page - See all my Conncetion Requests
- send/Ignore the usercard and feed
- SignUp new User

# Remaining
- E2E testing



# INTERVIEW QUESTIONS
 
# why our APIs called twice ?
ans: Due to the strict mode in main.js..





BODY
    Navbar
    Route=/  => Feed
    Route=/login  => Login
    Route=/connections  => connections
    Route=/profile  => Profile
    






# Real time chat Using WEB-SOCKETS
- Build Ui for chat window on /chat/:target_id
- setup socket.io in backend 
- npm i socket.io 
- setting up frontend socket.io-client
- Initialize the chat
- create socket connection
- listen to events
- emits the events
- Improve the UI
- Fix security BUG FIX - Can i send the message to a person who is not my friend?? - Auth in web sockets
- BUG FIX - If i am not a friend, then i shouldn't be able to send message..
- Show green status of chat if the person is online - [last seen 1hr ago]
- Limit messages on API call (use pagination like feed api)
- 






# Deployment
    - signup on AWS
    - Launch instance
    - chomd 400<secreat>.pep
    - connet with ssh command (ssh -i "devTalk-secret.pem" ubuntu@ec2-56-228-26-50.eu-north-1.compute.amazonaws.com)
    - install node -v(18.19.1)

    - For Frontend
               - Git clone <repo http> from git code
               - npm install ---> install the dependencies
               - sudo apt update
               - sudo apt install nginx(engine X)
               - sudo systemctl start nginx
               - sudo systemctl enable nginx
               - copy file from dist folder(Files, ) to /var/www/html to nginx
               - scp -r dist/* /var/www/html/
               - sudo scp -r dist/* /var/www/html/
               - -r -> recursiveness

<!-- for backend -->
        Enable port 80 on your instance ?
        Go to instance -> then go to security -> security groups -> add inbounded -> put custom port(80) -> Then run the public address...
        - allowed ec2 instance public IP on mongodb server
        - npm install pm2 -g
        - pm2 start npm --name "devtalk-backend" --start
        - pm2 logs
        - pm2 list, pm2 flish <name>, pm2 stop <name>, pm2 delete <name>
        - config nginx - /etc/nginx/sites-available/default
        - restart nginx - sudo systemctl  restart nginx
        - modify the base_url in frontend project to /api

         location /api/ {
        proxy_pass http://localhost:9999/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }




