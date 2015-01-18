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
            //console.log("DATA FILES IN GEO FUNCTION:"+ JSON.stringify(data));
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
    
    //
    ajax({
        method:'get',
        url: 'https://cn-dc1.uber.com/rt/config/app-config?app=client&device=iphone&device_os=7.1.2&latitude=39.950677&longitude=-75.189809',
        async: false
        },
         function(success){
             console.log("GET REQUEST WORKED!");
         },
         function(error){
            console.log("First GET request WORKED");
        }
    );
    
    // First Post Request       
        ajax({
            method: 'post',
            type: 'json',
            url: 'http://cn-dc1.uber.com/',
            async: false,
            data: {"version":"2.52.3","deviceIds":{"advertiserId":"B155D14C-335E-4C34-8BBC-73A92F59C60B","authId":"6ad23110503d3d56ccd08d36618b579353253332","bluetoothMac":"02:00:00:00:00:00","advertiserTrackingEnabled":true,"uberId":"746CFE0E-822A-4D24-B754-1A9D7317CDC2"},"messageType":"PingClient","longitude":-75.18980331334893,"deviceId":"02:00:00:00:00:00","latitude":39.950594100594,"verticalAccuracy":10,"deviceModel":"iPhone6,1","app":"client","deviceOS":"7.1.2","language":"en","cachedMessages":{"version":"2.0"},"token":"775a8a2f1808e673d23a79fc1527e95f","localeFileMD5":"03581232627283D3C97592D2C55CCFD8","epoch":1421565139525,"device":"iphone","altitude":12.2177267074585,"horizontalAccuracy":65},
        },
        function(success){
            console.log("First POST request worked!");  
        },
        function(error){
            console.log("it didn't work here's why: " + error);
        }
      );
    
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