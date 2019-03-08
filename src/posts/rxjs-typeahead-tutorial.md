---
title: "RxJS in practice: how to make a typeahead with streams!"
published: true
type: media
date: "2017-08-19"
platform: Dev.to
link: https://dev.to/sammyisa/rxjs-in-practice-how-to-make-a-typeahead-with-streams
description: After publishing the first article, I wanted to make a step by step example of how to use RxJS in a real life scenario. A typeahead is the perfect example because of the series of async events.
---

## What it is

Second of a series of articles I wrote about RxJS, a really interesting library for reactive programming in JavaScript. 

Unlike the first article, this one was an actual example of a feature built with RxJS. The finished example can be found in [this Pen](https://codepen.io/SammyIsra/pen/RZjxKJ).

To quickly explain the example, we build a stream of input that would post a new input one second after the user stops typing (lets call this the InputStream). Each time we receive a new input from InputStream, we make a request to Datamuse to get a list of suggestions for that input. We then get a list of responses, and from that a list of word recommendations from the user Input (which we call SuggestionsStream). We subscribe to SuggestionsStream to display a new list on the page of possible words every time we get a new list of suggestions.