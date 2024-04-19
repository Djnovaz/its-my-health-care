document.getElementById('display-schedule').addEventListener('click', function() {
  var scheduleContainer = document.getElementById('schedule-container');
  scheduleContainer.innerHTML = '';
  var table = document.createElement('table');
  table.innerHTML = '<thead><tr><th></th></tr></thead><tbody></tbody>';
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var meals = ['breakfast', 'lunch', 'dinner', 'snack'];
  meals.forEach(function(meal) {
    var row = table.tBodies[0].insertRow();
    var cell = row.insertCell();
    cell.textContent = meal.charAt(0).toUpperCase() + meal.slice(1);
    days.forEach(function(day) {
      var input = document.querySelector('input[data-day="' + day + '"][data-meal="' + meal + '"]');
      var cell = row.insertCell();
      if (input.value) {
        cell.textContent = input.value;
      } else {
        cell.textContent = '-';
      }
    });
  });
  scheduleContainer.appendChild(table);
});

document.querySelectorAll('.meal-input').forEach(function(input) {
  input.addEventListener('input', function() {
    var row = input.parentNode.parentNode;
    var day = row.querySelector('td:first-child').textContent;
    var pocket = localStorage.getItem('dietSchedule-' + day);
    if (!pocket) {
      pocket = {};
    } else {
      pocket = JSON.parse(pocket);
    }
    pocket[input.dataset.meal] = input.value;
    localStorage.setItem('dietSchedule-' + day, JSON.stringify(pocket));
  });
});

days.forEach(function(day) {
  var pocket = localStorage.getItem('dietSchedule-' + day);
  if (pocket) {
    pocket = JSON.parse(pocket);
    Object.entries(pocket).forEach(function([meal, value]) {
      var input = document.querySelector('input[data-day="' + day + '"][data-meal="' + meal + '"]');
      if (input) {
        input.value = value;
      }
    });
  }
});