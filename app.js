//Initialize the module 
var findingFalcon = angular.module('findingFalcon',['ngRoute']);

//config the path for the html pages using route provider
findingFalcon.config(['$routeProvider',function($routeProvider,$locationProvider){

    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    .when('/planets',{
        templateUrl : 'pages/planets.html',
        controller : 'plantesController'
    })
    .when('/result',{
        templateUrl : 'pages/result.html',
        controller : 'resultController'
    })
    }]);

//This is an service which will have local copy of the vehcile and planet details.
findingFalcon.service('vechilesDetails',function(){
    this.vechileName = [];
    this.vechileMaxDistance = [];
    this.vechileSpeed = [];
    this.vechileCount = [];
    this.planetsName = [];
    this.planetsDistance = [];
    
});

//This is the main controller, planets and vehciles details are fetched and stored in the service.
findingFalcon.controller('mainController',function($scope,$http,$location,vechilesDetails){

    //Local variables for binded to the maincontroller for computation
    $scope.planetsName = [];
    $scope.planetsDistance = [];
    $scope.vechileName = [];
    $scope.vechileCount = [];
    $scope.vechileMaxDistance = [];
    $scope.vechileSpeed = [];

    $scope.openHome = function(){
        $location.path('/planets');
    }

    $http.get("https://findfalcone.herokuapp.com/planets").then(function(response){
        for(var i=0; i<response.data.length;i++){
            vechilesDetails.planetsName.push(response.data[i].name);
            $scope.planetsName.push(response.data[i].name);
            vechilesDetails.planetsDistance.push(response.data[i].distance);
            $scope.planetsDistance.push(response.data[i].distance);
        }
        console.log("Planets Name:",$scope.planetsName);
        console.log("Planets Distance:",$scope.planetsDistance);
    });

    $http.get("https://findfalcone.herokuapp.com/vehicles").then(function(response){
        for(var i=0;i<response.data.length;i++){
            vechilesDetails.vechileName.push(response.data[i].name);
            $scope.vechileName.push(response.data[i].name);
            vechilesDetails.vechileCount.push(response.data[i].total_no);
            $scope.vechileCount.push(response.data[i].total_no);
            vechilesDetails.vechileSpeed.push(response.data[i].speed);
            $scope.vechileSpeed.push(response.data[i].speed);
            vechilesDetails.vechileMaxDistance.push(response.data[i].max_distance);
            $scope.vechileMaxDistance.push(response.data[i].max_distance);
            
        }
        console.log("Max Distance Data:",$scope.vechileMaxDistance);
        console.log("Vechile Speed Data:",$scope.vechileSpeed);
        console.log("Vechile Counts:",$scope.vechileCount);
        console.log("Vechile Name: ",$scope.vechileName);
    });

});

//This is the planets controller where all the computation are done.
findingFalcon.controller('plantesController',function($scope,$window,$http,$location,vechilesDetails){
    
    //This is to show the alert message in the page
    var message = "Follow the instructions:" + " \ 1. You can travel 4 planets at a time with 4 vechiles \ 2. choose them";
    $window.alert(message);

    //Local variables for binded to the maincontroller for computation
    $scope.planetsName = [];
    $scope.planetsDistance = [];
    $scope.vechileComputeIndex = ['0','1','2','3','4','5'];
    $scope.vechileName = [];
    $scope.vechileCount = [];
    $scope.selectedPlanetName1;
    $scope.selectedVechileName1;
    $scope.disabled={};
    $scope.disablePlanet = {};

    for(var i=0;i<vechilesDetails.planetsName.length;i++){
        $scope.planetsName[i] = vechilesDetails.planetsName[i];
        $scope.planetsDistance[i] = vechilesDetails.planetsDistance[i];
    }


    for(var j=0;j<vechilesDetails.vechileName.length;j++){
        $scope.vechileName[j] = vechilesDetails.vechileName[j];
        $scope.vechileCount[j] = vechilesDetails.vechileCount[j];
    }

    console.log("In planets page:");
    console.log($scope.planetsName);
    console.log($scope.planetsDistance);
    console.log($scope.vechileName);
    
    for(var i=0;i<$scope.vechileName.length;i++){
        if($scope.vechileCount[i]>1){
            $scope.vechileName[i] = $scope.vechileName[i] + " - (id:" + $scope.vechileCount[i] + ")";
            computeVechile(i);
        }
    }
    //This function is built to avoid the duplicate data into the vehcileName array object 
    function computeVechile(value){
        $scope.temp = $scope.vechileCount[value] - 1;
        var compute = vechilesDetails.vechileName[value] + " - (id:" + $scope.temp + ")";
        $scope.vechileName.push(compute);
        console.log("Updated vechileName:",  $scope.vechileName);
    }    
    
    $scope.time = 0;
    //This function will compute times for the travel using respective vehciles.
    $scope.computeTime = function(){
        
        var index1,index2,index3,index4;
        for(var i=0;i<$scope.selectedPlanetName1.length;i++){
            if($scope.selectedPlanetName1 == vechilesDetails.planetsName[i]){
                console.log('Selected Planet:',vechilesDetails.planetsName[i]);
                index1 = i;
                console.log('index1:',index1 + ' distance:',vechilesDetails.planetsDistance[index1]);
            }
        }
        for(var i=0;i<$scope.selectedPlanetName2.length;i++){
            if($scope.selectedPlanetName2 == vechilesDetails.planetsName[i]){
                console.log('Selected Planet:',vechilesDetails.planetsName[i]);
                index2 = i;
                console.log('index2:',index2 + ' distance:',vechilesDetails.planetsDistance[index2]);
            }
        }
        for(var i=0;i<$scope.selectedPlanetName3.length;i++){
            if($scope.selectedPlanetName3 == vechilesDetails.planetsName[i]){
                console.log('Selected Planet:',vechilesDetails.planetsName[i]);
                index3 = i;
                console.log('index3:',index3 + ' distance:',vechilesDetails.planetsDistance[index3]);
            }
        }
        for(var i=0;i<$scope.selectedPlanetName4.length;i++){
            if($scope.selectedPlanetName4 == vechilesDetails.planetsName[i]){
                console.log('Selected Planet:',vechilesDetails.planetsName[i]);
                index4 = i;
                console.log('index4:',index4 + ' distance:',vechilesDetails.planetsDistance[index4]);
            }
        }
        console.log('Selected vechile name1:',$scope.selectedVechileName1);
        console.log('Selected vechile name2:',$scope.selectedVechileName2);
        console.log('Selected vechile name3:',$scope.selectedVechileName3);
        console.log('Selected vechile name4:',$scope.selectedVechileName4);
        
        var finalVName1,finalVName2,finalVName3,finalVName4;
        if($scope.selectedVechileName1 == 4){
            finalVName1 = 0;
        }
        else if($scope.selectedVechileName1 == 5){
            finalVName1 = 3;
        }
        else{
            finalVName1 = $scope.selectedVechileName1;
        }
        console.log('VechileName:',vechilesDetails.vechileName[finalVName1]+' VechileSpeed:',vechilesDetails.vechileSpeed[finalVName1]);
       
        if($scope.selectedVechileName2 == 4){
            finalVName2 = 0;
        }
        else if($scope.selectedVechileName2 == 5){
            finalVName2 = 3;
        }
        else{
            finalVName2 = $scope.selectedVechileName2;
        }
        console.log('VechileName:',vechilesDetails.vechileName[finalVName2]+' VechileSpeed:',vechilesDetails.vechileSpeed[finalVName2]);
       
        if($scope.selectedVechileName3 == 4){
            finalVName3 = 0;
        }
        else if($scope.selectedVechileName3 == 5){
            finalVName3 = 3;
        }
        else{
            finalVName3 = $scope.selectedVechileName3;
        }
        console.log('VechileName:',vechilesDetails.vechileName[finalVName3]+' VechileSpeed:',vechilesDetails.vechileSpeed[finalVName3]);
        
        if($scope.selectedVechileName4 == 4){
            finalVName4 = 0;
        }
        else if($scope.selectedVechileName4 == 5){
            finalVName4 = 3;
        }
        else{
            finalVName4 = $scope.selectedVechileName4;
        }
        console.log('VechileName:',vechilesDetails.vechileName[finalVName4]+' VechileSpeed:',vechilesDetails.vechileSpeed[finalVName4]);
        
        $scope.time += (vechilesDetails.planetsDistance[index1] / vechilesDetails.vechileSpeed[finalVName1]) + (vechilesDetails.planetsDistance[index2] / vechilesDetails.vechileSpeed[finalVName2]) + 
        (vechilesDetails.planetsDistance[index3] / vechilesDetails.vechileSpeed[finalVName3]) + (vechilesDetails.planetsDistance[index4] / vechilesDetails.vechileSpeed[finalVName4]);
        
        console.log('Time: ',$scope.time);

        $scope.resultData = {
            token:"SgmCKCINSWnzGRyJpwRWCenCSejyKpLK",
            planet_names:[$scope.selectedPlanetName1,$scope.selectedPlanetName2,$scope.selectedPlanetName3,$scope.selectedPlanetName4],
            vehicle_names:[vechilesDetails.vechileName[index1],vechilesDetails.vechileName[index2],vechilesDetails.vechileName[index3],vechilesDetails.vechileName[index4]]
        }
        console.log($scope.resultData);
    }
    //This function will post data the result to the server for the falcon problem.
    $scope.findFalcone = function(){
        console.log($scope.resultData);
        $http.post("https://findfalcone.herokuapp.com/find",angular.toJson($scope.resultData)).then(function(response){
            console.log(response.data);
            $location.path('/result');
        },function(error){
            console.log(error);
        });
    }
});