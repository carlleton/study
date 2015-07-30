package com.vcandou.nanwu;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.res.Resources;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Window;
import android.widget.TextView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		init();
	}
	private List<TextView> textviewlist=new ArrayList<TextView>();
	FlowLayout fl;
	private int shownum=0;
	private int showindex=0;
	private int base_n=0;
	private int base_color=android.graphics.Color.argb(100, 0, 0, 0);
	private int flash_color=android.graphics.Color.argb(255, 255, 0, 0);
	private int top_FlowLayout=0;
	private int screenWidth =0;
	private int screenHeight=0;
	private int num_w=0;
	private int num_h=0;
	
	private int measureHeight=0;//要减去的高度
	private int measureWidth=0;
	
	private void init(){
		DisplayMetrics dm = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);
		screenWidth =  dm.widthPixels;
		screenHeight = dm.heightPixels;
	    
		
		shownum= Integer.parseInt(this.getString(R.string.show_num));
		String basestr=this.getString(R.string.basestr);
		char[] basestr_chars=basestr.toCharArray();
		base_n=basestr_chars.length;
		String[] basestrs=new String[base_n];
		int base_i=0;
		for(int i=0;i<base_n;i++){
			basestrs[i]= String.valueOf(basestr_chars[i]);
		}
		
		
		fl=(FlowLayout) findViewById(R.id.flowlayout1);
		
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
			blankview1.setTextSize(20);
			fl.addView(blankview1);
			textviewlist.add(blankview1);
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
		if(measureHeight==0){
			measureHeight=fl.getMeasuredHeight();
			measureWidth=fl.getMeasuredWidth();
			int w=textview_old.getWidth();
			int h=textview_old.getHeight();
			num_h= (int) Math.ceil((float)measureHeight/(float)h);
			num_w=(int)Math.ceil((float)measureWidth/(float)w);
			measureHeight-=h;
			Log.i("vc", "measureHeight:"+measureHeight+",measureWidth:"+measureWidth+",h:"+h+",w:"+w);
			Log.i("vc", "num_h:"+num_h+",num_w:"+num_w);
			
			
		}
		if(showindex>=shownum*(base_n+1)){
			showindex=0;
			top_FlowLayout=0;
			fl.layout(0, top_FlowLayout, screenWidth, screenHeight);
			//handler.removeCallbacks(task);
			//return;
		}
		//Log.i("vc", "showindex:"+showindex);
		if(showindex!=0 && (showindex+1)%(num_h*num_w)==0){
			top_FlowLayout-= measureHeight;
			fl.layout(0, top_FlowLayout, screenWidth, screenHeight);
		}
		
		TextView textview_new=(TextView)textviewlist.get(showindex);
		textview_new.setTextColor(flash_color);
	}

}
