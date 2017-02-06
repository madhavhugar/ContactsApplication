angular.module('phoneContacts', [])

.controller('displayController', ['$http', function($http){
	var disCon = this;

	disCon.temp = "Hello World";

	disCon.reload = function() {
		var req = {
			method: 'GET',
			url: 'http://localhost:9000/contactslist'
		}
		var successCallBack = function(response) {
			console.log('Got some data');
			console.log(response);
			console.log(response.data.contactslist);
			disCon.contactslist = response.data;
		}
		var errorCallBack = function(error) {
			console.log('Got an error');
			console.log(error);
		}

		$http(req).then(successCallBack, errorCallBack);
	}
	
	disCon.reload();

	disCon.insertContact = function() {
		var newContact = {};
		newContact['name'] = disCon.newName;
		newContact['number'] = disCon.newNumber;
		newContact['type'] = disCon.newType;
		console.log(newContact);
		$http.post('/insertContact', newContact). success(function(response) {
			console.log(response);
		})

		reload();
	}

	disCon.deleteContact = function(contactNumber, contactName) {
		console.log("Contact number requested to delete: " + contactNumber);
		var userRes = confirm("Are you sure you want to delete " + contactName + "'s Contact");
		if (userRes){
			console.log("Initiating delete user " + contactName);
			$http.delete('/deleteContact')
		}
	}

}]);