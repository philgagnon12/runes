import logo from './logo.svg';
import './App.css';
import React from 'react';
import RuneWordFiltered from './RuneWordFiltered.jsx';
import RuneWordFilter from './RuneWordFilter.jsx';



function App() {
  return (

    <div className="App">


      <header className="App-header">




<div className="ert">
      <RuneWordFilter >


  

        <RuneWordFiltered
          name="Ancient's pledge"
          allowed_items="3 Socket Shields"
          rune_order={["Ral", "Ort", "Tal"]}
          completed_stats={[
            "+50% Enhanced Defense",
            "Cold Resist +43%",
            "Fire Resist +48%",
            "Lightning Resist +48%",
            "Poison Resist +48%",
            "10% Damage Goes To Mana"
          ]}
        />

          <RuneWordFiltered
          name="Holy Thunder"
          allowed_items="4 Socket Scepters"
          rune_order={["Eth", "Ral", "Ort","Tal"]}
          completed_stats={[
            "+60% Enhanced Damage",
            "-25% Target Defense",
            "Adds 5-30 Fire Damage",
            "Adds 21-110 Lightning Damage",
            "+75 Poison Damage Over 5 Seconds",
            "+10 To Maximum Damage",
            "Lightning Resistance +60%",
            "+5 To Maximum Lightning Resistance",
            "+3 To Holy Shock (Paladin Only)",
            "Level 7 Chain Lightning (60 Charges)"
          ]}
        />

</RuneWordFilter>
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
