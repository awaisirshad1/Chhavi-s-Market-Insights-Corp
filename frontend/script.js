'use strict';

document.addEventListener("DOMContentLoaded", function() {
  fetchTransactions();
  document.getElementById('filterButton').addEventListener('click', filterData);
});

let staticData = new Array();

async function fetchTransactions() {
  const url = 'http://localhost:8080/trades'
  try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      staticData = data;
      console.log('Data loaded:', staticData); 
      populateFilterOptions(staticData)
      displayData(staticData)
  } catch (error) {
      console.error('Error fetching transactions:', error);
      displayMessage('Failed to load data'); 
  }
}


function displayMessage(message) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
}

function populateFilterOptions(data) {
  const buyers = new Set();
  const tickers = new Set();

  data.forEach(item => {
      buyers.add(item.trader);
      tickers.add(item.ticker);
  });

  // buyers = Array.from(buyers).sort();
  // traders = Array.from(traders).sort();

  const buyerSelect = document.getElementById('buyer');
  const tickerSelect = document.getElementById('ticker');

  buyers.forEach(buyer => {
      const option = document.createElement('option');
      option.value = buyer;
      option.textContent = buyer;
      buyerSelect.appendChild(option);
  });

  tickers.forEach(ticker => {
      const option = document.createElement('option');
      option.value = ticker;
      option.textContent = ticker;
      tickerSelect.appendChild(option);
  });
}

function filterData() {
  const buyer = document.getElementById('buyer').value;
  const amountOperator = document.getElementById('amount-operator').value;
  const amount = document.getElementById('amount').value;
  const priceOperator = document.getElementById('price-operator').value;
  const price = document.getElementById('price').value;
  const timeFrom = document.getElementById('time-from').value;
  const timeTo = document.getElementById('time-to').value;
  const ticker = document.getElementById('ticker').value;

  let filteredData = staticData;

  if (buyer) {
      console.log(buyer);
      filteredData = filteredData.filter(item => item.trader === buyer);
  }

  if (amount) {
      filteredData = filteredData.filter(item => {
          if (amountOperator === '>') return item.amount > amount;
          if (amountOperator === '<') return item.amount < amount;
          if (amountOperator === '=') return item.amount == amount;
      });
  }

  if (price) {
      filteredData = filteredData.filter(item => {
          if (priceOperator === '>') return item.price > price;
          if (priceOperator === '<') return item.price < price;
          if (priceOperator === '=') return item.price == price;
      });
  }

  if (timeFrom) {
      const fromDate = new Date(timeFrom);
      filteredData = filteredData.filter(item => new Date(item.time) >= fromDate);
  }

  if (timeTo) {
      const toDate = new Date(timeTo);
      filteredData = filteredData.filter(item => new Date(item.time) <= toDate);
  }

  if (ticker) {
      filteredData = filteredData.filter(item => item.ticker === ticker);
  }

  console.log("Filter applied");
  console.log(filteredData.length);
  displayData(filteredData);
}


function displayData(data) {
  buildTable(data);
  inputStats(data);
}

function buildTable(data) {
  var table = document.getElementById("tableBody")
  // clear current content
  table.innerHTML = '';
  
  for(var i=0; i<data.length;i++){
    // Parse the date string to a Date object
    const date = new Date(data[i].time);

    // Format the date to a suitable format
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    var row = `
    <tr>
                <td>
                ${data[i].trader}
                </td>
                <td>
                ${data[i].ticker}
                </td>
                <td class="num">
                ${data[i].amount}
                </td>     
                <td class="num">
                ${data[i].price}
                </td>
                <td class="time">
                ${formattedDate}
                </td>
    </tr>
    `
    table.innerHTML+=row
  }

}


class SortableTable {
  constructor(tableNode) {
    this.tableNode = tableNode;

    this.columnHeaders = tableNode.querySelectorAll('thead th');

    this.sortColumns = [];

    for (var i = 0; i < this.columnHeaders.length; i++) {
      var ch = this.columnHeaders[i];
      var buttonNode = ch.querySelector('button');
      if (buttonNode) {
        this.sortColumns.push(i);
        buttonNode.setAttribute('data-column-index', i);
        buttonNode.addEventListener('click', this.handleClick.bind(this));
      }
    }

    this.optionCheckbox = document.querySelector(
      'input[type="checkbox"][value="show-unsorted-icon"]'
    );

    if (this.optionCheckbox) {
      this.optionCheckbox.addEventListener(
        'change',
        this.handleOptionChange.bind(this)
      );
      if (this.optionCheckbox.checked) {
        this.tableNode.classList.add('show-unsorted-icon');
      }
    }
  }

  setColumnHeaderSort(columnIndex) {
    if (typeof columnIndex === 'string') {
      columnIndex = parseInt(columnIndex);
    }

    for (var i = 0; i < this.columnHeaders.length; i++) {
      var ch = this.columnHeaders[i];
      var buttonNode = ch.querySelector('button');
      if (i === columnIndex) {
        var value = ch.getAttribute('aria-sort');
        if (value === 'descending') {
          ch.setAttribute('aria-sort', 'ascending');
          this.sortColumn(
            columnIndex,
            'ascending',
            ch.classList.contains('num')
          );
        } else {
          ch.setAttribute('aria-sort', 'descending');
          this.sortColumn(
            columnIndex,
            'descending',
            ch.classList.contains('num')
          );
        }
      } else {
        if (ch.hasAttribute('aria-sort') && buttonNode) {
          ch.removeAttribute('aria-sort');
        }
      }
    }
  }

  sortColumn(columnIndex, sortValue, isNumber) {
    function compareValues(a, b) {
      if (sortValue === 'ascending') {
        if (a.value === b.value) {
          return 0;
        } else {
          if (isNumber) {
            return a.value - b.value;
          } else {
            return a.value < b.value ? -1 : 1;
          }
        }
      } else {
        if (a.value === b.value) {
          return 0;
        } else {
          if (isNumber) {
            return b.value - a.value;
          } else {
            return a.value > b.value ? -1 : 1;
          }
        }
      }
    }

    if (typeof isNumber !== 'boolean') {
      isNumber = false;
    }

    var tbodyNode = this.tableNode.querySelector('tbody');
    var rowNodes = [];
    var dataCells = [];

    var rowNode = tbodyNode.firstElementChild;

    var index = 0;
    while (rowNode) {
      rowNodes.push(rowNode);
      var rowCells = rowNode.querySelectorAll('th, td');
      var dataCell = rowCells[columnIndex];

      var data = {};
      data.index = index;
      data.value = dataCell.textContent.toLowerCase().trim();
      if (isNumber) {
        data.value = parseFloat(data.value);
      }
      dataCells.push(data);
      rowNode = rowNode.nextElementSibling;
      index += 1;
    }

    dataCells.sort(compareValues);

    // remove rows
    while (tbodyNode.firstChild) {
      tbodyNode.removeChild(tbodyNode.lastChild);
    }

    // add sorted rows
    for (var i = 0; i < dataCells.length; i += 1) {
      tbodyNode.appendChild(rowNodes[dataCells[i].index]);
    }
  }


  handleClick(event) {
    var tgt = event.currentTarget;
    this.setColumnHeaderSort(tgt.getAttribute('data-column-index'));
  }

  handleOptionChange(event) {
    var tgt = event.currentTarget;

    if (tgt.checked) {
      this.tableNode.classList.add('show-unsorted-icon');
    } else {
      this.tableNode.classList.remove('show-unsorted-icon');
    }
  }
}

// Initialize sortable table buttons
window.addEventListener('load', function () {
  var sortableTables = document.querySelectorAll('table.sortable');
  for (var i = 0; i < sortableTables.length; i++) {
    new SortableTable(sortableTables[i]);
  }
});

function inputStats(tradesList) {
    var totalShares = 0;
    var totalTradeValue = 0;
    var totalEntities = new Set();

    for (const trade of tradesList) {
      totalShares += trade["amount"];
      totalTradeValue += trade["amount"] * trade["price"];
      totalEntities.add(trade["ticker"]);
    }

    var numEntities = totalEntities.size;

    var statsValue = [totalShares, totalTradeValue, numEntities];
    var statsComments = ["Shares", "Value of Shares", "Companies Traded"];

    var stats = document.getElementsByClassName("statsValue");
    for (let i = 0; i < stats.length; i++) {
        stats[i].innerHTML = statsValue[i];
    }

    var stats = document.getElementsByClassName("statsComment");
    for (let i = 0; i < stats.length; i++) {
        stats[i].innerHTML = statsComments[i];
    }
}


Highcharts.chart('container', {

  title: {
      text: 'Stock Prices',
      align: 'left'
  },

  yAxis: {
      title: {
          text: 'Price ($)'
      }
  },

  xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
                 month: '%b %Y' // Example format: Jan 2023
             },
        min: Date.UTC(2023, 5, 1),
        max: Date.UTC(2024, 5, 30)


  },

//  legend: {
//      layout: 'vertical',
//      align: 'right',
//      verticalAlign: 'middle'
//  },

  plotOptions: {
      series: {
          pointStart: Date.UTC(2023, 5, 1),
          pointInterval: 24 * 3600 * 1000 * 30
               }
      },

  series: [{
      name: 'Microsoft',
      data: [
          10, 23, 54, 63, 23, 56, 34, 23, 54, 34, 62, 33, 12, 34
      ]
  }, {
      name: 'Amazon',
      data: [
          20, 43, 54, 83, 22, 46, 38, 34, 23, 56, 34, 54, 22, 45
      ]
  }, {
      name: 'Google',
      data: [
          50, 22, 14, 63, 33, 26, 44, 23, 22, 11, 44, 33, 24, 54
      ]
  }, {
      name: 'Tesla',
      data: [
          30, 66, 33, 23, 54, 12, 45, 45, 33, 23, 54, 33, 11, 23
      ]
  }, {
      name: 'Apple',
      data: [
          54, 23, 45, 34, 55, 33, 12, 41, 39, 48, 54, 23, 48, 34
      ]
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }

});

Highcharts.chart('pie-container', {
  chart: {
      type: 'pie'
  },
  title: {
      text: 'Market Composition'
  },
  tooltip: {
      valueSuffix: '%'
  },
  // subtitle: {
  //     text:
  //     ''
  // },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  series: [
      {
          name: 'Percentage',
          colorByPoint: true,
          data: [
              {
                  name: 'Microsoft',
                  y: 55.02
              },
              {
                  name: 'Amazon',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'Google',
                  y: 1.09
              },
              {
                  name: 'Tesla',
                  y: 15.5
              },
              {
                  name: 'Apple',
                  y: 1.68
              }
          ]
      }
  ]
});
