var mongose = require("mongoose");
var db = require("../models");
var ObjectId = mongose.Types.ObjectId;
module.exports = function(app) {

    app.put("/api/save-article", function(req, res) {
        console.log(` body is: ${req.body.id}`);
        db.Article.update({
            _id: req.body.id
        }, {
            $set: {
                saved: true
            }
        }).then(function(data) {
            res.json(data);

        }).catch(function(err) {
            res.json(err);
        });

    });

    app.put("/api/unsave-article", function(req, res) {
        console.log(` body is: ${req.body.id}`);

        db.Article.update({
            _id: req.body.id
        }, {
            $set: {
                saved: false,
                note : []
            }
        }).then(function(data) {
            res.json(data);

        }).catch(function(err) {
            res.json(err);
        });

    });

    app.get("/api/article-notes/:id", function(req, res) {
        var id = new ObjectId(req.params.id);
        
        db.Article.findById(id, function(err, dbArticle) {
          if (err) {
            
            res.json(err);
          }
          else {
            res.json(dbArticle);
            }
        });

    });

    app.put("/api/save-notes", function(req, res) {
        var id = new ObjectId(req.body.id);
        console.log(JSON.stringify(req.body));
        db.Article.findOneAndUpdate({_id: id}, {$push: {note: req.body.note}}, {new: true}, function(err, dbArticle) {
          if (err) {
            console.log(err);
            res.json(err);
          }
          else {
            console.log(dbArticle);
            res.json(dbArticle);
            }
        });

    });

    app.put("/api/delete-notes", function(req, res) {
        var id = new ObjectId(req.body.id);
        
        db.Article.findOneAndUpdate({_id: id}, {$pull: {note: req.body.note}}, function(err, dbArticle) {
          if (err) {
            
            res.json(err);
          }
          else {
            res.json(dbArticle);
            }
        });

    });

};