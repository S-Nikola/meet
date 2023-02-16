Feature: Specify number of events

Scenario: When user hasn’t specified a number, 20 is the default number
Given app is loaded
And the user has received a list of upcoming events in specified city (all cities)
When the user hasn’t specified a number of events to be shown
Then the user receives first 20 upcoming events on the screen

Scenario: User can change the number of events they want to see
Given the app is loaded, user has received a list of upcoming events in specified city (all cities)
When the user hasn’t specified a number of events to be shown by choosing the number in input (20 or 30 or 40)
Then the user receives first 20 or 30 or 40 upcoming events on the screen – according to the chosen number