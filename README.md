# Wheres-My-Package

Where's My Package is a package (software) search engine for the Arch Linux distribution. This tool simplifies package discovery by enabling users to search for packages across both official and community (AUR) repositories in a unified search interface. This unified api is utilizes dynamic aggregation and curation of data from both official and AUR apis based on user-inputted search queries.

<h3>Live Demo: <a href='https://anthonygleason.github.io/Wheres-My-Package/'>Press Here</a></h3>
<h2>Tech Stack:</h2>
<h3>Front-end:</h3>
  <span>
    <img alt="React" height=40rem width=40rem src="https://api.iconify.design/logos/react.svg?download=1" />
    <img alt="TypeScript" height=40rem width=40rem src="https://api.iconify.design/logos/typescript-icon.svg?download=1" />
  </span>
  <br/>
  React, TypeScript
<h3>Back-end:</h3>
  <span>
    <img alt="nodejs" height=40rem width=40rem src="https://api.iconify.design/vscode-icons/file-type-node.svg?download=1" />
    <img alt='express' height=40rem width=40rem src="https://api.iconify.design/skill-icons/expressjs-dark.svg?download=1" />
    <img alt="TypeScript" height=40rem width=40rem src="https://api.iconify.design/logos/typescript-icon.svg?download=1" />
    <img alt='heroku' height=40rem width=40rem src="https://api.iconify.design/skill-icons/heroku.svg?download=1" />
  </span>
  <br/>
  Node.js, Express.js, TypeScript, Heroku
<br/>
<h2>Local Installation Instructions:</h2>
<ol>
  <li>Clone this repository.</li>
  <li>Install required dependencies by running the command <code>npm run install</code> in both the client and server folders.</li>
  <li>After dependencies install, you can then run the command <code>npm run start</code> in both the client and server folders to run the client and server locally.</li>
  <li>The client will run at <code>localhost</code> port 3000 and connect to the server at <code>localhost</code> port 5000 by default. If you would like to use my server hosted on Heroku, you can modify your client by navigating to the file located at <code>client/src/clientSettings.tsx</code> and changing the line <code>const USE_LOCALHOST = true;</code> to <code>const USE_LOCALHOST = false;</code>.
  </li>
</ol>
<h4>Proudly licensed under the GNU General Public License v3.0.</h4>
<h2>Screenshots:</h2>

![wheresmypackagedesktop](https://github.com/antinf/Wheres-My-Package/assets/87878255/2ae5d877-5f14-4ca8-bf24-24681a83eed9)
![2024-01-09-171510_2560x3040_scrot](https://github.com/AnthonyGleason/Wheres-My-Package/assets/87878255/7d96ad3d-336a-4f21-8163-080d8785b4ff)
![2024-01-09-144244_2560x1600_scrot](https://github.com/AnthonyGleason/Wheres-My-Package/assets/87878255/81874a24-910a-4742-badd-7558fd09b1e3)
![2023-07-10-162349_4480x1440_scrot](https://github.com/antinf/Wheres-My-Package/assets/87878255/a2ac1d50-e257-4dd8-93b0-d4e678a4675c)
![2023-07-10-161923_4480x1440_scrot](https://github.com/antinf/Wheres-My-Package/assets/87878255/15e1039c-6a12-4347-830c-c2dab6ede44e)
