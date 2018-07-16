# async-reactor-ts

Render async Stateless Functional Components, using Typescript

## Installation

```shell
yarn add async-reactor-ts
```

It has peer dependencies of "react" and "react-dom"

## Usage

```js
import * as React from 'react';
import { asyncReactor } from 'async-reactor-ts';

const Loading = () => <div>Loading</div>;

const HomeLoader = async () => {
  await someAsnycStuff();
  return <div>Home Screen</div>;
};

const Home = asyncReactor(HomeLoader, Loading);
```

The returned value `Home` is a regular `React.Component`.

## Handle errors

You can pass a component to handle error state from the loader component.

```js
import * as React from 'react';
import { asyncReactor } from 'async-reactor-ts';

const Loading = () => <div>Loading</div>;
const ErrorScreen = ({ error }) => <div>Error {error.message}</div>;

const HomeLoader = async () => {
  await someAsnycStuff();
  return <div>Home Screen</div>;
};

const Home = asyncReactor(HomeLoader, Loading, ErrorScreen);
```

#### Example using fetch

```js
import * as React from 'react';
import { asyncReactor } from 'async-reactor';

const Loading = () => <div>Loading</div>;

const AsyncPosts = async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await data.json();

  return <ul>{posts.map(x => <li key={x.id}>{x.title}</li>)}</ul>;
};

export const Posts = asyncReactor(AsyncPosts, Loader);
```

## Development

In order to develop on this package:

```shell
git clone git@github.com:ovotech/async-reactor-ts.git
cd async-reactor-ts
yarn
```

## Running tests

```shell
yarn lint
yarn test
```

## Deploying new versions

New versions are deployed using "Github Releases" feature.
We use [SemVer](http://semver.org/) for versioning. For the versions available, see npm [async-reactor-ts](https://www.npmjs.com/package/@ovotech/async-reactor).

## Authors

- **Ivan Kerin** - _Initial work_ - [ivank](https://github.com/ivank)

See also the list of [contributors](https://github.com/ovotech/async-reactor-ts/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Based on [async-reactor](https://github.com/xtuc/async-reactor) project
