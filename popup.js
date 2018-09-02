//// On click Setting ////
$(document).ready(function () {
	// export Tabs
	$("#export").click(onClickExport);

	// import tabs from file
	$("#import").click(function () {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			// chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
			chrome.tabs.sendMessage(tabs[0].id, {type:"importTabs"});
		});
	});

});


//// Export Tabs ////
function onClickExport(){
	chrome.windows.getAll({populate: true}, exportTabs);

	function exportTabs(winData) {
		let tabURLs = [];
		for (let i in winData) {
			let winTabs = winData[i].tabs;
			let numTabs = winTabs.length;
			for (let j = 0; j < numTabs; j++) {
				tabURLs.push(winTabs[j].url);
			}
		}

		let exportStr = convertArraytoString(tabURLs);
		let fileName = "tabs.txt";
		sendToDownload(fileName, exportStr);
	}

// creates a temporary download element to initiate download
	function sendToDownload(filename, text) {
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}
	function convertArraytoString(arr) {
		let arrToStr = "";
		for (let i in arr) {
			arrToStr += arr[i] + "\n";
		}
		return arrToStr;
	}
}

