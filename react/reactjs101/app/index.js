import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './index2';

const lists=['JavaScript','Java','Node','Python'];
class HelloMessage extends React.Component {
    render() {
        return (
            <ul>
                {lists.map((result,index)=>{
                    return (<li key={index}>{result}</li>);

                })}
            </ul>
        );
    }
}

const App2 = ()=>(
    <div>Hello World2!</div>
);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        return (
            <div>
                <h1>Hello,World!</h1>
                <App2 />
                <MyComponent name="hi" />
                <HelloMessage />
            </div>
        );
    }
}
ReactDOM.render(<App />,document.getElementById('app'));

