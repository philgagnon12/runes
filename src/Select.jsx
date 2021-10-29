import React from 'react';

class Select extends React.Component {

    constructor(props)
    {
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = { selected: false,
                       className: "" };

    }

    onClick(e)
    {
        this.setState({selected: !this.state.selected,
                       className: !this.state.selected === true ? "selected" : ""});

    }

    render() {
        return this.props.render(this);
    }
}


Select.defaultProps = {
    render : function(data){}
};

export default Select;