export const initializeEarningsChart = () => {
  const ctx = document.getElementById('earningsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Top Gross',
          data: [50, 60, 80, 120, 150, 200, 180, 140, 100, 90, 60, 50],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          tension: 0.4,
        },
        {
          label: 'First Half',
          data: [40, 50, 60, 100, 140, 160, 140, 120, 80, 70, 50, 40],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
export const initializePolarAreaChart = () => {
const ctx = document.getElementById('polarAreaChart').getContext('2d');
  const polarAreaChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Cosmetics', 'clothings', 'other'],
      datasets: [
        {
          label: 'Sales categories',
          data: [1500, 2000, 2500], // Replace with your data
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'], // Colors for each segment
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top', // Legend position
        },
        tooltip: {
          enabled: true, // Enable tooltips
        },
      },
      scales: {
        r: {
          ticks: {
            stepSize: 500, // Adjust step size
          },
        },
      },
    },
  });
}