// User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32
    },
    address: {
      type: String,
      maxlength: 32
    },
    phone: {
      type: Number,
      max: 9999999999,
      required: true
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
      }
    ]
  }
);

module.export= mongoose.model("User", userSchema);

// Owner
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      maxlength: 32
    },
    officeAddress: {
      type: String,
      required: true,
      maxlength: 64
    },
    phone: {
      type: Number,
      max: 9999999999,
      required: true
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    buses: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Bus'
          }
      ]
  },
);

module.exports = mongoose.model("Owner", ownerSchema);

// Bus
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    busType: {
        type: String,
        enum: ["AC", "Delux", "Normal", "Suspense AC", "Suspense Delux"]
    },
    busNumber: {
        type: Number,
        required: true,
        maxlength: 32
    },
    startCity: {
        type: String,
        required: true,
        enum: ["Chennai", "Bangalore", "Coimbatore", "Cochin", "Mumbai"]
    },
    destination: {
        type: String,
        required: true,
        enum: ["Chennai", "Bangalore", "Coimbatore", "Cochin", "Mumbai"]
    },
    totalSeats: {
        type: Number,
        default: 30,
        maxlength: 60
    },
    availableSeats: {
        type: Number,
        default: 0,
        maxlength: 60
    },
    pricePerSeat: {
        type: String
    },
    departureDate: {
        type: Date
    },
    departureTime: {
        type: String,
        maxlength: 32
    },
    duration: {
        type: String,
        maxlength: 32
    },
})

module.exports  = mongoose.model('Bus', BusSchema);

// Booking
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: 'Bus'
    },
    totalPrice: {
      type: String
    },
    numPassengers: {
      type: Number,
      default: 1
    },
    bookingStatus: {
      type: String,
      enum: ["BOOKED", "CANCELLED"]
    },
    createdTime: {
      type: String
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
