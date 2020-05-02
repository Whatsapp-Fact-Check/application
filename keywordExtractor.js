
const MonkeyLearn = require('monkeylearn');
const { extract } = require('article-parser');
const ml = new MonkeyLearn(process.env.monkeylearn_apiKey);
let model_id = process.env.monkeylearn_modelId;
let query = "Corona virus has a cure and we can go out on the streets";

module.exports = {
    extractKeywords: extractKeywords
}

function extractKeywords(text, callback) {

    if (isURL(text)) {
        extract(text).then((article) => {
            // console.log(article.title);
            // console.log(article.description);

            text = article.title;

            let textWords = text.split(' ');
            let maxNumKeywords = 7;
            
            if (textWords.length <= maxNumKeywords) {
                callback(textWords);
                return;
            }
        
            let data = [text];
            let params = { "max_keywords": maxNumKeywords };
            ml.extractors.extract(model_id, data, params).then(res => {
                let textsObj = res.body;
                textsObj.forEach(textObj => {
                    let keywords = getKeywords(textObj);
                    callback(keywords);
                });
            });

        }).catch((err) => {
            console.log(err);
        });
        return;
    }


    let textWords = text.split(' ');
    let maxNumKeywords = 7;

    if (textWords.length <= maxNumKeywords) {
        callback(textWords);
        return;
    }


    let data = [text];
    let params = { "max_keywords": maxNumKeywords };
    ml.extractors.extract(model_id, data, params).then(res => {
        let textsObj = res.body;
        textsObj.forEach(textObj => {
            let keywords = getKeywords(textObj);
            callback(keywords);
        });
    });
}


function getKeywords(textObject) {
    let keywords = [];
    textObject.extractions.forEach(keyword => {
        // console.log(keyword);
        keywords.push(keyword.parsed_value);
    });

    return keywords;
}

function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}