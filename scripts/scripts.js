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
            count: 3
        }
    })
    .then((response) => {
        const pets = response.petfinder.pets.pet;
        myApp.allPets = pets;
        // console.log(pets);
        // pets.forEach((pet) => {
            // console.log(pet);
        // });
        //  store all pets onto property on app object.
        //  when building html page, add as a data prop specific id for pets
        //  on click grab that value with that value filter pets within pet array.
        //  display pet in modal



        myApp.displayPets(pets);
    });
};

myApp.displayPets = function(pet) {
    $("#pet").empty();
    pet.forEach((pet) => {
        const $petName = $('<h2 class="entries__name">').text(pet.name.$t);
        const $petNameContainer = $('<div class="entries__name-header">').append($petName);
        const $petImage = $('<img class="entries__image">').attr('src', pet.media.photos.photo[2].$t);
        const $petImageContainer = $('<div class="entries__picture">').append($petImage);
        const $petContainer = $('<div class="entries__post">').append($petNameContainer, $petImageContainer);
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
        myApp.petFind(selectedPet, selectedSex, selectedMaturity, location);
    });  
    $('.entries').on('click', '.entries__post', function () {
            console.log(this);
    });
};

myApp.init = function () {
    myApp.events();
};

$(function () {
    myApp.init();
});