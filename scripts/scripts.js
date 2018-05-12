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
            count: 15,
        }
    })
    .then((response) => {
        const pets = response.petfinder.pets.pet;
        console.log(response);
        myApp.allPets = pets;
        myApp.displayPets(pets);
    });
};

myApp.petFindMore = function(animal, sex, age, location) {
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
            count: 15,
            offset: 15
        }
    })
        .then((response) => {
            const pets = response.petfinder.pets.pet;
            myApp.displayMorePets(pets);
        });
};

//  store all pets onto property on app object.
//  when building html page, add as a data prop specific id for pets.
//  on click grab that value with that value filter pets within pet array.
//  display pet in modal.

myApp.displayPets = function(pets) {
    // $("#pet").empty();
    for (let i = 0; i < pets.length; i++) {
        const $petName = $('<h2 class="entries__name">').text(pets[i].name.$t);
        const $petNameContainer = $('<div class="entries__name-header">').append($petName);
        const $petImage = $('<img class="entries__image">').attr('src', pets[i].media.photos.photo[2].$t);
        const $petImageContainer = $('<div class="entries__picture">').append($petImage);
        const $petContainer = $(`<div id = "${i}" class="entries__post">`).append($petNameContainer, $petImageContainer);
        $('#pet').append($petContainer);
    };
};

myApp.displayMorePets = function (pets) {
    for (let i = 0; i < pets.length; i++) {
        const $petName = $('<h2 class="entries__name">').text(pets[i].name.$t);
        const $petNameContainer = $('<div class="entries__name-header">').append($petName);
        const $petImage = $('<img class="entries__image">').attr('src', pets[i].media.photos.photo[2].$t);
        const $petImageContainer = $('<div class="entries__picture">').append($petImage);
        const $petContainer = $(`<div id = "${i}" class="entries__post">`).append($petNameContainer, $petImageContainer);
        $('#pet').append($petContainer);
    };
};

myApp.displayProfile = function(pet) {
    $("#profile").empty();
    const $petName = $('<h3>').text(pet.name.$t);
    const $petImage = $('<img>').attr('src', pet.media.photos.photo[0].$t);
    const $petSex = $('<h3>').text(pet.sex.$t);
    const $petAge = $('<h3>').text(pet.age.$t);
    const $petBreed = $('<h3>').text(pet.breeds.breed.$t);
    const $address = $('<h3>').text(pet.contact.address1.$t);
    const $location = $('<h3>').text(pet.contact.city.$t);
    const $postalCode = $('<h3>').text(pet.contact.zip.$t);
    const $phone = $('<h3>').text(pet.contact.phone.$t);
    const $shelter = $('<h3>').text(pet.shelterId.$t);
    const $description = $('<h3>').text(pet.description.$t);
    const $descriptionContainer = $('<div class="profile__right">').append($description);
    const $petTextContainer = $('<div class="profile__left">').append($petName, $petImage, $petSex, $petAge, $petBreed, $address, $location, $postalCode, $phone, $shelter);
    $('#profile').append($petTextContainer, $descriptionContainer);
};

// use a scroll event to where once you reach the bottom of the page something will happen.
// if bottom of the page is reached execute a function that will append the list of animals in the 

myApp.addContent = function() {
    $(window).scroll(() => {
        if ($(window).scrollTop() + $(window).height() + 0.5 === $(document).height()) {
            console.log("bottom reached!");
            const selectedPet = $('#header__pet').val();
            const selectedSex = $('#header__sex').val();
            const selectedMaturity = $('#header__maturity').val();
            const location = $('#header__location').val();
            myApp.petFindMore(selectedPet, selectedSex, selectedMaturity, location);
        }
    });
}

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
        const petIndex = this.id;
        // console.log(petIndex);
        console.log(myApp.allPets[petIndex])
        myApp.displayProfile(myApp.allPets[petIndex]);
    });
};

myApp.init = function () {
    myApp.events();
    myApp.addContent();
};

$(function () {
    myApp.init();
});