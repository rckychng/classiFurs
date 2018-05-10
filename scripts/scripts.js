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
        // console.log(pets);
        // pets.forEach(pet => console.log(pet.name.$t, pet.age.$t, pet.sex.$t, pet.contact.city.$t, pet.media.photos.photo[0]));
        myApp.displayPets(pets);
    });
},

myApp.displayPets = function(pet) {
    $("#pet").empty();
    pet.forEach((pet) => {
        const $name = $('<h2>').text(pet.name.$t);
        const $image = $('<img>').attr('src', pet.media.photos.photo[0]);
        const $sex = $('<h3>').text(pet.sex.$t);
        const $age = $('<h3>').text(pet.age.$t);
        const $location = $('<h3>').text(pet.contact.city.$t);
        const $petContainer = $('<div>').append($name, $image, $sex, $age, $location);
        $('#pet').append($petContainer);
    });
}

myApp.events = function() {
        $('#header__submit').on('click', function(e) {
            e.preventDefault();
            const selectedPet = $('#header__pet').val();
            const selectedSex = $('#header__sex').val();
            const selectedMaturity = $('#header__maturity').val();
            const location = $('#header__location').val();
            const userInput = [selectedPet, selectedSex, selectedMaturity, location];
            console.log(userInput);
        });
    
}

myApp.init = function () {
    myApp.petFind();
    myApp.events();
};

$(function () {
    myApp.init();
});