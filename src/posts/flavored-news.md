---
title: Flavored News
description: Websites that displays news from notable outlets and separates them by general mood.
type: project
published: true
date: "2016-09-01"
devpost: https://devpost.com/software/lacodinggranja_2016
---

## What it is
Hackathon project that scraps the web for news from famous outlets. The news are then analyzed by IBM's Watson for dominant tone and sentiment-heavy sentences. The results are then displayed online in an easy-to-digest way. 

## What it does
Flavored News pulls news articles in several news categories from several prominent news providers--currently, CNN, BBC, and Fox, with the framework set in place to allow extension to more. It scrapes the articles and pulls out the important parts--title, author, date, body text--and displays their summaries in a dashboard feed. The features of the feed are as follows:

- News articles are colored to indicate the dominant emotion in their text: joy, anger, sadness, disgust
- Users can select a story's summary to view its breakdown in more detail:
  - The body of the article
  - A link to the article at its source
  - A metric indicating how strongly emotional it is
  - Indication of the most strongly emotional sentences in the article
- Users can select to view a bubble map visualizing emotional heat in the world over time (emotional intensity plotted against month, with data points scaled to reflect intensity with their size as well).

## What we used
The web scrapper was written in Python, along with the interaction with IBM's Watson. The web client, which I was in charge of, was built with Meteor. For demo purposes, the project was deployed to MDG's Galaxy. For later deployment, we used Azure. 

