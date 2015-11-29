//var model = require('../models/course.model.js')();
module.exports = function(app, model){
//module.exports = function(app, model){
    app.get("/api/course", getAllCourses);
    app.put("/api/course", updateCourses);
    app.post("/api/course", addCourse);

    function getAllCourses(req, res){

        model.getAllCourses().then(function(res){
            res.json(res);
        });

        //res.json(model.getAll());


    }

    function updateCourses(req, res){
        var courses = req.body;
        model.updateCourses(courses).then(function(res){
            res.json(res);
        });
        //res.json(model.update(courses));
    }

    function addCourse(req, res){
        //var course = req.body;
    }
}