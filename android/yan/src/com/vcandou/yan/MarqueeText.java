package com.vcandou.yan;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.TextView;

public class MarqueeText extends TextView {

	public MarqueeText(Context context, AttributeSet attrs, int defStyleAttr) {
		super(context, attrs, defStyleAttr);
		// TODO Auto-generated constructor stub
	}

	public MarqueeText(Context context, AttributeSet attrs) {
		super(context, attrs);
		// TODO Auto-generated constructor stub
	}

	public MarqueeText(Context context) {
		super(context);
		// TODO Auto-generated constructor stub
	}

	public boolean isFocused(){
		return true;
	}

	
}
