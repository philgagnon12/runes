import React from 'react';

class Filter extends React.Component {

    static
    create_cb(cb, cb_args, key, enabled) {
        return { filter: cb,
                 filter_args: cb_args,
                 key,
                 enabled };
    }

    render() {
        let visible = true;

        const filters_enabled = this.props.filters.filter(function(filter){
            return filter.enabled === true;
        });

        if( filters_enabled.length > 0 )
        {

            const f = this;

            filters_enabled.forEach(function(filter){

                visible = visible && filter.filter({ ...filter.filter_args, ...f.props.filter_args });

            });
        }

        let filterStyle = {
            display: visible === true ? "inline-block" : "none"
        };



        return  <div style={filterStyle}>{this.props.render(this)}</div>;

    }
}

Filter.defaultProps = {

    filters: [],
    filter_args: {},
    render : function(data){}
};

export default Filter;
