import React from 'react';
import RuneSelect from './RuneSelect.jsx';
import RunesDataSet from './RunesDataSet.js';
import RuneWordsDataSet from './RuneWordsDataSet.js';
import RuneWordFiltered from './RuneWordFiltered.jsx';
import FuzzyFind from './FuzzyFind.jsx';


class RuneWordFilter extends React.Component {

  constructor(props)
  {
    super(props);
    this.onRuneClick = this.onRuneClick.bind(this);
    this.onFuzzyFindChange = this.onFuzzyFindChange.bind(this);
    this.onFuzzyFindSubmit = this.onFuzzyFindSubmit.bind(this);
    this.onFuzzyFindStringRemove = this.onFuzzyFindStringRemove.bind(this);

    this.state = { filters : [],
                   fuzzy_find_added_to_filters: false,
                   fuzzy_find_strings: [] };

    this.fuzzy_find_timeout_id = -1;
  }

  onRuneClick(e,rune)
  {
    // filter the filters array to find out if we need to add a filter object
    const filters = this.state.filters.filter(function(filter){
        return filter.key === this.rune.props.name;
    }, { rune: rune });

    // Its not there add it
    if(filters.length === 0)
    {
        let filters_with_added = this.state.filters;

        let filter_args = {
            rune_name: rune.props.name
        };

        filters_with_added.push({
            filter: function(rune_word_filtered, filter_args){
                let rune_name_is_a_value = false;
                rune_word_filtered.props.rune_order.forEach(function(rune_name) {
                    rune_name_is_a_value = rune_name_is_a_value || rune_name === this.filter_args.rune_name;
                },{filter_args});
                return rune_name_is_a_value;
            },
            filter_args: filter_args,
            key: rune.props.name,
            enabled: false // Toggle filter will enable it
        });

        this.setState({filters: filters_with_added});
    }

    const thisArg = {
        rune_word_filter: this,
        rune: rune
    };

    // Toggle filter
    this.state.filters.forEach(function(filter){

        if( this.rune.props.name === filter.key )
        {
            filter.enabled = !filter.enabled;
        }

    }, thisArg);

    this.setState({filters: this.state.filters});

  }

  onFuzzyFindChange(e, fuzzy_find){
    const key = "fuzzy_find";

    // Its not there add it
    if(this.state.fuzzy_find_added_to_filters === false)
    {
        let filters_with_added = this.state.filters;

        let filter_args = {
            rune_word_filter: this,
            fuzzy_find: fuzzy_find
        };

        filters_with_added.push({
            filter: function(rune_word_filtered, filter_args){

                let keep = true;

                let strings = Array.from(filter_args.rune_word_filter.state.fuzzy_find_strings);

                if(filter_args.fuzzy_find.state.value.trim() !== "")
                    strings.push(filter_args.fuzzy_find.state.value);


                strings.forEach( function(string) {
                    const re = new RegExp(string, "ig") ;

                    keep = keep &&
                           ( rune_word_filtered.props.name.match(re) !== null ||
                           rune_word_filtered.props.allowed_items.match(re) !== null ||
                           rune_word_filtered.props.rune_order.filter( name => name.match(re) !== null ).length > 0 ||
                           rune_word_filtered.props.completed_stats.filter( stat => stat.match(re) !== null ).length > 0 );
                });
                
                return keep;
            },
            filter_args: filter_args,
            key: key,
            enabled: true
        });

        this.setState({ filters: filters_with_added,
                        fuzzy_find_added_to_filters: true });
    }

    if( this.fuzzy_find_timeout_id !== -1 )
        clearTimeout(this.fuzzy_find_timeout_id);


    // Delay the filter
    this.fuzzy_find_timeout_id = setTimeout(function(rune_word_filter){
        rune_word_filter.setState({ filters: rune_word_filter.state.filters});
    }, 200, this);
        
  }

  onFuzzyFindSubmit(e, fuzzy_find){

    const fuzzy_find_value = fuzzy_find.state.value;

    if(fuzzy_find_value.trim() !== ""){
        let fuzzy_find_strings = this.state.fuzzy_find_strings;
        fuzzy_find_strings.push(fuzzy_find_value);
        fuzzy_find.setState({value:""});
        this.setState({fuzzy_find_strings});
    }
  }

  onFuzzyFindStringRemove(i)
  {
    let fuzzy_find_strings = this.state.fuzzy_find_strings;
    fuzzy_find_strings.splice(i,1);
    this.setState(fuzzy_find_strings);
  }

  render()
  {
    return <div>
                <FuzzyFind onSubmit={this.onFuzzyFindSubmit} filters={this.state.filters} onChange={this.onFuzzyFindChange} value={this.state.fuzzy_find_value} />
                <ul>
                {this.state.fuzzy_find_strings.map((f,i) => <li key={i}>{f} <button onClick={() => this.onFuzzyFindStringRemove(i)}>trash</button></li>)}
                </ul>
                <div>{RunesDataSet.map( rune => <RuneSelect key={rune.index} onClick={this.onRuneClick} index={rune.index} name={rune.name} /> )}</div>
                <div>{RuneWordsDataSet.map( rune_word => <RuneWordFiltered key={rune_word.name} {...rune_word} filters={this.state.filters}/> )}</div>
            </div>
  }

}

export default RuneWordFilter;