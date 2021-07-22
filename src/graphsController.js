// Global and helper stuff
Chart.register({ id: 'zoom' });

function getCounts(values, target) {
  let occurences = {};

  for (let value of values) {
    let count = target.filter((each) => each === value).length;
    occurences[value] = count;
  }

  return occurences;
}

// Needed to use p5's functions
var p5Holder = new p5();

// Stops the p5 object from creating a canvas, although it still injects a main
function setup() {
  remove();
}

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
          wheel: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  },
};

const histogramOptions = {
  options: {
    responsive: true,
    layout: {
      padding: 5,
    },
    scales: {
      x: {
        type: 'linear',
        offset: false,
        gridLines: {
          offsetGridLines: false,
        },
        title: {
          display: true,
          text: 'Total distance travelled',
          color: globalColors.white,
        },
        ticks: {
          color: globalColors.white,
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Frequency',
          color: globalColors.white,
        },
        ticks: {
          color: globalColors.white,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            let tooltipData = context[0];

            if (tooltipData.datasetIndex === 0) {
              return '';
            } else if (tooltipData.datasetIndex === 1) {
              let val = tooltipData.parsed.x;
              return `Distance: ${val}`;
            }
          },
          label: (context) => {
            if (context.datasetIndex === 0) {
              let val = context.parsed.x;
              return `Mean distance: ${val}`;
            } else if (context.datasetIndex === 1) {
              let val = context.parsed.y;
              return `Frequency: ${val}`;
            }
          },
        },
      },
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
          wheel: {
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
  const { n, r, labels } = params;
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
  const { n, r, labels } = params;
  const directions = [-r, r];

  let walker = 0;
  let steps = [0];
  let noiseOff = p5Holder.random(0.0, 50.0);

  for (let i = 0; i < n - 1; i++) {
    let noiseVal = p5Holder.noise(noiseOff);

    if (noiseVal < 0.5) {
      walker += Math.min(...directions);
    } else {
      walker += Math.max(...directions);
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
  (dataFunc = chart2DataFunction)
);

chart2.generateData();
chart2.generateConfig();
chart2.render();
chart2.registerInputs(['chart-2-n', 'chart-2-r']);
chart2.registerResetZoomButton('reset-zoom-chart-2');
chart2.registerSimulateButton('simulate-chart-2');

// Chart 3 stuff
const chart3N = Number(document.getElementById('chart-3-n').value);
const chart3Random = document.getElementById('chart-3-random');
const chart3Noise = document.getElementById('chart-3-noise');
const chart3Params = {
  n: chart3N,
  r: Number(document.getElementById('chart-3-r').value),
  w: Number(document.getElementById('chart-3-w').value),
  labels: [...Array(chart3N).keys()],
  type: chart3Random.checked ? chart3Random.value : chart3Noise.value,
};
const chart3Canvas = document.getElementById('chart-3');

function chart3DataFunction(params) {
  const { n, r, w, labels, type } = params;
  const directions = [-r, r];
  const colors = [
    globalColors.blue,
    globalColors.green,
    globalColors.red,
    globalColors.light_orange,
    globalColors.pink,
    globalColors.cyan,
    globalColors.dark_orange,
    globalColors.yellow,
    globalColors.purple,
  ];

  let result = { labels, datasets: [] };

  if (type == 'random') {
    for (let i = 0; i < w; i++) {
      let walker = 0;
      let steps = [0];

      for (let j = 0; j < n - 1; j++) {
        walker += p5Holder.random(directions);
        steps.push(walker);
      }

      let toAdd = {
        data: steps,
        label: 'Distance',
        backgroundColor: globalColors.white,
        borderColor: p5Holder.random(colors),
        borderWidth: 2,
        pointBorderColor: globalColors.white,
        pointRadius: 1,
      };

      result.datasets.push(toAdd);
    }
  } else if (type == 'noise') {
    for (let i = 0; i < w; i++) {
      let walker = 0;
      let steps = [0];
      let noiseOff = p5Holder.random(0.0, 50.0);

      for (let j = 0; j < n - 1; j++) {
        let noiseVal = p5Holder.noise(noiseOff);

        if (noiseVal < 0.5) {
          walker += Math.min(...directions);
        } else {
          walker += Math.max(...directions);
        }
        steps.push(walker);

        noiseOff += 0.1;
      }

      let toAdd = {
        data: steps,
        label: 'Distance',
        backgroundColor: globalColors.white,
        borderColor: p5Holder.random(colors),
        borderWidth: 2,
        pointBorderColor: globalColors.white,
        pointRadius: 1,
      };

      result.datasets.push(toAdd);
    }
  }

  return result;
}

const chart3 = new WalkerChart(
  (options = lineChartOptions),
  (params = chart3Params),
  (canvas = chart3Canvas),
  (dataFunc = chart3DataFunction)
);

chart3.generateData();
chart3.generateConfig();
chart3.render();
chart3.registerInputs(['chart-3-n', 'chart-3-r', 'chart-3-w']);
chart3.registerResetZoomButton('reset-zoom-chart-3');
chart3.registerSimulateButton('simulate-chart-3');
chart3.registerRadio(['chart-3-random', 'chart-3-noise']);

// Chart 4 and formula stuff
const chart4N = Number(document.getElementById('chart-4-n').value);
const chart4R = Number(document.getElementById('chart-4-r').value);
const chart4Params = {
  n: chart4N,
  r: chart4R,
  w: Number(document.getElementById('chart-4-w').value),
  labels: [...Array(chart4N).keys()],
};
const chart4Canvas = document.getElementById('chart-4');
const chart4Formula = document.getElementById('result');

chart4Formula.innerText = (chart4R * Math.sqrt(chart4N)).toFixed(2);

function chart4DataFunction(params) {
  const { n, r, w } = params;
  const directions = [-r, r];
  let distances = [];
  let data = [];
  let average = 0;

  for (let i = 0; i < w; i++) {
    let walker = 0;

    for (let j = 0; j < n; j++) {
      let direction = p5Holder.random(directions);
      walker += direction;
      average += Math.pow(direction, 2);
    }

    const distance = Math.abs(walker);
    distances.push(distance);
  }

  distances.sort();

  let unique = [...new Set(distances)].sort();

  let counts = getCounts(unique, distances);

  for (let [key, val] of Object.entries(counts)) {
    data.push({ x: key, y: val });
  }

  average = Math.sqrt(average / w);

  return {
    datasets: [
      {
        type: 'scatter',
        label: 'Mean distance',
        backgroundColor: globalColors.blue,
        data: [
          {
            x: average,
            y: Math.max(...Object.values(counts)),
          },
        ],
        pointRadius: 5,
      },
      {
        type: 'bar',
        backgroundColor: globalColors.white,
        data,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        label: 'Frequency',
      },
    ],
  };
}

const chart4 = new WalkerChart(
  (options = histogramOptions),
  (params = chart4Params),
  (canvas = chart4Canvas),
  (dataFunc = chart4DataFunction)
);

chart4.generateData();
chart4.generateConfig();
chart4.render();
chart4.registerInputs(
  ['chart-4-n', 'chart-4-r', 'chart-4-w'],
  (hasFormula = true),
  (formula = chart4Formula)
);
chart4.registerResetZoomButton('reset-zoom-chart-4');
chart4.registerSimulateButton('simulate-chart-4');
