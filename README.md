# Wheres-My-Package

Where's My Package is a package search engine for the Arch Linux distribution. This tool aims to simplify software discovery by enabling users to search for packages across both official and community (AUR) repositories in a unified search interface.

<h3>Live Demo: <a href='https://antinf.github.io/Wheres-My-Package/'>Press Here</a></h3>
<h2>Tech Stack:</h2>
<h3>Front-end:</h3>
  <span>
    <img alt="React" height=40rem width=40rem src="https://api.iconify.design/logos/react.svg?download=1" />
    <img alt="TypeScript" height=40rem width=40rem src="https://api.iconify.design/logos/typescript-icon.svg?download=1" />
  </span>
  <br/>
  React.js, Typescript
<h3>Back-end:</h3>
  <span>
    <img alt="nodejs" height=40rem width=40rem src="https://api.iconify.design/vscode-icons/file-type-node.svg?download=1" />
    <img alt='express' height=40rem width=40rem src="https://api.iconify.design/skill-icons/expressjs-dark.svg?download=1" />
    <img alt="TypeScript" height=40rem width=40rem src="https://api.iconify.design/logos/typescript-icon.svg?download=1" />
    <img alt='heroku' height=40rem width=40rem src="https://api.iconify.design/skill-icons/heroku.svg?download=1" />
  </span>
  <br/>
  Node.js, Express, Typescript, Heroku
<br/><br/>

<h2>Local Installation Instructions:</h2>
<ol>
  <li>Clone this repository.</li>
  <li>Install required dependencies by running the command <code>npm run install</code> in both the client and server folders.</li>
  <li>After dependencies install, you can then run the command <code>npm run start</code> in both the client and server folders to run the client and server locally.</li>
  <li>The client will run at <code>localhost</code> port 3000 and connect to the server at <code>localhost</code> port 5000 by default. If you would like to use my server hosted on Heroku, you can   modify your client by changing a variable in the <code>PackageSearch.js</code> file. Navigate to the <code>client/src/clientSettings.tsx</code> file and change the line <code>const USE_LOCALHOST = true;</code> to <code>const USE_LOCALHOST = false;</code>.
  </li>
</ol>
<p></p>

<h4>Proudly licensed under the GNU General Public License v3.0.</h4>
<br/>

<h2>Screenshots:</h2>

![desktop1](https://user-images.githubusercontent.com/87878255/232182016-96128802-063b-4ebf-95de-8b6326f4244b.png)
![desktop2](https://user-images.githubusercontent.com/87878255/232182027-0b684402-fae9-4ab0-9f48-239eb3350781.png)
![mobile1](https://user-images.githubusercontent.com/87878255/232182029-30d907b6-8254-46f2-8a15-f7cffe6930a1.png)
![mobile2](https://user-images.githubusercontent.com/87878255/232182034-e8fd59e6-80d2-4c9d-acb4-b1bc94d52284.png)
![tablet1](https://user-images.githubusercontent.com/87878255/232182035-164fa542-700f-44a5-9831-e6fedd010d32.png)
