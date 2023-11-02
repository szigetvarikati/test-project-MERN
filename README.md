<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<h3 align="center">Test Project MERN</h3>

  <p align="center">
    This project is a custom homework assigment that I recieved through an application
    <br />
    <a href="https://github.com/szigetvarikati/test-project-MERN"><strong>Explore the docs »</strong></a>
    <br />
    <br />
   

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center">
  <img src="https://imgur.com/2NrcaSk.png" alt="Kép leírása">
  <img src="https://imgur.com/VcFIixz.png">
</p>

This MERN (MongoDB, Express, React, Node.js) project is designed with key features that include user authentication through a secure login system. The login functionality verifies user credentials directly from the database. Upon successful login, users are presented with a dynamic product table.

The product table offers versatile sorting options for each column, allowing users to arrange data both in ascending and descending order. In addition, the table is equipped with a dynamic search feature, enabling users to search for specific data entries with ease.

One of the standout features of this project is the ability to export the currently displayed product table to a PDF file. This functionality enhances data accessibility and facilitates efficient information sharing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<p>Frontend</p>

* [![Javascript][Javascript]][Javascript-url]
* [![React][React.js]][React-url]
* [![Node.js][NodeJS]][NodeJS-url]
* [![Express.js][Express.js]][Express.js-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p>Backend</p>

* [![Javascript][Javascript]][Javascript-url]
* [![MongoDB][MongoDB]][MongoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

[product-main]: images/screenshot.png
## Getting Started

Follow this qquide to run and try the application.

### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/szigetvarikat/test-project-MERN.git
   $ cd test-project-MERN
   ```
2. Create .env file
   - duplicate .env.example in backend folder and rename it to .env
     
3. Setup MongoDB
   - Local MongoDB
      - Install it from [here](https://www.mongodb.com/try/download/community)
      - In .env file update MONGODB_URI=mongodb://localhost/homework
   - OR Atlas Cloud MongoDB
      - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
      - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

4. Run Backend
    ```sh
    $ cd backend
    $ npm install
    $ npm start
    ```
5. Run Frontend
    ```sh
    # open a new terminal
    $ cd frontend
    $ npm install
    $ npm start
    ```
    Frontend is running on the  http://localhost:3000/ URL
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

<!-- CONTACT -->
## Contact

Katalin Szigetvári - szigetvarikati@gmail.com

Project Link: https://github.com/szigetvarikati/test-project-MERN

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/szigetvarikati/test-project-MERN.svg?style=for-the-badge
[contributors-url]: https://github.com/szigetvarikati/test-project-MERN/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/katalin-szigetvári-9829519a
[product-main]: https://imgur.com/a/jEvI3mU
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Javascript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=typescript&logoColor=white
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
