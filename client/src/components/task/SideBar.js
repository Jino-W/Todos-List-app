import React from 'react'
import MetisMenu from 'react-metismenu'
import RouterLink from 'react-metismenu-router-link';
import './sidebar.css'

class SideBar extends React.Component{

    render(){
        const menu=[
            {
              icon: 'dashboard',
              label: 'Menu 1',
              to: 'menu-1',
            },
            {
              icon: 'bell',
              label: 'Menu 2',
              to: 'menu-2',
            },
            {
              icon: 'bolt',
              label: 'Menu 3',
              content: [
                {
                  icon: 'bolt',
                  label: 'Sub Menu',
                  to: 'sub-menu',
                },
              ],
            },
            {
              icon: 'external-link',
              label: 'External Link',
              externalLink: true,
              to: 'https://www.google.com',
            },
        ];

        return(
            <div>
                <MetisMenu
                    content={menu}
                    LinkComponent={RouterLink}
                />
            </div>
        )
    }
} 

export default SideBar