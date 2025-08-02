const express = require('express');
const router = express.Router();
const Ticket = require('./models/Ticket');

// POST route to create a new ticket
router.post('/', async (req, res) => {
    console.log("Incoming request:", req.body);

  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description });
    const savedTicket = await ticket.save();
    res.status(200).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

module.exports = router;

