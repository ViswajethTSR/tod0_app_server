import * as mongoose from 'mongoose';


const mongoURI = 'mongodb://fleettrack:password@64.227.166.14:27017/datadb';
const mongoOptions:object= {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
};

mongoose.connect(mongoURI, mongoOptions).then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message))

