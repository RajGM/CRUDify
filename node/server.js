// server.js at the root of your project
const app = require('./src/app'); // Import the configured Express app
const port = process.env.PORT || 3001; // Use environment variable or default

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
