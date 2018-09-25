# [fix js circular structure](https://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json)
### [JSON.stringify docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

my working sample:
```
	/**** experimental = clears circular structure ****/
	
	let test2 = this.nav_snapshot({"orient":orient});
	
	var cache = [];
	let snap_data = JSON.stringify(test2, function(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Duplicate reference found
				try {
					// If this value does not reference a parent it can be deduped
					return JSON.parse(JSON.stringify(value));
				} catch (error) {
					// discard key if value cannot be deduped
					return;
				}
			 }
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null; // Enable garbage collection
	
	/**** experimental = clears circular structure ****/
```