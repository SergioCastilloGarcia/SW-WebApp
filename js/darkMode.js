var checkbox;

$(document).ready(function () {
  checkbox = document.getElementById("checkbox");
  //check storage if dark mode was on or off
  if (sessionStorage.getItem("mode") == "dark") {
    darkmode(); //if dark mode was on, run this funtion
  } else {
    nodark(); //else run this funtion
  }
});



function changeTheme() {
  if (checkbox.checked) {
    darkmode();
  } else {
    nodark();
  }
}

//function for checkbox when checkbox is checked
function darkmode() {
  $('body').addClass('dark');
  $('div').addClass('dark');
  checkbox.checked = true; //set checkbox to be checked state
  sessionStorage.setItem("mode", "dark"); //store a name & value to know that dark mode is on
}

//function for checkbox when checkbox is not checked
function nodark() {
  $('body').removeClass('dark');
  $('div').removeClass('dark');
  checkbox.checked = false; //set checkbox to be unchecked state
  sessionStorage.setItem("mode", "light"); //store a name & value to know that dark mode is off or light mode is on
}
