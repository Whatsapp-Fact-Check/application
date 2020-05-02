
const client = require('twilio')(process.env.twilio_accountSid, process.env.twilio_authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const google = require('./googleFactCheck');
const keyExtractor = require('./keywordExtractor');

module.exports = {
    processWppMessage: processWppMessage
}

function processWppMessage(wppMsgBody, callback) {

    let twiml = new MessagingResponse();

    keyExtractor.extractKeywords(wppMsgBody, (keywords) => {
        
        googleQuery = "";
        keywords.forEach(word => {
            googleQuery += word + " ";            
        });
        console.log(googleQuery);

        google.callGoogleAPI(googleQuery, '', (result_message) => {
            if (result_message == ''){
                // result_message = "Sorry, we couldn't find any result for your request. Please try these steps to check the fact or try to access https://toolbox.google.com/factcheck/explorer"
                result_message = "Sorry, we don’t know if that is good information or not. Here are some tips to help you make a judgement: https://www.bbc.com/news/blogs-trending-51967889. You can also try to verify here: https://toolbox.google.com/factcheck/explorer";
            }
            result_message = result_message.slice(0, Math.min(result_message.length, 1600)); //truncate to max 1600 chars
            twiml.message(result_message);
            callback(twiml.toString());
        });
    });
}
    
// client.messages
//       .create({
//          mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
//          from: 'whatsapp:+numberhere',
//          body: 'Hello there!',
//          to: 'whatsapp:+numberhere'
//        })
//       .then(message => console.log(message.sid));

// router.post('/', async (req, res) => {
//   const { body } = req;

//   let message;

//   if (body.NumMedia > 0) {
//     message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
//     message.media(goodBoyUrl);
//   } else {
//     message = new MessagingResponse().message('Send us an image!');
//   }

//   res.set('Content-Type', 'text/xml');
//   res.send(message.toString()).status(200);
// });
