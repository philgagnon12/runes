import React from 'react';
import Pin from './Pin.jsx';


class Pins extends React.Component{

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            categories_all: [],
            categories_active: [],
            add_pin_value : ""
        };

    }

    onClick(e,category){

        let categories_active = Array.from(this.state.categories_active).concat(this.props.categories_active);

        const categories_active_filtered = categories_active.filter( category_active => category_active !== category );

        if( categories_active.length === categories_active_filtered.length )
        {
            categories_active.push(category);
        }
        else
        {
            categories_active = categories_active_filtered;
        }

        this.setState({categories_active});

    }

    onSubmit(e){
        e.preventDefault();

        let categories_all = Array.from(this.state.categories_all);

        const value = this.state.add_pin_value;

        if( value.trim() !== "" && -1 === categories_all.findIndex( c => c === value ) )
        {
            categories_all.push(this.state.add_pin_value);
        }

        this.setState({categories_all,
                       add_pin_value : ""});

    }

    render(){

        const categories_all = Array.from(this.state.categories_all).concat(this.props.categories_all);


        const categories_active = Array.from(this.state.categories_active).concat(this.props.categories_active);

        const onClick = this.onClick;

        return <div>
            Pins
            <div>{categories_all.map(function(category_all){
                let is_active = false;

                categories_active.forEach( function( category_active ){
                    if( category_all === category_active )
                    {
                        is_active = true;
                    }
                });

                return <button key={category_all}
                               className={is_active === true ? "pin_on" : "pin_off"}
                               onClick={function(e){onClick(e,category_all)}}
                                >{category_all}</button>
            })}</div>
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    value={this.state.add_pin_value}
                    onChange={e => this.setState({add_pin_value:e.target.value})} />
                <button onClick={this.onSubmit}>Add pin</button>
            </form>
            <div>{this.props.render(this)}</div>
        </div>
    }
}

Pins.defaultProps = {
    categories_all: Pin.defaultProps.categories_all,
    categories_active: Pin.defaultProps.categories_active,
    render: function(state){}
}

export default Pins;
                