
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());


const rawDataSchema = new mongoose.Schema({
    ts: String,
    machine_status: Number,
    vibration: Number
});


const RawData = mongoose.model('RawData', rawDataSchema);

mongoose.connect('mongodb://localhost:27017/machineData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    startServer();
}).catch(error => console.error('Error connecting to MongoDB:', error));


app.get('/rawdata', async (req, res) => {
    try {
       
        const rawData = await RawData.find();
        res.json(rawData);
    } catch (error) {
        console.error('Error fetching raw data from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const startServer = () => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
