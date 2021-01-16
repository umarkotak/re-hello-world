import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'shards-react'

export default function MainFooter({ contained, copyright }) {
  return (
    <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
      <Container fluid={contained}>
        <Row>
          <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
        </Row>
      </Container>
    </footer>
  )
}

MainFooter.propTypes = {
  contained: PropTypes.bool,
  copyright: PropTypes.string,
}

MainFooter.defaultProps = {
  contained: false,
  copyright: `Copyright © ${new Date().getFullYear()} Marian Lol`,
}
