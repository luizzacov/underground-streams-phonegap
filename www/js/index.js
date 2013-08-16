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

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var fs; // file system

var app = {
    // Application Constructor
    initialize: function() {
    	alert("initialize");
        this.bindEvents();    
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
        //app.receivedEvent('deviceready');
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
        
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        
        navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError);
        
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
        	alert(jsonObj.nearbyStations[0].STOP_NAME);
        	for (var i=0; i<jsonObj.nearbyStations.length; i++)
			{
				var url = "http://underground-streams-dev.elasticbeanstalk.com/api/getContentByStop/" + jsonObj.nearbyStations[i].STOP_ID;
				$.getJSON(url,
					function(stationContent) {
						//$("#apiTest").append("<p>" + stationContent + "</p>");
							
							
							
					}
				);
			}
        		
        }
    );
    
    // camera
    /*navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 50,
    	destinationType: destinationType.DATA_URL
	});*/
    
    
};

// onError Callback receives a PositionError object
//
function onPositionError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function launchCamera() {
	/*navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 50,
    	destinationType: destinationType.DATA_URL
	});*/
	
	navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 1 });
	
}


function onCameraSuccess(imageData) {
    /*var image = document.getElementById('myImage');
    image.style.display = 'block';
    image.src = "data:image/jpeg;base64," + imageData;*/
    //image.src = imageData;
    uploadFile(imageData);
}

function onCameraFail(message) {
   	alert('Failed because: ' + message);
}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {    
    //uploadFile(mediaFiles[0]);
    //alert("capture success")
    //alert(window.location.hash);
    var folderName = fs.root.name + "/underground-streams-test";
    //entry.getDirectory("underground-streams-test", {create: true, exclusive: true}, moveFile, onGetDirectoryFail);
    mediaFiles[0].moveTo(folderName, onFileMoveSuccess, onFileMoveFail);
    window.location.hash = "#participate-submit";
    //alert(window.location.hash);
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// Upload files to server
function uploadFile(mediaFile) {
    path = mediaFile.fullPath;
    name = mediaFile.name;
    
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=mediaFile.name;
    options.mimeType="image/jpeg";

    var params = new Object();
    params.fullpath = path;
    params.name = name;

    options.params = params;
    options.chunkedMode = true;
    
    var ft = new FileTransfer();
    ft.upload( path, "http://underground-streams-dev.elasticbeanstalk.com/api/uploadContent",
        function(result) {
			//upload successful
			alert("upload success");           
        },
        function(error) {
            //upload unsuccessful, error occured while upload. 
            alert("upload fail");
        },
        options
        );
}


function onFileSystemSuccess(fileSystem) {
	//$("#apiTest").append("<p>fs success</p>");
	fs = fileSystem;
	var entry = fs.root;
    entry.getDirectory("underground-streams-test", {create: true, exclusive: true}, onGetDirectorySuccess, onGetDirectoryFail);
    alert(fileSystem.name);
    alert(fileSystem.root.name);
}

function onFileSystemFail(evt) {
    alert(evt.target.error.code);
}

function onGetDirectorySuccess(dir) { 
      alert("Created dir "+dir.name); 
} 

function onGetDirectoryFail(error) { 
     alert("Error creating directory "+error.code);
     if (error.code == 12)
     {
     	alert("file path already exists");
     }
}

function onFileMoveSuccess(entry) {
    alert("New Path: " + entry.fullPath);
}

function onFileMoveSuccess(error) {
    alert(error.code);
}


