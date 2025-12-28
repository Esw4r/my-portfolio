const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Schema for your Portfolio Projects
const projectSchema = new mongoose.Schema({
  title: String,
  problem: String,
  solution: String,
  techStack: [String],
  imageUrl: String
});

const Project = mongoose.model('Project', projectSchema);

// API Route to fetch projects
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.listen(5000, () => console.log('Server running on port 5000'));