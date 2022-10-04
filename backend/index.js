import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 27017;

app.use(express.json())
app.use(cors())

const { Schema } = mongoose;

const messageSchema = new Schema({
    user: String,
    sent: [
        {
            to: String,
            messages: [
                {
                    body: String,
                    date: String
                }
            ]
        }
    ],
    received: [
        {
            from: String,
            messages: [
                {
                    body: String,
                    date: String
                }
            ]
        }
    ]
});

const Message = mongoose.model('Message', messageSchema);

mongoose.connect('mongodb://localhost:27017/nariel').catch((err) => {
    throw err;
});

app.get('/nariel', (req, res) => {
    Message.find().then(data => {res.json(data)
                    console.log(data)})
    .catch(error => res.json(error))
});


app.patch('/nariel', (req, res)  => {
    const {from, to, body} = req.body
    Message.updateOne(
        {user: from, 'sent.to': to},
        { $push: {'sent.$.messages': {body: body, date: Date()}}},
        function (err, docs) {
            if (err)
                console.log(err)
            else
                console.log("updated1")
        }
    )
    Message.updateOne(
        {user: to, 'received.from': from},
        { $push: {'received.$.messages': {body: body, date: Date()}}},
        function (err, docs) {
            if (err)
                console.log(err)
            else
                console.log("updated2")
        }
    )  
    
});


app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});