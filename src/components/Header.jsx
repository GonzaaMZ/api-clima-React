import PropTypes from 'prop-types';

const Header = ({title}) => {
    return ( 
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                {/* eslint-disable-next-line */}
                <a href="#" className="brand-logo">{title}</a>
            </div>
        </nav>
     );
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
 
export default Header;