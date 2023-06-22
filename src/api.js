import { mockData } from './mock-data';

export const extractLocations = (events) => {
  const extract = events.map((event) => event.location);
  const locations = [...new Set(extract)];
  return locations;
};

export const getEvents = async () => mockData;
