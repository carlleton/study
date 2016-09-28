import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component{
    render(){
        return (
            <div>MyComponent!</div>
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