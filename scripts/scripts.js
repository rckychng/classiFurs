const myApp = {};

myApp.petFind = function() {
    $.ajax({
        url: "http://api.petfinder.com/pet.find",
        method: "GET",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: "7e75b95b8a618a9f8925a252ed7dfbf5",
            format: "json",
            location: "Toronto, Ontario, Canada",
            animal: "cat",
            output: "basic"
            
        }
    })
    .then((response) => {
        const pets = response.petfinder.pets.pet;
        console.log(pets);
    });
},

myApp.init = function () {
    myApp.petFind();
};

$(function () {
    myApp.init();
});