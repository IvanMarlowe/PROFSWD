// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
var tableArr = new Array(6);
				var tableTemp = new Array(6);
				var isFull = [0, 0, 0, 0, 0, 0, 0];
				var playernum = 1;
				var winspecs = 0;
				
				for(var x = 0; x < 6; x++){
					tableArr[x] = new Array(7);
				}	
				
				for(var y = 0; y < 6; y++)
					for(var x= 0; x < 7; x++)
						tableArr[y][x] = 0;
				
				for(var x = 0; x < 7; x++)
					tableTemp[x] = 5;
				
				function determineColor(player){
					if(player == 1)
						color = "#CCFF99";
					else if(player == 2)
						color = "#669900";
					
					return color;
				}
				
				function getSpecificIndex(x, y, player){
					var table = document.getElementById('tableMain');
					var row = table.getElementsByTagName("tr")[x];
					row.cells[y].style.backgroundColor = determineColor(player); 
				}
				
				function switchPlayer(player){
					switch(player){
						case 1:
							playernum = 2;
							break;
						case 2:
							playernum = 1;
							break;
					}
				}

				function doColor(player, tablex){
					if(isFull[tablex] == 0){	
						tableArr[tableTemp[tablex]][tablex] = player;
						getSpecificIndex(tableTemp[tablex], tablex, player);
						if(tableTemp[tablex] > 0){
							tableTemp[tablex]--;
						}
						else
							isFull[tablex] = 1;
						var isWinPlayer1 = isWinPlayer(1);
						var isWinPlayer2 = isWinPlayer(2);
						if(isWinPlayer1 == 1)
							alert("Player 1 Wins!");
						else if(isWinPlayer2 == 1)
							alert("Player 2 Wins!");
						switchPlayer(playernum);
					}
				}

				function conditionOne(playerType){
					for(var y = 0; y < 6; y++){
						for(var x = 0; x < 7; x++){
							if(playerType == tableArr[y][x])
								winspecs++;
							if(winspecs == 4)
								return 1;
							else{
								if(x < 6){
									if(playerType != tableArr[y][x+1])
										winspecs = 0;
								}
							}
						}
					}
				}

				function conditionTwo(playerType){
					for(var x = 0; x < 7; x++){
						for(var y = 0; y < 6; y++){
							if(playerType == tableArr[y][x])
								winspecs++;
							if(winspecs == 4)
								return 1;
							else{
								if(y < 5){
									if(playerType != tableArr[y+1][x])
										winspecs = 0;
								}
							}
						}
					}
				}

				function conditionThree(playerType){
					for(var y = 5; y >= 0; y--){
						for(var x = 0; x < 7; x++){
							if(y > 0 && x >= 0 ){
								if(playerType == tableArr[y][x]){
									if(playerType == tableArr[y-1][x+1]){
										if(playerType == tableArr[y-2][x+2]){
											if(playerType == tableArr[y-3][x+3]){
												return 1;
											}
											else
												winspecs = 0;
										}
										else
											winspecs = 0;
									}
									else
										winspecs = 0;	
								}
								else
									winspecs = 0;
							}
						}
					}
				}

				function conditionFour(playerType){
					for(var y = 5; y >= 0; y--){
						for(var x = 6; x >= 0; x--){
							if(y > 0 && x < 7){
								if(playerType == tableArr[y][x]){
									if(playerType == tableArr[y-1][x-1]){
										if(playerType == tableArr[y-2][x-2]){
											if(playerType == tableArr[y-3][x-3]){
												return 1;
											}
											else
												winspecs = 0;
										}
										else
											winspecs = 0;
									}
									else
										winspecs = 0;	
								}
								else
									winspecs = 0;
							}
						}
					}
				}

				function isWinPlayer(playerType){
					var winConditionOne = conditionOne(playerType);
					if(winConditionOne == 1)
						return 1;
					else
						winspecs = 0;
					var winConditionTwo = conditionTwo(playerType);
					if(winConditionTwo == 1)
						return 1;
					else
						winspecs = 0;
					var winConditionThree = conditionThree(playerType);
					if(winConditionThree == 1)
						return 1;
					else
						winspecs = 0;
					var winConditionFour = conditionFour(playerType);
					if(winConditionFour == 1)
						return 1;
					else
						winspecs = 0;
				}
					
				function writeTable(){
					for(y=0; y< 6; y++){
						for(x=0; x< 7; x++){
						document.write(tableArr[y][x]);
						document.write("&nbsp;")
						}
						document.write("<br>");
					}
					document.write("<br>");
				}

				function clickDrop(clicked_id){
					if(playernum == 1){
						doColor(1, Number(clicked_id));
					}
					else if(playernum == 2){
						doColor(2, Number(clicked_id));
					}
				}
