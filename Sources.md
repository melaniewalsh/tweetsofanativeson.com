---
layout: page
title: 'Sources & Methods'
subtitle:
---

## Data

---

The data set used in #BlackLivesMatter-Baldwin was first purchased from Twitter by Deen Freelon, Charlton D. McIlwain, and Meredith D. Clark for ["Beyond the hashtags: #Ferguson, #Blacklivesmatter, and the online struggle for offline justice"](http://cmsimpact.org/resource/beyond-hashtags-ferguson-blacklivesmatter-online-struggle-offline-justice/). Freelon, et al. purchased **40,815,975 tweets** that were published between **June 1, 2014 and May 31, 2015** that matched **45 keywords**---the words or hashtags #BlackLivesMatter, #Ferguson, or the names of 20 other black individuals that were killed by the police during this year. These researchers then generously [shared the tweet IDs for this dataset for free online](http://dfreelon.org/2017/01/03/beyond-the-hashtags-twitter-data/).

You can access a smaller archive of only the tweets that mentioned James Baldwin, which I used in my essay and on this website, by "hydrating" the [tweet IDs found on my GitHub page](https://github.com/melaniewalsh/BLM-James-Baldwin-tweet-ids).

## Methods

---

### twarc


Twitter's [Terms of Service](https://developer.twitter.com/en/developer-terms/agreement-and-policy.html#id8) specify that data sets can only be shared with third parties as [tweet IDs](https://developer.twitter.com/en/docs/basics/twitter-ids.html), unique identifiers assigned to every tweet.

To access the full JSON data from the 40,815,975 tweet IDs that were shared by Freelon, et al.---a process called "hydrating"---I used the Python and command-line tool, ["twarc"](https://github.com/DocNow/twarc). Sample code for this process would look something like the following:

```
twarc hydrate bth_ids.txt > bth_tweets.jsonl
```

If you're not familiar with the command line, I recommend using [the desktop application Hydrator](https://github.com/DocNow/Hydrator).

### Documenting the Now

twarc and Hydrator were developed by Ed Summers for [Documenting the Now](https://www.docnow.io/), a Mellon-funded project that has developed tools and ethical guidelines for social media archiving, especially with regard to marginalized and vulnerable communities. The work of DocNow has been deeply influential to my work.

### jq

I used the JSON processor [jq](https://stedolan.github.io/jq/) to search the 32 million tweets for any tweet that mentioned "James Baldwin" by first and last name, regardless of hashtag, spacing, or capitalization:
```
jq -c "select(.text | test(\"James ?Baldwin\";\"i\"))" bth_tweets.jsonl > bth_james_baldwin.jsonl
```

I also combined twarc utilities and jq to search for top retweets, hashtags, users, and more. For example, to quickly pull out the top 10 retweets (ID, user name, text, and retweet count) from a JSON file and look at them on the command line, you can easily run:
```
 python ~/twarc/utils/retweets.py bth_james_baldwin.json | jq '. | {id: .id_str, name: .user.screen_name, text: .full_text, retweet: .retweet_count}'
 ```
 
### Identifying Repeated Text
 
To discover text that was repeated, though not directly retweeted, across many tweets, I began by using a k-means clustering algorithm from the Python library Scikit-Learn that was based on [a script from Amir Salihefendic](https://gist.github.com/amix/ef7ed11b0abab37c94ad). I used these results to identify key, distinguishing phrases that could programmatically categorize the tweets.

Becuase the size of my data set was small enough, I then manually tagged the tweets and added other bibliographic information, such as the titles and publication dates of the quotation source texts.

## Website Logo

___

This website's logo is a transformation of a photo by [Mark B. Anstendig](http://www.anstendig.com/Portrait%20Series/Baldwin/baldwin_index.html).