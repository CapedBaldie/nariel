import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 27017;

app.use(express.json())
app.use(cors())

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: String,
    receiver: String,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

mongoose.connect('mongodb://localhost:27017/nariel').catch((err) => {
    throw err;
});

app.post('/nariel', (request, response) => {
    request.body = {sender, receiver, message}
    const msg = new Message ({
        sender : request.body.sender,
        receiver : request.body.receiver,
        message : request.body.message})
    msg.save()
    .then(data => response.status(200).json(data))
    .catch(error => response.json(error))
});

app.get('/nariel', (request, response) => {
    const {receiver} = request.body
    Message.find().or([{receiver: receiver}])
    .then(data => {response.json(data)
                    console.log(data)
                    console.log(receiver)})
    .catch(error => response.json(error))
});

app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});