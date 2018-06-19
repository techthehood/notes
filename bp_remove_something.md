angular ShowData service boilerplate for removing extra spaces or dashed or 
targeting words or characters to be removed or replaced with something

it removes all occurances of whatever - (later: i can make it remove only a given number of occurances as an option or remove every occurance)

	this.removeSomething = function(targ,char,repl)
    {
      /*
      //sample
      ShowData.removeSomething(ShowData.edit.title,' ');//unnessesary spaces
      //control the spaces
      pal = ShowData.removeSomething(pal,' ','-');
      //replace slashes with dashes
      pal = ShowData.removeSomething(pal,'/','-');
      //make sure there are no double dashes
      pal = ShowData.removeSomething(pal,'-');
      */
      //removes multiple spaces leading and trailing
      let curVal = targ;
      //let pattern1 =
      let multi_converter = new RegExp(char + '+','g');//  '/'+ char + '+/g or / +/g
      curVal = curVal.replace(multi_converter,char); //convert all multispaces to space
      let start_converter = new RegExp('^' + char,'g');
      curVal = curVal.replace (start_converter,"");  //remove space from start /^ /g
      let end_converter = new RegExp(char + '$','g');
      curVal = curVal.replace (end_converter,"");  //and end / $/g
      if(repl != undefined && repl != ""){
        let replacer = new RegExp(char,'g');
        curVal = curVal.replace(replacer,repl);
      }
      return curVal;
    };//end removeSomething