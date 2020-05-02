const axios = require('axios');
const bus = require('./eventBus');


module.exports = {
    callGoogleAPI: callGoogleAPI
}

function callGoogleAPI(query, languageCode, callback) {

    let query_uriencoded = encodeURIComponent(query);
    // we could set languageCode according to prefix of forwarding number... (+41, +43, +49 --> 'de';  else --> 'en')
    axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=' + languageCode + '&query=' + query_uriencoded + '&key=' + process.env.google_apiKey)
        .then(response => {
            let result_message = parseResponse(response, query_uriencoded);
            bus.notifyEvent('receivedGoogleResponse', result_message);
            callback(result_message);
        })
        .catch(error => {
            console.log(error);
            callback('');
        });
}

function parseResponse(response, query_uriencoded) {
    let result_message = '';
    let numOfRetunedClaims = 3;

    if (typeof response.data.claims == "undefined") {
        return result_message;
    }

    result_message = 'We found ' + response.data.claims.length + ' matching claims. Here are the top ' +
        Math.min(numOfRetunedClaims, response.data.claims.length) + '\n\n'
    for (let index = 0; index < Math.min(numOfRetunedClaims, response.data.claims.length); index++) {
        let claim = response.data.claims[index];
        result_message += getClaimReviewMessage(claim)
        result_message += '\n---------------------------------\n\n'
    }

    if (result_message != '') {
        result_message += 'For more details on your request, please visit https://toolbox.google.com/factcheck/explorer/search/';
        result_message += query_uriencoded + ';hl=';
    }

    return result_message;
}

function getClaimReviewMessage(claim) {

    let result_message = '';

    result_message += 'Claim by ';
    result_message += claim.claimant;
    result_message += ':\n';
    result_message += claim.text + '\n\n';
    result_message += claim.claimReview[0].publisher.name;
    result_message += ' rated this claim as: ' + claim.claimReview[0].textualRating.toUpperCase();
    // result_message += '\nCheck the full review: ' + claim.claimReview[0].title + ' (' + claim.claimReview[0].url + ')';
    result_message += '\nCheck the full review: ' + claim.claimReview[0].url;

    return result_message;
}

