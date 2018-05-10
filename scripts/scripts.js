const myApp = {};

myApp.petFind = function(animal,sex,age,location) {
    $.ajax({
        url: "http://api.petfinder.com/pet.find",
        method: "GET",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            key: "7e75b95b8a618a9f8925a252ed7dfbf5",
            format: "json",
            animal: animal,
            sex: sex,
            age: age,
            location: location,
            output: "basic",
            count: 16
        }
    })
    .then((response) => {
        const pets = response.petfinder.pets.pet;
        // console.log(pets);
        pets.forEach((pet) => {
            console.log(pet);
        });
        // pets.forEach(pet => console.log(pet.name.$t, pet.age.$t, pet.sex.$t, pet.contact.city.$t, pet.media.photos.photo[0]));
        myApp.displayPets(pets);
    });
};

myApp.displayPets = function(pet) {
    // $("#pet").empty();
    pet.forEach((pet) => {
        const $petName = $('<h2 class="entries__name">').text(pet.name.$t);
        const $petNameContainer = $('<div class="entries__name-header">').append($petName);
        const $petImage = $('<img class="entries__image">').attr('src', pet.media.photos.photo[2].$t);
        const $petImageContainer = $('<div class="entries__picture">').append($petImage);
        const $petSex = $('<h3 class="entries__detail">').text(pet.sex.$t);
        const $petAge = $('<h3 class="entries__detail">').text(pet.age.$t);
        const $petLocation = $('<h3 class="entries__detail">').text(pet.contact.city.$t);
        const $petDetailContainer = $('<div class="entries__details">').append($petSex, $petAge, $petLocation);
        const $petContainer = $('<div class="entries__post">').append($petNameContainer, $petImageContainer, $petDetailContainer);
        $('#pet').append($petContainer);
    });
};

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
    
};

myApp.init = function () {
    myApp.petFind("cat","","","Toronto, Ontario, Canada");
    myApp.events();
};

$(function () {
    myApp.init();
});