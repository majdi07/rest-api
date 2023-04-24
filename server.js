const express = require('express');
const app = express();
require("dotenv").config({ path: "./config/.env" })
const PORT = process.env.PORT || 7002;
const connectdb = require('./config/conectDb')

connectdb();


const mongoose = require("mongoose")
const PersonSchema = new mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number },
    favoriteFoods: [String]
})
const Person = mongoose.model('Person', PersonSchema);
var createAndSavePerson = function (done) {
    const person = new Person({
        name: 'rayen',
        age: 18,
        favoriteFoods: ['water']
    });

    person.save((err, data) => {
        console.log(data);
        if (err) {
            done(err);
        }

        done(null, data);
    })
};


Person.create([
    { name: 'ghada', age: '25', favoriteFoods: ["pitza"] },
    { name: 'med', age: '40', favoriteFoods: ['molo5iya hhhh'] },
    { name: 'oussema', age: '20', favoriteFoods: ["pasta"] },
]);

var findPeopleByName = function (personName) {

    var query = Person.find({ name: personName })
    query.exec(function (err, data) {
        if (err) return console.log("err");
        else return (data)
    });
}

var findOneByFood = function (food, done) {

    Person.find({ favoriteFoods: food }, (err, data) => {
        console.log(food);
        console.log(data);
        if (err) return done(err)
        done(null, data)
    });
};
var findPersonById = (personId, done) => {
    Person.findById(Person.personId, (err, data) => err ? done(err) : done(null, data));
};

var findEditThenSave = function (personId, done) {
    var foodToAdd = "hamburger";
    Person.findById(personId, function (err, data) {
        if (err) {
            done(err);
        }

        data.favoriteFoods
            .push(foodToAdd)
            .save((err, data) => (err ? done(err) : done(null, data)));
    });
};
var findAndUpdate = function (personName, doc) {
    var ageToSet = 20;

    Person.findOneAndUpdate(
        { "name": personName },
        { $set: { "age": ageToSet } },
        { new: true },
        function (err, done) {
            if (err) {
                console.log("Error Ocurred")
            }
            console.log(done)
        }
    )
};
var removeById = function (personId, done) {
    Model.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
};

const removeManyPeople = (done) => {
    const nameToRemove = "ghada";
    Person.remove({ name: nameToRemove }, (err, data) => {
        if (err) {
            console.error(err);
        }
        done(null, data);
    });
};
var queryChain = function (done) {
    var foodToSearch = "pitza";
    Person.find({ favoriteFoods: foodToSearch }).sort({ name: "desc" }).limit(2).select("-age").exec((err, data) => {
        if (err)
            done(err);
        done(null, data);
    })
};










app.listen(PORT, (err) => {
    err ? console.log('err', err)
        : console.log(`Server is rning on port ${PORT}`);
})

