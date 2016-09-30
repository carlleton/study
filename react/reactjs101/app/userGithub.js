import React, { Component } from 'react';
import $ from 'jquery';

class UserGithub extends Component {
	constructor(props){
		super(props);
		this.state={
			username:'',
			githubUrl:'',
			avatarUrl:'',
		}
	}
	componentDidMount() {
		$.get(this.props.source,(result)=>{
			console.log(result);
			const data=result;
			if(data){
				this.setState({
					username:data.name,
					githubUrl:data.html_url,
					avatarUrl:data.avatar_url
				});
			}
		});
	}
	render() {
		return (
			<div>
				<h3>{this.state.name}</h3>
				<img src={this.state.avatarUrl} />
				<a href={this.state.githubUrl}>Github link</a>.
			</div>
		);
	}
}
module.exports=UserGithub;