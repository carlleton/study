var $=require('jquery');
var React=require('react');
var _=require('lodash');

var NewsHeader=React.createClass({
	getLogo:function(){
		return (
			<div className="newsHeader-logo">
				<a href="https://www.ycombinator.com"><img src="../img/y18.gif" /></a>
			</div>
		);
	},
	getTitle:function(){
		return (
			<div className="newsHeader-title">
				<a className="newsHeader-textLink" href="https://news.ycombinator.com">Hacker News</a>
			</div>
		);
	},
	getNav:function(){
		var navLinks=[
		{
			name:'new',
			url:'newest'
		},
		{
			name:'comments',
			url:'newcomments'
		},
		{
			name:'show',
			url:'show'
		},
		{
			name:'ask',
			url:'ask'
		},
		{
			name:'jobs',
			url:'jobs'
		},
		{
			name:'submit',
			url:'submit'
		}
		];
		return (
			<div className="newsHeader-nav">
			{_(navLinks).map(function(navLink){
					return (
						<a key={navLink.url} className="newsHeader-navLink newsHeader-textLink" href={'https://news.ycombinator.com/'+navLink.url}>
							{navLink.name}
						</a>
					);
				}).value()}
			</div>
		);
	},
	render:function(){
		return (
			<div className="newsHeader">
				{this.getLogo()}
				{this.getTitle()}
				{this.getNav()}
			</div>
		);
	}
});
module.exports = NewsHeader;