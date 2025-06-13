# Inflation IPC App

This project is a React application that provides an interactive inflation chart for Argentina. It allows users to visualize inflation data in a user-friendly manner.

## Project Structure

- **src/**: Contains the source code for the application, including components and other necessary files.
- **public/**: Contains static assets such as images, fonts, and other files that need to be served directly.
- **index.html**: The main HTML file for the application, which includes the root div where the React app will be rendered and links to styles and scripts.
- **index.tsx**: The entry point for the React application. It imports React and ReactDOM, creates a root element, and renders the main component, `InflacionInteractiva`.
- **inflation.jsx**: The main React component for the interactive inflation chart, handling the logic and rendering of the chart.
- **package.json**: The configuration file for npm, listing the dependencies, scripts, and metadata for the project.
- **tsconfig.json**: The configuration file for TypeScript, specifying the compiler options and the files to include in the compilation.
- **Dockerfile**: Contains instructions for building a Docker image for the application, including steps to install dependencies, build the application, and specify how to run it.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd inflation-ipc-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

The application provides an interactive chart that visualizes inflation data. Users can interact with the chart to explore different data points and trends.

## Docker Deployment

To deploy the application using Docker, build the Docker image and run it:

1. Build the Docker image:
   ```
   docker build -t inflation-ipc-app .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 inflation-ipc-app
   ```

3. Access the application at `http://localhost:8080`.

## License

This project is licensed under the MIT License.