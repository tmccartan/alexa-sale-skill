/*global require, module, console */
const botBuilder = require('claudia-bot-builder'),
	  getIntentName = function (alexaPayload) {
		  'use strict';
		  return alexaPayload &&
			  alexaPayload.request &&
			  alexaPayload.request.type === 'IntentRequest' &&
			  alexaPayload.request.intent &&
			  alexaPayload.request.intent.name;
	  };
var rp = require('minimal-request-promise');

function getSales() {

  var womens =
    { "sales" : [
      "PRADA",
      "MOSCHINO",
      "HINDMARCH",
      "JJ BRAND"
    ]}
  var mens = {
    "sales" : [
      "NAKED AND FAMOUS",
      "GUCCI",
      "JACK SPADE",
      "TOMMY HILFIGER"
    ]
  }
  var sales = {
    womens,
    mens
  }
  // return rp.get('https://m.gilt.com/api/1.0/sales')
  //   .then(response => {
  //     console.log('We have'+ sales);
  //     return 'Gilt says that there are women sales, awesome';
  //   })
  //   .catch(function (err) {
  //     console.log('Got error: '+ e.message);
  //     return 'Oops, somethings not right'
  //   });
  return sales
}


const api = botBuilder((message, originalRequest) => {
		'use strict';
    originalRequest.lambdaContext.callbackWaitsForEmptyEventLoop = false
		console.log(originalRequest.body);
		// message.text has all intent placeholders joined together, for quick access
		if (getIntentName(originalRequest.body) === 'GetNewSales') {
			 // just return a text message to have it automatically packaged
			 // as a PlainText Alexa response, continuing the session
       //Get all active sales...

      return new Promise((resolve, reject) => {
         console.log('Go get some sales');
         resolve(getSales())
      }).then((data) => {
          console.log(data)
          var womensResponse  = "Today on Gilt, in womens we have sales for"
          for (var i in data.womens) {
            womensResponse = womensResponse + ", " + data.womens[i];
          }
					var mensResponse = "In mens, we have sales for "
					for (var i in data.mens) {
						mensResponse = mensResponse + ", " + data.mens[i];
					}
         console.log('then this ' + data)
         return womensResponse  + " , "+ mensResponse;
      });



		// you can use all the Alexa request properties from originalRequest.body
		}
    else if (getIntentName(originalRequest.body) === 'ExitApp'){
		// 	// return a JavaScript object to set advanced response params
		// 	// this prevents any packaging from bot builder and is just
		// 	// returned to Alexa as you specify
		 	return {
		 		response: {
		 			outputSpeech: {
		 				type: 'PlainText',
		 				text: 'Bye from Gilt!'
		 			},
		 			shouldEndSession: true
		 		}
		 	};
		 } else {
		 	return {};
		 }
	},
	{ platforms: ['alexa'] }
);

module.exports = api;
