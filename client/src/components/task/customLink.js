import React from 'react'
import '../../metisMenu.css'

class CustomLink extends React.Component {


    onClick = (e) => {
      if (this.props.hasSubMenu) this.props.toggleSubMenu(e);
      else {
        this.props.activateMe({
          newLocation: this.props.to,
          selectedMenuLabel: this.props.label,
          onSelected:this.props.label
        });
      }
    }

    render() {
      return (
        <a className="metismenu-link" style={{color:'white'}} onClick={this.onClick}>
          {this.props.children}
        </a>
      )
    }
}

const content=[
  {
    label:'All Tasks',
    to:'# '
  },
  {
      label: 'Filter Archived',
      to : '# ',
      content: [
        {
          label: 'All',
          to:'# '
        },
        {
          label: 'Archived',
          to: '# '
        },
        {
          label: 'Non Archived',
          to: '# '
        }
    ]
  },
  {
      label: 'Filter by State',
      to: '# ',
      content: [
        {
          label: 'Completed',
          to:'# '
        },
        {
          label: 'In Progress',
          to: '# '
        },
        {
          label: 'Pending',
          to: '# '
        }
    ]
  }
];

export { content , CustomLink }