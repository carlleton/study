import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component{
	constructor(props){
		super(props);
	}
    render(){
        return (
            <div>MyComponent!{this.props.name}</div>
        );
    }
};
MyComponent.propTypes={//校验
    todo:React.PropTypes.object,
    name:React.PropTypes.string,
}
MyComponent.defaultProps={
    todo:{},
    name:'',
}
module.exports = MyComponent;

