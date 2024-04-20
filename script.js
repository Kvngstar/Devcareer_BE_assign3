const button = document.getElementById("myButton");
button.addEventListener("click", (event) => {
	const storeRedactedText = document.getElementById("message_box");
	const redacted_cont = document.getElementById("redacted-message");
	storeRedactedText.innerHTML = "";
	redacted_cont.style.display = "none";
	// Disable the button when processing starts
	button.disabled = true;
	button.style.backgroundColor = "grey";

	// Getting input elements and display areas
	const userData = document.getElementById("message");
	const scramWorld = document.getElementById("words");
	const key = document.getElementById("key");
	const NumOfWord = document.getElementById("NumOfWord");
	const NumOfMatches = document.getElementById("NumOfMatches");
	const NumOfChars = document.getElementById("NumOfChars");

	// Validation for input fields
	if (!userData.value.trim() || userData.value.trim() === "") {
		alert("Message cannot be empty!");
		button.disabled = false; // Re-enable the button
		return;
	} else if (key.value.trim() === "" || !key.value) {
		alert("Choose what to use for the action");
		button.disabled = false; // Re-enable the button
		return;
	} else if (scramWorld.value.trim() === "" || !scramWorld.value) {
		alert("Words to scramble should not be empty");
		button.disabled = false; // Re-enable the button
		return;
	}

	// Processing input for redaction
	const actualKey = key.value.indexOf(" ");
	let keyDerived;
	if (actualKey > -1) {
		// Use first substring if multiple characters provided
		keyDerived = key.value.substring(0, actualKey);
	} else {
		keyDerived = key.value;
	}
	const whatToChange = scramWorld.value.split(" ");
	const textArray = userData.value.split(" ");
	let incrementedWord = 0;
	let incrementMatchWord = 0;
	let incrementNumberOfChar = 0;

	// Redacting text and counting statistics
	const abitoshakerText = textArray.map((v) => {
		incrementedWord++;

		for (let i = 0; i < whatToChange.length; i++) {
			const regex = new RegExp(
				`^${whatToChange[i].toLowerCase()}[\\W]*$`,
				"ig"
			);

			if (regex.test(v.toLowerCase())) {
				incrementMatchWord++;
				incrementNumberOfChar += v.length;
				return keyDerived;
			}
		}

		return v;
	});

	// Updating statistics with animations
	let counter1 = 0;
	let counter2 = 0;
	let counter3 = 0;
	setTimeout(() => {
		const start1 = () => {
			NumOfChars.innerHTML = counter1;

			if (counter1 === incrementNumberOfChar) {
				clearInterval(interval1);
			}
			counter1++;
		};
		const interval1 = setInterval(start1, 30);
	}, 1000);

	setTimeout(() => {
		const start2 = () => {
			NumOfWord.innerHTML = counter2;

			if (counter2 === incrementedWord) {
				clearInterval(interval2);
				button.disabled = false;
				redacted_cont.style.display = "flex";
				button.style.backgroundColor = "#a52465";
				storeRedactedText.innerHTML = abitoshakerText.join(" ");
			}
			counter2++;
		};
		const interval2 = setInterval(start2, 50);
	}, 1000);

	setTimeout(() => {
		const start3 = () => {
			NumOfMatches.innerHTML = counter3;

			if (counter3 === incrementMatchWord) {
				clearInterval(interval3);
				// Re-enable the button after processing is complete
			}
			counter3++;
		};

		const interval3 = setInterval(start3, 150);
	}, 1000);
});

const copy = document.getElementById("copy");
copy.addEventListener("click", () => {
	const copytext = document.getElementById("message_box");

	navigator.clipboard
		.writeText(copytext.innerHTML)
		.then(() => {
			alert("Text copied to clipboard!");
		})
		.catch((err) => {
			console.error("Failed to copy text: ", err);
		});
});
