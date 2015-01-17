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

main.show();

main.on('click', 'select', function(e) {
  
    Vibe.vibrate('long');
    var wind = new UI.Window();
    var textfield = new UI.Text({
        position: new Vector2(0, 50),
        size: new Vector2(144, 30),
        font: 'gothic-18-bold',
        title: 'An uber is on your way!',
        textAlign: 'center'
    });
    
    wind.add(textfield);
    wind.show();
    
    var butt = {"test": "ok"};
        ajax({
            method: 'post',
            type: 'json',
            url: 'http://uberme.cloudapp.net/api/test',
            data: butt,
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
            card.hide();
            Vibe.vibrate('long');      
            var newCard = new UI.Card();
            newCard.title("RIDE CANCLED");
            newCard.body('Thanks for using Uber for pebble anyway!');
        });
    });
});