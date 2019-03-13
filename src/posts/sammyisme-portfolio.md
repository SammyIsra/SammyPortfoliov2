---
title: SammyIsA - Personal Portfolio 
date: "2017-11-21"
description: Portfolio website for myself as a developer and photographer, built on GatsbyJS.
type: project
published: true
---
## What it is
This is my personal website and portfolio, it shows my work on development and photography and a means to contact me. 

## What I used
The website is built with GatsbyJS and hosted in Surge. React was used for structuring components and the pages. JavaScript all around. 

The posts are not hosted anywhere in particular. I realized that for Gatsby, making the posts Markdown files on the project was probably the easiest solution. I use Typora to edit the files.

The pictures are pulled from Flickr, via a "proxy" that I set up in Node and is hosted in AWS. 

## Design 
The design is mostly the same across the website. The header is shared but the theme changes. I wanted the Photographer page to be a showcase of my images and a way to bring more attention to my Flickr, which is why it only fetches a few images and not in their highest quality. The home is a small window to myself that doesn't offer a lot other than a landing page. 

The Developer site, on the other side, offers more information. I wanted the Developer area to be a collection of all (or most) of what I have done that relates to software. Since I can't fit all in a one page resume, this would be the place to learn all about my experience.