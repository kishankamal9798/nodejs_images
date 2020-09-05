let mongoose = require("mongoose");

const dbUri = 'mongodb+srv://images:F2JEzfDbZ3XUz0H3@test.2qq43.mongodb.net/images?retryWrites=true';
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 20,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection established to users');
}).catch(error => {
    console.error('Could not establish mongoose connection');
})
