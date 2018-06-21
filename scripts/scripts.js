const myApp = {};

//this is the new global variable:
myApp.offset = 0;
myApp.allPets = [];

myApp.petFind = function (animal, sex, age, location) {
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
            count: 24,
            // passing the offset variable
            offset: myApp.offset
        }
    })
        .then((response) => {
            const pets = response.petfinder.pets.pet;
            myApp.allPets = myApp.allPets.concat(pets);
            // console.log(myApp.allPets);
            myApp.displayPets(myApp.allPets);
            //adding 24 to the offset variable so the next time it's run, it offsets correctly
            myApp.offset = myApp.offset + 24;
        });
};

//  store all pets onto property on app object.
//  when building html page, add as a data prop specific id for pets.
//  on click grab that value with that value filter pets within pet array.
//  display pet in modal.

myApp.displayPets = function(pets) {
    $("#entries").empty();
    for (let i = 0; i < pets.length; i++) {
        // console.log(pets[i]);
        const $petName = $('<h4 class="entries__name">').text(pets[i].name.$t);
        const $petNameContainer = $('<div class="entries__name-container">').append($petName);
        const $petImage = $('<img class="entries__image">').attr('src', pets[i].media.photos.photo[2].$t);
        const $petImageContainer = $('<div class="entries__picture">').append($petImage);
        const $petContainer = $(`<div id = "${i}" class="entries__post">`).append($petNameContainer, $petImageContainer);
        $('#entries').append($petContainer);
    };
};

myApp.displayProfile = function(pet) {
    $("#profile").empty();
    $("#profile").fadeIn();
    const $petName = $('<h2 class="profile__name">').text(pet.name.$t);
    const $petNameContainer = $('<div class="profile__name-container">').append($petName);
    const $petImage = $('<img class="profile__image">').attr('src', pet.media.photos.photo[2].$t);
    const $petImageContainer = $('<div class="profile__picture">').append($petImage);
    const $petBreed = $('<h3 class="profile__breed">').text(pet.breeds.breed.$t);
    const $address = $('<h4>').text(pet.contact.address1.$t);
    const $location = $('<h4>').text(pet.contact.city.$t);
    const $postalCode = $('<h4>').text(pet.contact.zip.$t);
    const $phone = $('<h4>').text(pet.contact.phone.$t);
    const $contactContainer = $('<div class="profile__contact">').append($address, $location, $postalCode, $phone);
    const $description = $('<p class="profile__description">').text(pet.description.$t);
    const $petTextContainer = $('<div class="profile__left">').append($petNameContainer, $petImageContainer);
    const $descriptionContainer = $('<div class="profile__right">').append($petBreed, $contactContainer, $description);
    $('#profile').append($petTextContainer, $descriptionContainer);
};

// use a scroll event where once you reach the bottom of the page something will happen.
// if bottom of the page is reached execute a function that will append the list of animals in the entries div
// configure it so that it loads new pets everytime.

myApp.addContent = function() {
    $(window).scroll(() => {
        // console.log(myApp.allPets);
        // console.log($(window).scrollTop(), $(window).height(), $(document).height())
        if ($(window).scrollTop() + $(window).height() === $(document).height()) {
            // console.log("bottom reached!");
            myApp.petFind(myApp.selectedPet, myApp.selectedSex, myApp.selectedMaturity, myApp.location);
            // myApp.petFind(userInput);
        }
    });
}

myApp.events = function() {
    $('#header__submit').on('click', function(e) {
        $("#entries").empty();
        myApp.offset = 0;
        myApp.allPets = [];
        e.preventDefault();
        myApp.selectedPet = $('#header__pet').val();
        myApp.selectedSex = $('#header__sex').val();
        myApp.selectedMaturity = $('#header__maturity').val();
        myApp.location = $('#header__location').val();
        myApp.petFind(myApp.selectedPet, myApp.selectedSex, myApp.selectedMaturity, myApp.location);
        $('header').animate({
            top: '0'
        }, 900);
    });  
    $('.entries').on('click', '.entries__post', function () {
        const petIndex = this.id;
        myApp.displayProfile(myApp.allPets[petIndex]);
        $('#profile').css('display','flex');
    });
    $('#profile').on('click', function() {
        $('#profile').hide();
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#profile').hide();
        }
    });
};

myApp.init = function () {
    myApp.events();
    myApp.addContent();
};

$(function () {
    myApp.init();
});