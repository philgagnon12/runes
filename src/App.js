import logo from './logo.svg';
import './App.css';
import React from 'react';
import RuneWordFilter from './RuneWordFilter.jsx';
import RuneWord from './RuneWord.jsx';
import Pins from './Pins.jsx';
import RuneWordsDataSet from './RuneWordsDataSet.js';
import Pin from './Pin.jsx';
import Filter from './Filter.jsx';



function App() {

  return (

    <div className="App">


      <header className="App-header">


<div className="ert">

   <Pins render={ pins =>
    <div>{pins.state.categories_active}
    <RuneWordFilter render={ rune_word_filter =>
      RuneWordsDataSet.map( rune_word => 
        <Filter key={rune_word.name}
                 filters={rune_word_filter.state.filters}
                 filter_args={{rune_word}}
                 render={
                  filter => <div className={"zxc"}><Pin filter_by_categories={pins.state.categories_active.length > 0}
                                 categories_all={[...pins.props.categories_all,...pins.state.categories_all]}
                                 categories_active={pins.state.categories_active} >
          <RuneWord {...rune_word} /></Pin> </div>
                  } 
         /> )
    }>

       
</RuneWordFilter>
</div>
}/>


  

</div>


        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
