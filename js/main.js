var makeBtns = angular.module("makeBtns", []);

	makeBtns.controller("makeBtnsCtrl", function($scope){
		$scope.btnColl = [
			{val:"0", 	type:"screen", 	class:"item-a"}, 
			{val:"off", type:"logic", 	class:"item"}, 
			{val:"ce", 	type:"logic", 	class:"item"}, 
			{val:"sqr", type:"logic", 	class:"item"}, 
			{val:"sqrt",type:"logic", 	class:"item"}, 
			{val:7, 	type:"nums", 	class:"item"},
			{val:8, 	type:"nums", 	class:"item"},
			{val:9, 	type:"nums", 	class:"item"},
			{val:"/", 	type:"logic", 	class:"item"}, 
			{val:4, 	type:"nums", 	class:"item"}, 
			{val:5, 	type:"nums", 	class:"item"},
			{val:6, 	type:"nums", 	class:"item"}, 
			{val:"*", 	type:"logic", 	class:"item"}, 
			{val:1, 	type:"nums", 	class:"item"}, 
			{val:2, 	type:"nums", 	class:"item"},
			{val:3, 	type:"nums", 	class:"item"},
			{val:"-", 	type:"logic", 	class:"item"}, 
			{val:0, 	type:"nums", 	class:"item"},
			{val:".", 	type:"nums", 	class:"item"},
			{val:"=", 	type:"logic", 	class:"item"},
			{val:"+", 	type:"logic", 	class:"item"},
		];

		angular.element(document).ready(function () {
			$scope.resetAll();
			console.log("window onload");
		});

		/*$(window).resize(function() {
		    $scope.$apply(function() {
		        // console.log($scope.windowW + " X " + $scope.windowH);
		    });
	    });*/

        $scope.windowH = ($( window ).height());
		$scope.windowW = ($( window ).width());
	    $scope.textSize = {
	    	"font-size": ($scope.windowH/15)
	    };
		if ($scope.windowW < 1000){
			$scope.hgt = {
				height: ($scope.windowH-40),
				width: ($scope.windowW-40)
			};
		};

		$scope.enterNums = function(btnObj){
			if(!$scope.offSwitch || btnObj.val == "ce"){
				switch(btnObj.type){
					case "nums":
						$scope.value.push(btnObj.val);
						if($scope.value[0] == "."){
							$scope.value[0]= 0;
							$scope.value[1]= ".";					
						};
						$scope.input = parseFloat($scope.value.join(""));
						$scope.btnColl[0].val = $scope.input;
					break;
					case "logic":
						$scope.logicBtnFunc(btnObj.val);
					break;
				};
			};
		};

		$scope.checkInputCounterFunc = function(callback){
			$scope.inputCounter++;
			if($scope.inputCounter <= 1){
				$scope.result = $scope.input; 
				$scope.resetInput();
			}else{
				$scope.enterNums($scope.btnColl);
				if($scope.value.length){
					$scope.nextValue = $scope.input; 
					if(typeof callback == "function"){
						callback($scope.result);
					};
				$scope.btnColl[0].val = $scope.result; 
				};
				$scope.resetInput();
			}
		};

		$scope.logicBtnFunc = function(btnVal){
			switch(btnVal){
				case "off":
					$scope.offFunc();
					break;
				case "ce":
					$scope.resetAll();
					break;
				case "sqr":
					$scope.squqredFunc();
					break;
				case "sqrt":
					$scope.sqrtFunc();
					break;
				case "/":
					$scope.checkInputCounterFunc($scope.devide);
					$scope.operation = "/";
					break;
				case "*":
					$scope.checkInputCounterFunc($scope.multiply);
					$scope.operation = "*";
					break;
				case "-":
					$scope.checkInputCounterFunc($scope.substract);
					$scope.operation = "-";
						break;
				case "+":
					$scope.checkInputCounterFunc($scope.add);
					$scope.operation = "+";
				console.log("input " + $scope.input);
				console.log("next " + $scope.nextValue);
				console.log("result " + $scope.result);
					break;
				case "=":
					$scope.equalBtnFunc();
					$scope.operation = "=";
					console.log($scope.operation);
					break;
				default: 
					console.log(btnVal);
			}
		};

		$scope.equalBtnFunc = function(){
				console.log("next " + $scope.nextValue);
			switch($scope.operation){
				case "/":
					$scope.checkInputCounterFunc($scope.devide);
				break;
				case "*":
					$scope.checkInputCounterFunc($scope.multiply);
				break;
				case "-":
					$scope.checkInputCounterFunc($scope.substract);
				break;
				case "+":
					$scope.checkInputCounterFunc($scope.add);
				break;
			};
			$scope.operation = "";
		};

		$scope.offFunc = function(){
			$scope.btnColl[0].val = "";
			$scope.offSwitch = true;
		};

		$scope.resetAll = function(){
			$scope.btnColl[0].val = "0";
			$scope.value = [];
			$scope.input = "";
			$scope.operation = "";
			$scope.inputCounter = 0;
			$scope.result = 0;
			$scope.nextValue = 0;
			$scope.offSwitch = false;
		}

		$scope.resetInput = function(){
			$scope.input = 0;
			$scope.value = [];
			$scope.offSwitch = false;
		};

		$scope.squqredFunc = function(){
			if($scope.inputCounter <= 1){
				$scope.inputCounter++;
				$scope.result = Math.pow($scope.input, 2);
			} else {
				$scope.result = Math.pow($scope.result, 2);
			}
			$scope.btnColl[0].val = $scope.result; 
		};

		$scope.sqrtFunc = function(){
			if($scope.inputCounter <= 1){
				$scope.inputCounter++;
				$scope.result = Math.sqrt($scope.input);
			} else {
				$scope.result = Math.sqrt($scope.result);
			}
			$scope.btnColl[0].val = $scope.result; 
		};

		$scope.add = function(result){
			result += $scope.nextValue;
			return $scope.result = result;
		};

		$scope.substract = function(result){
			result -= $scope.nextValue;
			return $scope.result = result;
		};

		$scope.multiply = function(result){
			result *= $scope.nextValue;
			return $scope.result = result;
		};

		$scope.devide = function(result){
			result /= $scope.nextValue;
			return $scope.result = result;
		};
});