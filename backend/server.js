/* eslint-disable */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretportfoliojwttokenkey12345";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith(".vercel.app") || 
                      origin.includes("localhost:");
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Static file hosting for uploads
const UPLOADS_DIR = path.join(__dirname, "uploads");
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn("Failed to create uploads directory:", err.message);
}
app.use("/uploads", express.static(UPLOADS_DIR));

// Create data directory
const DATA_DIR = path.join(__dirname, "data");
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (err) {
  console.warn("Failed to create data directory:", err.message);
}

// Initial default configuration loaders
const defaultProfile = {
  name: "Aditya Kumar",
  avatar: "/hexagon.png",
  profilePhoto: "/imageofaditya.jpg",
  typingWords: ["AI Engineer", "FullStack", "Problem Solver", "Dev Stallion"],
  bioText: "Results-driven Full Stack Developer with 2+ years of hands-on experience building and deploying scalable web applications using the MERN Stack and Java Spring Boot. Proven ability to design and consume REST APIs, implement real-time features via WebSockets, and deliver responsive, high-performance UIs. Completed 2 industry internships prior to graduation, independently deployed 15+ live full-stack projects, and ranked #1 in the CSE department. Adept at agile collaboration, clean architecture, and end-to-end product ownership.",
  about: {
    interests: ["FULL-STACK DEV", "MERN STACK", "SPRING BOOT", "WEB APPS", "DATABASES", "READING", "TRAVEL"],
    techStack: ["React", "Node.js", "Java", "Spring Boot", "TypeScript", "Next.js", "MongoDB", "MySQL"],
    email: "toadityakumarsahoo@gmail.com",
    whoIAm: "Hello! I'm Aditya, a full-stack developer passionate about building clean, efficient, and scalable web applications. I specialize in the MERN Stack and Java Spring Boot, crafting end-to-end solutions that deliver high performance and great user experiences.",
    whatIDo: "I design and build robust web systems, consume/create RESTful APIs, and write optimized database schemas. I focus on clean architecture, agile collaboration, and taking complete product ownership from development to deployment.",
    myJourney: "With over 2 years of hands-on experience, I have successfully completed 2 industry internships and independently deployed 15+ live full-stack projects. I graduated as the top ranker (#1) in the Computer Science & Engineering department, combining academic excellence with practical execution.",
    vision: "To build high-performance products that solve real-world problems and write maintainable, clean code that stands the test of time.",
    beyondCode: "Love techno & house music, follow F1 (Max), play chess, and read regularly. Travelled recently to Bali, and a month in Thailand/Vietnam in 2025."
  },
  socials: {
    twitter: "https://x.com/AdiTheNalanda",
    instagram: "https://www.instagram.com/king._.cindy",
    github: "https://github.com/Adityakumarsahoo",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-sahoo-nit"
  },
  featuredVideo: "/homevideo.webm"
};

const defaultProjects = [
  {
    id: "1",
    title: "Aditya Prime HealthCare",
    slug: "aditya-prime-healthcare",
    description: "Hospital Management System that digitizes patient records, registrations, and doctor scheduling",
    detailedDescription: "A complete Hospital Management System built to streamline healthcare administration. Digitized patient registration, doctor appointment scheduling, and medical records management, eliminating manual paperwork and reducing administrative overhead. Features secure role-based access control (RBAC) for doctors, admins, and patients using Spring Security and JWT authentication.",
    image: "/resume.jpg",
    tags: ["Healthcare", "Full-Stack", "Spring Boot", "MySQL"],
    status: "active",
    techStack: ["Java", "Spring Boot", "React.js", "Node.js", "MySQL", "HTML5", "CSS3", "JavaScript"],
    features: ["Digitized patient registration", "Doctor appointment scheduling", "Medical records management", "Secure role-based access control (RBAC)"],
    learningOutcomes: ["Implementing secure RBAC with Spring Security and JWT", "Designing complex schemas for healthcare databases in MySQL", "Connecting Java Spring Boot backend with React.js frontend"],
    links: { github: "https://github.com/Adityakumarsahoo" },
    author: "Aditya Kumar",
    authorAvatar: "/hexagon.png"
  },
  {
    id: "2",
    title: "QuickChat",
    slug: "quickchat",
    description: "Real-Time Messaging Application supporting group and one-on-one conversations",
    detailedDescription: "A full-stack real-time chat platform with zero-delay messaging using WebSockets (Socket.io), supporting group and one-on-one conversations. Deployed live on Vercel with persistent message history stored in MongoDB, delivering a WhatsApp-style user experience.",
    image: "/task.jpg",
    tags: ["WebSockets", "MERN", "Real-Time", "Communication"],
    status: "active",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "REST APIs"],
    features: ["Zero-delay instant messaging", "Group and one-on-one private conversations", "Persistent message history storage", "Live deployment with low latency"],
    learningOutcomes: ["Managing WebSocket connections with Socket.io in a MERN stack", "Deploying real-time services on Vercel", "Structuring MongoDB documents for chat logs and history"],
    links: { github: "https://github.com/Adityakumarsahoo" },
    author: "Aditya Kumar",
    authorAvatar: "/hexagon.png"
  },
  {
    id: "3",
    title: "Food Delivery Platform",
    slug: "food-delivery-platform",
    description: "Dynamic food ordering platform with restaurant listings and real-time cart management",
    detailedDescription: "A dynamic food ordering platform featuring interactive restaurant listings, real-time cart management, and a smooth checkout flow. Deployed on GitHub Pages with an intuitive, mobile-responsive UI to increase usability across devices.",
    image: "/food.jpg",
    tags: ["E-commerce", "MERN", "Responsive"],
    status: "active",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "JavaScript"],
    features: ["Interactive restaurant listings", "Real-time cart management", "Smooth checkout flow", "Mobile-responsive user interface"],
    learningOutcomes: ["Building responsive layouts for varying screens without desktop compromise", "Handling global cart state on the client side", "Optimizing image loading and component rendering"],
    links: { github: "https://github.com/Adityakumarsahoo" },
    author: "Aditya Kumar",
    authorAvatar: "/hexagon.png"
  },
  {
    id: "4",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description: "Full-stack e-commerce application with product browsing, cart, and JWT auth",
    detailedDescription: "A full-stack e-commerce application with product browsing, cart management, order processing, and JWT-secured user authentication. Designed with a highly responsive UI using Tailwind CSS to achieve consistent performance across desktop and mobile browsers.",
    image: "/invoice.jpg",
    tags: ["E-commerce", "Tailwind CSS", "JWT", "MERN"],
    status: "active",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT Authentication", "Tailwind CSS", "REST APIs"],
    features: ["Product browsing and filtering", "Cart management and checkout flow", "Order processing pipeline", "JWT-secured authentication"],
    learningOutcomes: ["Securing api routes using JSON Web Tokens (JWT) middleware", "Designing responsive grids and animations with Tailwind CSS", "Managing complex state for product catalogs and user sessions"],
    links: { github: "https://github.com/Adityakumarsahoo" },
    author: "Aditya Kumar",
    authorAvatar: "/hexagon.png"
  },
  {
    id: "5",
    title: "SEO Rank Tracker",
    slug: "seo-rank-tracker",
    description: "Analytics Dashboard monitoring keyword rankings and visualizing search performance",
    detailedDescription: "A real-time SEO tracking dashboard enabling users to monitor keyword rankings, track position changes, and visualize search engine performance metrics. Integrates SEO analytics APIs and features clean data visualizations to surface actionable insights for improving website search visibility.",
    image: "/lms.jpg",
    tags: ["Analytics", "React", "Dashboards", "SEO"],
    status: "active",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "SEO Analytics Integration", "JavaScript"],
    features: ["Real-time keyword ranking monitor", "Search engine performance metrics tracking", "Clean data visualizations", "Actionable insights reporting"],
    learningOutcomes: ["Integrating third-party SEO analytics APIs securely", "Implementing charts and graphs in React for big data visualizations", "Creating highly responsive dashboard layouts"],
    links: { github: "https://github.com/Adityakumarsahoo" },
    author: "Aditya Kumar",
    authorAvatar: "/hexagon.png"
  }
];

const defaultTools = [
  {
    name: "Git",
    category: "Version Control",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    href: "https://git-scm.com"
  },
  {
    name: "GitHub",
    category: "Dev Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    href: "https://github.com"
  },
  {
    name: "GitLab",
    category: "Dev Platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
    href: "https://gitlab.com"
  },
  {
    name: "VS Code",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    href: "https://code.visualstudio.com"
  },
  {
    name: "IntelliJ IDEA",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    href: "https://jetbrains.com/idea"
  },
  {
    name: "Eclipse",
    category: "IDE / Editor",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",
    href: "https://eclipse.org"
  },
  {
    name: "Figma",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    href: "https://figma.com"
  },
  {
    name: "Adobe Photoshop",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    href: "https://adobe.com/products/photoshop.html"
  },
  {
    name: "Adobe After Effects",
    category: "Design Tool",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",
    href: "https://adobe.com/products/aftereffects.html"
  }
];

const defaultSkills = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Angular.js",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Web Design",
      "UI/UX Principles"
    ],
    colorClass: "text-blue-400",
    hoverBorderClass: "hover:border-blue-500/35 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Java Spring Boot",
      "Spring Framework",
      "REST API Development",
      "WebSockets (Socket.io)",
      "Maven",
      "Gradle"
    ],
    colorClass: "text-emerald-400",
    hoverBorderClass: "hover:border-emerald-500/35 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
  },
  {
    title: "AI/ML",
    items: [
      "Machine Learning Concepts",
      "Neural Networks",
      "Intelligent System Design",
      "Prompt Engineering",
      "OpenAI Integration",
      "AI-based Fraud Detection",
      "AI Pattern Recognition"
    ],
    colorClass: "text-purple-400",
    hoverBorderClass: "hover:border-purple-500/35 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "SQL"],
    colorClass: "text-amber-400",
    hoverBorderClass: "hover:border-amber-500/35 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]"
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "Vercel",
      "Netlify",
      "GitHub Pages",
      "Deployment & Hosting",
      "Git-based Version Control"
    ],
    colorClass: "text-rose-400",
    hoverBorderClass: "hover:border-rose-500/35 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)]"
  },
  {
    title: "Tools",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "VS Code",
      "IntelliJ IDEA",
      "Eclipse",
      "Figma",
      "Adobe Photoshop",
      "Adobe After Effects"
    ],
    colorClass: "text-cyan-400",
    hoverBorderClass: "hover:border-cyan-500/35 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
  }
];

const defaultExperience = [
  {
    id: "exp_1",
    title: "Sep 2025 - Mar 2026",
    role: "Full Stack Developer",
    company: "Labmentix",
    companySubtitle: "Full-stack web applications development",
    location: "Full-Time · Noida/Remote",
    type: "full-time",
    points: [
      "Engineered and deployed 5+ full-stack web applications using MERN Stack and Java Spring Boot, delivering scalable, production-ready solutions for real-world client projects.",
      "Built responsive, accessible UIs using React.js and Tailwind CSS, reducing reported UI bugs by collaborating closely with QA teams.",
      "Designed and consumed RESTful APIs integrated with MongoDB and MySQL databases, improving data retrieval efficiency through optimized query design.",
      "Collaborated in agile sprints with cross-functional teams, ensuring on-time delivery, clean code standards, and end-to-end product ownership."
    ],
    tags: ["React", "Tailwind CSS", "MERN Stack", "Java Spring Boot", "MongoDB", "MySQL"]
  },
  {
    id: "exp_2",
    title: "Jul 2025 - Nov 2025",
    role: "Full Stack Java Developer (Intern)",
    company: "ExcelR",
    companySubtitle: "Enterprise full-stack applications",
    location: "Internship · Remote",
    type: "internship",
    points: [
      "Developed enterprise-grade full-stack applications using Java, Spring Boot, React.js, and MySQL, focusing on scalable architecture.",
      "Built and tested 10+ RESTful API endpoints with proper authentication and error handling, ensuring secure and reliable data exchange.",
      "Managed relational database schemas and wrote optimized SQL queries, contributing to improved response times.",
      "Applied clean architecture principles and best coding practices, receiving consistent positive feedback during code reviews."
    ],
    tags: ["Java", "Spring Boot", "React.js", "MySQL", "SQL"]
  }
];

// -------------------------
// MONGOOSE SCHEMAS & MODELS
// -------------------------
const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: "Aditya Kumar" },
  avatar: { type: String, default: "/hexagon.png" },
  profilePhoto: { type: String, default: "/imageofaditya.jpg" },
  typingWords: { type: [String], default: [] },
  bioText: { type: String, default: "" },
  about: {
    interests: [String],
    techStack: [String],
    email: String,
    whoIAm: String,
    whatIDo: String,
    myJourney: String,
    vision: String,
    beyondCode: String
  },
  socials: {
    twitter: String,
    instagram: String,
    github: String,
    linkedin: String
  },
  featuredVideo: { type: String, default: "/homevideo.webm" }
});

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  detailedDescription: { type: String, default: "" },
  image: { type: String, default: "" },
  tags: [String],
  status: { type: String, default: "active" },
  techStack: [String],
  features: [String],
  learningOutcomes: [String],
  links: {
    github: String,
    visit: String,
    pypi: String,
    link: String,
    youtube: String,
    howIBuilt: String,
    archive: Boolean
  },
  author: { type: String, default: "Aditya Kumar" },
  authorAvatar: { type: String, default: "/hexagon.png" }
});

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, default: "" },
  icon: { type: String, default: "" },
  href: { type: String, default: "" }
});

const ExperienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, default: "" },
  role: { type: String, default: "" },
  company: { type: String, default: "" },
  companySubtitle: { type: String, default: "" },
  location: { type: String, default: "" },
  type: { type: String, default: "full-time" },
  points: [String],
  tags: [String]
});

const SkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [String],
  colorClass: { type: String, default: "" },
  hoverBorderClass: { type: String, default: "" }
});

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "No Subject" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const CustomSectionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  icon: { type: String, default: "Sparkles" },
  order: { type: Number, default: 0 }
});

const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
const CustomSection = mongoose.models.CustomSection || mongoose.model("CustomSection", CustomSectionSchema);

// Helper to load/save JSON data
function getFilePath(filename) {
  return path.join(DATA_DIR, filename);
}

function readJSON(filename, defaultData) {
  const filePath = getFilePath(filename);
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf8");
    } catch (err) {
      console.warn(`Could not create local fallback file ${filename}:`, err.message);
    }
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}, falling back to defaults`, err);
    return defaultData;
  }
}

// Write JSON data
function writeJSON(filename, data) {
  const filePath = getFilePath(filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn(`Could not write local fallback file ${filename}:`, err.message);
  }
}

// MongoDB connection setup with fallback support
const MONGODB_URI = process.env.MONGODB_URI;
let useMongoDB = false;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully!");
      useMongoDB = true;
      initializeMongoDBData();
    })
    .catch((err) => {
      console.error("MongoDB connection failed, falling back to local JSON files:", err);
      useMongoDB = false;
    });
} else {
  console.log("No MONGODB_URI found in environment variables. Using local JSON files database.");
}

async function initializeMongoDBData() {
  try {
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      const pData = readJSON("profile.json", defaultProfile);
      await new Profile(pData).save();
      console.log("Default profile loaded to MongoDB.");
    }
    
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
      const prData = readJSON("projects.json", defaultProjects);
      await Project.insertMany(prData);
      console.log("Default projects loaded to MongoDB.");
    }

    const toolCount = await Tool.countDocuments();
    if (toolCount === 0) {
      const tData = readJSON("tools.json", defaultTools);
      await Tool.insertMany(tData);
      console.log("Default tools loaded to MongoDB.");
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      const eData = readJSON("experience.json", defaultExperience);
      await Experience.insertMany(eData);
      console.log("Default experience loaded to MongoDB.");
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const sData = readJSON("skills.json", defaultSkills);
      await Skill.insertMany(sData);
      console.log("Default skills loaded to MongoDB.");
    }

    const customCount = await CustomSection.countDocuments();
    if (customCount === 0) {
      const cData = readJSON("custom-sections.json", []);
      if (cData && cData.length > 0) {
        await CustomSection.insertMany(cData);
        console.log("Default custom sections loaded to MongoDB.");
      }
    }
  } catch (err) {
    console.error("Failed to initialize MongoDB data:", err);
  }
}

// Cloudinary setup
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

let useCloudinary = false;
if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  useCloudinary = true;
  console.log("Cloudinary configured successfully for image/video uploads!");
} else {
  console.log("Cloudinary credentials missing in .env. Falling back to local file upload.");
}

// Multer storage setup for image/video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `upload-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Security Middleware (JWT check)
const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(401).json({ error: "Access denied. Login required." });
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// -------------------------
// PUBLIC ENDPOINTS
// -------------------------

// Retrieve entire state config in one batch
app.get("/api/portfolio", async (req, res) => {
  if (useMongoDB) {
    try {
      const profile = await Profile.findOne();
      const projects = await Project.find();
      const tools = await Tool.find();
      const experience = await Experience.find();
      const skills = await Skill.find();
      const customSections = await CustomSection.find().sort({ order: 1 });
      return res.json({ profile, projects, tools, experience, skills, customSections });
    } catch (err) {
      console.error("MongoDB portfolio fetch error, falling back to local files:", err);
    }
  }

  // Local JSON fallback
  const profile = readJSON("profile.json", defaultProfile);
  const projects = readJSON("projects.json", defaultProjects);
  const tools = readJSON("tools.json", defaultTools);
  const experience = readJSON("experience.json", defaultExperience);
  const skills = readJSON("skills.json", defaultSkills);
  const customSections = readJSON("custom-sections.json", []);
  res.json({ profile, projects, tools, experience, skills, customSections });
});

// Send messages public endpoint
app.post("/api/messages", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const newMsg = {
    id: `msg_${Date.now()}`,
    name,
    email,
    subject: subject || "No Subject",
    message,
    timestamp: new Date().toISOString()
  };

  if (useMongoDB) {
    try {
      const dbMsg = new Message(newMsg);
      await dbMsg.save();
      return res.status(201).json({ success: true, message: "Message sent and stored in DB!", data: dbMsg });
    } catch (err) {
      console.error("Failed to save message to MongoDB, falling back:", err);
    }
  }

  // Local JSON fallback
  const messages = readJSON("messages.json", []);
  messages.unshift(newMsg);
  writeJSON("messages.json", messages);
  res.status(201).json({ success: true, message: "Message sent and stored successfully!", data: newMsg });
});

// -------------------------
// ADMIN / PRIVATE ENDPOINTS
// -------------------------

// Admin Login
app.post("/api/login", (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid admin password" });
  }
  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "1d" });
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  res.cookie("admin_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
  res.json({ success: true, message: "Logged in successfully" });
});

// Admin Logout
app.post("/api/logout", (req, res) => {
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax"
  });
  res.json({ success: true, message: "Logged out successfully" });
});

// Auth check
app.get("/api/auth-check", authenticateAdmin, (req, res) => {
  res.json({ authenticated: true });
});

// Get/Edit Profile
app.post("/api/profile", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      let profile = await Profile.findOne();
      if (profile) {
        Object.assign(profile, req.body);
        await profile.save();
      } else {
        profile = new Profile(req.body);
        await profile.save();
      }
      return res.json({ success: true, message: "Profile updated in DB!", data: profile });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  writeJSON("profile.json", req.body);
  res.json({ success: true, message: "Profile updated successfully!", data: req.body });
});

// Get/Edit Projects
app.post("/api/projects", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      await Project.deleteMany();
      await Project.insertMany(req.body);
      return res.json({ success: true, message: "Projects updated in DB!", data: req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  writeJSON("projects.json", req.body);
  res.json({ success: true, message: "Projects updated successfully!", data: req.body });
});

// Get/Edit Tools
app.post("/api/tools", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      await Tool.deleteMany();
      await Tool.insertMany(req.body);
      return res.json({ success: true, message: "Tools updated in DB!", data: req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  writeJSON("tools.json", req.body);
  res.json({ success: true, message: "Tools updated successfully!", data: req.body });
});

// Get/Edit Experience
app.post("/api/experience", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      await Experience.deleteMany();
      await Experience.insertMany(req.body);
      return res.json({ success: true, message: "Experience data updated in DB!", data: req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  writeJSON("experience.json", req.body);
  res.json({ success: true, message: "Experience data updated successfully!", data: req.body });
});

// Get/Edit Skills
app.post("/api/skills", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      await Skill.deleteMany();
      await Skill.insertMany(req.body);
      return res.json({ success: true, message: "Skills updated in DB!", data: req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  writeJSON("skills.json", req.body);
  res.json({ success: true, message: "Skills updated successfully!", data: req.body });
});

// Get/Edit Custom Sections (admin only)
app.post("/api/custom-sections", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      await CustomSection.deleteMany();
      await CustomSection.insertMany(req.body);
      return res.json({ success: true, message: "Custom sections updated in DB!", data: req.body });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  
  writeJSON("custom-sections.json", req.body);
  res.json({ success: true, message: "Custom sections updated successfully!", data: req.body });
});

// Read messages (admin only)
app.get("/api/messages", authenticateAdmin, async (req, res) => {
  if (useMongoDB) {
    try {
      const messages = await Message.find().sort({ timestamp: -1 });
      return res.json(messages);
    } catch (err) {
      console.error("Failed to load messages from MongoDB:", err);
    }
  }

  const messages = readJSON("messages.json", []);
  res.json(messages);
});

// Delete message (admin only)
app.delete("/api/messages/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  if (useMongoDB) {
    try {
      await Message.deleteOne({ id });
      return res.json({ success: true, message: "Message deleted from DB" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  let messages = readJSON("messages.json", []);
  messages = messages.filter((m) => m.id !== id);
  writeJSON("messages.json", messages);
  res.json({ success: true, message: "Message deleted successfully" });
});

// Media/Video/Image Upload (admin only)
app.post("/api/upload", authenticateAdmin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  if (useCloudinary) {
    try {
      const resourceType = req.file.mimetype.startsWith("video") ? "video" : "image";
      
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: resourceType,
        folder: "portfolio"
      });
      
      // Delete temporary local file
      fs.unlinkSync(req.file.path);
      
      return res.json({ success: true, url: uploadResult.secure_url });
    } catch (err) {
      console.error("Cloudinary upload failed, using local fallback:", err);
    }
  }

  // Local static hosting fallback
  const relativeUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: `http://localhost:${PORT}${relativeUrl}` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
