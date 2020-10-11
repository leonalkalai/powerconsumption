"use strict";

const devicesDiv = document.querySelector("#devices");
const devicesResponseDiv = document.querySelector("h2");
const resultResponseDiv = document.querySelector("#result");
let devicesResponse = "";
let resultResponse = "";
let waitresponse = "Please wait";
devicesDiv.innerHTML = devicesResponse;
devicesResponseDiv.innerHTML = waitresponse;
const selectDiv = document.querySelector("select");
function getDevices() {
  //fetch(`https://my-json-server.typicode.com/leonalkalai/demo/db`, {
  fetch(`https://leonalkalai.github.io/powerconsumption/db.json`,
   { method: "GET"}
   )
    .then((response) => response.json())
      .then(
      json => {
        var jsondevices = json.devices;
        selectDiv.innerHTML=
        '<option value="*" disabled="" selected="">Select something</option>'+
        jsondevices.map(
        device =>
        `<option id="${device.title}" 
        value="${device.minimum.toString().slice(0,-1)}
        ">${device.title}</option> `
        ).join("")

      } 
      )
    .then(setDevicesText())
    .catch((error) => (devicesDiv.innerHTML(error) = "error"));
}

function setDevicesText() {
  devicesDiv.innerHTML = devicesResponse;
}
function setWaitText() {
  devicesResponseDiv.innerHTML = waitresponse;
}


getDevices();


$('select').change(function() { //on change do stuff
  $('.box').remove(); //hide all with .box class
  var x = $(this).val()*0.0001;
  var selectOption = $('option:selected',this).text();
  var y = (selectOption).replace(/ /g,'');
  console.log(y)
  $('#result').empty().append('<span class="arrowspan bounce"></span>'+'<h2>'+selectOption+'</h2>'+"has power consumption");
  
  var $headerh2 = $('#result > h2'); 
  /*
  if ($headerh2.text().indexOf('TV') > -1) {
      $('#devices').empty().append('<span class="boxicon"><img src="img/tv.svg" alt="logo" class="item responsive"></span>');  
  }
  else if ($headerh2.text().indexOf('Fridge') > -1) {
      $('#devices').empty().append('<span class="boxicon"><img src="img/fridge.svg" alt="logo" class="item responsive"></span>');
   
  }
  else if ($headerh2.text().indexOf('radio') > -1) {
    $('#devices').empty().append('<span class="boxicon"><img src="img/radio.svg" alt="logo" class="item responsive"></span>');
 
}
  else{
    $('#devices').empty();
  }
 */





$('#devices').empty().append('<div class="boxicon"></div>');

var boxtext = {
  'Laptop': 'laptop',
  'TV': 'tv',
  'Fridge': 'fridge',
  'Radio': 'radio',
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
var found, key;
$headerh2.each(function () {
    found = false;
    for (key in boxtext) {
        if ($(this).text().indexOf(key) > -1) {
            found = true;
            $('#devices').empty().append('<span class="boxicon"><img src="img/' + boxtext[key] + '.svg" alt="logo" class="item responsive"></span>');
        }
    }
    if (!found) $('#devices').empty().append('<span class="boxicon"></span>');
    //if (!found) $('#devices').empty();
});
 

  $('.boxicon').append('<div class="box">'+x.toFixed(4).toLocaleString() + ' €/hour'+'</div>');
  $('div.container.item > h2').hide();


});

$.getJSON("https://leonalkalai.github.io/powerconsumption/db.json")
    .done(function( data ) {
       console.log(data)
    });