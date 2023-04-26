fetch("results.json")
  .then((response) => response.json())
  .then(updateUI);
/**
 *
 * @param {Array} fileList
 */
function updateUI(fileList) {
  const numberFiles = fileList.length;
  const totalSize = fileList.reduce((a, b) => a + b.size, 0);
  const textNodes = [
    document.createTextNode(`Number of documents ${numberFiles}`),
    document.createTextNode(
      `Number of space used: ${Math.round(totalSize / 1024)} kB`
    ),
  ];
  const pNodes = [document.createElement("p"), document.createElement("p")];
  pNodes[0].appendChild(textNodes[0]);
  pNodes[1].appendChild(textNodes[1]);
  document
    .getElementById("dynamic-data")
    .appendChild(pNodes[0])
    .appendChild(pNodes[1]);
  updateBarChart(fileList);
  updatePieChart(fileList);
}
/**
 *
 * @param {Array} array
 */
function updatePieChart(array) {
  const labelsNumber = array.reduce((labels, value) => {
    if (labels[value.extension] === undefined) {
      labels[value.extension] = 0;
    }
    labels[value.extension]++;
    return labels;
  }, {});
  const ctx = document.getElementById("pieChart");
  new Chart(ctx, {
    type: "pie",
    options: {
      maintainAspectRatio: false,
    },
    data: {
      labels: Object.keys(labelsNumber),
      datasets: [
        {
          label: "Extension",
          data: Object.values(labelsNumber),
        },
      ],
    },
  });
}

/**
 *
 * @param {Array} array
 */
function updateBarChart(array) {
  const labelsSize = array.reduce((labels, value) => {
    if (labels[value.extension] === undefined) {
      labels[value.extension] = 0;
    }
    labels[value.extension] += value.size;
    return labels;
  }, {});
  const ctx = document.getElementById("barChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(labelsSize),
      datasets: [
        {
          label: "Size of files with extension",
          data: Object.values(labelsSize),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
