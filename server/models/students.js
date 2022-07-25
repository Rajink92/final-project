const mongoose = require('mongoose')


const studentsSchema = new Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  quizzes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"quiz"
    }
  ],
  teachers:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Teachers"
    }
  ],
  data:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Student', studentsSchema)