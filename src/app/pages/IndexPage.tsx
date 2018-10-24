import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer';
import { DemoStore } from 'app/stores/DemoStore';


export interface IndexPageProps extends RouteComponentProps<any> {
  demoStore: DemoStore
}

export interface IndexPageState {
}

@inject('routerStore', 'demoStore')
@observer
export class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }

  genValue = () => {
    this.props.demoStore.setTest(new Date().getUTCMilliseconds().toString())
  };

  render() {

    return (
      <>
      <Header />
      {this.props.demoStore.test}
      <button onClick={this.genValue}>Generate random value</button>
      <Footer />
      </>
    );
  }
}
