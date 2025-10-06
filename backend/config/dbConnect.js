const mongoose= require('mongoose');



const connectToMongoDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb connected successfully')
    } catch (error) {
    console.error('❌ Mongodb connection error:', error.message);
    process.exit(1);
  }
}

module.exports= connectToMongoDb;