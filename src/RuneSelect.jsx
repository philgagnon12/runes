import React from 'react';
import Rune from './Rune.jsx';

class RuneSelect extends React.Component {

    constructor(props)
    {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = { selected: false };

    }

    onClick(e, rune)
    {
        this.setState({selected: !this.state.selected});
    }

    render() {

        const onRuneClick = this.props.onClick;
        const onSelfClick = this.onClick;
        const onClick = function(e, rune)
        {
            onRuneClick(e, rune);
            onSelfClick(e, rune);
        };

        const props = {...this.props, onClick };

        const rune = React.createElement( Rune, props );

        return (
            <span>{rune}<span className={ this.state.selected === true ? "rune_select_selected" : "rune_select"}>{this.props.name}</span></span>
        );
    }
}

export default RuneSelect;