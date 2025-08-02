const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const api_key = process.env.OMNIDIM_API_KEY;

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connected");
});

// Models
const Ticket = require('./models/Ticket');
const Event = require('./models/Event');

// Routes
const ticketRoutes = require('./ticketroutes'); 
app.use('/tickets', ticketRoutes);              

// Existing voice-command endpoint (still fine to keep)
app.post('/voice-command', async (req, res) => {
    console.log("🎤 Voice command received:", req.body);
  const { intent, data } = req.body;
  try {
    if (intent === 'create_ticket') {
      const ticket = new Ticket(data);
      await ticket.save();
      return res.json({ message: 'Ticket created', ticket });
    } else if (intent === 'create_event') {
      const event = new Event(data);
      await event.save();
      return res.json({ message: 'Event created', event });
    }
    res.status(400).json({ error: 'Unknown intent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
