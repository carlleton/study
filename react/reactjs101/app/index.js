import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './index2';

const App2 = ()=>(
    <div>Hello World2!</div>
);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
        };
    }
    render(){
        return (
            <div>
                <h1>Hello,World!</h1>
                <App2 />
                <MyComponent />
            </div>
        );
    }
}
ReactDOM.render(<App />,document.getElementById('app'));