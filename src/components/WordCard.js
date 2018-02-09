import React from 'react';

class WordsCard extends React.Component {

  render () {
    return (
      <div className='WordCard'>
        <div className='WordCardTitle'>
          {this.props.current}
        </div>
      </div>
    )
  }
}

export default WordsCard;
