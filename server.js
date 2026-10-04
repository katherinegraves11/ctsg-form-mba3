const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('@notionhq/client');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/api/submit', async (req, res) => {
  const { question, recipient, submitterName, submitterEmail } = req.body;

  // Validate required fields
  if (!question || !recipient || !submitterName || !submitterEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Add entry to Notion database
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: submitterName,
              },
            },
          ],
        },
        'Question': {
          rich_text: [
            {
              text: {
                content: question,
              },
            },
          ],
        },
        'Recipient': {
          select: {
            name: recipient,
          },
        },
        'Submitter Name': {
          rich_text: [
            {
              text: {
                content: submitterName,
              },
            },
          ],
        },
        'Submitter Email': {
          email: submitterEmail,
        },
        'Date Created': {
          date: {
            start: new Date().toISOString().split('T')[0],
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Question submitted successfully!',
      pageId: response.id,
    });
  } catch (error) {
    console.error('Notion API error:', error);
    res.status(500).json({
      error: 'Failed to submit question',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
