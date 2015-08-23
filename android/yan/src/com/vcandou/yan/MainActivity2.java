package com.vcandou.yan;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.ImageView;
import android.widget.MultiAutoCompleteTextView;
import android.widget.ToggleButton;


public class MainActivity2 extends Activity implements OnCheckedChangeListener {
	private AutoCompleteTextView autoTextView1;
	private MultiAutoCompleteTextView multiTextView;
	private String[] res={"beijing1","beijing2","beijing3",
						"shanghai1","shanghai2"};
	
	private ToggleButton toggleButton;
	private ImageView imageview1;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main5);
		autoTextView1= (AutoCompleteTextView) findViewById(R.id.autoCompleteTextView1);
		multiTextView=(MultiAutoCompleteTextView) findViewById(R.id.multiAutoCompleteTextView1);
		
		ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,res);
		autoTextView1.setAdapter(adapter);
		
		multiTextView.setTokenizer(new MultiAutoCompleteTextView.CommaTokenizer());
		multiTextView.setAdapter(adapter);
		
		//toogleButton
		toggleButton=(ToggleButton) findViewById(R.id.toggleButton1);
		imageview1=(ImageView) findViewById(R.id.imageView1);
		
		toggleButton.setOnCheckedChangeListener(this);
	}
	@Override
	public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
		// TODO 当被点击的时候，当前方法被执行
		
		
	}
	
	
}
