import * as React from 'react';

export interface FooterProps {
}

export interface FooterState {
  /* empty */
}

const footers = {
position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgb(244, 244, 244)',
    height: '3rem',
    dispplay:'flex',
    justifyContent: 'center',


} as React.CSSProperties;

const footerContent = {
margin:0,
display: 'flex',
justifyContent:'space-around',
alignItems: 'center',
fontWeight:600,
marginTop:'0.6rem',
fontSize: '14px'
} as React.CSSProperties;

export class Footer extends React.Component<FooterProps, FooterState> {

  render() {
    return (
      <footer style={footers}>
        <div style={footerContent}><div> <img width="20px" src="../../assets/img/itl_logo.svg"></img> Infotehnoloogia ja Telekommunikatsiooni Liit</div><div>Lõõtsa 6, 11415 Tallinn</div><div>6177 145</div><div>info@itl.ee</div><img height="30px" src="../../assets/img/edc-logo-300.png"></img></div>
      </footer>
    );
  }
}

export default Footer;
