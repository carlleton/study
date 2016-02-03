var $=require('jquery');
var React=require('react');
var url=require('url');

var NewsItem = React.createClass({
	getDomain:function(){
		return url.parse(this.props.item.url).hostname;
	},
	render:function(){
		return (
			<div className="newsItem">
				<a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
				<span class="newsItem-domain">
					({this.getDomain()})
				</span>
			</div>
		);
	}
});

module.exports = NewsItem;