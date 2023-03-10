Description

Meet is a  web app that lets you search for tech events in your city. You can see how many events are happening in a particular city and time-frame, the details of those events, and what types of events are most common in an area.
It's connected to Google Calendar for demonstration purposes, so the events aren't up-to-date.


Key features

    • Filter events by city.
    • Show/hide event details.
    • Specify number of events shown on the page.
    • Use the app when offline.
    • Add an app shortcut to the home screen.
    • View a chart showing the number of upcoming events by city.

Blueprint and Tech-stack

Frontend:

React, Tailwindcss, Recharts, Moment,


Data and authentication:

Axios, AWS Lambda, Google OAuth2, Google Calendar API

Testing:
Jest, Jest-Cucumber, Enzyme, Puppeteer, Atatus


User stories and scenarios
FEATURE 1: FILTER EVENTS BY CITY 
User story: As a user, I would like to be able to filter events by city so that I can see the events that take place in that city. 

    • Scenario 1: When user hasn’t searched for specific city, show upcoming events from all cities 
        ◦ Given app is loaded 
        ◦ When the user has not searched for any city 
        ◦ Then the user should see a list of all upcoming events 
      
    • Scenario 2: The user should see a list of suggestions when they search for city. 
        ◦ Given the main page is open, together with the list of upcoming events in all cities 
        ◦ When user types the name of city in the text box 
        ◦ Then the user should see a list of cities (suggestions) that match what they have typed 
      
    • Scenario 3: When the user searches for city, a list of upcoming events in this city should be shown 
        ◦ Given the user typed a city name in the city textbox, and the list of suggested cities is showing 
        ◦ When the user selects a city from the list of suggested cities 
        ◦ Then the user city should be changed to the selected city and the user should get a list of upcoming events in specified city 


FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS 
User story: As a user, I would like to be able to show/hide event details so that I can see more/less information about an event. 

    • Scenario 1: An event element is collapsed by default 
        ◦ Given app is loaded 
        ◦ When user has received a list of upcoming events in specified city (all cities) 
        ◦ Then the event details are not visible for user 
      
    • Scenario 2: User can expand an event to see its details 
        ◦ Given user received general information about upcoming events 
        ◦ When user pushes the button “Details” for a specific event 
        ◦ Then the specific event is expanded with the details 
      
    • Scenario 3: User can collapse an event to hide its details 
        ◦ Given the specific event is expanded with the details 
        ◦ When the user pushes the button “Back” for the specific event 
        ◦ Then the specific event is collapsed, details are hidden, user receives full list of upcoming events with general information only 


FEATURE 3: SPECIFY NUMBER OF EVENTS 
User story: As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once. 

    • Scenario 1: When user hasn’t specified a number, 32 is the default number 
        ◦ Given app is loaded, the user has received a list of upcoming events in specified city (all cities) 
        ◦ When the user hasn’t specified a number of events to be shown 
        ◦ Then the user receives first 32 upcoming events on the screen 
      
    • Scenario 2: User can change the number of events they want to see 
        ◦ Given the app is loaded, user has received a list of upcoming events in specified city (all cities) 
        ◦ When the user hasn’t specified a number of events to be shown by choosing the number in input (32 or 64 or 96) 
        ◦ Then the user receives first 32/64/96 upcoming events on the screen – according to the chosen number 

FEATURE 4: USE THE APP WHEN OFFLINE 
User story: As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online. 

    • Scenario 1: Show cached data when there’s no internet connection 
        ◦ Given the user has previously opened the app with available internet connection 
        ◦ When the user opens the app without internet connection 
        ◦ Then the user receives cashed data from their last session (the last data user had seen with active internet connection) 
      
    • Scenario 2: Show error when user changes the settings (city, time range) 
        ◦ Given the user has opened the app without internet connection and received cashed data from their last session 
        ◦ When the user changes the settings (city, time range) 
        ◦ Then the user receives error message indicating that data is not available without internet connection 

FEATURE 5: DATA VISUALIZATION 
User story: As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city. 

    • Scenario 1: Show a chart with the number of upcoming events in each city 
        ◦ Given the app is loaded, user has received a list of upcoming events in specified city (all cities) 
        ◦ When the user push the button “Visualize” 
        ◦ Then the user will see a chart showing the number of upcoming events in that city, categorized by type 