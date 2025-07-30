# AI Vet Voice Agent 🐾

A cutting-edge AI-powered voice consultation platform that provides 24/7 veterinary assistance to pet owners. This application combines voice AI technology with expert veterinary knowledge to offer immediate pet health guidance, symptom triage, and comprehensive consultation reports.

![AI Vet Voice Agent](https://img.shields.io/badge/AI-Veterinary%20Assistant-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC)

## ✨ Features

### 🎤 **AI Voice Consultations**
- Real-time voice conversations with specialized AI veterinary agents
- Powered by Vapi AI and OpenAI for natural, intelligent interactions
- Multiple specialist agents (General Vet, Emergency Care, Nutrition, etc.)
- Instant symptom analysis and triage

### 📊 **Comprehensive Dashboard**
- User-friendly dashboard with consultation history
- Session management and tracking
- Detailed consultation reports with recommendations
- Credit-based system for consultations

### 🔐 **Secure Authentication**
- Clerk-powered authentication system
- User profile management
- Secure session handling

### 📱 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Beautiful animations with Framer Motion
- Dark/light theme support
- Custom UI components with Radix UI
- Bento grid layout for feature showcase

### 🗄️ **Robust Backend**
- Serverless architecture with Next.js API routes
- PostgreSQL database with Neon serverless
- Drizzle ORM for type-safe database operations
- Automated report generation with AI

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Tabler Icons, Lucide React

### Backend & Database
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Voice AI**: Vapi AI
- **AI Model**: OpenAI (DeepSeek)

### Development Tools
- **Package Manager**: npm
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Database Migration**: Drizzle Kit

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Neon account)
- Clerk account for authentication
- Vapi AI account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-vet-voice-agent.git
   cd ai-vet-voice-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Database
   DATABASE_URL=your_neon_database_url
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Vapi AI
   VAPI_API_KEY=your_vapi_api_key
   NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-vet-voice-agent/
├── app/
│   ├── (auth)/                 # Authentication pages
│   ├── (routes)/               # Protected routes
│   │   ├── dashboard/          # Main dashboard
│   │   ├── history/            # Consultation history
│   │   └── profile/            # User profile
│   ├── api/                    # API routes
│   │   ├── generate-report/    # AI report generation
│   │   ├── session-chat/       # Chat session management
│   │   └── suggest-vet/        # Vet recommendations
│   └── _components/            # Shared components
├── components/                 # UI components
│   └── ui/                     # Reusable UI components
├── config/                     # Configuration files
│   ├── db.tsx                  # Database connection
│   ├── schema.tsx              # Database schema
│   └── OpenAiModel.tsx         # OpenAI configuration
├── context/                    # React context providers
├── lib/                        # Utility functions
└── shared/                     # Shared data and types
```

## 🎯 Key Features Explained

### Voice Consultation Flow
1. **Agent Selection**: Users choose from specialized AI veterinary agents
2. **Voice Interaction**: Real-time voice conversation using Vapi AI
3. **Symptom Analysis**: AI analyzes pet symptoms and provides guidance
4. **Report Generation**: Automated detailed consultation reports
5. **History Tracking**: All consultations saved for future reference

### AI Report Generation
The system automatically generates comprehensive reports including:
- Chief complaint summary
- Symptoms analysis
- Severity assessment
- Medication mentions
- AI recommendations
- Follow-up suggestions

## 🗄️ Database Schema

### Users Table
- User information and credit management
- Integration with Clerk authentication

### Session Chat Table
- Consultation sessions
- Conversation logs
- AI-generated reports
- Veterinary agent selections

## 🔧 API Endpoints

- `POST /api/generate-report` - Generate AI consultation reports
- `POST /api/session-chat` - Manage chat sessions
- `POST /api/suggest-vet` - Get veterinary recommendations
- `GET/POST /api/users` - User management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vapi AI](https://vapi.ai) for voice AI technology
- [OpenAI](https://openai.com) for AI model capabilities
- [Clerk](https://clerk.dev) for authentication services
- [Neon](https://neon.tech) for serverless PostgreSQL
- [Vercel](https://vercel.com) for hosting platform

## 📞 Support

For support, email support@aivetvision.com or create an issue in this repository.

---

**Built with ❤️ for pet owners who want the best care for their furry friends**
