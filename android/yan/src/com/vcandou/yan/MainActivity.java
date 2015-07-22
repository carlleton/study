package com.vcandou.yan;

import android.os.Bundle;
import android.widget.TextView;
import android.app.Activity;
import android.graphics.Color;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);//将布局xml文件引入到activity中
		TextView tv= (TextView)this.findViewById(R.id.textView1);
		tv.setTextColor(Color.RED);
	}

}
