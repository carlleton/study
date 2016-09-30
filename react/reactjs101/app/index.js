import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './index2';
import MarkdownEditor from './MarkdownEditor';

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

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.tick = this.tick.bind(this);
        this.state={
            secondElapsed:0,
        }
    }
    tick(){
        this.setState({secondElapsed:this.state.secondElapsed+1});
    }
    componentDidMount(){
        this.interval = setInterval(this.tick,1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render() {
        return (
            <div>Seconds Elapsed:{this.state.secondElapsed}</div>
        );
    }
}


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
                <Timer />
                <MarkdownEditor />
            </div>
        );
    }
}

ReactDOM.render(<App />,document.getElementById('app'));

