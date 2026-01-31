# Backend - Python Lambda Functions

This directory contains the Python Lambda functions for the portfolio site backend.

## Directory Structure

```
backend/
├── src/
│   ├── handlers/       # Lambda handler functions
│   ├── services/       # Business logic (email, newsletter)
│   ├── utils/          # Shared utilities (logger, responses, db)
│   └── config.py       # Configuration and environment variables
├── tests/              # pytest tests
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Setup

Coming soon - will be implemented in Phase 3.

## API Endpoints

- `POST /api/contact` - Contact form submission
- `POST /api/newsletter/subscribe` - Newsletter subscription
