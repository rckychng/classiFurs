const myApp = {};

myApp.getRandom = function() {
    return $.ajax({
        url: "http://api.petfinder.com/pet.getRandom",
        key: "7e75b95b8a618a9f8925a252ed7dfbf5",
        dataType: "json",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
     });
},

myApp.init = function () {
    myApp.getRandom();
};

$(function () {
    myApp.init();
});