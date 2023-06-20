import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Mongo Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!!!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!!!");
});
export default connectDatabase;
