var fs = require('fs');
var parse = require('csv-parse');

var parser = parse({delimiter: ','}, function (err, data) {
	var previousName = "";
	for (var i = 1; i < data.length; i++){
		if (previousName == data[i][0].substring(1)){
			if (data[i][3] == "send"){
				fs.appendFileSync(data[i][0].substring(1) + ".html", "<p>" + data[i][1] + "</p><strong>Me</strong><p>" + data[i][2]);
			}
			else {
				fs.appendFileSync(data[i][0].substring(1) + ".html", "<p>" + data[i][1] + "</p><strong>" + data[i][0].substring(1) + "</strong><p>" + data[i][2]);
			}
			previousName = data[i][0].substring(1);
		}
		else {
			if (previousName.length > 0){
				fs.appendFileSync(previousName + ".html", "</body></html>");
			}
			fs.writeFileSync(data[i][0].substring(1) + ".html", "<!DOCTYPE html><html><body>");
			if (data[i][3] == "send"){
				fs.appendFileSync(data[i][0].substring(1) + ".html", "<p>" + data[i][1] + "</p><strong>Me</strong><p>" + data[i][2]);
			}
			else {
				fs.appendFileSync(data[i][0].substring(1) + ".html", "<p>" + data[i][1] + "</p><strong>" + data[i][0].substring(1) + "</strong><p>" + data[i][2]);
			}
			previousName = data[i][0].substring(1);
		}
		
	}
});
fs.createReadStream('sms.csv').pipe(parser);