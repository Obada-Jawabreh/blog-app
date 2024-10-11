
# Blog Application

This project is a blog application built with React, Node.js, and Mongoose. The application allows users to register, log in, create posts, comment on posts, and view their profiles. 

## Features
- **User Registration and Login**: Users can register and log in using their name, email, and password. Passwords are validated to ensure they meet specific security criteria.
- **Post Management**: Users can view previously added posts and create new posts once logged in.
- **Commenting System**: Users can comment on posts and reply to comments.
- **User Profile**: Users can view their profile information, including their email and previously added posts.
- **Protected Routes**: Users must be logged in to access certain routes. If a user attempts to access a protected route without logging in, they will be denied access.

### Nice to Have Features

- **Reactions**: Users can react to posts and comments.

## Technologies Used

- **Frontend**: React for building user interfaces.
- **Backend**: Node.js for server-side logic.
- **Database**: Mongoose for MongoDB object modeling.
- **JWT Authentication**: JSON Web Tokens are used for user authentication. The backend verifies tokens through middleware to ensure secure access.
- **MVC Architecture**: The application is organized using the Model-View-Controller architecture for better code organization and separation of concerns.
