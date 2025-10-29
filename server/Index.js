// server.js
const express = require( 'express');
const mongoose= require( 'mongoose');
const cors= require( 'cors');
const EmployeeModel = require('./models/Employee')
const CommitteeModel = require('./models/Committee');
require('dotenv').config();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create instance with keys from env
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    res.status(500).send("Error");
  }
});


// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect('mongodb://127.0.0.1:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));




// Register User
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Email already registered" });
    }
    // For real apps, use bcrypt to hash password before saving
    const newUser = await EmployeeModel.create({ name, email, password });
    res.json({ message: "Success", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});


// Login User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await EmployeeModel.findOne({ email });
  if (!user) {
    return res.json({ message: "No record exist" });
  }
  // In a real app, use bcrypt to compare
  if (user.password !== password) {
    return res.json({ message: "the password is incorrect" });
  }
  res.json({ message: "Success" });
});


// Forgot Password (placeholder)
app.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await EmployeeModel.findOne({ email });

        // Always send same message to avoid exposing which emails exist
        res.send('If the email exists, a reset link has been sent');

        // TODO: Implement actual email sending logic
        if (user) {
            console.log(`Password reset link would be sent to: ${email}`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});



const committeeSchema = new mongoose.Schema({
  committeeName: String,
  committeeID: String,
  chairperson: String,
  members: [String],
  createdAt: { type: Date, default: Date.now }
});

const Committee = mongoose.models.Committee || mongoose.model("Committee", committeeSchema);

// API to fetch committee by ID
// GET all committees
app.get('/api/committees', async (req, res) => {
  try {
    const committees = await Committee.find();
    console.log("Fetched committees:", committees); // 🔥 Debug
    res.json({ data: committees });
  } catch (err) {
    console.error("Fetch committees error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Chat Message Schema
const chatMessageSchema = new mongoose.Schema({
  committeeID: { type: String, required: true },
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'sent' },
  type: { type: String, default: 'text' },
  file: {
    name: String,
    size: Number,
    type: String,
    url: String
  },
  replyTo: {
    sender: String,
    text: String
  }
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);

// GET all messages for a committee
app.get('/api/committees/:committeeID/messages', async (req, res) => {
  try {
    const { committeeID } = req.params;
    const messages = await ChatMessage.find({ committeeID }).sort({ timestamp: 1 });
    res.json({ data: messages });
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST a new message
app.post('/api/committees/:committeeID/messages', async (req, res) => {
  try {
    const { committeeID } = req.params;
    const messageData = { ...req.body, committeeID };
    
    const newMessage = new ChatMessage(messageData);
    await newMessage.save();
    
    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (err) {
    console.error("Send message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a specific message
app.delete('/api/committees/:committeeID/messages/:messageId', async (req, res) => {
  try {
    const { committeeID, messageId } = req.params;
    
    await ChatMessage.findOneAndDelete({ 
      committeeID, 
      _id: messageId 
    });
    
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE all messages for a committee (clear chat)
app.delete('/api/committees/:committeeID/messages', async (req, res) => {
  try {
    const { committeeID } = req.params;
    
    await ChatMessage.deleteMany({ committeeID });
    
    res.json({ message: "Chat cleared" });
  } catch (err) {
    console.error("Clear chat error:", err);
    res.status(500).json({ error: err.message });
  }
});



// CREATE a new committee
app.post("/api/committees", async (req, res) => {
  try {
    const { committeeName, committeeID, chairperson, members } = req.body;

    // Validate members is an array
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "members must be an array" });
    }

    const newCommittee = new Committee({
      committeeName,
      committeeID,
      chairperson,
      members,
    });

    await newCommittee.save();
    res.status(201).json({ message: "Committee created", data: newCommittee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/join-committee", async (req, res) => {
  const { committeeID, userName } = req.body;
  if (!committeeID || !userName) {
    return res.status(400).json({ error: "Missing ID or user name." });
  }

  const committee = await Committee.findOne({ committeeID });
  if (!committee) {
    return res.status(404).json({ error: "Committee not found." });
  }

  // Add user to members if not already included
  if (!committee.members.includes(userName)) {
    committee.members.push(userName);
    await committee.save();
  }

  // ✅ Return full committee object
  res.status(200).json({ data: committee, message: "Joined successfully" });
});

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(3001, () => {
  console.log(`🚀 Server running on ${3001}`);
});

