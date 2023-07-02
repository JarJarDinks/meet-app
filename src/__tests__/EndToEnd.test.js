import puppeteer from 'puppeteer';

// Feature 1: Filter events by city
describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      timeout: 10000,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    const events = await page.$$eval('.event', (elements) => elements.length);
    expect(events).toBeGreaterThan(0);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestions = await page.waitForSelector('.suggestions li');
    expect(suggestions).toBeDefined();
  });

  test('User can select a city from the suggested list', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions li');
    await page.click('.suggestions li');
    const selectedCity = await page.$eval('.city', (element) => element.value);
    expect(selectedCity).toBe('Berlin, Germany');
    await page.waitForSelector('.event');
    const events = await page.$$eval('.event', (elements) => elements.length);
    expect(events).toBeGreaterThan(0);
  });
});

// Feature 2: Show/hide an event's details
describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.waitForSelector('.event');
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
