var express = require('express');
var cheerio = require('cheerio'),
    request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    request({uri: 'http://eciresults.nic.in/StatewiseU05.htm'}, function(err, response, body){

        $ = cheerio.load(body);
        var data = [];
        $('#divACList tr').each(function(i, tr){
            if((i>=17)&&(i<=26)){

                var children = $(this).children();
                var ConstituencyItem = children.eq(0);
                var LeadingPartyItem = children.eq(3);
                var TrailingPartyItem = children.eq(5);
                var MarginItem =  children.eq(6);
                var StatusItem = children.eq(7);

                var row = {
                    "Constituency": ConstituencyItem.text().trim(),
                    "LeadingParty": LeadingPartyItem.text().trim(),
                    "TrailingParty": TrailingPartyItem.text().trim(),
                    "Margin": MarginItem.text().trim(),
                    "Status": StatusItem.text().trim(),
                };
                data.push(row);
                console.log(row);
            }
        });
        res.send(data);
    });
});

module.exports = router;
