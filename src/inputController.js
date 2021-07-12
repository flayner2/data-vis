const walkerVarInputs = document.querySelectorAll('.walker-variables');

for (let walkerInput of walkerVarInputs) {
  walkerInput.oninput = function () {
    // Doesn't let the user type a non-numeric character
    walkerInput.value = walkerInput.value.replace(/[^0-9]/g, '');
  };
}