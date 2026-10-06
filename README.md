# fly-ai-chat-hggf


# fly-ai-chat-hggf-project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD deployment
├── public/
│   ├── index.html              # Main Landing Page + AI Chat Widget
│   ├── apply.html              # Visa Application Form Page
│   ├── dashboard.html          # Flights / Hotels Dashboard
│   ├── admin.html              # Admin Management Panel
│   ├── login.html              # User Authentication Page
│   ├── jingpay.html            # Payment Gateway Interface
│   ├── contact.html            # Contact & Support Page
│   ├── service_terms.html      # Terms of Service
│   └── privacy_policy.html     # Privacy Policy
├── src/
│   └── worker.js               # Cloudflare Worker Backend Proxy for Hugging Face
├── .gitignore                  # Git Ignore configuration
├── package.json                # Project Dependencies & Scripts
├── README.md                   # Setup Documentation
└── wrangler.toml               # Cloudflare Worker Configuration
