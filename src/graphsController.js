Chart.register({ id: 'zoom' });

function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);

  return choices[index];
}

function defaultRandomWalk(n, r) {
  const directions = [-r, r];
  let walker = 0;
  let steps = [0];

  for (let i = 0; i < n; i++) {
    walker += choose(directions);
    steps.push(walker);
  }

  return { walker, steps };
}

function generateChart1() {
  const n_value = Number(
    document.querySelector("input.walker-variables[name='chart-1-n']").value
  );
  const r_value = Number(
    document.querySelector("input.walker-variables[name='chart-1-r']").value
  );

  const { walker, steps } = defaultRandomWalk(n_value, r_value);

  const canvas = document.getElementById('chart-1');

  const labels = [...Array(n_value + 1).keys()];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Distance',
        backgroundColor: globalColors.red,
        borderColor: globalColors.white,
        data: steps,
      },
    ],
  };

  const config = {
    type: 'line',
    data,
    options: {
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

  let chart1 = new Chart(canvas, config);

  let chart1Reset = document.getElementById('reset-zoom-chart-1');

  chart1Reset.onclick = () => {
    chart1.resetZoom();
  };
}

generateChart1();
