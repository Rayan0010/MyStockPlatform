const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Simulate real-time stock data update
  setInterval(async () => {
    // Here you would call a real stock API
    const mockData = {
      symbol: "AAPL",
      price: (150 + Math.random() * 10).toFixed(2)
    };
    socket.emit('stockData', mockData);
  }, 3000); // Every 3 seconds

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require('cors');
app.use(cors({
  origin: '*', // Allow all origins temporarily for testing
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

