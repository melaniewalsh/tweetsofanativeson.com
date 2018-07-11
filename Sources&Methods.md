---
layout: page
title: 'Sources & Methods'
subtitle:
---

## Data

---

The data set used in #BlackLivesMatter-Baldwin was first purchased from Twitter by Deen Freelon, Charlton D. McIlwain, and Meredith D. Clark for ["Beyond the hashtags: #Ferguson, #Blacklivesmatter, and the online struggle for offline justice"](http://cmsimpact.org/resource/beyond-hashtags-ferguson-blacklivesmatter-online-struggle-offline-justice/). Freelon, et al. purchased **40,815,975 tweets** that were published between **June 1, 2014 and May 31, 2015** that matched **45 keywords**---the words or hashtags #BlackLivesMatter, #Ferguson, or the names of 20 other black individuals that were killed by the police during this year. These researchers then generously [shared the tweet IDs for this dataset for free online](http://dfreelon.org/2017/01/03/beyond-the-hashtags-twitter-data/).

## Methods

---

### twarc


Twitter's [Terms of Service](https://developer.twitter.com/en/developer-terms/agreement-and-policy.html#id8) specify that datasets with more than 50,000 tweets can only be shared with third parties as [tweet IDs](https://developer.twitter.com/en/docs/basics/twitter-ids.html), unique identifiers assigned to every tweet:

>[If you provide Twitter Content to third parties, including downloadable datasets of Twitter Content or an API that returns Twitter Content, you will only distribute or allow download of Tweet IDs, Direct Message IDs, and/or User IDs.](https://developer.twitter.com/en/developer-terms/agreement-and-policy.html#id8)

To access the full JSON data from the 40,815,975 tweet IDs that were shared by Freelon, et al., a process that is called "hydrating," I used the Python and command-line tool, ["twarc"](https://github.com/DocNow/twarc):

```
twarc hydrate bth_ids.txt > bth_tweets.jsonl
```


### Documenting the Now

twarc was developed by Ed Summers for [Documenting the Now](https://www.docnow.io/), a Mellon-funded project that is developing social media archiving tools and, even more important, ethical guidelines for social media archiving, especially with regard to marginalized and vulnerable communities. The work of DocNow has been deeply influential to my work on this project.

### jq

I used the JSON processor [jq](https://stedolan.github.io/jq/) to search within the 32 million tweets for any tweet that mentioned "James Baldwin" by first and last name, regardless of hashtag, spacing, or capitalization:

```
jq -c "select(.text | test(\"James ?Baldwin\";\"i\"))" bth_tweets.jsonl > bth_jamesbaldwin.jsonl
```
