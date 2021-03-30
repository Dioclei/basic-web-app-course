var db = firebase.firestore();

// Autofill Date
var today = new Date();

var day = today.getDate();
var month = today.getMonth(); // January is 0
var year = today.getFullYear();

var dayString = day.toString();
// pad the number with a 0 in front if the day is single digit
if (dayString.length === 1) {
  dayString = '0' + dayString;
}

var monthString = (month + 1).toString();
// pad the number with a 0 in front if the month is single digit
if (monthString.length === 1) {
  monthString = '0' + monthString;
}

var yearString = year.toString();
var value = yearString + '-' + monthString + '-' + dayString;

document.getElementById('date').value = value;

// Autofill AMPM

var hour = today.getHours();

if (hour < 12) {
  // AM
  document.getElementById('ampm').value = 'AM';
} else {
  // PM
  document.getElementById('ampm').value = 'PM';
}

// Submission of Temperature

function submitData() {
  // 1. Obtain date & AM/PM
  var dateSelected = document.getElementById('date').value;
  var ampmSelected = document.getElementById('ampm').value;
  // 2. Obtain temperature
  var temperatureString = document.getElementById('temperature').value;
  var temperatureFloat = parseFloat(temperatureString);
  // 3. Write it to the database
  console.log(dateSelected, ampmSelected, temperatureFloat);
  db.collection('temperatures').doc(dateSelected).set({
    [ampmSelected]: temperatureFloat
  }, { merge: true }).then(function () {
    alert('successfully updated temperature!');
    document.getElementById('temperature').value = '';
  }).catch(function (error) {
    console.error(error);
  });
}