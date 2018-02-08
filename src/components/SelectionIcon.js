import React from 'react';

class SelectionIcon extends React.Component {
  render () {
    return (
      <div className='SelectionIcon'>
        <div className='SelectionType'>
          <p>
            A
          </p>
        </div>
        <div className='SelectionTitleIcon'>
          <p>
            {this.props.title}
          </p>
        </div>
      </div>
    )
  }
}

export default SelectionIcon;
