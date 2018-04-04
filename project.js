var iterator=0;
var prv=[];
var flag=0;
var p;

$(function(){
	
	//changing the dimension of the grid
	$("#dim").on("change",function(){
		$("#container").html("");
		 s = parseInt($(this).val());
		//console.log(typeof(s));
                $("#nextB").removeAttr("disabled");
		$("#nextB").css("opacity","1");
		table(s);
		

	})
	
	//----------------------------------------------------
	
	$("#startB").on("click",function(){
		$(".cell").off("click",cellListener);
		if($(this).html()=="Start"){
			$("#nextB").attr('disabled', 'disabled');
			$("#prevB").attr('disabled', 'disabled');
			if($("#nextB").attr('disabled')=='disabled'){
				$("#nextB").css("opacity","0.6");
			}
			if($("#prevB").attr('disabled')=='disabled'){
				$("#prevB").css("opacity","0.6");
			}

			$(this).html("Pause");
			p = setInterval(nextState,$("#delay").val());
			
			
		}
		else{
			$("#nextB").removeAttr("disabled");
			$("#prevB").removeAttr("disabled");
			if($("#nextB").attr('disabled')!='disabled'){
				$("#nextB").css("opacity","1");
			}
			if($("#prevB").attr('disabled')!='disabled'){
				$("#prevB").css("opacity","1");
			}
			clearInterval(p);
			$(this).html("Start");
			
		}
		$("#dim").attr('disabled', 'disabled');
		if($("#dim").attr('disabled')=='disabled'){
			$("#dim").css("opacity","0.6");
		}
		
		
	})
	
	//-----------------------------------------------
	
	$("#delay").on("change",function(){
		if($("#startB").html()=="Pause"){
			clearInterval(p);
			p = setInterval(nextState,$("#delay").val());
		}
	})
			
	//-----------------------------------------------
	
	$("#resetB").on("click",function(){
		flag=0;
		iterator=0;
		prv=[];
		if(iterator==0){
			flag=0;
			$("#prevB").attr('disabled', 'disabled');
			$("#prevB").css("opacity","0.6");
		}
		$("#container").html("");
		table(s);
		clearInterval(p);
		$("#startB").html("Start");
		$("#dim").removeAttr("disabled");
		if($("#dim").attr('disabled')!='disabled'){
			$("#dim").css("opacity","1");
		}
		
		if(iterator==0){
			flag=0;
			$("#prevB").attr('disabled', 'disabled');
			$("#prevB").css("opacity","0.6");
		}
	})
	
	//-------------------------------------------------
	
	$("#nextB").on("click",function(){
		nextState();
		if($("#prevB").attr('disabled')=='disabled'){
			$("#prevB").removeAttr("disabled");
			$("#prevB").css("opacity","0.6");
		}
		if($("#prevB").attr('disabled')!='disabled'){
			$("#prevB").css("opacity","1");
		}
	})
	
	//-------------------------------------------------------
	
	$("#prevB").on("click",function(){

		for(i=1;i<=prv[iterator-1].length;i++){
			if(prv[iterator-2][i-1]==1){
				$("#"+i)[0].style.backgroundColor="blue" ;	
			}
			else{
				$("#"+i)[0].style.backgroundColor="white" ;
			}
		}
		iterator=iterator-1;
		//console.log(iterator);
		if(iterator==1){
			flag=0;
			$("#prevB").attr('disabled', 'disabled');
			$("#prevB").css("opacity","0.6");
		}
	})
	
	//-------------------------------------------------------
	
	//drawing the table according to the selected grid size
	function table(d){
                $("#prevB").attr('disabled', 'disabled');
	        $("#prevB").css("opacity","0.6");
		var tb = $("<table>");
		tb.css("border","1px solid black");
		tb.css("borderCollapse","collapse");
		tb.css("margin","auto");
		tb.attr("width","80%");
		tb.attr("height","500px");
		count=1;
		for(var i=0;i<d;i++)
		{
			var row = $("<tr>");
			for(var j=0;j<d;j++)
			{
				col = $("<td>");
				col.attr("id",count);
				col.attr("class","cell");
				col.css("border","1px solid black");
				col.css("backgroundColor","white");
				col.attr("height","20");
				row.append(col);
				count++;
			}
			tb.append(row);	
		}
		var myDiv = $("#container");
		myDiv.append(tb);
		
		$(".cell").on("click",cellListener);
	}
	
	//---------------------------------------------------
	
	function cellListener(){
		if($(this)[0].style.backgroundColor=="white")
		{
			$(this)[0].style.backgroundColor = "blue";
		}
		else
		{
			$(this)[0].style.backgroundColor="white";
				
		}		
	}
	
	
	//----------------------------------------------------
	
	function nextState(){
		var rowLength = parseInt($("#dim").val());
		var arr=[];
		var a=[];
		var j=1;
		var k=2;
		

		prv[iterator]=[];
		//saving the initial state
		if(flag==0)
		{
			for(i=1;i<=rowLength*rowLength;i++){
				if($("#"+i)[0].style.backgroundColor=="white"){
					prv[iterator][i-1]=0;
				}
				else
				{
					prv[iterator][i-1]=1;
				}
			}
			iterator=iterator+1;
			flag=1;
		}
		
		for(i=1;i<=rowLength*rowLength;i++){
			//get neighbours of each cell
			
			if(i==1){
				//left upper corner
				arr[i]=[i+1,i+rowLength,i+rowLength+1];
			}
			else if(i==rowLength){
				//right upper corner
				arr[i]=[i-1,i+rowLength-1,i+rowLength];
			}
			else if(i==(rowLength*rowLength)-(rowLength-1)){
				//left lower corner
				arr[i]=[i-rowLength,i-rowLength+1,i+1];
			}
			else if(i==(rowLength*rowLength)){
				//right lower corner
				arr[i]=[i-rowLength-1,i-rowLength,i-1];
			}
			else if(i>1 && i<rowLength){
				//the first row
				arr[i]=[i-1,i+1,i+rowLength-1,i+rowLength,i+rowLength+1];
			}
			else if((rowLength*rowLength)-(rowLength-1)<i && i<(rowLength*rowLength)){
				//the last row
				arr[i]=[i-rowLength-1,i-rowLength,i-rowLength+1,i-1,i+1];
			}
			else if(i==j*rowLength+1){
				//the first column
				arr[i]=[i-rowLength,i-rowLength+1,i+1,i+rowLength,i+rowLength+1];
				j++;
			}
			else if(i==k*rowLength){
				//the last column
				arr[i]=[i-rowLength-1,i-rowLength,i-1,i+rowLength-1,i+rowLength];
				k++;
			}
			else{
				//inner cells
				arr[i]=[i-rowLength-1,i-rowLength,i-rowLength+1,i-1,i+1,i+rowLength-1,i+rowLength,i+rowLength+1];
			}
			
			
			/*
			if($("#"+i)[0].style.backgroundColor=="white"){
				//inactive cell
				//console.log($("#"+i).attr("id"));
				//console.log("inactive cell");
				
			}
			else{
				//active cell
				//console.log($("#"+i).attr("id"));
				//console.log("active cell");
				
			}*/
			
			
			
			//counting the active neighbour cells and the inactive neighbour cells for each cell
			var activeCount=0;
			var inactiveCount=0;
			for(l=0;l<arr[i].length;l++){
				if($("#"+arr[i][l])[0].style.backgroundColor=="white"){
					//inactive neighbour
					inactiveCount++;
					//console.log($("#"+arr[i][l]).attr("id") + ":" + "inactive neighbour cell");
					
				}
				else{
					//active neighbour
					activeCount++;
					//console.log($("#"+arr[i][l]).attr("id") + ":" + "active neighbour cell");
					
				}
				
			}
			//console.log("no. of inactive neighbours :" + inactiveCount);
			//console.log("no. of active neighbours :" +activeCount);
			
			//-------------------------------------------------------------
			//check neighbours
			
			if($("#"+i)[0].style.backgroundColor=="white" ){
				//inactive cell
				if(activeCount==3){
					 //with exactly 3 active neighbours
					a[i-1]=1;  //will be active
				}
				else{
					a[i-1]=0;	//stay as it is
				}
			}
			
			else{
				//active cell
				if(activeCount<2){
					// with less than 2 active neighbors 
					a[i-1]=0;  //will be inactive
				}
				else if(activeCount==2 || activeCount==3){
					// with exactly 2 or 3 active neighbors
					a[i-1]=1;  //will stay active
				}
				else if(activeCount>3){
					// with more than 3 active neighbors 
					a[i-1]=0;  //will be inactive
				}
			}
			
			//console.log(arr[i]);
		}
		//console.log(a);
		

		//-----------------------------------------------------------------------
		//next iteration decision
		for(i=1;i<=a.length;i++){
			if(a[i-1]==1){
				$("#"+i)[0].style.backgroundColor="blue" ;
				
			}
			else{
				$("#"+i)[0].style.backgroundColor="white" ;
				
			}
		}

		//-------------------------------------------------------------------------	
		//saving the state of the cells
		var flag1=0;
		for(i=0;i<a.length;i++){
			if(prv[iterator-1][i]!=a[i])
			{
				
				flag1=1;
			}
		}
		
		if(flag1==1){
			prv[iterator]=[];
		
			for(i=0;i<a.length;i++){
				prv[iterator][i]=a[i];
			}
			iterator++;
		}

		//console.log(prv);
		
		
		
	

		
	}
	
	
		
	
	
		
	

	
	
})	
