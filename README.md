Blog Website using MERN Stack and JWT Authentication
This is a full-stack blog website project built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and JWT (JSON Web Tokens) authentication.

Prerequisites
Before running this project, ensure you have the following installed:

* Node.js (with npm)
* MongoDB

* Clone the repository:
git clone https://github.com/VivekZ79/Blog.git
cd Blog.git

Install dependencies:
npm install
cd client
npm install

PORT=3001
MONGODB_URI=<your_mongodb_uri>
generate it using the command
JWT_SECRET=<your_jwt_secret>

npm start
cd client
npm start


Features
User authentication using JWT
CRUD operations for blog posts
User-friendly interface
Responsive design
Technologies Used
Frontend:
React.js
React Router
Axios (for API requests)
Bootstrap (or any other CSS framework)
Backend:
Node.js
Express.js
MongoDB
Mongoose (for MongoDB object modeling)
JSON Web Tokens (JWT) for authentication
Directory Structure
bash
Copy code
project-root/
│
├── client/              # Frontend React app
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/    # API service functions
│       └── App.js
│
├── server/              # Backend Node.js app
│   ├── controllers/     # Route handlers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables
│   └── server.js        # Express server setup
│
└── README.md            # Project documentation
Contributing
Contributions are welcome! Please open an issue or create a pull request with your suggestions or improvements.

License
This project is licensed under the MIT License.





