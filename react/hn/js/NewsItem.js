var $=require('jquery');
var React=require('react');

var NewsItem = React.createClass({
	render:function(){
		return (
			<div className="newsItem">
				<a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
			</div>
		);
	}
});

module.exports = NewsItem;