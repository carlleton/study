function GetRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
//var num = GetRandomNum(1,10);   
//if (num <= 8)
//{
var cu = window.location.host;
var pa = window.location.pathname;

if (pa == '/scm/')
{
	var type = 2;
	if (type == 1)
	{
		if (cu == 'ggg.17173h.cn')
		{
			var urlArr = [ 
				"ggg.2ta8.net",
				"ggg.2ta8.com.cn",
				"ggg.baifumeiba.cn",
				"ggg.gaofushuaiba.cn",
				"ggg.guolaiwanba.net"
					];
			var rand = GetRandomNum(0, urlArr.length - 1)
				var url = window.location.href.replace(cu, urlArr[rand]);
			//alert(url);
			location.href = url;
		}
	}
	else
	{
		var urlSrc = [
			"gg2.2ta8.net",
			"gg2.2ta8.com.cn",
			"gg2.baifumeiba.cn",
			"gg2.gaofushuaiba.cn",
			"gg2.guolaiwanba.net"
				];
		var urlDes = [
			"gg3.2ta8.net",
			"gg3.2ta8.com.cn",
			"gg3.baifumeiba.cn",
			"gg3.gaofushuaiba.cn",
			"gg3.guolaiwanba.net"
				];
		var pos = urlSrc.indexOf(cu);
		if (pos != -1)
		{
			var url = window.location.href.replace(urlSrc[pos], urlDes[pos]);
			location.href = url;
		}
	}
}
else if (pa == '/ljpp/')
{
	var type = 2;
	if (type == 1)
	{
		if (cu == 'ggg.17173h.cn')
		{
			var urlArr = [ 
				"ggg.2ta8.net",
				"ggg.2ta8.com.cn",
				"ggg.baifumeiba.cn",
				"ggg.gaofushuaiba.cn",
				"ggg.guolaiwanba.net"
					];
			var rand = GetRandomNum(0, urlArr.length - 1)
				var url = window.location.href.replace(cu, urlArr[rand]);
			//alert(url);
			location.href = url;
		}
		else if (cu == 'gg1.2ta8.com.cn')
		{
			var urlArr = [ 
				"s0g1.2ta8.com.cn",
				"s1g1.2ta8.com.cn",
				"s2g1.2ta8.com.cn",
				"s3g1.2ta8.com.cn",
				"s4g1.2ta8.com.cn",
				"s5g1.2ta8.com.cn",
				"s6g1.2ta8.com.cn",
				"s7g1.2ta8.com.cn",
				"s8g1.2ta8.com.cn",
				"s9g1.2ta8.com.cn"
					];
			var rand = GetRandomNum(0, urlArr.length - 1)
				var url = window.location.href.replace(cu, urlArr[rand]);
			//alert(url);
			location.href = url;
		}
	}
	else
	{
		/*var urlSrc = [
			"ggg.2ta8.net",
			"ggg.2ta8.com.cn",
			"ggg.baifumeiba.cn",
			"ggg.gaofushuaiba.cn",
			"ggg.guolaiwanba.net"
				];
		*/
		var urlSrc = [
			"gg1.2ta8.net",
			"gg1.2ta8.com.cn",
			"gg1.baifumeiba.cn",
			"gg1.gaofushuaiba.cn",
			"gg1.guolaiwanba.net",
			"s0g1.2ta8.com.cn",
			"s1g1.2ta8.com.cn",
			"s2g1.2ta8.com.cn",
			"s3g1.2ta8.com.cn",
			"s4g1.2ta8.com.cn",
			"s5g1.2ta8.com.cn",
			"s6g1.2ta8.com.cn",
			"s7g1.2ta8.com.cn",
			"s8g1.2ta8.com.cn",
			"s9g1.2ta8.com.cn"
				];
		var urlDes = [
			"gg2.2ta8.net",
			"gg2.2ta8.com.cn",
			"gg2.baifumeiba.cn",
			"gg2.gaofushuaiba.cn",
			"gg2.guolaiwanba.net",
			"s0g2.2ta8.com.cn",
			"s1g2.2ta8.com.cn",
			"s2g2.2ta8.com.cn",
			"s3g2.2ta8.com.cn",
			"s4g2.2ta8.com.cn",
			"s5g2.2ta8.com.cn",
			"s6g2.2ta8.com.cn",
			"s7g2.2ta8.com.cn",
			"s8g2.2ta8.com.cn",
			"s9g2.2ta8.com.cn"
				];
		var pos = urlSrc.indexOf(cu);
		if (pos != -1)
		{
			var url = window.location.href.replace(urlSrc[pos], urlDes[pos]);
			location.href = url;
		}
	}
}
//}
