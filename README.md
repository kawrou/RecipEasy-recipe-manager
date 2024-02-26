# Recipe Manager

## Intro

Over the course of 2 weeks (8 or 9 days), we are building a recipe
manager web application. 
We will be desigining the app by first finding problems with current
solutions and discovering features we want to implement for an MVP. 

The features main feature, the "skateboard" to our "car", is a page
scaper function that will allow users to input a URL, retrieve the
recipe, and have that saved to their profile. 

The first major interaction will follow this flow:
**Sign up -> retrieve recipe -> edit recipe -> see recipe in profile page**

## TechStack
-MERN
-Tailwind

## Quick-Start

### Install NVM
1. Make sure you have node and NVM installed. 
```
brew install nvm
```
2. Install the latest version of [Node.js](https://nodejs.org/en/)

### Set up the project
1. Fork/Clone this repository.
2. Install dependencies for the 'frontend' & 'api' application: 

```
cd frontend
npm install

cd ../api
npm install
```

3. Install an ESLint plugin for your editor
4. Intall MongoDB if you don't have one on your computer

```
brew tap mongodb/brew
brew install mongodb-community@6.0
```
   _Note:_ If you see a message that says
   `If you need to have mongodb-community@6.0 first in your PATH, run:`, follow
   the instruction. Restart your terminal after this.

5. Start MongoDB

```
brew services start mongodb-community@6.0
```

### Set up environment variables

You need to create '.env' files for both the frontend and the api.

#### Frontend
Create a file 'frontend/.env` with the following:

```
VITE_BACKEND_URL="http://localhost:3000"
```

#### Backend
Create 'api/.env' with the following:

```
MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"
```

### Running the server

1. In the api directory, run:
```
npm run dev
```
2. In the frontend, run:
```
npm run dev
```

