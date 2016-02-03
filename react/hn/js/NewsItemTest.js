var $=require('jquery');
var NewsItem = require('./NewsItem');
var React = require('react');

$.ajax({
	url:'/json/items.json'
}).then(function(items){
	console.log('items',items);
	React.render(<NewsItem item={items[0]} rank={1} />,$('#content')[0]);
});
