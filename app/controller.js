angular.module('todoApp', [])
  .controller('TodoCtrl', function($scope, $filter, $http) {

    $scope.url = "http://hotell.difi.no/api/jsonp/brreg/enhetsregisteret?callback=JSON_CALLBACK";

    $scope.performQuery = function() {
      var url = $scope.url;

      if ($scope.searchQuery)
        url += '&query=' + $scope.searchQuery

      $http.jsonp(url)
        .success(function(data){
          $scope.companies = data.entries;
        });
    };

    $scope.performQuery()

    $scope.todos = [
      { text:'Define controller in the template. Expl: ', 
        priority: 2, 
        done: false},
      { text:'build an angular app', 
        priority: 1, 
        done: false},
      { text:'make breakfast', 
        priority: 2, 
        done: false},
      { text:'present angular to others', 
        priority: 1, 
        done: false},
      { text:'call mom', 
        priority: 3, 
        done: false}
    ];

    $scope.priorities = [
      {priority: 1, name: "High"},
      {priority: 2, name: "Medium"},
      {priority: 3, name: "Low"}
    ]

    $scope.addTodo = function(name) {
      $scope.todos.push({ text: name, 
                          priority: 2, 
                          done: false     })
    };

    $scope.remaining = function(priority) {
      if (priority)
        return $filter('filter')($scope.todos, {'priority': priority, done: false}).length
      else
        return $filter('filter')($scope.todos, {done: false}).length
    };
      
  })