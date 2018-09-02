/*chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.msg == "importTabs"){
			handleImportButtonClicked();
		}
	}
);*/

function isBlankString(checkString) {
	checkString = checkString.replace(/[\t\n\r\s]+/g,'');
	retVal = (checkString.length==0) ? true : false;
	return retVal;
}
function createTabsFromURLString(urlString) {
	let URLs = urlString.split("\n");

	// alert("creating tabs");
	for (let i in URLs) {
		let curUrl = URLs[i];
		if(isBlankString(curUrl)){
			continue;
		}
		chrome.tabs.create({url: curUrl});
	}
}

chrome.runtime.onMessage.addListener(
	function (request, sender) {
		// alert("import request received in background");
		if (request.type == "importURLs") {
			let urlString = request.options.contents;
			createTabsFromURLString(urlString);
		}
	}
);

