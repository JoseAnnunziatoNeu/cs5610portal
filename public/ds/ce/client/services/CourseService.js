(function(){
    "use strict";
    angular.module("CourseEditorApp")
        .factory("CourseService", CourseService);

    function CourseService($http, $q){

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
            updateAssignment: updateAssignment
        }

        return service;

        function updateCourses(courses){
            var deferred = $q.defer();
            $http.put("/api/ds/ce/course", courses).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;

        }

        function getAll(){
            var deferred = $q.defer();
            $http.get("/api/ds/ce/course").success(function(response){
                console.log("got courses");
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function addCourse(course){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course", course).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function removeCourse(id){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + id).success(function(res){
                if(res.ok==1){
                    $http.get("/api/ds/ce/course").success(function(courses){
                        deferred.resolve(courses);
                    });
                }
            });
            return deferred.promise;
        }

        function updateCourse(id, course) {
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + id, course).success(function(course){
                deferred.resolve(course);
            });
            return deferred.promise;
        }

        function addModule(courseId, module) {
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId, module).success(function(modules){

                deferred.resolve(modules);
            });
            return deferred.promise;
        }

        function getModulesByCourseId(courseId){

            var deferred = $q.defer();

            $http.get("/api/ds/ce/course/" + courseId + "/module").success(function(modules){
                deferred.resolve(modules);
            });

            return deferred.promise;
        }

        function removeModule(courseId, moduleId){

            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId).success(function(modules){
                deferred.resolve(modules);
            });
            return deferred.promise;
        }

        function updateModule(courseId, modules) {
            var deferred = $q.defer();
            $http.put("/api/ds/ce/course/" + courseId + "/module", modules).success(function(saved){
                deferred.resolve(saved);
            });

            return deferred.promise;
        }

        function addAssignment(courseId, moduleId, assignment){
            var deferred = $q.defer();

            $http.post("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/assignment", assignment).success(function(assignments){
                deferred.resolve(assignments);
            });
            return deferred.promise;
        }

        function removeAssignment(courseId, moduleId, assignmentId){
            var deferred = $q.defer();

            $http.delete("/api/ds/ce/course/" + courseId + "/module/" + moduleId + "/assignment/" + assignmentId).success(function(assignments){

                deferred.resolve(assignments);
            });
            return deferred.promise;
        }

        function updateAssignment(courseId, moduleId, assignmentId, assignment){
            var deferred = $q.defer();

            $http.put("/api/ds/ce/course/" + courseId+"/module/"+ moduleId + "/assignment/"+assignmentId, assignment).success(function(course){
                deferred.resolve(course);
            });

            return deferred.promise;
        }

    }
})();