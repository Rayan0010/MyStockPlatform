import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';

const socket = io('http://localhost:3000'); // Ensure this URL is correct and accessible

function App() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Setup the connection to the backend using socket.io
    socket.on('stockData', (data) => {
      setStockData((prevData) => [...prevData, data]);
    });

    return () => {
      socket.off('stockData');
      socket.disconnect();
    };
  }, []);

  const chartData = {
    labels: stockData.map((_, index) => `Time ${index}`),
    datasets: [
      {
        label: 'AAPL Stock Price',
        data: stockData.map((data) => parseFloat(data.price)),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div className="App">
      <h1>Stock Market Simulator</h1>
      <Line data={chartData} />
    </div>
  );
}

export default App;

