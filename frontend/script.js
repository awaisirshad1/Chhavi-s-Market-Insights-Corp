'use strict';

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

var tradesList = [
                   {
                     "trader": "Edward",
                     "amount": 1750,
                     "price": 7220,
                     "time": "2024-01-26T00:15:12.000+00:00",
                     "ticker": "AAPL"
                   },
                   {
                     "trader": "Bob",
                     "amount": 2590,
                     "price": 8590,
                     "time": "2024-06-08T23:15:12.000+00:00",
                     "ticker": "MSFT"
                   },
                   {
                     "trader": "Alice",
                     "amount": 5990,
                     "price": 6350,
                     "time": "2023-08-09T23:15:12.000+00:00",
                     "ticker": "AMZN"
                   },
                   {
                     "trader": "Alice",
                     "amount": 6590,
                     "price": 6160,
                     "time": "2023-09-22T23:15:12.000+00:00",
                     "ticker": "TSLA"
                   },
                   {
                     "trader": "Alice",
                     "amount": 1880,
                     "price": 14270,
                     "time": "2024-03-15T23:15:12.000+00:00",
                     "ticker": "AAPL"
                   },
                   {
                     "trader": "Edward",
                     "amount": 7900,
                     "price": 3270,
                     "time": "2023-07-24T23:15:12.000+00:00",
                     "ticker": "AAPL"
                   }
                 ];

inputStats(tradesList);

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
    var statsComments = ["total shares traded", "total value of shares traded", "companies traded on CMIC"];

    var stats = document.getElementsByClassName("statsValue");
    for (let i = 0; i < stats.length; i++) {
        stats[i].innerHTML = statsValue[i];
    }

    var stats = document.getElementsByClassName("statsComment");
    for (let i = 0; i < stats.length; i++) {
        stats[i].innerHTML = statsComments[i];
    }
}

