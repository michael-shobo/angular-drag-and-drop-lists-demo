var app = angular.module('MyApp', ['dndLists']);
app.controller('MyController', function($scope) {

    $scope.task = {title:null,isDone : false};
    var counter = 0;
    $scope.isEdit = false;
    $scope.editIndex = -1;
    $scope.showAllDone  = false;

    $scope.models = {
        selected: null,
        tasks: {
            "InProgress": [{id:1,title:1,isDone : false},{id:2,title:2,isDone : false},{id:3,title:3,isDone : false}],
            "Done": []}
    };

    $scope.delete = function(item,list){
        const index = list.indexOf(item);
        list.splice(index,1);
    }

    $scope.edit = function(item, index){
        $scope.isEdit = true;
        $scope.task = angular.copy(item);
        $scope.editIndex = index;
    }
    $scope.cancel = function(){
        $scope.task = {};
        $scope.isEdit = false;
    }
    $scope.DropInDone = function(index, item, external, type){
        item.isDone = true;
        return item;
    }
    $scope.DropInProgress = function(index, item, external, type){
        item.isDone = false;
        return item;
    }

    $scope.toggleTheDoneStatus = function(){
        $scope.showAllDone = !$scope.showAllDone;
    }
    $scope.toggleStatus = function(item){

        if(item.isDone == true){
            $scope.delete(item,$scope.models.tasks.Done);
            $scope.models.tasks.InProgress.push(item)
        }else{
            $scope.delete(item,$scope.models.tasks.InProgress);
            $scope.models.tasks.Done.push(item)
        }
        item.isDone = !item.isDone;
    }

    $scope.addTask = function(){
        if($scope.task.title.length>0){
            $scope.models.tasks.InProgress.push({
                id:++counter,
                title: $scope.task.title,
                isDone:false
            })
            $scope.task = {};
        }else{
            alert("you can't leave it empty ")
        }
    }
    $scope.updateTask = function(){
        if($scope.task.title.length>0){
            $scope.tasks[$scope.editIndex] = $scope.task;
            $scope.task = {};
            $scope.isEdit = false;
        }else{
            alert("you can't leave it empty ")
        }
    }

});


