require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const Schema = mongoose.Schema;

let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: 'Joe', age: 21, favoriteFoods: ['pizza', 'burger']});
  person.save((err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};

let arrayOfPeople = [
  { name: "Agus", age: 74, favoriteFoods: ["Rendang"]},
  { name: "Budi", age: 73, favoriteFoods: ["Lotek"]},
  { name: "Sutikno", age: 78, favoriteFoods: ["Gado-gado"]}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if(err) {
      return done(err);
    }
    return done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if(err) {
      return done(err);
    }
    return done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    data.favoriteFoods.push(foodToAdd);
    console.log(data);
    data.save(function(err, data) {
      if(err) {
        return done(err);
      }
      return done(null, data);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: 20}, {new: true}, function(err, data) {
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, function(err, data) {
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if(err) {
      return done(err);
    }
    return done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
