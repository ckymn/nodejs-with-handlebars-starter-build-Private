const limit = (arr, limit) => {
	if(!Array.isArray(arr))
		return [];
	return arr.slice(0,limit);
};

module.exports = limit;