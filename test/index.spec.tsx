import { mount } from 'enzyme';
import * as React from 'react';
import { asyncReactor } from '../src';

describe('Test asyncReactor', () => {
  test('asyncReactor shouldrender loading and component', async () => {
    const HomeScreen = () => <div>HomeScreen</div>;
    const Loading = () => <div>Loading</div>;

    const asyncCondition = new Promise((resolve, reject) => setTimeout(() => resolve(), 150));

    const asyncHome = asyncReactor(async () => {
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 150));
      return <HomeScreen />;
    }, Loading);

    const component = mount(asyncHome);

    expect(component.html()).toMatchSnapshot();

    await new Promise((resolve, reject) => setTimeout(() => resolve(), 200));
    expect(component.html()).toMatchSnapshot();
  });

  test('asyncReactor with error', async () => {
    const HomeScreen = () => <div>HomeScreen</div>;
    const Loading = () => <div>Loading</div>;
    const ErrorScreen = ({ error }) => <div>Error {error.message}</div>;

    const asyncCondition = new Promise((resolve, reject) => setTimeout(() => resolve(), 150));

    const asyncHome = asyncReactor(
      async () => {
        await new Promise((resolve, reject) => setTimeout(() => resolve(), 150));
        throw new Error('some error');
        return <HomeScreen />;
      },
      Loading,
      ErrorScreen,
    );

    const component = mount(asyncHome);
    expect(component.html()).toMatchSnapshot();

    await new Promise((resolve, reject) => setTimeout(() => resolve(), 200));
    expect(component.html()).toMatchSnapshot();
  });
});
