(function(){
    "use strict";
    angular.module("CourseEditorApp")
        .factory("CourseService", CourseService);

    function CourseService($http, $q) {

        var service = {
            getAll: getAll,
            updateCourses: updateCourses,
            addCourse: addCourse,
            removeCourse: removeCourse,
            updateCourse: updateCourse,

            addModule: addModule,
            getModulesByCourseId: getModulesByCourseId,
            removeModule: removeModule,
            updateModule: updateModule,

            addAssignment: addAssignment,
            removeAssignment: removeAssignment,
            updateAssignment: updateAssignment,

            addLecture: addLecture,
            removeLecture: removeLecture,
            updateLecture: updateLecture,

            addLearningElement: addLearningElement,
            removeLearningElement: removeLearningElement,
            updateLearningElement: updateLearningElement,

            addExample: addExample,
            removeExample: removeExample,
            updateExample: updateExample,

            addDemo: addDemo,
            removeDemo: removeDemo,
            updateDemo: updateDemo,

            addDependency: addDependency,
            removeDependency: removeDependency,
            updateDependency: updateDependency
        };

        return service;

        function updateCourses(courses) {
            var deferred = $q.defer();
            $http.put("/api/ds/ce/course", courses).success(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function getAll() {
            var deferred = $q.defer();
            $http.get("/api/ds/ce/course").success(function (response) {
                console.log("got courses");
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function addCourse(course) {
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course", course).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function removeCourse(id) {
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + id).success(function (res) {
                if (res.ok == 1) {
                    $http.get("/api/ds/ce/course").success(function (courses) {
                        deferred.resolve(courses);
                    });
                }
            });
            return deferred.promise;
        }

        function updateCourse(id, course) {
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + id, course).success(function (course) {
                deferred.resolve(course);
            });
            return deferred.promise;
        }

        function addModule(courseId, module) {
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId, module).success(function (modules) {

                deferred.resolve(modules);
            });
            return deferred.promise;
        }

        function getModulesByCourseId(courseId) {

            var deferred = $q.defer();

            $http.get("/api/ds/ce/course/" + courseId + "/module").success(function (modules) {
                deferred.resolve(modules);
            });

            return deferred.promise;
        }

        function removeModule(courseId, moduleId) {

            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId).success(function (modules) {
                deferred.resolve(modules);
            });
            return deferred.promise;
        }

        function updateModule(courseId, modules) {
            var deferred = $q.defer();
            $http.put("/api/ds/ce/course/" + courseId + "/module", modules).success(function (saved) {
                deferred.resolve(saved);
            });

            return deferred.promise;
        }

        function addAssignment(courseId, moduleId, assignment) {
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/assignment", assignment).success(function (assignments) {
                deferred.resolve(assignments);
            });
            return deferred.promise;
        }

        function removeAssignment(courseId, moduleId, assignmentId) {
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/assignment/" + assignmentId).success(function (assignments) {

                deferred.resolve(assignments);
            });
            return deferred.promise;
        }

        function updateAssignment(courseId, moduleId, assignmentId, assignment) {
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/assignment/" + assignmentId, assignment).success(function (course) {
                deferred.resolve(course);
            });

            return deferred.promise;
        }

        function addExample(courseId, moduleId, example) {
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example", example).success(function (examples) {
                deferred.resolve(examples);
            });
            return deferred.promise;
        }

        function removeExample(courseId, moduleId, exampleId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId).success(function(examples){
                deferred.resolve(examples);
            });
            return deferred.promise;
        }

        function updateExample(courseId, moduleId, exampleId, example){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId, example).success(function(examples){
                deferred.resolve(examples);
            });
            return deferred.promise;
        }

        function addDemo(courseId, moduleId, exampleId, demo){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo", demo).success(function(demos){
                deferred.resolve(demos);
            });
            return deferred.promise;
        }

        function removeDemo(courseId, moduleId, exampleId, demoId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId).success(function(demos){
                deferred.resolve(demos);
            });
            return deferred.promise;
        }

        function updateDemo(courseId, moduleId, exampleId, demoId, demo){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId, demo).success(function(demos){
                deferred.resolve(demos);
            });
            return deferred.promise;
        }

        function addDependency(courseId, moduleId, exampleId, demoId, dependency){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency", dependency).success(function(dependencies){
                deferred.resolve(dependencies);
            });
            return deferred.promise;
        }

        function removeDependency(courseId, moduleId, exampleId, demoId, dependencyId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency/" + dependencyId).success(function(dependencies){
                deferred.resolve(dependencies);
            });
            return deferred.promise;
        }

        function updateDependency(courseId, moduleId, exampleId, demoId, dependencyId, dependency){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/example/" + exampleId + "/demo/" + demoId + "/dependency/" + dependencyId, dependency).success(function(dependencies){
                deferred.resolve(dependencies);
            });
            return deferred.promise;
        }

        function addLecture(courseId, moduleId, lecture){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture", lecture).success(function(lectures){
                deferred.resolve(lectures);
            });
            return deferred.promise;
        }

        function removeLecture(courseId, moduleId, lectureId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId).success(function(lectures){
                deferred.resolve(lectures);
            });
            return deferred.promise;
        }

        function updateLecture(courseId, moduleId, lectureId, lecture){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId, lecture).success(function(lectures){
                deferred.resolve(lectures);
            });
            return deferred.promise;
        }

        function addLearningElement(courseId, moduleId, lectureId, le){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le", le).success(function(learningElements){
                deferred.resolve(learningElements);
            });
            return deferred.promise;
        }

        function removeLearningElement(courseId, moduleId, lectureId, leId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le/" + leId).success(function(learningElements){
                deferred.resolve(learningElements);
            });

            return deferred.promise;
        }

        function updateLearningElement(courseId, moduleId, lectureId, leId, le){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/lecture/" + lectureId + "/le/" + leId, le).success(function(learningElements){
                deferred.resolve(learningElements);
            });

            return deferred.promise;
        }

    }


})();