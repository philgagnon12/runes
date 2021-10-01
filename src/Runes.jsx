import React from 'react';
import Rune from './Rune.jsx';
import RunesDataSet from './RunesDataSet.js';


class Runes extends React.Component {

	render()
	{

		const runes = RunesDataSet.map( rune => <Rune index={rune.index} name={rune.name} /> );

		return <>
			{runes}
	        
		</>
			
	}
}

export default Runes;