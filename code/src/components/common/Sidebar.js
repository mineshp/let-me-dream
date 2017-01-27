import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Sidebar = ({loading}) => {
    return (
        <div className="col-md-3 left_col">
          <div className="left_col scroll-view">
            <div className="navbar nav_title navbar-style">
              <IndexLink to="/" activeClassName="active" className="site_title"><i className="fa fa-diamond"></i><span> Start Dreaming!</span></IndexLink>
            </div>

            <div className="clearfix"></div>
            {loading && <LoadingDots interval={100} dots={20} />}
             <div className="profile clearfix">
              <div className="profile_pic">
                <span className="img-circle profile_img fa fa-5x fa-user"></span>
              </div>
              <div className="profile_info">
                <span>Welcome,</span>
                <h2>John Doe</h2>
              </div>
            </div>
            <br />

            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>General</h3>
                <ul className="nav side-menu">
                  <li><IndexLink to="/" activeClassName="active"><i className="fa fa-home"></i>Home <span className="fa fa-chevron-down"></span></IndexLink>
                  </li>
                  <li><Link to="/courses" activeClassName="active"><i className="fa fa-edit"></i>Courses<span className="fa fa-chevron-down"></span></Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>

          </div>
        </div>
    );
};

Sidebar.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Sidebar;