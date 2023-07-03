# Wheres-My-Package

Where's My Package is a web application designed to help Arch Linux users search for software packages on both regular and AUR repositories. With its user-friendly interface, Where's My Package makes it easy for users to find the software they're looking for. The application seamlessly aggregates package data from both the Arch Linux package search API and the AUR package search API, providing comprehensive search results.

Tech stack: I am using React.js, HTML, CSS and Javascript on the front-end. For the back-end I am using Node.js with Express hosted on Heroku.

Live Demo: <a href='https://antinf.github.io/Wheres-My-Package/'>Press Here</a>

Local Installation Instructions: To run this project locally, first clone this repository. You must type ```npm install``` in both the server and client folders to install required dependencies. After dependencies install you can then run the command ```npm run start``` in both the client and server to run them locally. The client will run at localhost port 3000 and connect to the server at localhost port 5000 by default.

If you would like to use my server I have hosted on heroku you can modify the PackageSearch.js file in the components folder. Change the line ```const USE_LOCALHOST = true;``` to ```const USE_LOCALHOST = false;```

Screenshots: 
![desktop1](https://user-images.githubusercontent.com/87878255/232182016-96128802-063b-4ebf-95de-8b6326f4244b.png)
![desktop2](https://user-images.githubusercontent.com/87878255/232182027-0b684402-fae9-4ab0-9f48-239eb3350781.png)
![mobile1](https://user-images.githubusercontent.com/87878255/232182029-30d907b6-8254-46f2-8a15-f7cffe6930a1.png)
![mobile2](https://user-images.githubusercontent.com/87878255/232182034-e8fd59e6-80d2-4c9d-acb4-b1bc94d52284.png)
![tablet1](https://user-images.githubusercontent.com/87878255/232182035-164fa542-700f-44a5-9831-e6fedd010d32.png)
