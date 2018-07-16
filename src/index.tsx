import * as React from 'react';

interface ChildrenProps {
  result?: any;
  loading: boolean;
  error?: Error;
}

interface Props {
  loader: () => Promise<any>;
  children: (props: ChildrenProps) => JSX.Element;
}

interface State {
  loading: boolean;
  error?: Error;
  result?: any;
}

export class AsyncReactor extends React.Component<Props, State> {
  state = {
    error: undefined,
    loading: true,
    result: undefined,
  };

  componentDidMount() {
    this.props
      .loader()
      .then(result => this.setState({ loading: false, result }), error => this.setState({ loading: false, error }));
  }

  render() {
    return this.props.children({ result: this.state.result, loading: this.state.loading, error: this.state.error });
  }
}
