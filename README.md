# WhatsApp Immediate Fact Check
Checking COVID-19 facts in WhatsApp has never been so fast and easy. Just forward the news for us and we will check automatically if you should trust or not. Within seconds!

## Inspiration
Some weeks ago a good friend forwarded a message to me: Taking Ibuprofen seems to increase the chance that COVID-19 will develop more aggressive symptoms. The Medical University of Vienna was allegedly researching this, but results were not official yet. This message was meant to give an early warning.<br>
I was unsure what to do with this... Was it a reasonable claim? Should I forward this to my family and friends to keep them from harm - just in case... ?

Maybe you know this situation? If not from yourself, then because someone in your family group forwarded similar messages, claims and news? Currently uncertainty and fear lead to the spreading of fake news even faster than the virus itself and the demand for COVID-19 facts on WhatsApp is skyrocketing.

The demand for fact-checks about the new coronavirus on WhatsApp already exceeds — by far — what was registered during electoral campaigns in Argentina, Brazil, Colombia, Spain, India and Turkey. Last week, the popular messaging app, owned by Facebook, reached out to the International Fact-Checking Network to explore ways to support fact-checkers.<br>
With more than 1,000 requests for COVID-19 fact-checks per day, some of the organizations that are in the CoronaVirusFacts / DatosCoronaVirus alliance spent the last week analyzing ways to meet the gigantic demand for reliable information while caring for their own staffs.

We all can help alleviate this burden by stopping the spreading of fake news! If only it were as easy as forwarding a message...<br>
And this is exactly what we aim for with this project: **We provide a simple way for users to check facts from within WhatsApp.**


## What it does

The user forwards a message via Whatsapp to our channel (public number), where we automatically verify the quality of the news. A response is returned to the user when the fact is verified. If there is no fact check available yet, we point the user to possible sites to review for information cleanliness.

## How we built it

For WhatsApp API integration we use Twilio. A message forwarded or posted to our channel is processed with "monkeylearn", a package that identifies the most important keywords. These keywords are then checked via Google Fact Check API. The result is parsed into a short text, including a link to the full result set on [Google's Fact Check Explorer](https://toolbox.google.com/factcheck/explorer). This answer is returned to the user in WhatsApp.
<br>The program runs in node.js.

## Challenges we ran into

* Integrate with WhatsApp
* Checking the fact
* Spreading the tool
* Possible legal issues with using the Google API?

## What we've accomplished so far
__We've got a working pilot!__
<br>Check it out by following this link on your mobile device: https://tinyurl.com/whatsapp-immediate-fact-check or scanning the QR code below. This will prepare a message to our WhatsApp channel. Send it, and you're good to go. Type any keywords or forward messages to check their veracity.

__We've got a landing page to help you spread the word!__
<br>Participate by sharing what you need: https://w1yj2ocu0fel.landen.co

__We've got a questionnaire!__
<br>It takes no more than 2 minutes to complete and will help us to understand, if our service meets your needs.
Please share: https://forms.gle/XDYBBxT7Rah8pEJ77

## What's needed to continue the project?
We're using a trial license of Twilio and are currently running the code on a local server. Depending on how high the demand will rise, we will need to invest in these resources. 
A questionnaire as well as API request statistics will help us estimate the need for our service - results are not available as yet.

## What's next for WhatsApp Immediate Fact Check
We've explored the possibility of teaming up with the project [DetektivKollektiv](https://devpost.com/software/fake-news-game) - a community driven platform for fake news identification. This way we could provide fact check estimates for news, where there is no reliable fact check available yet.

Other features we have in mind:
* language support, automated through the user's phone number prefix
* fact checks for non-textual messages (audio messages, pictures, videos)
* integrating more fact checking services
* storing queries in a database with number prefixes, to help analysing the spread of particular news
* getting info on the most recent fake news
* subscribing to receive news on fact checks regularly
* chatbot integration for smooth and more elaborate communication with you

## After the crisis...
Since this service integrates Google Fact Checker API into WhatsApp, it can be used for any kind of news that Google puts in their fact checking database. It is not limited to the topic of COVID-19.

Furthermore, making fact checks easily accessible will help educating the public and facilitate information cleanliness.
