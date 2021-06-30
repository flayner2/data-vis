const walkerVarInputs = document.querySelectorAll('.walker-variables');

for (let walkerInput of walkerVarInputs) {
  walkerInput.oninput = function () {
    // Doesn't let the user type a non-numeric character
    walkerInput.value = walkerInput.value.replace(/[^0-9]/g, '');

    const id = walkerInput.attributes.name.value;
    updateChart(id);
  };
}

function updateChart(id) {
  const rootId = id.split('-').splice(0, 2).join('-');
  const newN = Number(
    document.querySelector(`input.walker-variables[name='${rootId}-n']`).value
  );
  const newR = Number(
    document.querySelector(`input.walker-variables[name='${rootId}-r']`).value
  );

  switch (rootId) {
    case 'chart-1':
      const { walker, steps } = defaultRandomWalk(newN, newR);
      const labels = [...Array(newN + 1).keys()];
      chart1.data.labels = labels;
      chart1.data.datasets.forEach((dataset) => {
        dataset.data = steps;
      });
      chart1.update();
      break;
    case 'chart-2':
      generateChart2();
      break;
    case 'chart-3':
      generateChart3();
      break;
    case 'chart-4':
      generateChart4();
      break;
    case 'chart-5':
      generateChart5();
      break;
  }
}
