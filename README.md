# fly-ai-chat-hggf


flytripvisa-project/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions automated deployment
├── public/
│   ├── index.html                # Main landing page with AI Chat UI
│   ├── apply.html                # Visa Application page
│   ├── dashboard.html            # Flights & Hotels booking dashboard
│   └── contact.html              # Contact page
├── src/
│   └── worker.js                 # Cloudflare Worker (Backend API Proxy for Hugging Face)
├── wrangler.toml                 # Cloudflare Worker configuration & routing
└── README.md                     # Project documentation
