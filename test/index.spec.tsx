import { mount } from 'enzyme';
import * as React from 'react';
import { AsyncReactor } from '../src';

describe('Test AsyncReactor', () => {
  test('AsyncReactor should render loading and component', async () => {
    const asyncCondition = new Promise(resolve => setTimeout(() => resolve('some result'), 150));
    const Home = (
      <AsyncReactor loader={() => asyncCondition}>
        {({ loading, result }) => {
          if (loading) {
            return <div>Loading</div>;
          } else {
            return <div>Home Screen {result}</div>;
          }
        }}
      </AsyncReactor>
    );

    const component = mount(Home);

    expect(component.html()).toMatchSnapshot();

    await new Promise(resolve => setTimeout(() => resolve(), 200));
    expect(component.html()).toMatchSnapshot();
  });

  test('AsyncReactor should handle error', async () => {
    const asyncCondition = new Promise((resolve, reject) => setTimeout(() => reject(new Error('some error')), 150));
    const Home = (
      <AsyncReactor loader={() => asyncCondition}>
        {({ loading, result, error }) => {
          if (loading) {
            return <div>Loading</div>;
          } else if (error) {
            return <div>Error</div>;
          } else {
            return <div>Home Screen {result}</div>;
          }
        }}
      </AsyncReactor>
    );

    const component = mount(Home);

    expect(component.html()).toMatchSnapshot();

    await new Promise(resolve => setTimeout(() => resolve(), 200));
    expect(component.html()).toMatchSnapshot();
  });
});
