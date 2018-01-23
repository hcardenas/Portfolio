var mongose = require("mongoose");
var db = require("../models");

var request = require("request");
var cheerio = require("cheerio");

var CircularJSON = require('circular-json');


module.exports = function(app) {

    app.get("/", function(req, res) {
        
            res.render("homePage");

    });

    app.get("/saved-articles", function(req, res) {

        
            res.render("homePage")

    });

    app.get("/scrape", function(req, res) {
        request("https://lifehacker.com/tag/programming", function(error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            var count = 0;
            $(".postlist__item").each(function(i, element) {
                // Save the text and href of each link enclosed in the current element
                var title = $(element).children("header").children("h1").children("a").text().trim();
                var content = $(element).children(".js_item-content").children(".entry-summary").children("p").text().trim();
                if (title && content) {
                    count++;
                    db.Article.create({
                        title: title,
                        summary: content
                    }, function(err, data) {
                        console.log(`inserted: ${data}`);
                    });
                };


            });
            
            res.redirect("/");
            

        });
    });
};