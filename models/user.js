const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'farmer', 'user'],
    default: 'user'
  },
  profile: {
    full_name: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip_code: String
    }
  },
  cart: [{
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: Number
  }],
  orders: [{
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    },
    order_date: Date,
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending'
    }
  }],
  // Add equipment listing functionality for farmers
  equipment: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    rental_price: {
      type: Number,
      required: true
    },
    availability_status: {
      type: String,
      enum: ['available', 'rented'],
      default: 'available'
    },
    contact_email:{
      
    },
    contact_number:{

    },
    location:{

    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.listEquipment = function(equipmentData) {
  this.equipment.push(equipmentData);
  return this.save();
};

userSchema.methods.deleteEquipment = function(equipmentId) {
  this.equipment = this.equipment.filter(equip => equip._id.toString() !== equipmentId.toString());
  return this.save();
};

const user = mongoose.model('user', userSchema);
module.exports = user;
