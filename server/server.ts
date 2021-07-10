import mongoose from 'mongoose';
import app from './app';

mongoose
  .connect(`${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database is Connected!');
  });

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('warning', warning => {
  console.log(warning.stack);
});
