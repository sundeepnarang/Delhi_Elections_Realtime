var express = require('express');
var cheerio = require('cheerio'),
    request = require('request');
var router = express.Router();
var Step = require('step');

function getData(url,done){
    request({uri: url}, function(err, response, body){

        $ = cheerio.load(body);
        var data = [];
        var trs =$('#divACList tr');
        trs.each(function(i, tr){
            if($(this).children().length>6){

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
                if(row.Constituency!="Constituency"){
                    data.push(row);
                }

                console.log(row);
            }
        });
        done(data);
    });
}

/* GET home page. */
router.get('/', function(req, res) {
    Step(
        // Loads two files in parallel
        function loadStuff() {
            getData('http://eciresults.nic.in/StatewiseU05.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU051.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU052.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU053.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU054.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU055.htm', this.parallel());
            getData('http://eciresults.nic.in/StatewiseU056.htm', this.parallel());
        },
        // Show the result when done
        function showStuff(err, one, two, three, four,five,six,seven) {
            if (err) console.log(err);

        }
    )
});

module.exports = router;
