# TechTalk

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
    