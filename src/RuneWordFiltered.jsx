import React from 'react';
import RuneWord from './RuneWord.jsx';

class RuneWordFiltered extends React.Component {

    render() {

        const rune_word = React.createElement(RuneWord, this.props);

        let visible = true;

        const filters_enabled = this.props.filters.filter(function(filter){
            return filter.enabled === true;
        });

        if( filters_enabled.length > 0 )
        {

            filters_enabled.forEach(function(filter){

                visible = visible && filter.filter(this.rune_word_filtered, filter.filter_args);

            }, {rune_word_filtered: this});
        }

        return <div>{ visible === true ? rune_word : null }</div>;
    }
}

export default RuneWordFiltered;