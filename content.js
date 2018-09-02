// alert("content script");
function importTabsFromFile(){
	let fileChooser = document.createElement("input");
	fileChooser.id = "syncTabsFileChooser";
	fileChooser.type = 'file';

	fileChooser.addEventListener('change', function (evt) {
		let f = evt.target.files[0];
		if(f) {
			let reader = new FileReader();
			reader.onload = function(e) {
				let contents = e.target.result;
				chrome.runtime.sendMessage({
					type: "importURLs", options: {
						"contents": contents
					}
				});
			}

			reader.readAsText(f);
		}
	});

	document.body.appendChild(fileChooser);
	fileChooser.click();
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		switch(message.type) {
			case "importTabs":
				importTabsFromFile();
				// sendResponse(text);
				break;
		}
	}
);

console.log("content script");
