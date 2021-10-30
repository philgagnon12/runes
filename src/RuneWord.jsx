import React from 'react';
import Rune from './Rune.jsx';

class RuneWord extends React.Component {

  render() {

    const name = this.props.name;

    const rune_order = this.props.rune_order?.map( function(name, index, array){

        const rune = Rune.FromName(name);

        return ( <>
          <li className={"order"} key={name+index}>{rune}<div>{name}</div></li>
           {array.length-1 > index && <li key={name+index+"spacer"} className={"order"}>&nbsp;+&nbsp;</li>}
          </>)
    });

 

    const completed_stats = this.props.completed_stats?.map( function(stat, index){
        return <li key={name+index+"completed_stats"}>{stat}</li>
    });

    return <ul className={"rune_word"}>
      <li key={name+"name"} className={"name"}>{this.props.name}</li>
      <li key={name+"allowed_items"}>{this.props.allowed_items}</li>
      <li key={name+"rune_order"}><ul>{rune_order}</ul></li>
      <li key={name+"completed_stats"}><ul className={"stats"}>{completed_stats}</ul></li>
    </ul>
  }
}

export default RuneWord;