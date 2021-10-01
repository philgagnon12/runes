import React from 'react';
import RunesDataSet from './RunesDataSet.js';

class Rune extends React.Component {

  constructor(props)
  {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e)
  {
    this.props.onClick(e,this);
  }

  static FromName(rune_name, props) {
    let rune = null;

    RunesDataSet.forEach(function(rune_data){
      if( rune_name === rune_data.name )
        rune = rune_data;
    });

    return <Rune {...rune} {...props} />;
  }


  render() {
    return <button className="rune" onClick={this.onClick}><img alt={this.props.name} src={"runes/" + ( this.props.index < 10 ? "0" + this.props.index : this.props.index ) + "rune" + this.props.name + ".gif"} /></button>
  }
}


Rune.defaultProps = {
  onClick: function(e){}
};

export default Rune;