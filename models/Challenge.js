const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  videoEmbedUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+$/.test(v);
      },
      message: 'Please provide a valid YouTube embed URL'
    }
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  category: {
    type: String,
    enum: ['cooking', 'art', 'craft', 'music', 'dance', 'textile', 'architecture', 'festival', 'other'],
    required: true
  },
  materials: [{
    name: String,
    quantity: String,
    optional: {
      type: Boolean,
      default: false
    }
  }],
  steps: [{
    stepNumber: Number,
    instruction: String,
    timeEstimate: Number // in minutes
  }],
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  completionCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for efficient queries
challengeSchema.index({ date: 1, region: 1 });
challengeSchema.index({ category: 1 });
challengeSchema.index({ artisanId: 1 });

module.exports = mongoose.model('Challenge', challengeSchema);