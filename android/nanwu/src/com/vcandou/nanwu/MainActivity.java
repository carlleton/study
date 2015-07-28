package com.vcandou.nanwu;

import android.app.Activity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.LinearLayout.LayoutParams;
import android.widget.TextView;

public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		init();
	}
	
	private void init(){
		int shownum= Integer.parseInt(this.getString(R.string.show_num));
		LinearLayout ly= (LinearLayout) findViewById(R.id.liner1);
		
		
		char[] basestr_chars=this.getString(R.string.basestr).toCharArray();
		int base_n=basestr_chars.length;
		String[] basestrs=new String[base_n];
		int base_i=0;
		
		for(int i=0;i<base_n;i++){
			basestrs[i]= String.valueOf(basestr_chars[i]);
		}
		
		System.out.println("shownum:"+shownum);
		
		LayoutParams lps=new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
		for(int i=0;i<shownum;i++){
			TextView textview1 = new TextView(this);
			textview1.setText(basestrs[base_i]);//
			
			base_i++;
			if(base_i>=base_n)base_i=0;
			ly.addView(textview1,lps);
		}
		
	}

}
