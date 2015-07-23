package com.vcandou.yan;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.app.Activity;
import android.graphics.Color;

public class MainActivity extends Activity {

	private Button loginButton;
	private Button btn2;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main3);//将布局xml文件引入到activity中
		
		/*
		 * 1.初始化当前所需要控件
		 * 2.设置button的监听器
		 */
		loginButton= (Button) findViewById(R.id.button1);
		btn2 = (Button) findViewById(R.id.button2);
		/*
		 * 匿名内部类
		loginButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				System.out.println("点击按钮操作");
			}
		});
		*/
		loginButton.setOnClickListener(new MyOnClickListener(){

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				super.onClick(v);
				Toast.makeText(MainActivity.this, "loginButton要执行的逻辑", 1).show();
			}
			
		});
		
		btn2.setOnClickListener(new MyOnClickListener(){

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				super.onClick(v);
				Toast.makeText(MainActivity.this, "btn2要执行的逻辑", 1).show();
			}
		});

	}

}
class MyOnClickListener implements OnClickListener{

	@Override
	public void onClick(View v) {
		// TODO Auto-generated method stub
		Log.i("tag", "父类的onClick事件");
		v.setAlpha((float) 0.5);
	}
	
}
