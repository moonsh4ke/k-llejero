import mongoose from 'mongoose'
import startNats from './nats'
import { app } from './app'

const startMongo = async () => {
if(!process.env.MONGO_URI) {
    throw new Error('Mongo URI not found')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
    
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

startMongo();
startNats();

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})
