
(function(){
    "use strict";
    angular
        .module("CourseEditorApp")
        .controller("CourseController", CourseController);

    function CourseController ($scope, ngDialog, CourseService){

        var model = this;

        model.courses = [];
        model.editingModules = false;
        model.editingAssignments = false;
        model.editingVideos = false;
        model.editingCourses = false;
        model.editingExamples = false;
        model.editingDemos = false;
        model.editingSlides = false;
        model.editingDependencies = false;

        CourseService.getAll().then(function(res){
           model.courses = res;

        });

        model.update = function(){
            CourseService.updateCourses(model.courses).then(function(res){
                model.courses = res;
            });
        }

        model.addCourse = function(){
            model.addingType = "course";
            showAddDialog(function(title){

                var course = {
                    "title": title,
                    "overview": "",
                    "modules": []
                };

                CourseService.addCourse(course).then(function(res){
                    model.courses.push(res);
                    res.open = true;
                });

                //model.courses.push(course);
                //course.open = true;
            });
        }

        model.addModule = function (course){
            model.addingType = "module";

            showAddDialog(function(title){
                var module = {
                    "title": title,
                    "available": false,
                    "visible": false,
                    "lectures": [],
                    "videos": [],
                    "slides": [],
                    "examples": []

                };

                CourseService.addModule(course._id, module).then(function(modules){
                    course.modules = modules;
                    module.open = true;
                });

                //course.modules.push(module);

            });

        }

        model.addLecture = function(module){
            model.addingType = "lecture";

            showAddDialog(function(title){
                var lecture = {
                    "title": title
                };
                module.lectures.push(lecture);

                lecture = true;
            });
        }

        model.addSlide = function(module){
            model.addingType = "slides";

            showAddDialog(function(title){
                var slide = {
                    "title": title
                };
                module.slides.push(slide);

                slide.open = true;
            });
        }

        model.addVideo = function(module){
            model.addingType = "video";

            showAddDialog(function(title){
                var video = {
                    "title": title,
                    "base": "",
                    "src": ""
                };

                module.videos.push(video);

                video.open = true;

            });
        }

        model.addExample = function(courseId, module, example){

            model.addingType = "example";

            showAddDialog(function(title){
                var example = {
                    "title": title,
                    "demos": [],
                    "open": true
                };
                var moduleId = module._id;

                CourseService.addExample(courseId, moduleId, example).then(function(updatedExamples){
                    module.examples = updatedExamples;
                });

                //module.examples.push(example);

            });
        }

        model.addDemo = function(courseId, moduleId, example){

            model.addingType = "demo";
            var exampleId = example._id;

            showAddDialog(function(title){
                var demo = {
                    "title": title,
                    "base": "",
                    "src": "",
                    "dependencies": []
                };

                CourseService.addDemo(courseId, moduleId, exampleId, demo).then(function(demos){
                    example.demos = demos;
                })
                //example.demos.push(demo);

                //demo.open = true;
            });
        }

        model.addDependency = function(courseId, moduleId, exampleId, demo){

            model.addingType = "dependency";

            var demoId = demo._id;

            showAddDialog(function(title){
                var dependency = {
                    "title": title,
                    "src": ""
                };

                CourseService.addDependency(courseId, moduleId, exampleId, demoId, dependency).then(function(dependencies){
                    demo.dependencies = dependencies;
                });
            });
        }

        model.addAssignment = function(courseId, module){

            model.addingType = "assignment";

            showAddDialog(function(title){
                var assignment = {
                    "title": title,
                    "src":''
                };

                CourseService.addAssignment(courseId, module._id, assignment).then(function(assignments){
                    //assignment.open = true;
                    module.assignments = assignments;
                });
                //module.assignments.push(assignment);

                //assignment.open = true;
            })
        }

        model.removeCourse = function (courses, index){
            var course = courses[index];
            var id = course._id;
            model.title = course.title;
            showRemoveDialog(function(){
                //courses.splice(index, 1);
                CourseService.removeCourse(id).then(function(response){
                    model.courses = response;
                });

            });

        }

        model.removeModule = function(course, module){
            var courseId = course._id;
            var moduleId = module._id;
            model.title = module.title;
            showRemoveDialog(function(){
                //modules.splice(index, 1);
                CourseService.removeModule(courseId, moduleId).then(function(modules){
                    course.modules = modules;
                });
            });
        }

        model.removeLecture = function(lectures, index){
            model.title = lectures[index].title;
            showRemoveDialog(function(){
                lectures.splice(index, 1);
            });
        }

        model.removeSlide = function(slides, index){
            model.title = slides[index].title;

            showRemoveDialog(function(){
                slides.splice(index, 1);
            });
        }

        model.removeVideo = function(videos, index){
            model.title = videos[index].title;

            showRemoveDialog(function(){
                videos.splice(index, 1);
            });
        }

        model.removeExample = function(courseId, module, example){
            model.title = example.title;
            var exampleId = example._id;
            var moduleId = module._id;


            showRemoveDialog(function(){
                //examples.splice(index, 1);
                CourseService.removeExample(courseId, moduleId, exampleId).then(function(examples){
                    module.examples = examples;
                });

            });
        }

        model.removeDemo = function(courseId, moduleId, example, demo){
            model.title = demo.title;
            var exampleId = example._id;
            var demoId = demo._id;

            showRemoveDialog(function(){
               //demos.splice(index, 1);

                CourseService.removeDemo(courseId, moduleId, exampleId, demoId).then(function(demos){
                    example.demos = demos;
                });
            });
        }

        model.removeDependency = function(courseId, moduleId, exampleId, demo, dependency){
            model.title = dependency.title;

            var demoId = demo._id;
            var dependencyId = dependency._id;

            showRemoveDialog(function(){
                CourseService.removeDependency(courseId, moduleId, exampleId, demoId, dependencyId).then(function(dependencies){
                    demo.dependencies = dependencies;
                });
            });

        }

        model.removeAssignment = function(courseId, module, assignment){
            model.title = assignment.title;

            var moduleId = module._id;
            var assignmentId = assignment._id;

            showRemoveDialog(function(){
               //assignments.splice(index, 1);
                CourseService.removeAssignment(courseId, moduleId, assignmentId).then(function(assignments){
                    module.assignments = assignments;
                });
            });
        }

        model.updateCourse = function(course){
            var id = course._id;

            CourseService.updateCourse(id, course).then(function(modifiedCourse){
                //course = modifiedCourse;
                course.editing = false;
            });

        }

        model.updateModule = function(courseId, modules, module) {
            //var moduleId = module._id;

            CourseService.updateModule(courseId, modules).then(function(modifiedModule){
                //module = modifiedModule;
                module.editing = false;
            });
        }

        model.updateAssignment = function(courseId, moduleId, assignment){
            var assignmentId = assignment._id;

            CourseService.updateAssignment(courseId, moduleId, assignmentId, assignment).then(function(response){
                assignment.editing = false;
                assignment.changed = false;
            });

        }

        model.updateExample = function(courseId, module, example){
            var moduleId = module._id;
            var exampleId = example._id;

            CourseService.updateExample(courseId, moduleId, exampleId, example).then(function(examples){
                //module.examples = examples;
                example.editing = false;
                example.changed = false;
            });
        }

        model.updateDemo = function(courseId, moduleId, example, demo){
            var exampleId = example._id;
            var demoId = demo._id;

            CourseService.updateDemo(courseId, moduleId, exampleId, demoId, demo).then(function(demoms){
                demo.editing = false;
                demo.changed = false;
            });

        }

        function showAddDialog(confirm, cancel){

            ngDialog.openConfirm({template: 'views/course/add.html',
                scope: $scope //Pass the scope object if you need to access in the template
            }).then(confirm,
            cancel);

        }

        function showRemoveDialog(confirm, cancel){
            ngDialog.openConfirm({template: 'views/course/delete.html',
                scope: $scope //Pass the scope object if you need to access in the template
            }).then(confirm,
                cancel);
        }



    }
})();