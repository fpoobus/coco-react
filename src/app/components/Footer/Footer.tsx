import * as React from 'react';

export interface FooterProps {
}

export interface FooterState {
  /* empty */
}

export class Footer extends React.Component<FooterProps, FooterState> {

  render() {
    return (
      <footer>
        <h1>Footer</h1>
      </footer>
    );
  }
}

export default Footer;
