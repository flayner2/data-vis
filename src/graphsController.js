Chart.register({ id: 'zoom' });

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);

  return choices[index];
}

const chart1Params = {
  n: Number(document.getElementById('chart-1-n').value),
  r: Number(document.getElementById('chart-1-r').value),
};
const chart1Options = {
  type: 'line',
  options: {
    responsive: true,
    layout: {
      padding: 5,
    },
    scales: {
      xAxis: {
        ticks: {
          color: globalColors.white,
        },
        grid: {
          display: false,
        },
      },
      yAxis: {
        ticks: {
          color: globalColors.white,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        zoom: {
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  },
};
const chart1Canvas = document.getElementById('chart-1');

function chart1DataFunction(params) {
  const n = params.n;
  const r = params.r;
  const directions = [-r, r];
  const labels = [...Array(n + 1).keys()];

  let walker = 0;
  let steps = [0];

  for (let i = 0; i < n; i++) {
    walker += choose(directions);
    steps.push(walker);
  }

  return {
    labels,
    datasets: [
      {
        data: steps,
        label: 'Distance',
        backgroundColor: globalColors.red,
        borderColor: globalColors.white,
      },
    ],
  };
}

const chart1 = new WalkerChart(
  (options = chart1Options),
  (params = chart1Params),
  (canvas = chart1Canvas),
  (dataFunc = chart1DataFunction)
);

chart1.generateData();
chart1.generateConfig();
chart1.render();
chart1.registerInputs(['chart-1-n', 'chart-1-r']);
chart1.registerResetZoomButton('reset-zoom-chart-1');
chart1.registerSimulateButton('simulate-chart-1');
