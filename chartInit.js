var chartData = {
    labels: [], // empty labels for now
    datasets: [{
      label: 'Number of Moves',
      data: [], // empty data for now
      backgroundColor: 'rgba(63, 81, 181, 0.2)',
      borderColor: 'rgba(63, 81, 181, 1)',
      borderWidth: 2
    }]
};

var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
};

var movesChart = new Chart(document.getElementById('movesChart'), {
    type: 'line',
    data: chartData,
    options: chartOptions
});

// Function to add a new data point to the chart
function addMovesDataPoint(numMoves) {
    movesChart.data.labels.push((movesChart.data.labels.length + 1)*10); // add a new label
    movesChart.data.datasets[0].data.push(numMoves); // add a new data point
    movesChart.update(); // update the chart
}