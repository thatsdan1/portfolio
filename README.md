# Daniel Odetoye - Interactive Portfolio

A modern, interactive portfolio website featuring parallax animations, 3D effects, and animated robo turtles. Built with React, TypeScript, and Framer Motion.

## ✨ Features

- **Parallax Scrolling**: Smooth parallax effects throughout the page
- **4 Animated Robo Turtles**: Dancing turtles that respond to user interaction
- **3D Card Effects**: Interactive project cards with depth and hover effects
- **Scroll Progress Indicator**: Visual feedback as you navigate
- **Contact Form**: Integrated email functionality using Web3Forms
- **Fully Responsive**: Mobile-optimized for all screen sizes
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## 🚀 Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icons

## 🛠️ Getting Started

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone https://github.com/thatsdan1/landing-page.git

# Navigate to the project directory
cd landing-page

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

## 📧 Setting Up Email Functionality

To enable the contact form:

1. Get a free API key from [Web3Forms](https://web3forms.com)
2. Create a `.env` file in the root directory:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_api_key_here
   ```
3. See [EMAIL_SETUP_INSTRUCTIONS.md](EMAIL_SETUP_INSTRUCTIONS.md) for detailed setup

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Import your repository
4. Add environment variable: `VITE_WEB3FORMS_ACCESS_KEY`
5. Deploy!

### Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Import your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_WEB3FORMS_ACCESS_KEY`
6. Deploy!

## 📝 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

## 📄 License

This project is open source and available under the [MIT License](LICENSE.txt).

## 👨‍💻 Author

**Daniel Odetoye**

- GitHub: [@thatsdan1](https://github.com/thatsdan1)
- Portfolio: [https://github.com/thatsdan1/landing-page](https://github.com/thatsdan1/landing-page)

---

Made with ❤️ and lots of ☕
