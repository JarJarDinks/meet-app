import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

const MESSAGES_TO_IGNORE = ['test was not wrapped in act(...)'];
const originalError = console.error.bind(console.error);
console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) originalError(...args);
};
Enzyme.configure({ adapter: new Adapter() });
jest.setTimeout(30000);
