import React, { Component } from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

class Toolbar extends Component {
  state = {
    showSideDrawer: true
  };

  render() {
    return (
      <header className={classes.Toolbar}>
        <DrawerToggle clicked={this.props.drawerToggleClicked}/>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems />
        </nav>
      </header>
    );
  }
}

export default Toolbar;
