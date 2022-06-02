import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

import { FooterStyle } from './style';
import { FaFacebookF, FaTwitter, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterStyle>
      <footer className="border-t"> 
        <Container>
          <Row>
          </Row>
        </Container>
        <div>
          <Container style={{ paddingTop: 0 }}>
            <p className="risk">
              High Risk Investment Notice<br />
              The content shared on this website is for informational purposes only and should not be considered financial advice. Always seek professional advice before making any investment. You alone assume the sole responsibility of evaluating the merits and risks associated with the use of any information or other content on this website before making any decisions based on such information or other content.
            </p>
          </Container>
        </div>
        <div className="border-t meta">
          <Container>
            <p>© All rights reserved</p>
            <p className="text-right">Made with ❤ in Oz</p>
          </Container>
        </div>
      </footer>
    </FooterStyle>
  );
}

export default Footer;