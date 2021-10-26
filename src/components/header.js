import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaGithubAlt, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const iconStyle = {
  width: '20px',
  height: '20px'
}

const Header = () => (
  <>
    <section>
      <Link className="nav-link" to="/">
        HOME
      </Link>
    </section>
    <span>
      <div className="user-links">
        <a className="user-icon" href="https://www.youtube.com/c/HistoricalModeling"><FaYoutube style={iconStyle} /></a>
        <a className="user-icon" href="https://twitter.com/michaellperry"><FaTwitter style={iconStyle} /></a>
        <a className="user-icon" href="mailto:michael@qedcode.com"><MdEmail style={iconStyle} /></a>
      </div>
    </span>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
