const mongoose = require('mongoose');

//mongodb connection
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, dbOptions);
    console.log('Success connecting to mongodb');
  } catch (error) {
    console.log('error connecting to mongodb');
  }
};
mongoConnect();
