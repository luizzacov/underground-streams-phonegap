/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var jsonObj = {};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        
        
        // comment out next line when deploying
        //app.receivedEvent('deviceready');
        
        // move this to onDeviceReady when deploying
        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
        
        //$.getJSON("http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations?lat=40.684153&lon=-73.977814",
        /*$.getJSON("http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations?lat=40.878932&lon=-73.904901",
        	function(nearbyStations) {
        		//alert(data);
        		jsonObj.nearbyStations = nearbyStations;
        		//alert(jsonObj.nearbyStations[0].STOP_NAME);
        		for (var i=0; i<jsonObj.nearbyStations.length; i++)
				{
					var url = "http://underground-streams-dev.elasticbeanstalk.com/api/getContentByStop/" + jsonObj.nearbyStations[i].STOP_ID;
					$.getJSON(url,
						function(stationContent) {
							$("#apiTest").append("<p>" + stationContent + "</p>");
							
							
							
						}
					);
				}
        		
        	}
        );*/
        
        /*$.getJSON("http://underground-streams-dev.elasticbeanstalk.com/api/getContentByLine/1",
        	function(data) {
        		//$.each(data, function(key, val) {alert(key + " " + val});
        		$("#apiTest").append("<p>" + data[0].stop_ID + "</p>");
        		//alert(data);
        	}
        );*/
        
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        
        navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);
        
        /*$.getJSON("http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations?lat=40.878932&lon=-73.904901",
        	function(nearbyStations) {
        		//alert(data);
        		jsonObj.nearbyStations = nearbyStations;
        		//alert(jsonObj.nearbyStations[0].STOP_NAME);
        		for (var i=0; i<jsonObj.nearbyStations.length; i++)
				{
					var url = "http://underground-streams-dev.elasticbeanstalk.com/api/getContentByStop/" + jsonObj.nearbyStations[i].STOP_ID;
					$.getJSON(url,
						function(stationContent) {
							$("#apiTest").append("<p>" + stationContent + "</p>");
							
							
							
						}
					);
				}
        		
        	}
        );*/
        
        
        //var url = 'http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations';
        //var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        
        

	    /*jQuery(document).ready(function() {
	        $.getJSON(flickerAPI, {
		        tags: "pizza",
		        format: "json"
	        })
	        .done(function( data ) {
			    $.each( data.items, function( i, item ) {
			      $( "<img/>" ).attr( "src", item.media.m ).appendTo( "#images" );
			      if ( i === 3 ) {
			        return false;
			      }
			    });
			});
		});*/
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onPositionSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
    
    
    var str = "http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;      
    alert(str);
    $.getJSON("http://underground-streams-dev.elasticbeanstalk.com/api/nearbyStations?lat=40.878932&lon=-73.904901",
    //$.getJSON(str,
        function(nearbyStations) {
        	//alert(data);
        	jsonObj.nearbyStations = nearbyStations;
        	//alert(jsonObj.nearbyStations[0].STOP_NAME);
        	for (var i=0; i<jsonObj.nearbyStations.length; i++)
			{
				var url = "http://underground-streams-dev.elasticbeanstalk.com/api/getContentByStop/" + jsonObj.nearbyStations[i].STOP_ID;
				$.getJSON(url,
					function(stationContent) {
						$("#apiTest").append("<p>" + stationContent + "</p>");
							
							
							
					}
				);
			}
        		
        }
    );
};

// onError Callback receives a PositionError object
//
function onPositionError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}




function onFileSystemSuccess(fileSystem) {
	$("#apiTest").append("<p>fs success</p>");
    alert(fileSystem.name);
    alert(fileSystem.root.name);
}

function onFileSystemfail(evt) {
    alert(evt.target.error.code);
}
