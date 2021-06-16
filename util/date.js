const moment = require('moment');

const date = (date, format) => {
	return moment(date).format(format);
};

module.exports = date;