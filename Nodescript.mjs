// Activate this server using node Nodescript.mjs in cmd.
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
// const PORT = 3000;

const PORT = process.env.PORT || 3000; // Use 3000 or another default port if running locally


// const app = express();
// const PORT = 3000;

// // Enable CORS for all routes
// app.use(cors());

// // Define the API URL
// const apiUrl = 'https://alfa-leetcode-api.vercel.app';

// // Define a route to fetch data from the API
// app.get('/fetchData', async (req, res) => {
//   try {
//     const response = await fetch(`${apiUrl}/daily`);
//     const data = await response.json();

//     // Send the JSON data to the client
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
// import express from 'express';
// import cors from 'cors';

let globalUsername = '';
// const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.post('/username', (req, res) => {
  const { username } = req.body;
  globalUsername = username; // Store the username in the global variable
  console.log('Received username:', globalUsername);
  res.json({ message: 'Username received successfully' });
});

// // Other endpoints and routes...

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
//   console.log(globalUsername);
// });

// // Activate this server using node Nodescript.mjs in cmd.
// import express from 'express';
// 
// import cors from 'cors';
// import fetch from 'node-fetch';



// Enable CORS for all routes
app.use(cors());

// Define the base API URL
const apiUrl = 'https://alfa-leetcode-api.vercel.app';

// Define routes for different endpoints
app.get('/username', async (req, res) => {
  try {                          
    // const response = await fetch('https://alfa-leetcode-api.vercel.app/AbhinavB1203')
    const response = await fetch(`${apiUrl}/${globalUsername}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/username/calendar', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/${globalUsername}/calendar`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/username/daily', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/daily`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/username/submission', async (req, res) => {
  try {
    const response = await fetch(`${apiUrl}/${globalUsername}/submission`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
