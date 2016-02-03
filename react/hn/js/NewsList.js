var _=require('lodash');
var NewsHeader=require('./NewsHeader');
var NewsItem=require('./NewsItem');
var React=require('react');

var NewsList = React.createClass({
	render:function(){
		return (
			<div class="newsList">
				<NewsHeader/>
				<div className="newsList-newsItems">
				{_(this.props.items).map(function(item,index){
					return <NewsItem key={item.id} item={item} rank={index+1}/>;
				}.bind(this)).value()}
				</div>
			</div>
		);
	}
});

module.exports = NewsList;