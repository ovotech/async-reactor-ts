import * as React from 'react';

interface Props {
  component: () => Promise<React.ReactElement<any>>;
  loader?: React.ComponentType<any>;
  error?: React.ComponentType<any>;
}

interface State {
  loaded: boolean;
  error?: Error;
  component: React.ReactElement<any>;
}

class Reactor extends React.Component<Props, State> {
  state = {
    component: null,
    error: null,
    loaded: false,
  };

  componentDidMount() {
    this.props
      .component()
      .then(component => this.setState({ loaded: true, component }), error => this.setState({ error }));
  }

  render() {
    if (this.state.loaded) {
      return this.state.component;
    }

    if (!!this.state.error && this.props.error) {
      const ErrorComponent = this.props.error;
      return <ErrorComponent error={this.state.error} />;
    }

    const LoadingComponent = this.props.loader;
    return <LoadingComponent />;
  }
}

export const asyncReactor = (
  component: () => Promise<React.ReactElement<any>>,
  loader?: React.ComponentType<{}>,
  error?: React.ComponentType<{ error: Error }>,
): React.ReactElement<any> => <Reactor component={component} loader={loader} error={error} />;
