# Kanupolo Project

## Description

Kanupolo Project is a web application designed to manage and track Kanupolo activities. It includes an API for backend services and a web interface for user interactions. The project leverages Node.js, Express, and MySQL for the backend, and React for the frontend.

! It is far away from usable in a serious manner !

## Requirements

1. **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **npm**: Node.js package manager, which is included with Node.js.
3. **MySQL**: A running instance of MySQL configured in [config.js](./Kanupolo-Api/app/config/config.js).
4. **Git**: Version control system to clone the repository. Download it from [git-scm.com](https://git-scm.com/).

## Installation

1. **Clone the repository:**
   - `git clone https://github.com/xXMrSaltyXx/Kanupolo.git`

3. **Install dependencies:**
   - For the API:
     - `cd Kanupolo-Api`
     - `npm install`
   - For the web application:
     - `cd kanupolo-web`
     - `npm install`

## Configuration

1. **API Configuration:**
   - Update the database configuration in [config.js](./Kanupolo-Api/app/config/config.js) with your database credentials.

2. **Web Application Configuration:**
   - Create a [.env](/kanupolo-web/.env) file in the [kanupolo-web](/kanupolo-web/) directory and add the following:
     - [PORT=8081](/Kanupolo-Api/server.js)



## Running the Application

1. **Start the API server:**
   - Navigate to the [Kanupolo-Api](/Kanupolo-Api/) directory:
     - `cd Kanupolo-Api`
   - Start the server:
     - `npm start`

2. **Start the web application:**
   - Navigate to the [kanupolo-web](/kanupolo-web/)directory:
     - `cd kanupolo-web`
   - Start the development server:
     - `npm start`
   - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

1. **Build the web application:**
   - Navigate to the [kanupolo-web](/kanupolo-web/) directory:
     - `cd kanupolo-web`
   - Build the application for production:
     - `npm run build`

2. **Deploy the API and web application:**
   - Deploy the contents of the [Kanupolo-Api](/Kanupolo-Api/) and `kanupolo-web/build` directories to your server or cloud provider.

3. **Start the API server on the deployment environment:**
   - Ensure the API server is running and accessible.

4. **Serve the built web application:**
   - Configure your web server to serve the contents of the `kanupolo-web/build` directory.
