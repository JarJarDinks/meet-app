import { mount } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';

import App from '../App.js';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;
  test('When user hasn’t specified a number, 32 is the default number', ({
    given,
    when,
    then,
  }) => {
    given('the app has loaded', () => {
      AppWrapper = mount(<App />);
      // eslint-disable-next-line testing-library/no-debugging-utils
      console.log(AppWrapper.debug()); // eslint-disable-next-line testing-library/no-debugging-utils
    });

    when('the user has not yet selected a number of events', () => {
      AppWrapper = mount(<App />);
    });

    then('the user sees 32 events by default', () => {
      AppWrapper.update();
    });
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    given('the app has loaded', () => {
      AppWrapper = mount(<App />);
      // eslint-disable-next-line testing-library/no-debugging-utils
      console.log(AppWrapper.debug());
    });

    when('the user has selected a number of events', () => {
      AppWrapper.update();
      const NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
      const eventNumber = { target: { value: 2 } };
      NumberOfEventsWrapper.find('.number').simulate('change', eventNumber);
      expect(NumberOfEventsWrapper.state('number')).toBe(2);
    });

    then(
      'the event list elements shows the number of events set by the user',
      () => {
        expect(AppWrapper.find('.EventList')).toHaveLength(1);
      }
    );
  });
});
