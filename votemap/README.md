# Project 2
+ By: Lawrence Weru
+ Production URL: <http://e28p2.roflmao.me>

## Pages summary
- Home page (/)
- Neutralizing Map (/neutralizing)
- Muddy Map (/muddy)

## SFC summary
*List the SFCs of your application*

- HomePage.vue (based on e28 lecture)
- MapsInfo.vue (info about the featured maps)
- MuddyPage.vue (loads the muddy map JSON from API, emits map render event)
- NeutralizingPage.vue (loads the neutralizing map JSON from API, emits map render event)

  
## Server interaction
*List the features in your application that are persisting and retrieving data from the server*

Muddy Maps is a data-visualization site comprising of two of my original maps. I have two different read-only[1] API routes that return the latest processed election results for the 2020 US election at a county level. This data is in a format defined by my MuddyColor and MuddyBorderColor algorithms, and is ready to be rendered using the HighCharts library.

## Outside resources

Raw data originally provided by Fox News, Politico, and New York Times before being compiled by various contributors at the following repo: https://github.com/evangambit/JsonOfCounties

This data is processed using the MuddyColor algorithms before being served via my JSON API.

## Notes for instructor

1: I decided to go the route of processing a publicly available API, as discussed here: https://github.com/susanBuck/e28-fall20/issues/36#issuecomment-722085083

After the publicly available API's that I could found either did not have the data available, I ran into some databases published in plaintext on Github which I converted into a read-only public API after some pre-processing for use in this project.

There may be some bugs when zooming in and out of full-screen. And some counties may have blank data due to data being unavailable at this time.

Also note that I used some of the e28 lecture repo as boilerplate to help get accustomed to routing and single file components.