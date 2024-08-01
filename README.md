# Clubmarket

## Overview

Clubmarket is a Node.js and TypeScript-based application that allows users to create shopping lists and receive product recommendations. The application leverages the OpenAI API to generate recommendations and responses to user inquiries. The server is hosted on an AWS EC2 instance, and the entire application is containerized using Docker and managed with Docker Compose.

## Directory Details

- **client/**: Contains the React code for the client-side.
  - **src/**: Source code for the client.
    - **components/**: React components.
    - **services/**: Services such as API and storage.
  - **public/**: Static files.
  - **Dockerfile**: Dockerfile for building the client application.

- **server/**: Contains the Node.js code for the server-side.
  - **src/**: Source code for the server.
    - **controllers/**: Functions handling requests.
    - **models/**: Data models.
    - **routes/**: API route definitions.
    - **services/**: Services such as database connections and OpenAI API integration.
  - **Dockerfile**: Dockerfile for building the server application.

- **docker-compose.yml**: Docker Compose configuration file for managing the services.
- **.env**: Environment variables.
- **package.json**: Project dependencies and scripts.

## Functionality

* Users can register new accounts and log in to the system.
* Users can add products to shopping lists through the user interface.
* The application uses the OpenAI API to generate product recommendations based on various parameters.
* Shopping lists for each user are stored separately in a SQL Server database hosted on an AWS EC2 instance.
* The client interface displays the lists in a user-friendly manner and includes user management and login functionalities.

## Requirements

### Client-side

1. **Technology**: Developed using React and TypeScript.
2. **UI Design**: Styled using Material-UI with responsive design for both desktop and mobile.
3. **Features**:
   - A free text field to add products by name and select a suitable category, adding them to the appropriate list at the bottom of the page, with an increment in the **Total Items**.
   - If the product already exists, the quantity is incremented, e.g., `Milk (3)`.
   - An **Items Total** component at the top of the page displays the total items count, managed via a state management solution like Redux Toolkit.
   - A **Complete Order** button sends the shopping list data to the server for storage.

### Server-side

1. **Technology**: Implemented using Node.js with TypeScript.
2. **Database**: Uses SQL Server hosted on AWS EC2. An ORM library is used for data management.
3. **Features**:
   - On application startup, the server returns a predefined list of categories stored in the database: Cleaning Products, Cheeses, Fruits and Vegetables, Meat and Fish, and Baked Goods.
   - The server exposes an endpoint to receive shopping lists from the client and store them in the database.

## Installation and Setup

To begin, ensure that Docker and Docker Compose are installed on your system.

Follow these steps:

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/shahar-shemesh/clubmarket.git
    ```

2. Navigate to the directory of the cloned repository:
    ```bash
    cd "clubmarket"
    ```

3. **Build and start containers**:
    ```bash
    docker-compose up --build
    ```

4. **Access the Application**:
    - The client will be available at `http://localhost:3000`
    - The server will be available at `http://localhost:4000`

## Live Demo

You can experience the live application at [club-market.vercel.app](https://club-market.vercel.app).

## Additional Developments

Additional features implemented:
- **User Management**: Includes user registration and login functionalities.
- **Cloud Hosting**: The database is hosted on AWS EC2 for reliability and scalability.

## Contributing

- Fork the repository and submit a pull request with a description of your changes.
- Follow best practices for commit messages and use branches if necessary.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
