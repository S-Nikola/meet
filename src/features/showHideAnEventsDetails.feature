Feature: SHow/Hide an event's details

Scenario: An event element is collapsed by default
Given app is loaded
When user has received a list of upcoming events in specified city (all cities)
Then the event details are not visible for user

Scenario: User can expand an event to see its details
Given user received general information about upcoming events
When user pushes the button “Details” for a specific event
Then the specific event is expanded with the details

Scenario: User can collapse an event to hide its details
Given the specific event is expanded with the details
When the user pushes the button “Back” for the specific event
Then the specific event is collapsed, details are hidden, user receives full list of upcoming events with general information only