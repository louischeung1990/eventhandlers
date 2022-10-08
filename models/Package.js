const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  userId:{type: Schema.Types.ObjectId, ref: "User", required: true},
  packageId:{type: Schema.Types.ObjectId, ref: "User", required: true},
  comment:{type:String}
},{timestamps: true}
)


const packageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    capacity: { type: String },
    photos: { type: Array }
  },
  {
    timestamps: true,
  }
);



//GET ALL PACKAGES ALL USERS
packageSchema.statics.getAllPackages = async function () {
  return this.find({});
};

//CREATE PACKAGE
packageSchema.statics.createPackage = async function (req) {
  let {title, description, price, capacity, photo } = req.body;

  this.create({
    user:req.user._id,
    title,
    price,
    description: description && description,
    capacity: capacity && capacity,
    photo: photo && photo,
  });
  console.log('created')
  return 'Package created'

};


//UPDATE PACKEAGE 
packageSchema.statics.updatePackage = async function (req) {
  let { user, title, description, price, capacity, photo } = req.body;
  let foundPackage = await this.findById(req.params._id)

  let updatatedPackage ={
    user:user?user:foundPackage.user,
    title:title?title:foundPackage.title,
    description:description?description:foundPackage.description,
    price:price?price:foundPackage.price,
    capacity:capacity?capacity:foundPackage.capacity,
    photo:photo?photo:foundPackage.photo
  }
  foundPackage = updatatedPackage

  foundPackage.save()

  return 'Package created'
};


//DELETE PACKEAGE 
packageSchema.statics.deletePackage = async function (req) {
  let foundPackage = await this.findById(req.params._id)
  foundPackage.delete()
  return 'Package deleted'
};


// CREATE REVIEWS 
packageSchema.statics.createReview = async function(req){
  let foundPackage  = this.findById(req.params._id)
  let result 
  reviewSchema.statics.getReviews = async function(req){
    result =  this.find({packageId:foundPackage._id})
  }
  return result
}


// GET ALL REVIEWS
packageSchema.statics.getAllReviews = async function(req){
  let foundPackage  = this.findById(req.params._id)
  let result 
  reviewSchema.statics.getReviews = async function(req){
    result =  this.find({packageId:foundPackage._id})
  }
  return result
}



module.exports = mongoose.model("Package", packageSchema);
