const mongoose = require('mongoose');

const artisanSubmissionSchema = new mongoose.Schema({
  artisanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  challengeReference: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
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
  region: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['cooking', 'art', 'craft', 'music', 'dance', 'textile', 'architecture', 'festival', 'other'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  materials: [{
    name: String,
    quantity: String,
    optional: {
      type: Boolean,
      default: false
    }
  }],
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'needs_revision'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: 500
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  scheduledDate: Date,
  businessInfo: {
    name: String,
    website: String,
    socialMedia: {
      instagram: String,
      facebook: String,
      youtube: String
    }
  }
}, {
  timestamps: true
});

artisanSubmissionSchema.index({ artisanId: 1, status: 1 });
artisanSubmissionSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('ArtisanSubmission', artisanSubmissionSchema);