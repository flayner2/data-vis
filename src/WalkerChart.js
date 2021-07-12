class WalkerChart {
  constructor(data = {}, config = {}, options = {}, params, dataFunc) {
    this.data = data;
    this.config = config;
    this.params = params;
    this.dataFunc = dataFunc;
    this.options = options;
  }

  generateData() {    
    this.data = this.dataFunc(this.params);
  }

  generateConfig() {
    this.config = {
      data: this.data,
      ...this.options
    }
  }

  render(canvas) {
    this.chart = new Chart(canvas, this.config);
  }

  registerResetButton(id) {
    const button = document.getElementById(id);

    button.onclick = () => {
      this.chart.resetZoom()
    }
  }

  updateChart() {
    this.generateData();
    this.generateConfig();

    for (let i = 0; i < this.chart.datasets.length(); i++){
      this.chart.datasets[i].data = this.data.datasets[i].data;
    }

    this.chart.update();
  }

  registerSimulateButton(id) {
    const button = document.getElementById(id);
    
    button.onclick = () => {
      this.updateChart();
    }
  }

  registerInput(id) {
    const input = document.getElementById(id);
    
    input.oninput = () => {
      const value = input.value;
      
      if (input.classList.contains("var-n")) {
        this.data.labels = [...Array(value + 1).keys()]
        this.params.n = value;
      }
      else if (input.classList.contains("var-r")) {
        this.params.r = value;
      }
      else if (input.classList.contains("var-w")){
        this.params.w = value;
      }

      this.updateChart();
    }
  }
}