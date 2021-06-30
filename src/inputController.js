const walkerVarInputs = document.querySelectorAll('.walker-variables');

for (let walkerInput of walkerVarInputs) {
  console.log(walkerInput);
  walkerInput.oninput = function () {
    // Doesn't let the user type a non-numeric character
    walkerInput.value = walkerInput.value.replace(/[^0-9]/g, '');

    let id = walkerInput.attributes.name.value;
    updateChart(id);
  };
}

function updateChart(id) {
  let rootId = id.split('-').splice(0, 2).join('-');

  switch (rootId) {
    case 'chart-1':
      generateChart1();
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
