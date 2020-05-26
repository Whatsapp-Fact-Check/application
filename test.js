require('dotenv').config();
const fs = require('fs');
const request = require('request');
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// const imgUrl = './testImage.png';
let redirectedImgUri = '';
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM7cad34e23df0497dd1515c31ec0b91bb/Media/ME0a9554a5fb9a33d03dae58672e7d8ee6'
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM3b64996e9174da52038d37d78163cb99/Media/ME63490760ddd7f53ec5960d42f9d46d2c'
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM17e80eb307e116163204a49461ae9306/Media/ME1bc707e6fdbd32418d90b4a21231e0fc'
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM31288bb0019f42b19368dc0350cb8140/Media/ME5303fa6114ad0fc0702d49c97a7da370'
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM6424fdb1d025fe7c7972c528cf980894/Media/MEc91e03295d03d5d1f12b71115fa5c319'
// const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MMe369ed724c015b97263de6b79b6c99d4/Media/MEb558e97ddcb51183a89e7cfa727d9c77'
const imgUrl = 'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MMc0656dfbe29ad01b59e7007386b3989c/Media/ME140dbcb31305bdbf6b92193f4c98ffd3'


function getRequestsObject() {
    return requests = {
        "requests": [
            {
                "image": {
                    "source": {
                        "imageUri": redirectedImgUri
                    }
                },
                "features": [
                    {
                        "type": "TEXT_DETECTION"
                    }
                ]
            }
        ]
    }
}
async function getImageText() {
    const [result] = await client.batchAnnotateImages(getRequestsObject());
    const detections = result.responses[0].fullTextAnnotation;
    console.log(detections.text.replace(/\n/g, " "));
}

function download(uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        console.log(res.request.uri.href)
        redirectedImgUri = res.request.uri.href
        callback();
        // request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

download(imgUrl, 'testImage2.png', function () {
    console.log('done');
    getImageText();
});


/*
const axios = require('axios');
let domain = 'g1.com.br'

whoisxml_apiKey = process.env.whoisxml_apiKey
//domain reputation
let url = 'https://domain-reputation.whoisxmlapi.com/api/v1?apiKey=' + whoisxml_apiKey + '&domainName=' + domain;
axios.get(url)
    .then(response => {
        console.log("\n\nDomain reputation: \n\n")
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
//ip location
url = 'https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=' + whoisxml_apiKey + '&domain=' + domain;
axios.get(url)
    .then(response => {
        console.log("\n\nDomain location: \n\n")
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });




let moz_username = 'mozscape-f6cb603502';
let moz_password = process.env.moz_apiKey;
url = 'https://lsapi.seomoz.com/v2/url_metrics';


//domain authority
axios({
    method: 'post',
    url: url,
    data: {
        targets: [domain]
    },
    auth: {
        username: moz_username,
        password: moz_password
    }
}).then(function (response) {
    console.log("\n\nDomain authority: \n\n")
    console.log(response.data);
}).catch(error => {
    console.log(error);
});


/*

Domain authority:


{ results:
   [ { page: 'g1.com.br/',
       subdomain: 'g1.com.br',
       root_domain: 'g1.com.br',
       title: '',
       last_crawled: '2020-04-15',
       http_code: 301,
       pages_to_page: 20481,
       nofollow_pages_to_page: 525,
       redirect_pages_to_page: 4,
       external_pages_to_page: 20481,
       external_nofollow_pages_to_page: 525,
       external_redirect_pages_to_page: 4,
       deleted_pages_to_page: 2081,
       root_domains_to_page: 613,
       indirect_root_domains_to_page: 1,
       deleted_root_domains_to_page: 68,
       nofollow_root_domains_to_page: 108,
       pages_to_subdomain: 146748,
       nofollow_pages_to_subdomain: 1377,
       redirect_pages_to_subdomain: 401,
       external_pages_to_subdomain: 146748,
       external_nofollow_pages_to_subdomain: 1377,
       external_redirect_pages_to_subdomain: 401,
       deleted_pages_to_subdomain: 10909,
       root_domains_to_subdomain: 1845,
       deleted_root_domains_to_subdomain: 233,
       nofollow_root_domains_to_subdomain: 278,
       pages_to_root_domain: 1330666,
       nofollow_pages_to_root_domain: 3401,
       redirect_pages_to_root_domain: 440,
       external_pages_to_root_domain: 1330666,
       external_indirect_pages_to_root_domain: 8342,
       external_nofollow_pages_to_root_domain: 3401,
       external_redirect_pages_to_root_domain: 440,
       deleted_pages_to_root_domain: 38009,
       root_domains_to_root_domain: 6156,
       indirect_root_domains_to_root_domain: 295,
       deleted_root_domains_to_root_domain: 520,
       nofollow_root_domains_to_root_domain: 508,
       page_authority: 50,
       domain_authority: 87,
       link_propensity: 0.0002577984123,
       spam_score: -1,
       root_domains_from_page: 1,
       nofollow_root_domains_from_page: 0,
       pages_from_page: 1,
       nofollow_pages_from_page: 0,
       root_domains_from_root_domain: 1,
       nofollow_root_domains_from_root_domain: 0,
       pages_from_root_domain: 3778,
       nofollow_pages_from_root_domain: 0,
       pages_crawled_from_root_domain: 3879 } ] }


Domain location:


{ ip: '186.192.90.5',
  location:
   { country: 'BR',
     region: 'Rio de Janeiro',
     city: 'Rio de Janeiro',
     lat: -22.9201,
     lng: -43.3307,
     postalCode: '20000',
     timezone: '-03:00',
     geonameId: 3451190 },
  domains:
   [ 'quemfazsabe.com',
     'queridoleiteiro.com',
     'quesejadoce-2atemporada.participacoes.globo.com',
     'youngpeoplenetwork.com',
     'yasminfontes.com.br' ],
  as:
   { asn: 28604,
     name: 'Globo Comunicação e Participações S.A.',
     route: '186.192.80.0/20',
     domain: 'http://www.globo.com',
     type: 'Content' },
  isp: 'Globo Comunicacao e Participacoes SA',
  connectionType: '' }


Domain reputation:


{ reputationScore: 99.59,
  testResults: [ { test: 'WHOIS Domain check', warnings: [Array] } ] }



*/