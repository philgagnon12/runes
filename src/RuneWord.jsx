import React from 'react';
import Rune from './Rune.jsx';

class RuneWord extends React.Component {

  render() {



    const rune_order = this.props.rune_order?.map( function(name, index, array){

        const rune = Rune.FromName(name);
        const spacer = " + ";

        return ( <li key={name}>{rune} {name} {array.length-1 > index && spacer} </li>)
    });

    const completed_stats = this.props.completed_stats?.map( function(stat, index){
        return <li key={index}>{stat}</li>
    });

    return <ul>
      <li>{this.props.name}</li>
      <li>{this.props.allowed_items}</li>
      <ul>{rune_order}</ul>
      <li><ul>{completed_stats}</ul></li>
    </ul>
  }
}

export default RuneWord;