# ARCANA
## Set Up
- MongoDB install
  - https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

- React
  - Install vite in your terminal "npm install vite" first.
    * Make sure node.js is installed.
      - https://www.youtube.com/watch?v=CgkZ7MvWUAA&t=9s

- Flask
  - If you don't have a tool to handle your python environment, use
      pip install flask
    in your virtual environment

- Pymongo
  - If you don't have a tool to handle your python environment, use
      pip install pymongo
    in your virtual environment

- HTML & CSS
  - https://www.youtube.com/watch?v=HGTJBPNC-Gw&t=2s

- Download node.js
  - https://www.youtube.com/watch?v=igJAD0J5Cts

- Download docker
  - https://www.youtube.com/watch?v=gAkwW2tuIqE
	  - If we you get an WSL error it's ok for right now we are still working on it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the application, you will need the following:

- Node.js
- npm (comes with Node.js)
- Flask
- PyMongo
- Environment to run Python

### Installing

Follow these steps to get your development environment running:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Mar915/SW2-ARCANA.git
```

#### Run the application
- Install the require dependencies

```bash
npm install
```

- Start the development server
```bash
npm start
```
- The application will run on you local host 'http://localhost:3000'

#### Starting up the backend
- Use this command in the environment where you have python

  flask --app ARCANA run

- http://127.0.0.1:5000 is the port that backend will run on 

##### Deployment
- To create a production build use:
```bash
npm run build
```

