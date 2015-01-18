/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var main = new UI.Card({
  title: 'Uber 4 Pebble',
  icon: 'images/menu_icon.png',
  //subtitle: '',
  body: 'Press select to order an Uber X.'
});

var longitude = 0;
var latitude = 0;
var data = {};

function getLocation() {
		navigator.geolocation.getCurrentPosition(function(position) {
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;
			console.log(longitude,latitude);
            data = {"longitude": longitude, "latitude": latitude};
            console.log("DATA FILES IN GEO FUNCTION:"+ JSON.stringify(data));
        });
}            

main.show();

main.on('click', 'select', function(e) {
    /*
    var menu = new UI.Menu({
    sections: [{
        title: 'UBER MENU',
        items: [{
            title: 'Order Uber',
            icon: 'images/item_icon.png'
        }, {
            title: 'Cancel Uber',
        }, {
            title: "help I'm a pleeb",
        }]
    }]
    });
    */
    //menu.show();
    
    Vibe.vibrate('long');
    var wind = new UI.Window();
    var textfield = new UI.Text({
        position: new Vector2(0, 50),
        size: new Vector2(144, 30),
        font: 'gothic-18-bold',
        text: 'An uber is on your way!',
        textAlign: 'center'
    });
    
    wind.add(textfield);
    wind.show();
    
    getLocation();
    
    console.log("This is the data:"+ data);
        // Send post request to my server        
        ajax({
            method: 'post',
            type: 'json',
            url: 'http://uberme.cloudapp.net/api/test',
            data: data,
        },
        function(success){
            console.log("it worked!");  
        },
        function(error){
            console.log("it didn't work here's why: " + error);
        }
      );
    
    wind.on('click', 'down', function(e) {
        var card = new UI.Card();
        card.title('Cancel');
        card.subtitle('Are you sure?');
        card.body('Press select to cancel ride');
        card.show();
      
        card.on('click', 'select', function(e){
            Vibe.vibrate('long');    
            card.hide();
            wind.hide();
            // Cancel Uber Post request
        });
    });
    
});