import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }
    render() { 
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://whitehouse.gov">Navbar</a>
                    <p>Total Count: {this.props.totalCount}</p>
                </div>
            </nav>
        );
    }
}
 
export default NavBar;