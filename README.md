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
import { AsyncReactor } from '@ovotech/async-reactor-ts';

const Home = (
  <AsyncReactor loader={() => someAsnycStuff()}>
    {({ loading, result }) => {
      if (loading) {
        return <div>Loading</div>;
      }

      return <div>Home Screen {result}</div>;
    }}
  </AsyncReactor>
);
```

You'll receive the result of the async loader call in the "result" prop

## Handle errors

If there is an error in the loader, you will receive it as an "error" prop

```js
import * as React from 'react';
import { AsyncReactor } from '@ovotech/async-reactor-ts';

const Home = (
  <AsyncReactor loader={() => someAsnycStuff()}>
    {({ loading, error }) => {
      if (loading) {
        return <div>Loading</div>;
      }

      if (error) {
        return <div>Error {error.message}</div>;
      }

      return <div>Home Screen</div>;
    }}
  </AsyncReactor>
);
```

#### Example using fetch

```js
import * as React from 'react';
import { AsyncReactor } from '@ovotech/async-reactor-ts';

const Home = (
  <AsyncReactor
    loader={async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts');
      return await data.json();
    }}
  >
    {({ loading, result }) => {
      if (loading) {
        return <div>Loading</div>;
      }

      return <ul>{result.map(x => <li key={x.id}>{x.title}</li>)}</ul>;
    }}
  </AsyncReactor>
);
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

Inspired by [async-reactor](https://github.com/xtuc/async-reactor) project
