/*
// http://algorithmsquestionsforinterviews.blogspot.com/2013/11/isomorphic-strings.html
*/

var letterMapper, mappedValues;

(function(){

	var letterMapper = angular.module('letterMapper', []);

	letterMapper.controller('letterMapperController', function(){

		this.message = "";

		this.checkWords = function(word1, word2){
			letterMapper = {};
			mappedValues = [];
			var check = true;

			if(word1.length != word2.length){
				check =  false;

			}else{
				var i = 0;
				while (i < word1.length && check){
					var letter1 = word1.charAt(i);
					var letter2 = word2.charAt(i);
					check = checkIsomorphic(letter1, letter2);
					i++;
				}
			}

			this.message = check;
			$('#messages').removeClass('ng-hide');
			$('#messages').addClass('ng-show');

		};

		function checkIsomorphic(letter1, letter2){
			var letterMapperKeys = Object.keys(letterMapper);
			var checkKeys = $.inArray(letter1, letterMapperKeys);
			var checkVals = $.inArray(letter2, mappedValues);

			// letter1 does not currently map to anything
			if(checkKeys == -1){

				// letter2 is not mapped by some letter
				if (checkVals == -1) {
					letterMapper[letter1] = [letter2]; 
					mappedValues.push(letter2);
					return true;
				} else { // letter 2 is mapped by someone else so no >:(
					return false;
				}
				
			}else{ // letter 1 currently maps to some letter(s)

				if(checkVals == -1){ // if letter 2 is not mapped by anyone else
					letterMapper[letter1].push(letter2);
					return true;
				}else { // if letter 2 is mapped by someone else it best beh letter 1
					if ($.inArray(letter2, letterMapper[letter1]) == -1) {
						return false;
					} else {
						return true;
					}
				}
			}
		}

	});
})();