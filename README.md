# Simple TODO-APP

## Running the Project

To run the project, follow these steps:

1. Clone the repository to your local machine

2. Navigate to the project directory:

  ```bash
  cd todo-app
  ```

3. Install the dependencies using yarn:

  ```bash
  yarn
  ```

4. Make sure to update theses .env variables

  > frontend/.env: 
  - VITE_API_URL
  > api/.env
  - API_PORT
5. Start the frontend and API servers concurrently:

  ```bash
  yarn dev # for frontend
  yarn start # for api
  ```

  This command will start the frontend server on port 3000 and the API server on port 5000.

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the TODO-APP.

## Additional Information

- Make sure you have Node.js and yarn installed on your machine.
- The frontend code is located in the `frontend` directory.
- The API code is located in the `api` directory.
