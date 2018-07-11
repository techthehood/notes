
//MY CONVERTER FUNCTION
	this.removeSomething = function(val,char,rep)
    {
      //removes multiple spaces leading and trailing
      let curVal = val;
      //let pattern1 =
      let multi_converter = new RegExp(char + '+','g');//  '/'+ char + '+/g or / +/g
      curVal = curVal.replace(multi_converter,char); //convert all multispaces to space
      let start_converter = new RegExp('^' + char,'g');
      curVal = curVal.replace (start_converter,"");  //remove space from start /^ /g
      let end_converter = new RegExp(char + '$','g');
      curVal = curVal.replace (end_converter,"");  //and end / $/g
      if(rep != undefined && rep != ""){
        let replacer = new RegExp(char,'g');
        curVal = curVal.replace(replacer,rep);
      }
      return curVal;
    };//end removeSomething
	
	//https://stackoverflow.com/questions/5090103/javascript-regexp-dynamic-generation-from-variables
	
	//MY ORIGINAL CONVERTER SCRIPT
	//removes multiple spaces leading and trailing
	let curVal = vKey.object_elements.newObj_input.value;
	curVal = curVal.replace(/ +/g," "); //convert all multispaces to space
	curVal = curVal.replace (/^ /g,"");  //remove space from start
	curVal = curVal.replace (/ $/g,"");  //and end
					
					