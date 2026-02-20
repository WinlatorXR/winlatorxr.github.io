const compatNotes = [
    'Can lag often or frequently crashes',
    'The mouse endlessly \"spins\" if you don\'t keep your head centered',
    'Crashes after tutorial / after title screen',
    'Audio playback causes latency/lag spikes',
    'No sound',
    'Hangs during load',
    'Using WinlatorXR\'s XrAPI',
    'Using OpenTrack WXR'
]

function searchMatrix(matrixInput, matrixName) {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(matrixInput);
  filter = input.value.toUpperCase();
  table = document.getElementById(matrixName);
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
	tr[i].style.display = "";
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function updateCompatNotes() {
	const notesContainer = document.getElementById('compatnotescontainer');
	
	const notesList = document.createElement('ol');
	
	for (let i = 0; i < compatNotes.length; i++) {
		const item = document.createElement('li');
		
		item.innerHTML = '<i>' + compatNotes[i] + '</i>';
		
		notesList.appendChild(item);
	}
	
	notesContainer.appendChild(notesList);
}

function createTableFromJson(dataFileName, containerID, tableID) {	
	fetch('./scripts/' + dataFileName)
		.then(response => response.json())
		.then(data => {
			const header = data[0];
			const rows = data.slice(1);
			
			const container = document.getElementById(containerID);

			const table = document.createElement('table');
			
			table.classList.add('compatmatrix');
			table.id = tableID;
			
			const headerRow = table.createTHead().insertRow(0);
			
			var columns = ['','','',''];
			var columnSizes = ['30%','15%','15%','15%'];
			
			Object.keys(header).forEach(key => {
				const value = header[key];
				  if (key == "c1Name") {
					  columns[0] = value;
				  }
				  else if (key == "c2Name") {
					  columns[1] = value;
				  }
				  else if (key == "c3Name") {
					  columns[2] = value;
				  }
				  else if (key == "c4Name") {
					  columns[3] = value;
				  }
				  else if (key == "c1Size") {
					  columnSizes[0] = value;
				  }
				  else if (key == "c2Size") {
					  columnSizes[1] = value;
				  }
				  else if (key == "c3Size") {
					  columnSizes[2] = value;
				  }
				  else if (key == "c4Size") {
					  columnSizes[3] = value;
				  }
				});
				
			for (let i = 0; i < columns.length; i++) {
				const th = document.createElement('th');
				th.innerHTML = columns[i];
				th.width = columnSizes[i];
				headerRow.appendChild(th);
			}
			
			var rowNames = [];
			var rowWorksQ2 = [];
			var rowWorksQ3 = [];
			var rowWorksP4 = [];
			var rowSupName = [];
			var rowSupQ2 = [];
			var rowSupQ3 = [];
			var rowSupP4 = [];
			var rowRedditURLs = [];
			
			const tableBody = table.createTBody();
			
			rows.sort((a, b) => a.name.localeCompare(b.name));
				
			Object.keys(rows).forEach(key => {
				const value = rows[key];
				Object.keys(value).forEach(rowkey => {
					const rowvalue = value[rowkey];
					if (rowkey == "name") {
						rowNames.push(rowvalue);
					}
					else if (rowkey == "worksQ2") {
						rowWorksQ2.push(rowvalue);
					}
					else if (rowkey == "worksQ3") {
						rowWorksQ3.push(rowvalue);
					}
					else if (rowkey == "worksP4") {
						rowWorksP4.push(rowvalue);
					}
					else if (rowkey == "c1Sup") {
						rowSupName.push(rowvalue);
					}
					else if (rowkey == "c2Sup") {
						rowSupQ2.push(rowvalue);
					}
					else if (rowkey == "c3Sup") {
						rowSupQ3.push(rowvalue);
					}
					else if (rowkey == "c4Sup") {
						rowSupP4.push(rowvalue);
					}
					else if (rowkey == "redditUrl") {
						rowRedditURLs.push(rowvalue);
					}
				});
			});
			
			for (let i = 0; i < rowNames.length; i++) {
				const row = tableBody.insertRow();
				const nameCell = row.insertCell();
				const q2Cell = row.insertCell();
				const q3Cell = row.insertCell();
				const p4Cell = row.insertCell();
				
				var nameExtraHTML = "";
				var q2ExtraHTML = "";
				var q3ExtraHTML = "";
				var p4ExtraHTML = "";
				
				if (rowSupName.length > i && rowSupName[i] != "") {
					var supIndex = Number(rowSupName[i]);
					
					if (supIndex > 0) {
						nameExtraHTML = ' <sup title=\"' + rowSupName[i] + '. ' + compatNotes[supIndex - 1].replaceAll('\"', '\'') + '\">' + rowSupName[i] + '</sup>';
					}
				}
				
				if (rowSupQ2.length > i && rowSupQ2[i] != "") {
					var supIndex = Number(rowSupQ2[i]);
					
					if (supIndex > 0) {
						q2ExtraHTML = ' <sup title=\"' + rowSupQ2[i] + '. ' + compatNotes[supIndex - 1].replaceAll('\"', '\'') + '\">' + rowSupQ2[i] + '</sup>';
					}
				}
				
				if (rowSupQ3.length > i && rowSupQ3[i] != "") {
					var supIndex = Number(rowSupQ3[i]);
					
					if (supIndex > 0) {
						q3ExtraHTML = ' <sup title=\"' + rowSupQ3[i] + '. ' + compatNotes[supIndex - 1].replaceAll('\"', '\'') + '\">' + rowSupQ3[i] + '</sup>';
					}
				}
				
				if (rowSupP4.length > i && rowSupP4[i] != "") {
					var supIndex = Number(rowSupP4[i]);
					
					if (supIndex > 0) {
						p4ExtraHTML = ' <sup title=\"' + rowSupP4[i] + '. ' + compatNotes[supIndex - 1].replaceAll('\"', '\'') + '\">' + rowSupP4[i] + '</sup>';
					}
				}
				
				if (rowRedditURLs.length > i && rowRedditURLs[i] != "") {
					nameCell.innerHTML = '<a target="_blank" rel="noopener noreferrer nofollow" href=\"' + rowRedditURLs[i] + '\">' + rowNames[i] + '</a>' + nameExtraHTML;
				}
				else {
					nameCell.innerHTML = rowNames[i] + nameExtraHTML;
				}
				
				if (rowWorksQ2[i] == "Y") {
					q2Cell.innerHTML = '<span class="knowncompat" title="Compatible">Y</span>' + q2ExtraHTML;
				}
				else if (rowWorksQ2[i] == "N") {
					q2Cell.innerHTML = '<span class="incompat" title="Incompatible as of last testing">N</span>' + q2ExtraHTML;
				}
				else if (rowWorksQ2[i] == "?") {
					q2Cell.innerHTML = '<span class="unknowncompat" title="Unknown Compatibility">?</span>' + q2ExtraHTML;
				}
				
				if (rowWorksQ3[i] == "Y") {
					q3Cell.innerHTML = '<span class="knowncompat" title="Compatible">Y</span>' + q3ExtraHTML;
				}
				else if (rowWorksQ3[i] == "N") {
					q3Cell.innerHTML = '<span class="incompat" title="Incompatible as of last testing">N</span>' + q3ExtraHTML;
				}
				else if (rowWorksQ3[i] == "?") {
					q3Cell.innerHTML = '<span class="unknowncompat" title="Unknown Compatibility">?</span>' + q3ExtraHTML;
				}
				
				if (rowWorksP4[i] == "Y") {
					p4Cell.innerHTML = '<span class="knowncompat" title="Compatible">Y</span>' + p4ExtraHTML;
				}
				else if (rowWorksP4[i] == "N") {
					p4Cell.innerHTML = '<span class="incompat" title="Incompatible as of last testing">N</span>' + p4ExtraHTML;
				}
				else if (rowWorksP4[i] == "?") {
					p4Cell.innerHTML = '<span class="unknowncompat" title="Unknown Compatibility">?</span>' + p4ExtraHTML;
				}				
			}

			container.appendChild(table);
		})
		.catch(error => {
			console.error('Error fetching the JSON file:', error);
		});
}