# Wheres-My-Package

Where's My Package is a web application designed to help Arch Linux users search for software packages on both regular and AUR repositories. With its user-friendly interface, Where's My Package makes it easy for users to find the software they're looking for. The application seamlessly aggregates package data from both the Arch Linux package search API and the AUR package search API, providing comprehensive search results.

Tech stack: I am using React.js, HTML, CSS and Javascript on the front-end. For the back-end I am using Node.js with Express hosted on Heroku.

Live Demo: <a href='https://antinf.github.io/Wheres-My-Package/'>Press Here</a>

Local Installation Instructions: To run this project locally, first clone this repository. Then 'cd' into the cloned repository 'cd' into the client folder and run the command 'npm install' to install required dependencies. After dependencies install you can then run the command 'npm run start'. The client will run at localhost port 3000 by default and connect to my api hosted on Heroku. You can modify your client so you can run a locally hosted server by changing line 76 in PackageSearch.js in the client's components folder from "let response = await fetch(`https://wheresmypackage.herokuapp.com/api/search/${searchInput}`" to "let response = await fetch(`https://localhost:5000/api/search/${searchInput}`". Then open a second terminal window and 'cd' into the server directory of the cloned repository and type 'npm run install' to install required dependencies for the server. After the depencencies finish installing you can run the command 'npm run start'. Now your client should be running at localhost 3000 and will connect to the locally running server at localhost 5000.

Screenshots: 
![desktop1](https://user-images.githubusercontent.com/87878255/232182016-96128802-063b-4ebf-95de-8b6326f4244b.png)
![desktop2](https://user-images.githubusercontent.com/87878255/232182027-0b684402-fae9-4ab0-9f48-239eb3350781.png)
![mobile1](https://user-images.githubusercontent.com/87878255/232182029-30d907b6-8254-46f2-8a15-f7cffe6930a1.png)
![mobile2](https://user-images.githubusercontent.com/87878255/232182034-e8fd59e6-80d2-4c9d-acb4-b1bc94d52284.png)
![tablet1](https://user-images.githubusercontent.com/87878255/232182035-164fa542-700f-44a5-9831-e6fedd010d32.png)
