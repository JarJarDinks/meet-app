# Meet-App

## Overview

meet-app is a test driven development web app that helps users research, schedule, and attend events in their city. It uses the Google Calendar API and a serverless backend powered by AWS Lambda to retrieve upcoming events and handle access authorization. The app is still under construction.

## Links

- [Live site URL](https://jarjardinks.github.io/meet-app/)

## Serverless Functions

- The Meet app utilizes serverless functions for various tasks such as real-time messaging, user authentication and authorization, and API endpoints. This approach allows me to prioritize essential app features and enables rapid development and deployment of new functionalities. With serverless technology, the app can easily scale to accommodate sudden spikes in traffic while keeping operational costs minimal. By heavily relying on serverless functions, the Meet app ensures a secure and user-friendly backend infrastructure for an optimal user experience.


## Features

### FEATURE 1: FILTER EVENTS BY CITY
**User Story**
As a user, I should be able to filter events by city so that I can see the list of events taking place in that specific city.

### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
**User Story**
As a user, I want the ability to toggle the visibility of an event's details so that I can control the amount of information I see about the event.

**Scenarios**
- Scenario 1: Event details are initially collapsed.
  - GIVEN that the user is on the events page, WHEN they view an event element, THEN they should observe that the details are collapsed by default.
- Scenario 2: User can expand an event to view its details.
  - GIVEN that the user is on the events page and an event element is collapsed, WHEN the user clicks on the event element, THEN the details of the event should expand.
- Scenario 3: User can collapse an event to hide its details.
  - GIVEN that the user is on the events page and an event element is expanded, WHEN the user clicks on the event element, THEN the details of the event should collapse.

### FEATURE 3: CUSTOMIZE NUMBER OF EVENTS
**User Story**
As a user, I want the ability to specify the number of events I want to view so that I can personalize my event viewing experience.

**Scenarios**
- Scenario 1: Default number of events is 32 when no specific number is specified.
  - GIVEN that the user is on the events page, WHEN the page loads, THEN the user should see up to 32 events displayed.
- Scenario 2: User can adjust the number of events to be displayed.
  - GIVEN that the user is on the events page, WHEN they change the number of events to be displayed, THEN the page should reload and show the new number of events.

### FEATURE 4: OFFLINE USAGE
**User Story**
As a user, I want the ability to use the app offline so that I can access event information even without an internet connection.

**Scenarios**
- Scenario 1: Display cached data when there's no internet connection.
  - GIVEN that the user has previously loaded the events page with an internet connection, WHEN the user loses their internet connection, THEN the app should display the cached events data.
- Scenario 2: Show error message when the user attempts to change settings (city, time range) without an internet connection.
  - GIVEN that the user has changed the settings for the events page, WHEN the user loses their internet connection, THEN the app should present an error message indicating that the user cannot modify the settings without an internet connection.

### FEATURE 5: DATA VISUALIZATION
**User Story**
As a user, I want to visualize data in the form of a chart so that I can easily compare the number of upcoming events in different cities.

**Scenarios**
- Scenario 1: Display a chart representing the number of upcoming events in each city.
  - GIVEN that the user is on the events page, WHEN they view the chart, THEN they should see a visual representation of the number of upcoming events in each city.
