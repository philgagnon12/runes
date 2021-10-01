import React from 'react';

class FuzzyFind extends React.Component {

    constructor(props)
    {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {value: this.props.value};
    }

    onSubmit(e)
    {
        e.preventDefault();
        this.props.onSubmit(e, this);
    }

    onChange(e)
    {
        this.setState({value:e.target.value});
        this.props.onChange(e, this);
    }

    render() {
        return <form onSubmit={this.onSubmit} >
                    <input type="text" onChange={this.onChange} value={this.state.value} />
               </form>
    }
}

FuzzyFind.defaultProps = {
    onSubmit: function(e){},
    onChange: function(e){},
    value: ""
};

export default FuzzyFind;