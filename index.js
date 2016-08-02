/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
 
var answerz = [];
var counter = 0;
var firstcount = '15';
var APP_ID = undefined; //optional ~ replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Twitter = function () {
	AlexaSkill.call(this, APP_ID);
};

/** Extend AlexaSkill */
Twitter.prototype = Object.create(AlexaSkill.prototype);
Twitter.prototype.constructor = Twitter;
Twitter.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
	// any initialization logic goes here
};
Twitter.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
	var speechOutput = "Welcome to the Alexa Skills Kit, you can ask for Tweets to be read";
	var repromptText = "You can say Read tweets for username";
	response.ask(speechOutput, repromptText);
};
Twitter.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
	counter=0;
	// any cleanup logic goes here
};
Twitter.prototype.intentHandlers = {
	// register custom intent handlers
	"TwitterIntent": function (intent, session, response) {
		counter=0;
		var user = intent.slots.userName.value; 
		str = user.replace(/\s/g,'');
		var error = function (err, response, body) {
			console.log('ERROR [%s]', err);
		};
		var success = function (result) {
		var tweet;
		var username;
		var amount = JSON.parse(result).length;
		var i;
		var answer = new Array(amount);
		var response1;
		for (i=0; i<amount; i++) {
				try {
					tweet = JSON.parse(result)[i].text;
					var t = tweet.split("http");
					tweet = t[0];
					username = JSON.parse(result)[i].user.screen_name;
					response1 = username + " tweeted... " + tweet;
					answer[i] = response1;
					console.log("answer[" + i + "]" + " = " + answer[i]);
					answerz[i] = answer[i];
				}
				catch (err) {
					return;
				}
			}
			response.ask(answerz[counter]+ "... Would you like another tweet?");
			counter++;
		}
		var Twitter = require('twitter-node-client').Twitter;

		//Get this data from your twitter apps dashboard
		//TODO: Keys go here from Twitter app
		var config = {
			"consumerKey": "",
			"consumerSecret": "",
			"accessToken": "",
			"accessTokenSecret": "",
			"callBackUrl": ""
		}

		var twitter = new Twitter(config);


		//Example calls
		twitter.getUserTimeline({ screen_name: str, count: firstcount}, error, success);
	},
	
	"MoreIntent": function(intent,session,response) {
		var countint = parseInt(firstcount);
		if(counter<countint){
		response.ask(answerz[counter] + ".....  Would you like another tweet?");
		counter++;
		}
		else{
			response.tellWithCard("No More Tweets.","Twit", "No More Tweets.");
		}
	},
	
	"AMAZON.HelpIntent": function (intent, session, response) {
		response.ask("You can say Read Tweets for username!");
	},
	
	"AMAZON.StopIntent": function (intent, session, response) {
		counter=0;
		var speechOutput = "Goodbye";
		response.tell(speechOutput);
	},

	"AMAZON.CancelIntent": function (intent, session, response) {
		counter=0;
		var speechOutput = "Goodbye";
		response.tell(speechOutput);
	},
	
	"QuitIntent": function (intent, session, response) {
		counter=0;
		var speechOutput = "Goodbye";
		response.tell(speechOutput);
	}
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
	var twitter = new Twitter();
	twitter.execute(event, context);
};

function getMessages(user){
	var error = function (err, response, body) {
		console.log('ERROR [%s]', err);
	};
	var success = function (result) {
		console.log("sucess2");
		//console.log(result);
		var tweet;
		var username;
		//console.log(username + " tweeted " + tweet);
		var answer = new Array(amount);
		var amount = JSON.parse(result).length;
		var i;
		var response;
		for (i=0; i<amount; i++) {
			try {
				tweet = JSON.parse(result)[i].text;
				username = JSON.parse(result)[i].user.screen_name;
				response = username + " tweeted " + tweet;
				answer[i] = response;
				answerz[i] = answer[i];
			}
			catch (err) {
				return;
			}
		}
		console.log("answerz[1] = " + answerz[1]);
	}
	var Twitter = require('twitter-node-client').Twitter;

	//Get this data from your twitter apps dashboard
	//TODO: Keys go here from Twitter app
	var config = {
		"consumerKey": "",
		"consumerSecret": "",
		"accessToken": "",
		"accessTokenSecret": "",
		"callBackUrl": ""
	}

	var twitter = new Twitter(config);

