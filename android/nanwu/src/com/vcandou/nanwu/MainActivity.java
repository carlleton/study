package com.vcandou.nanwu;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		init();
	}
	private List<TextView> textviewlist=new ArrayList<TextView>();
	private int shownum=0;
	private int showindex=0;
	private int base_n=0;
	private int base_color=android.graphics.Color.argb(100, 0, 0, 0);
	private int flash_color=android.graphics.Color.argb(255, 255, 0, 0);
	private int top_FlowLayout=0;
	
	private void init(){
		shownum= Integer.parseInt(this.getString(R.string.show_num));
		String basestr=this.getString(R.string.basestr);
		char[] basestr_chars=basestr.toCharArray();
		base_n=basestr_chars.length;
		String[] basestrs=new String[base_n];
		int base_i=0;
		for(int i=0;i<base_n;i++){
			basestrs[i]= String.valueOf(basestr_chars[i]);
		}
		System.out.println("shownum:"+shownum);
		
		
		FlowLayout fl=(FlowLayout) findViewById(R.id.flowlayout1);
		for(int i=0;i<shownum;i++){
			for(base_i=0;base_i<base_n;base_i++){
				TextView textview1 = new TextView(this);
				textview1.setText(basestrs[base_i]);
				textview1.setTextSize(20);
				textview1.setTextColor(base_color);
				fl.addView(textview1);
				textviewlist.add(textview1);
			}
			TextView blankview1=new TextView(this);
			blankview1.setText("  ");
			fl.addView(blankview1);
		}
		TextView textview_old=(TextView)textviewlist.get(showindex);
		textview_old.setTextColor(flash_color);
		
		handler.postDelayed(task,5000);//延迟调用
		//handler.post(task);//马上调用
	}
	private Handler handler = new Handler();
	private Runnable task = new Runnable() {
		public void run() {
			handler.postDelayed(this, 300);// 设置延迟时间，此处是5秒,300
			runflash();
		}
	};
	private void runflash(){
		TextView textview_old=(TextView)textviewlist.get(showindex);
		textview_old.setTextColor(base_color);
		
		showindex++;
		if(showindex>=shownum*base_n){
			showindex=0;
			top_FlowLayout=0;
			FlowLayout fl=(FlowLayout) findViewById(R.id.flowlayout1);
			fl.layout(0, top_FlowLayout, 480, 724);
			//handler.removeCallbacks(task);
			//return;
		}
		if(showindex!=0 && showindex%(16*15)==0){
			top_FlowLayout-=42.5*16;
			System.out.println("toplayout:"+top_FlowLayout);
			FlowLayout fl=(FlowLayout) findViewById(R.id.flowlayout1);
			fl.layout(0, top_FlowLayout, 480, 724);
		}
		
		//System.out.println("showindex:"+showindex);
		TextView textview_new=(TextView)textviewlist.get(showindex);
		textview_new.setTextColor(flash_color);
		
	}

}
