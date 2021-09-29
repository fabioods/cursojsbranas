function* forever() {
	let value = 1;
	while (true) {
		console.log(value++);
	}
}

function today() {
	let date = new Date();
	console.log(date);
}

const foreverGenerator = forever();
console.log(foreverGenerator);
console.log(typeof foreverGenerator);
console.log(Object.getOwnPropertyNames(foreverGenerator.__proto__.__proto__));
today();
