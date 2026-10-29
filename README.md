ITZ FIZZ — Kinetic Supercar Scroll Experience
A high-performance, scroll-driven interactive hero section featuring a supercar animation built with Next.js, GSAP ScrollTrigger, Lenis smooth scrolling, and Tailwind CSS. The project is designed with responsive layouts, smooth animations, and static export support for GitHub Pages deployment.

🔗 Links & Submissions
Live Website: https://shradhaKachroo.github.io/itz-fizz-hero/

GitHub Repository: https://github.com/ShradhaKachroo/itz-fizz-hero

Note: The live website will be accessible once the GitHub Pages deployment completes successfully.

🏎️ Reference & Inspiration
Reference Demo: Car Scroll Animation

Key Enhancements
GPU-Accelerated Animations: Uses properties such as transform and opacity to help maintain smooth animations.

Multi-Phase Animation: Separates the initial entrance animation from the scroll-driven animation.

Smooth Scrolling: Integrates Lenis with GSAP for synchronized scrolling and animation.

Responsive Design: Adapts animation distances, scaling, and layout to different screen sizes.

Accessibility: Supports reduced-motion preferences for users who prefer less animation.

Static Website Deployment: Uses Next.js static export and a GitHub Actions workflow for automated GitHub Pages deployment.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS 3.4 and custom CSS

Animation Engine: GSAP and ScrollTrigger

Smooth Scrolling: Lenis

Icons: Lucide React

Typography: Outfit and Space Grotesk

Hosting: GitHub Pages

CI/CD: GitHub Actions

🎬 How Animations Work
The animation logic is organized in hooks/useHeroAnimation.ts.

1. Initial Load Animation
When the page loads, a GSAP timeline coordinates the entrance animations.

Category Badge: Appears with a downward movement and fade-in effect.

Headline Animation: The headline "WELCOME ITZ FIZZ" appears letter by letter.

Car Animation: The supercar moves into its initial position.

Statistics Grid: The performance metrics appear sequentially.

Scroll Prompt: A visual prompt encourages the user to scroll.

2. Scroll-Driven Animation
GSAP ScrollTrigger controls the animation as the user scrolls.

Scroll Hint: The scroll prompt fades away as the animation begins.

Car Movement: The car moves horizontally across the track.

Suspension Effect: Small rotation and scale changes create a sense of movement.

Speed Trail: A glowing trail follows the car.

Headline Effects: Headline letters illuminate with a cyan glow and move to create a dynamic visual effect.

Statistics Parallax: Metric cards shift subtly to add depth.

Reverse Scrolling: Scrolling upward reverses the animation smoothly.

Section Transition: The pinned hero section releases into the next content section.

📂 Project Structure
Plaintext
itz-fizz-hero/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── app/
│   ├── globals.css             # Global styles and theme variables
│   ├── layout.tsx              # Root layout and font configuration
│   └── page.tsx                # Main page
├── components/
│   ├── CarVisual.tsx           # Car illustration and speed trail
│   ├── Hero.tsx                 # Main hero section
│   ├── HeroHeadline.tsx         # Animated headline
│   ├── NextSection.tsx          # Content after the hero
│   ├── SmoothScroll.tsx         # Lenis smooth scrolling
│   └── StatsGrid.tsx            # Performance statistics
├── hooks/
│   └── useHeroAnimation.ts      # GSAP animation logic
├── lib/
│   ├── gsap.ts                  # GSAP registration
│   └── utils.ts                 # Utility functions
├── public/
│   ├── .nojekyll                # GitHub Pages configuration
│   └── images/
│       └── car.svg              # Supercar illustration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
🚀 Getting Started Locally
Prerequisites
Node.js (version supported by the project dependencies)

npm

Installation
Clone the repository:

Bash
git clone https://github.com/ShradhaKachroo/itz-fizz-hero.git
Navigate to the project directory:

Bash
cd itz-fizz-hero
Install dependencies:

Bash
npm install
Development Server
Start the local development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

Production Build
Generate the static website:

Bash
npm run build
The exported website should be generated in the out directory when static export is configured correctly.

🌐 Deploying to GitHub Pages
This project uses GitHub Actions to automate the deployment process.

1. Push Changes to GitHub
After making changes to the project, run:

Bash
git add .
git commit -m "Update project"
git push origin main
These commands push your changes to the existing GitHub repository.

2. Enable GitHub Pages
Open the repository settings.

Navigate to Pages.

Under Build and deployment, set the source to GitHub Actions.

3. Verify Deployment
Open the GitHub Actions page.

Open the latest deployment workflow.

Wait for both the build and deployment jobs to succeed.

Visit the published website:

https://shradhaKachroo.github.io/itz-fizz-hero/

The website will be available at this address after deployment succeeds.

⚡ Performance & Accessibility Highlights
Efficient Animations: Uses transform-based animations to help reduce unnecessary layout recalculations.

Animation Cleanup: Uses GSAP context cleanup to prevent animation instances from remaining after component unmount.

Responsive Behavior: Adjusts animation parameters for different viewport sizes.

Reduced Motion Support: Respects the user's reduced-motion preference.

Asset Synchronization: Refreshes ScrollTrigger calculations after fonts and assets load.

📌 Project Goals
Create an engaging, interactive automotive landing page.

Demonstrate scroll-controlled animations using GSAP and ScrollTrigger.

Integrate smooth scrolling with Lenis.

Build a responsive experience for mobile and desktop screens.

Organize animation logic into reusable components and hooks.

Automate static website deployment through GitHub Actions.

📄 License
This repository does not specify a license. Please contact the project owner for permission before redistributing or reusing the source code.