import mongoose from "mongoose";
const establishConnection = (connectionString: string) => {
  mongoose.connect(connectionString)
    .then(() => {
      console.log(`MongoDB connection successful`);
    })
    .catch((error: any) => {
      console.log(`Error in DB connection: ${error}`);
    });
};
export { establishConnection };
