import React from 'react';

class Pin extends React.Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);

        this.state = {
            categories_pinned: props.categories_pinned
        };

    }

    onClick(e,category){

        e.preventDefault();

        let categories_pinned = Array.from(this.state.categories_pinned).concat(this.props.categories_pinned);

        const categories_pinned_filtered = categories_pinned.filter( category_pinned => category_pinned === category )

        // Toggle
        if( categories_pinned_filtered.length <= 0 )
        {
            // Pin it
            categories_pinned.push(category);
        }
        else
        {
            // Un-pin it
            categories_pinned = categories_pinned.filter( category_pinned => category_pinned !== category );
        }

        this.setState({categories_pinned});

        this.props.onClick(e,this,category);
    }

    render() {

        let pinned = false;

        // Merge state with prop
        const categories_pinned = Array.from(this.state.categories_pinned).concat(this.props.categories_pinned);

        this.props.categories_all.forEach( function(category_all){
            if( pinned === false )
            {
                categories_pinned.forEach( category_pinned => 
                    pinned = pinned || (category_all === category_pinned)
                )
            }
        });


        let categories_pinned_in_active = [];

        if( this.props.filter_by_categories === true )
        {
            categories_pinned_in_active = this.props.categories_active.filter( function(category_active){
                let is_in_active = false;

                categories_pinned.forEach( category => is_in_active = is_in_active || category === category_active )

                return is_in_active;
            });
        }

        const onClick = this.onClick;

        return <>
            { (this.props.filter_by_categories === false || categories_pinned_in_active.length > 0) && <div>
            <div>{ this.props.categories_all.map( category => <button key={category} onClick={function(e){onClick(e,category)}}>{pinned === true && <>Un-</>}Pin {pinned === true && <>from</>}{pinned === false && <>to</>} {category}</button> )}</div>
            {this.props.children}
        </div> }
        </>
    }
}

Pin.defaultProps = {
    categories_all: ["default"],
    categories_active: [],
    categories_pinned: [],
    filter_by_categories: true,
    onClick: function(e,pin,category){}
};

export default Pin;