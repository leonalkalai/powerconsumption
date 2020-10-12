"use strict";

const devicesDiv = document.querySelector("#devices"); // select element with id devices
const devicesResponseDiv = document.querySelector("h2"); //select element h2
const resultResponseDiv = document.querySelector("#result"); //select element with id result
const selectDiv = document.querySelector("select"); // select element "select"
let devicesResponse = ""; //declare devices response as empty string
let resultResponse = "";  //declare result response as empty string
let waitresponse = "Please wait"; // declare wait response
devicesDiv.innerHTML = devicesResponse; // set html of #devices as devicesresponse
devicesResponseDiv.innerHTML = waitresponse; // set html of #result as waitresponse

function getDevices() { //function fetch
  fetch(`https://leonalkalai.github.io/powerconsumption/db.json`, //fetch link
   { method: "GET"}, // method get
   )
    .then((response) => response.json()) //set response to json
      .then( 
        json => {
              var jsondevices = json.devices; //set a variable for object to loop through
                selectDiv.innerHTML= //set new html of select
                '<option value="*" disabled="" selected="">Select device</option>'+ //option description as disabled to select 
                  jsondevices.map( //loop through object
                  device => //each device of json.devices has device->id with value title || title json field || value = device.minimum field converted to string and after cut off last character "W" to get only numeric value
                    `<option id="${device.title}"  
                    value="${device.minimum.toString().slice(0,-1)}
                    ">${device.title}</option> `
                  ).join("");
          } 
      )
    .then(setDevicesText()) // execute function to set devices div html for json response
    .catch(err => devicesResponseDiv.innerHTML = err);// if not fetch error
} //end function fetch

// function to set devices div html for json response
function setDevicesText() {
  devicesDiv.innerHTML = devicesResponse;
}

// function to set result div html for json response
function setWaitText() {
  devicesResponseDiv.innerHTML = waitresponse;
}

getDevices(); // execute fetch

$('select').change(function() { //on change select do stuff
  $('.box').remove(); //remove div with box class

  // this is the calculation of Watt cost at euros per hour : 1KW = 0,10€ -> 1W = 0,10 /1000 -> 0,10 *0.0001
  var wattcostperhour = $(this).val()*0.0001; // selected value field /1000 watts   

  var selectOption = $('option:selected',this).text(); // get the selected option text
  
  //empty result div and append selected option
  $('#result').empty().append('<span class="arrowspan bounce"></span>'+'<h2>'+selectOption+'</h2>'+"has power consumption");
  
  // empty devices div and append a div with class box
  $('#devices').empty().append('<div class="boxicon"></div>');


    // array for append each values if value contains a string and set image name to the string value 
    var boxtext = {
      'Laptop': 'laptop',
      'TV': 'tv',
      'Fridge': 'fridge',
      'Radio': 'radio',
      'radio':'radio',
      'Phone': 'phone',
      'Computer': 'computer',
      'Playstation':'playstation',
      'Xbox':'xbox',
      'System':'system',
      'DVD':'dvd',
      'Projector':'projector',
      'Printer':'printer',
      'Microwave':'microwave',
      'Washing':'washing',
      'Projector':'projector',
      'Telephone':'telephone',
      'Oven':'oven',
      'Electric stove':'electricstove',
      'Vacuum':'vacuum', 
      'Hair':'hairdryer', 
      'Monitor':'monitor',
      'Drill':'drill',
      'Telephone':'telephone',
      'Sound':'sound',
      'Dehumidifier':'dehumidifier',
      'Camera':'camera',
      'Charger':'charger',
      'Gaming':'gaming',
      'Game':'game',
      'Air conditioner': 'airconditioner',
      'Bulb':'lightbulb',
      'Router':'router'

    };
    var $headerh2 = $('#result > h2'); // select element h2 of result div
    var found, key; 
    $headerh2.each(function () { // for each h2 elements
        found = false; // not found yet
        for (key in boxtext) { //for key in the array
            if ($(this).text().indexOf(key) > -1) { // if array text exists
                found = true; // now value is found
                $('#devices').empty().append('<span class="boxicon"><img src="img/' + boxtext[key] + '.svg" alt="logo" class="item responsive"></span>'); // append box div and set image name to the string value 
            }
        }
        if (!found) $('#devices').empty().append('<span class="boxicon"></span>');    //if not find value of the array then just append an empty box span
    });
 
  $('.boxicon').append('<div class="box">'+wattcostperhour.toFixed(4).toLocaleString() + ' €/hour'+'</div>'); //append box div ,display watt cost per hour with 4 decimal places and convert to string
  $('div.container.item > h2').hide(); // hide wait text 

});// end on change function

