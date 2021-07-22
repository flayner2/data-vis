class WalkerChart {
  constructor(options, params, canvas, dataFunc) {
    this.params = params;
    this.canvas = canvas;
    this.options = options;
    this.dataFunc = dataFunc;

    this.data = {};
    this.config = {};
  }

  generateData() {
    this.data = this.dataFunc(this.params);
  }

  generateConfig() {
    this.config = {
      data: this.data,
      ...this.options,
    };
  }

  render() {
    this.chart = new Chart(this.canvas, this.config);
  }

  registerResetZoomButton(id) {
    const button = document.getElementById(id);

    button.onclick = () => {
      this.chart.resetZoom();
    };
  }

  updateChart() {
    this.generateData();
    this.generateConfig();

    this.chart.data.labels = this.params.labels;
    this.chart.data = this.data;
    this.chart.update();
  }

  registerSimulateButton(id) {
    const button = document.getElementById(id);

    button.onclick = () => {
      this.updateChart();
    };
  }

  registerInputs(ids, hasFormula = false, formula = null) {
    for (let id of ids) {
      const input = document.getElementById(id);

      input.oninput = () => {
        let value = input.value;
        input.value = value.replace(/[^0-9]/g, '');
        value = Number(input.value);

        if (input.classList.contains('var-n')) {
          this.params.labels = [...Array(value).keys()];
          this.params.n = value;
        } else if (input.classList.contains('var-r')) {
          this.params.r = value;
        } else if (input.classList.contains('var-w')) {
          this.params.w = value;
        }

        this.updateChart();

        if (hasFormula) {
          formula.innerText = (
            this.params.r * Math.sqrt(this.params.n)
          ).toFixed(2);
        }
      };
    }
  }

  registerRadio(ids) {
    for (let id of ids) {
      const radio = document.getElementById(id);

      radio.onclick = () => {
        let value = radio.value;

        this.params.type = value;

        this.updateChart();
      };
    }
  }
}
