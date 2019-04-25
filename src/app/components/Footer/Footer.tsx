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
    dispplay: 'flex',
    justifyContent: 'center',


} as React.CSSProperties;

const footerContent = {
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontWeight: 600,
    marginTop: '0.6rem',
    fontSize: '14px'
} as React.CSSProperties;


const footersMobile = {
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgb(244, 244, 244)',
    marginTop: '50px'
} as React.CSSProperties;

const footerContentMobile = {
    fontWeight: 600,
    marginTop: '30px',
    fontSize: '16px',
    marginLeft: '20px',
} as React.CSSProperties;

const mobileContentSpacer = {
    marginTop: '20px',
} as React.CSSProperties;


const estoniaImg = {
    left: '',
    height: '80px',
    marginLeft: 'calc(50% - 150px)'
} as React.CSSProperties;

export class Footer extends React.Component<FooterProps, FooterState> {
    resize = () => {
        this.forceUpdate();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        if (window.innerWidth < 835) {
            return <footer style={footersMobile}>
                <div style={footerContentMobile}>
                    <div style={mobileContentSpacer}><img width="30px"
                                                          src="../../assets/img/itl_logo.svg"></img> Infotehnoloogia ja
                        Telekommunikatsiooni Liit
                    </div>
                    <div style={mobileContentSpacer}>Lõõtsa 6, 11415 Tallinn</div>
                    <div style={mobileContentSpacer}>6177 145</div>
                    <div style={mobileContentSpacer}>info@itl.ee</div>
                    <div>
                        <img style={estoniaImg} src="../../assets/img/edc-logo-300.png"></img></div>
                </div>
            </footer>
        } else {
            return (
                <footer style={footers}>
                    <div style={footerContent}>
                        <div><img width="20px" src="../../assets/img/itl_logo.svg"></img> Infotehnoloogia ja
                            Telekommunikatsiooni Liit
                        </div>
                        <div>Lõõtsa 6, 11415 Tallinn</div>
                        <div>6177 145</div>
                        <div>info@itl.ee</div>
                        <img height="30px" src="../../assets/img/edc-logo-300.png"></img></div>
                </footer>
            );
        }

    }
}

export default Footer;
