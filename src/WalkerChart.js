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

  registerSimulateButton(id) {
    const button = document.getElementById(id);
    
    button.onclick = () => {
      this.generateData();
      this.generateConfig();
      this.chart.datasets.forEach((dataset) => {
        dataset.data = this.data.steps; 
      });
      this.chart.update();
    }
  }
}