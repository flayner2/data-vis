Chart.register({ id: 'zoom' });

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length);

  return choices[index];
}

const chart1N = Number(document.getElementById('chart-1-n').value);
const chart1Params = {
  n: chart1N,
  r: Number(document.getElementById('chart-1-r').value),
  labels: [...Array(chart1N).keys()],
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
  const labels = params.labels;
  const directions = [-r, r];

  let walker = 0;
  let steps = [0];

  for (let i = 0; i < n - 1; i++) {
    walker += choose(directions);
    steps.push(walker);
  }

  return {
    labels,
    datasets: [
      {
        data: steps,
        label: 'Distance',
        backgroundColor: globalColors.white,
        borderColor: globalColors.red,
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
