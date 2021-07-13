// Global and helper stuff
Chart.register({ id: 'zoom' });

// Needed to use p5's functions
var p5Holder = new p5();

const lineChartOptions = {
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

// Chart 1 stuff
const chart1N = Number(document.getElementById('chart-1-n').value);
const chart1Params = {
  n: chart1N,
  r: Number(document.getElementById('chart-1-r').value),
  labels: [...Array(chart1N).keys()],
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
    walker += p5Holder.random(directions);
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
  (options = lineChartOptions),
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

// Chart 2 stuff
const chart2N = Number(document.getElementById('chart-2-n').value);
const chart2Params = {
  n: chart2N,
  r: Number(document.getElementById('chart-2-r').value),
  labels: [...Array(chart2N).keys()],
};
const chart2Canvas = document.getElementById('chart-2');

function chart2DataFunction(params) {
  const n = params.n;
  const r = params.r;
  const labels = params.labels;
  const directions = [-r, r];

  let walker = 0;
  let steps = [0];
  let noiseOff = 0.0;

  for (let i = 0; i < n - 1; i++) {
    let noiseVal = p5Holder.noise(noiseOff);

    if (noiseVal < 0.5) {
      walker += min(directions);
    } else {
      walker += max(directions);
    }
    steps.push(walker);

    noiseOff += 0.1;
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

const chart2 = new WalkerChart(
  (options = lineChartOptions),
  (params = chart2Params),
  (canvas = chart2Canvas),
  (dataFunc = chart1DataFunction)
);

chart2.generateData();
chart2.generateConfig();
chart2.render();
chart2.registerInputs(['chart-2-n', 'chart-2-r']);
chart2.registerResetZoomButton('reset-zoom-chart-2');
chart2.registerSimulateButton('simulate-chart-2');
