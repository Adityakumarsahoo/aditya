// assets/dummyStyles.js

export const homePageStyles = {
  // Layout and container styles
  container: "relative z-10 bg-zinc-950 p-6 pt-20 md:pt-16 md:p-20",

  // Background grid pattern
  backgroundGrid: {
    wrapper: "pointer-events-none -z-20 absolute inset-0 [background-size:40px_40px] select-none",
    pattern: "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
  },

  // Gradient overlay
  gradientOverlay: "absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none",

  // Hero section
  heroSection: "w-full max-w-[880px] mx-auto",

  // Headings
  h1: "text-[40px] sm:text-[48px] md:text-[55px] lg:text-[72px] xl:text-[72px] leading-[1.15] font-extrabold tracking-tight mb-4 text-zinc-100",

  h2: "text-xl sm:text-2xl md:text-3xl text-zinc-300 font-medium mb-6",

  // Callout card
  calloutCard: {
    wrapper: "w-full sm:w-auto sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl p-3.5 bg-zinc-900/30 border border-zinc-800/40 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/25 hover:bg-zinc-900/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.03)]",
    innerContainer: "flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-4",
    textContainer: "flex items-center gap-3 min-w-0",
    icon: "w-5 h-5 text-zinc-300 flex-shrink-0",
    text: "truncate text-sm font-medium text-zinc-200",
    button: "mt-2 sm:mt-0 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-450 text-xs font-semibold shrink-0 transition-all duration-300 hover:bg-emerald-400 hover:text-zinc-950 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] focus:outline-none"
  },

  // Paragraph
  paragraph: "text-base sm:text-lg text-zinc-300 leading-7 mb-8 max-w-[720px]",

  // Link styles
  link: "underline text-zinc-200 hover:text-zinc-100 transition-colors",

  // Article/Video card
  article: {
    wrapper: "rounded-2xl border border-zinc-900 bg-zinc-950/20 backdrop-blur-md shadow-2xl overflow-hidden w-full max-w-[880px] transition-all duration-500 hover:border-emerald-500/15 hover:bg-zinc-950/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.03)]",
    videoContainer: "relative w-full overflow-hidden border-b border-zinc-900 aspect-video",
    video: "w-full h-full object-cover",
    videoStyles: {
      WebkitUserSelect: 'none',
      userSelect: 'none',
      pointerEvents: 'none'
    },
    content: "p-6 md:p-8",
    header: "flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase mb-3 tracking-widest",
    headerIcon: "w-4 h-4 text-emerald-400",
    title: "font-bold text-2xl md:text-3xl text-zinc-100 mb-3 tracking-tight",
    description: "text-base text-zinc-400 leading-relaxed",
    linkContainer: "mt-6",
    link: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors group/link",
    linkIcon: "w-4 h-4 text-current transition-transform duration-200 group-hover/link:translate-x-1"
  },

  // Inline span adjustments
  spanInline: "inline-block align-middle",
  spanWithMargin: "inline-block mt-3 md:mt-0 sm:mt-0 lg:mt-0 xl:mt-0 align-middle z-20"
};

export const spotlightStyles = {
  position: "-top-40 -z-20 left-0 md:-top-20 md:left-60"
};


// assets/dummyStyles.js
export const pageStyles = {
  container: "flex min-h-screen pt-20 w-full items-start justify-center bg-zinc-950 px-6 py-12 md:px-12 md:py-20 lg:px-16",
  wrapper: "w-full max-w-3xl",
  backgroundContainer: "relative",
  backgroundEffect: "absolute inset-0 rounded-xl overflow-hidden",
  content: "relative z-10",
  heading: "text-5xl font-bold tracking-tight text-zinc-100 md:text-6xl lg:text-7xl",
  interestsContainer: "mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium tracking-wide text-zinc-400",
  interestItem: "flex items-center",
  dotSeparator: "ml-3 text-zinc-600",
  techStackContainer: "mt-8 flex flex-wrap gap-3",
  techPill: "rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100",
  sectionsContainer: "mt-16 space-y-12",
  section: "",
  sectionHeading: "text-2xl font-bold text-zinc-100",
  sectionParagraph: "mt-4 leading-relaxed text-zinc-400",
  link: "text-zinc-200 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-100 hover:decoration-zinc-500",
  ctaContainer: "mt-16 flex flex-wrap gap-4",
  ctaButtonPrimary: "rounded-lg bg-zinc-100 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95",
  ctaButtonSecondary: "flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-100 transition-all hover:border-zinc-700 hover:bg-zinc-800",
  emailIcon: "h-4 w-4"
};

// assets/dummyStyles.js

export const timelineStyles = {
  // Layout styles
  container: "min-h-screen relative overflow-hidden bg-zinc-950 p-4 md:p-8 pt-24 lg:pt-24",
  innerContainer: "mx-auto max-w-5xl relative z-10",
  mainTitle: "mt-4 text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 md:text-5xl lg:text-6xl leading-[1.1]",
  mainParagraph: "mt-4 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed",

  // Badge styles
  timelineBadge: "inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1 shadow-[0_2px_8px_rgba(16,185,129,0.06)]",
  timelineBadgeText: "text-xs font-bold uppercase tracking-wider text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.15)]",

  // Legend styles
  legendContainer: "mt-8 flex flex-wrap gap-5 items-center",
  legendItem: "flex items-center gap-2.5",
  legendDot: "h-2.5 w-2.5 rounded-full",
  legendText: "text-xs font-bold uppercase tracking-wider text-zinc-400",

  // Timeline item styles
  itemContainer: "space-y-4 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 shadow-xl transition-all duration-350 hover:border-emerald-500/30 hover:bg-zinc-900/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:scale-[1.01]",
  itemFlexContainer: "flex items-center gap-4",

  // Icon container styles
  iconContainer: "rounded-xl bg-zinc-800/50 p-2.5 border border-zinc-700/20 flex items-center justify-center",
  iconContainerBlue: "rounded-xl bg-blue-500/10 p-2.5 border border-blue-500/20 flex items-center justify-center",
  iconContainerPurple: "rounded-xl bg-purple-500/10 p-2.5 border border-purple-500/20 flex items-center justify-center",
  iconContainerGreen: "rounded-xl bg-green-500/10 p-2.5 border border-green-500/20 flex items-center justify-center",
  iconContainerAmber: "rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/20 flex items-center justify-center",
  iconContainerRose: "rounded-xl bg-rose-500/10 p-2.5 border border-rose-500/20 flex items-center justify-center",
  iconContainerEmerald: "rounded-xl bg-emerald-500/10 p-2.5 border border-emerald-500/20 flex items-center justify-center",

  // Icon styles
  iconSize: "h-5 w-5",
  iconBlue: "h-5 w-5 text-blue-400",
  iconPurple: "h-5 w-5 text-purple-400",
  iconGreen: "h-5 w-5 text-green-400",
  iconAmber: "h-5 w-5 text-amber-400",
  iconRose: "h-5 w-5 text-rose-400",
  iconEmerald: "h-5 w-5 text-emerald-400",

  // Content styles
  contentTitle: "text-lg font-semibold text-white",
  contentSubtitle: "mt-1 text-sm text-zinc-400",
  contentText: "mt-2 text-sm text-zinc-300",

  // List styles
  list: "space-y-2",
  listItem: "flex items-start gap-2 text-sm text-zinc-300",

  // Bullet styles
  bullet: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full",
  bulletBlue: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500",
  bulletPurple: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500",
  bulletGreen: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500",
  bulletAmber: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500",
  bulletRose: "mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500",

  // Technology badge styles
  techBadgesContainer: "flex flex-wrap gap-2 pt-2",
  techBadge: "rounded-full bg-zinc-950/60 border border-zinc-900/60 px-3 py-1.5 text-xs text-zinc-450 transition-all duration-250 hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-950/25 hover:scale-105 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] shadow-sm",

  // Achievement section styles
  achievementGrid: "grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2",
  achievementCard: "rounded-lg bg-zinc-800/30 p-4",
  achievementCardTitle: "text-sm font-semibold text-emerald-400",
  achievementCardValue: "mt-1 text-2xl font-bold text-white",
  achievementCardSub: "mt-1 text-xs text-zinc-400",

  // Specialization styles
  specializationContainer: "rounded-lg bg-zinc-800/30 p-4",
  specializationTitle: "text-sm font-semibold text-emerald-400",
  specializationBadgesContainer: "mt-2 flex flex-wrap gap-2",
  specializationBadge: "rounded-full bg-emerald-900/30 px-3 py-1 text-xs text-emerald-300",

  // Technologies section styles
  techSectionContainer: "mt-16 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-350 hover:border-emerald-500/20 hover:shadow-[0_0_35px_rgba(16,185,129,0.03)]",
  techSectionHeader: "flex items-center gap-3 relative z-10",
  techSectionIconContainer: "rounded-xl bg-zinc-950 border border-zinc-900 p-3 flex items-center justify-center text-zinc-400 shadow-sm",
  techSectionIcon: "h-5 w-5 text-zinc-350",
  techSectionTitle: "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400",
  techSectionSubtitle: "text-sm text-zinc-400",
  techGrid: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 relative z-10",
  techCard: "group/tech relative flex flex-col justify-start rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 text-center transition-all duration-350 hover:-translate-y-1 hover:bg-zinc-950/40 hover:border-emerald-500/25 hover:shadow-[0_0_25px_rgba(16,185,129,0.05)]",
  techCardTitle: "text-xs font-bold uppercase tracking-wider mb-4",
  techCardContent: "flex flex-wrap gap-1.5 justify-center",
  techCardPill: "rounded-md bg-zinc-950/60 border border-zinc-900/80 px-2 py-1 text-[10px] font-medium text-zinc-400 transition-all duration-200 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900/40 shadow-sm",

  // Color-specific text
  textBlue: "text-blue-400",
  textPurple: "text-purple-400",
  textGreen: "text-green-400",
  textAmber: "text-amber-400",
  textRose: "text-rose-400",
  textEmerald: "text-emerald-400",
  textCyan: "text-cyan-400",
};



export const aboutPageStyles = {
  // Layout and container styles
  pageContainer: "flex min-h-screen pt-24 w-full items-start justify-center bg-zinc-950 px-6 py-12 md:px-12 md:py-20 lg:px-16",
  contentContainer: "w-full max-w-3xl rounded-3xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-6 md:p-12 shadow-2xl relative overflow-hidden",

  // Background container
  backgroundContainer: "relative w-full",
  backgroundEffect: "absolute inset-0 rounded-xl overflow-hidden opacity-30",
  contentWrapper: "relative z-10",

  // Headings
  mainHeading: "text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 md:text-6xl lg:text-7xl mb-2",
  sectionHeading: "text-lg font-bold text-zinc-100 flex items-center gap-2.5",

  // Interests/Tags
  interestsContainer: "mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/80",
  interestItem: "flex items-center",
  interestSeparator: "ml-3 text-zinc-800 font-bold",

  // Tech Stack
  techStackContainer: "mt-8 flex flex-wrap gap-2.5",
  techPill: "rounded-full border border-zinc-850 bg-zinc-900/40 px-3.5 py-1.5 text-xs text-zinc-350 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-950/25 hover:scale-105 hover:text-emerald-400 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]",

  // Content sections
  sectionsContainer: "mt-12 space-y-4",
  sectionCard: "relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/15 p-6 transition-all duration-350 hover:border-emerald-500/25 hover:bg-zinc-950/35 hover:shadow-lg hover:shadow-emerald-500/[0.005] hover:scale-[1.005]",
  paragraph: "text-sm text-zinc-400 leading-relaxed mt-3",

  // Links
  contentLink: "text-zinc-200 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-100 hover:decoration-zinc-500",

  // CTA Buttons
  ctaContainer: "mt-12 flex flex-wrap gap-4",
  primaryButton: "group relative rounded-xl bg-gradient-to-r from-emerald-500 to-[#0FFF50] px-6 py-3.5 text-sm font-bold text-zinc-950 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98] inline-block text-center cursor-pointer hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]",
  secondaryButton: "flex items-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/60 px-6 py-3.5 text-sm font-semibold text-zinc-100 transition-all hover:border-zinc-750 hover:bg-zinc-800 hover:text-white",
  emailIcon: "h-4 w-4"
};

export const contactPageStyles = {
  // Layout and container styles
  pageContainer: "flex min-h-screen pt-24 w-full items-start justify-center bg-zinc-950 px-6 py-12 md:px-12 md:py-20 lg:px-16",
  contentContainer: "w-full max-w-2xl",

  // Form container with boxes background
  formOuterContainer: "relative w-full overflow-hidden bg-zinc-950 flex flex-col items-center justify-center rounded-2xl border border-zinc-900 p-6 md:p-10",
  backgroundOverlay: "absolute inset-0 w-full h-full bg-zinc-950/40 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none",

  // Header
  headerContainer: "mb-10 text-center z-30",
  headerTitle: "text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 mb-3",
  headerSubtitle: "text-base text-zinc-400 max-w-md mx-auto leading-relaxed",

  // Contact methods grid
  contactMethodsGrid: "mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 w-full z-30",

  // Contact method card
  contactCard: "group flex items-center gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-emerald-500/[0.02] hover:scale-[1.01]",
  contactIconContainer: "flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-400 transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  contactIcon: "h-5 w-5",
  contactLabel: "text-xs font-semibold text-zinc-500 uppercase tracking-wider",
  contactValue: "text-zinc-200 font-medium text-xs sm:text-sm lg:text-sm xl:text-base truncate transition-colors group-hover:text-zinc-100",

  // Form styles
  formContainer: "relative z-30 space-y-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm p-6 md:p-8 w-full transition-all duration-300 hover:border-zinc-850",
  formGrid: "grid grid-cols-1 gap-6 md:grid-cols-2",

  // Form field common styles
  formFieldContainer: "relative",
  formInput: "peer w-full rounded-xl border border-zinc-850 bg-zinc-950/30 px-4 py-4 text-zinc-100 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500/60 focus:bg-zinc-900/10 focus:ring-1 focus:ring-emerald-500/25 focus:shadow-[0_0_20px_rgba(16,185,129,0.07)]",
  formTextarea: "peer w-full resize-none rounded-xl border border-zinc-850 bg-zinc-950/30 px-4 py-4 text-zinc-100 outline-none transition-all duration-300 placeholder:text-transparent focus:border-emerald-500/60 focus:bg-zinc-900/10 focus:ring-1 focus:ring-emerald-500/25 focus:shadow-[0_0_20px_rgba(16,185,129,0.07)]",

  // Form label styles
  formLabelBase: "absolute pointer-events-none transition-all duration-200",
  formLabelFocused: "-top-2.5 left-3 text-[10px] font-bold text-emerald-400 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-md uppercase tracking-wider scale-95",
  formLabelUnfocused: "top-4 left-4 text-sm font-medium text-zinc-500",

  // Submit button
  submitButtonContainer: "pt-4",
  submitButton: "group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-[#0FFF50] px-8 py-4 text-sm font-bold text-zinc-950 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98] md:w-auto cursor-pointer disabled:opacity-50 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
  submitButtonText: "relative z-10 flex items-center justify-center gap-2",
  submitButtonIcon: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1",

  // Alternative text
  alternativeText: "mt-8 text-center text-sm text-zinc-500",
  alternativeLink: "text-zinc-300 font-medium underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-100 hover:decoration-zinc-500"
};

// Add these to assets/dummyStyles.js

export const projectStyles = {
  // Page container
  pageContainer: "flex min-h-screen w-full justify-center pt-20 bg-zinc-950 px-6 py-12 md:px-12 md:py-20 lg:px-16",
  innerContainer: "w-full max-w-full",

  // Header
  header: "mb-12",
  pageTitle: "text-4xl font-bold text-zinc-100 md:text-5xl",
  pageSubtitle: "mt-2 text-zinc-400",

  // Projects grid
  projectsGrid: "grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",

  // Project card
  projectCard: "group relative h-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/20 transition-all duration-350 hover:border-emerald-500/20 hover:bg-zinc-950/45 hover:shadow-[0_0_40px_rgba(16,185,129,0.04)] hover:scale-[1.015] cursor-pointer",

  // Image container
  imageContainer: "relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border-b border-zinc-900",
  projectImage: "h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-105",

  // Status badge
  statusBadgeContainer: "absolute right-3 top-3 z-10",
  statusBadge: "rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md",
  statusActive: "bg-green-500/10 text-green-400 ring-1 ring-green-500/20",
  statusInactive: "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",

  // Bookmark button
  bookmarkButton: "absolute right-3 top-12 rounded-full bg-zinc-950/80 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-zinc-900 z-10",
  bookmarkIcon: "h-4 w-4 text-zinc-400",

  // Content section
  contentSection: "p-6",
  projectTitle: "text-xl font-bold text-zinc-100 group-hover:text-zinc-50",
  projectDescription: "mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400",

  // Tags
  tagsContainer: "mt-4 flex flex-wrap gap-2",
  tag: "rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-400 transition-colors hover:border-emerald-500/20 hover:text-emerald-400 hover:bg-zinc-900/30 border border-zinc-900/80",

  // Actions
  actionsContainer: "mt-6 flex items-center justify-between border-t border-zinc-900 pt-4",
  actionsLinksContainer: "flex gap-2",

  // Buttons
  visitButton: "rounded-lg bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-900 transition-all duration-200 hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer",
  otherButton: "rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-950/10 hover:text-emerald-400 hover:scale-105 cursor-pointer",

  // Archive text
  archivedText: "text-xs text-zinc-500",

  // Title component (for follower pointer)
  titleComponentContainer: "flex items-center space-x-2 rounded-full bg-zinc-900/90 px-3 py-1.5 shadow-lg backdrop-blur-md border border-zinc-800",
  titleComponentAvatar: "rounded-full border border-zinc-700",
  titleComponentText: "text-sm font-medium text-zinc-200",
};

// You can also create a combined styles object if needed
export const styles = {
  timeline: timelineStyles,
  projects: projectStyles,
};

export const toolsPageStyles = {
  // Layout and container styles
  pageContainer: "flex min-h-screen w-full justify-center bg-zinc-950 pt-24 px-6 py-12 md:px-12 md:py-20 lg:px-16",
  contentContainer: "w-full max-w-full",

  // Header
  headerContainer: "mb-12 text-left relative z-10",
  headerTitle: "text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-400 leading-none mb-3",
  headerSubtitle: "text-base text-zinc-400 leading-relaxed max-w-md",

  // Tools grid
  toolsGrid: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

  // Tool card
  toolCardLink: "group flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 border border-zinc-900 bg-zinc-900/10 backdrop-blur-md transition-all duration-350 hover:border-emerald-500/35 hover:bg-zinc-900/25 hover:shadow-[0_0_30px_rgba(15,255,80,0.06)] hover:scale-[1.015]",
  toolIconContainer: "relative h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden border border-zinc-850 bg-zinc-950/80 p-2 flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/30 group-hover:scale-[1.05] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.15)] shadow-inner backdrop-blur-sm",
  toolIcon: "object-contain transition-transform duration-300 group-hover:scale-105",
  toolTextContainer: "flex-1 min-w-0",
  toolName: "text-base font-bold text-zinc-200 truncate transition-colors duration-200 group-hover:text-white",
  toolCategory: "text-xs font-semibold text-zinc-500 uppercase tracking-wider transition-colors duration-200 group-hover:text-emerald-400"
};

// Add these to assets/dummyStyles.js

export const projectDetailStyles = {
  // Page container
  pageContainer: "min-h-screen relative bg-zinc-950 pt-20 px-4 sm:px-6 lg:px-8 pb-20 antialiased",
  innerContainer: "max-w-6xl mx-auto relative z-10",

  // Back button
  backButton: "inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors",
  backIcon: "h-4 w-4",

  // Project header
  projectHeader: "mb-12",
  headerFlex: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6",
  headerLeft: "flex-1",

  // Title and status
  titleContainer: "flex items-center gap-4 mb-4",
  projectTitle: "text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100",
  statusBadge: "rounded-full px-3 py-1 text-sm font-medium",
  statusActive: "bg-green-500/10 text-green-400 ring-1 ring-green-500/20",
  statusInactive: "bg-zinc-500/10 text-zinc-400 ring-1 ring-zinc-500/20",

  // Description
  projectDescription: "text-lg text-zinc-400 mb-6 max-w-3xl",

  // Tags
  tagsContainer: "flex flex-wrap gap-2 mb-8",
  tag: "rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100",

  // Action buttons
  actionButtonsContainer: "flex flex-wrap gap-3",
  visitButton: "inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-200 hover:shadow-lg hover:scale-105",
  secondaryButton: "inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100",
  buttonIcon: "h-4 w-4",

  // Project image
  imageContainer: "mb-12 rounded-2xl overflow-hidden border border-zinc-800",
  projectImage: "w-full h-auto aspect-video object-cover",

  // Main grid
  gridContainer: "grid grid-cols-1 lg:grid-cols-3 gap-8",
  mainContent: "lg:col-span-2 space-y-12",
  sidebar: "space-y-8",

  // Section titles
  sectionTitle: "text-2xl font-bold text-zinc-100 mb-6",
  sidebarSectionTitle: "text-xl font-bold text-zinc-100 mb-4",

  // Prose content
  prose: "prose prose-invert max-w-none",
  proseText: "text-zinc-400 leading-relaxed",

  // Features
  featuresGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  featureCard: "rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-700 transition-colors",
  featureCardInner: "flex items-start gap-3",
  featureIconContainer: "rounded-full bg-blue-500/10 p-1.5 mt-0.5",
  featureIcon: "h-2 w-2 rounded-full bg-blue-500",
  featureText: "text-zinc-300",

  // Learning outcomes
  learningOutcomesGrid: "grid grid-cols-1 sm:grid-cols-2 gap-3",
  learningOutcomeCard: "flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/30 p-3",
  learningOutcomeNumber: "flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10",
  learningOutcomeNumberText: "text-xs font-medium text-green-400",
  learningOutcomeText: "text-sm text-zinc-400",

  // Sidebar sections
  sidebarSection: "rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6",
  techStackContainer: "flex flex-wrap gap-2",
  techStackItem: "rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300",

  // Links
  linksContainer: "space-y-3",
  linkCard: "flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800",
  linkIcon: "h-5 w-5 text-zinc-400",
  linkText: "text-zinc-300",

  // Project info
  projectInfoContainer: "space-y-4",
  projectInfoLabel: "text-sm text-zinc-500 mb-1",
  authorContainer: "flex items-center gap-3",
  authorAvatar: "h-8 w-8 rounded-full border border-zinc-700",
  authorName: "text-zinc-300",
  projectInfoText: "text-zinc-300 capitalize",
};

// Add these to assets/dummyStyles.js

export const sidebarStyles = {
  // Mobile top navbar
  mobileTopNav: "md:hidden fixed top-0 left-0 right-0 z-80 bg-zinc-950/60 backdrop-blur-lg border-b border-zinc-900/50 px-4 py-3 shadow-md",
  mobileTopNavInner: "flex items-center justify-between",
  mobileAvatarContainer: "flex items-center gap-3",
  mobileAvatar: "w-10 h-10 rounded-full overflow-hidden ring-2 ring-zinc-900 shadow-md",
  mobileAvatarImage: "object-cover",
  mobileName: "font-semibold text-zinc-100 text-base tracking-wide",
  mobileTyping: "text-xs text-zinc-400 truncate max-w-[120px]",

  // Spacer for mobile
  mobileSpacer: "md:hidden h-16",

  // Desktop sidebar
  desktopSidebar: "hidden md:flex flex-col w-[260px] h-screen px-6 py-8 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900/50 fixed left-0 top-0 overflow-y-auto shadow-[5px_0_30px_rgba(0,0,0,0.5)]",
  desktopAvatarContainer: "flex items-center gap-3 mb-6",
  desktopAvatar: "w-12 h-12 rounded-full overflow-hidden ring-2 ring-zinc-900 transition-all duration-300 hover:ring-emerald-450 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] shadow-md",
  desktopAvatarImage: "object-cover",
  desktopName: "font-semibold text-zinc-100 tracking-wide",
  desktopTyping: "text-xs text-zinc-400",

  // Navigation
  navContainer: "flex-1",
  navList: "space-y-1.5",
  navItem: "group/nav relative flex items-center gap-3 px-3.5 py-3 rounded-xl border border-transparent transition-all duration-300",
  navItemActive: "bg-emerald-500/5 border-emerald-500/20 border-l-2 border-l-emerald-400 text-emerald-400 font-semibold shadow-[0_0_25px_rgba(16,185,129,0.12)] border-r border-r-emerald-500/5",
  navItemInactive: "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200 hover:border-zinc-850/45 hover:translate-x-0.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.03)] hover:border-emerald-500/10",
  navIcon: "w-4 h-4 text-current transition-colors duration-300",
  navLabel: "text-sm font-medium tracking-wide",

  // Social section
  connectLabel: "mt-10 text-[10px] font-bold uppercase tracking-wider text-zinc-500 pl-1",
  socialList: "mt-3 space-y-1.5 text-sm",
  socialItem: "group flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/30 hover:translate-x-0.5 border border-transparent transition-all duration-300",
  socialIcon: "w-4 h-4 text-current transition-all duration-300 group-hover:scale-105",
  socialLabel: "text-xs font-semibold tracking-wide",

  // Footer
  footerText: "mt-8 text-[11px] font-medium text-zinc-500 tracking-wider uppercase pl-1 border-t border-zinc-900/50 pt-4",

  // Mobile menu overlay
  mobileOverlay: "md:hidden fixed inset-0 z-[60] transition-all duration-300",
  mobileOverlayVisible: "opacity-100",
  mobileOverlayHidden: "opacity-0 pointer-events-none",
  mobileOverlayBg: "absolute inset-0 bg-black/60 transition-opacity duration-300 backdrop-blur-xs",
  mobileOverlayBgVisible: "opacity-100",
  mobileOverlayBgHidden: "opacity-0",

  // Mobile sidebar
  mobileSidebar: "mobile-sidebar absolute right-0 top-0 h-full w-full max-w-[320px] bg-zinc-950/90 backdrop-blur-xl border-l border-zinc-900/50 transform transition-transform duration-300 ease-out shadow-2xl",
  mobileSidebarVisible: "translate-x-0",
  mobileSidebarHidden: "translate-x-full",
  mobileSidebarHeader: "p-6 border-b border-zinc-900/50",
  mobileHeaderInner: "flex items-center justify-between mb-0",
  mobileHeaderAvatarContainer: "flex items-center gap-3",
  mobileCloseButton: "p-2 rounded-xl hover:bg-zinc-900/60 border border-transparent hover:border-zinc-850 transition-all duration-200",
  mobileCloseIcon: "w-5 h-5 text-zinc-400",

  // Mobile nav content
  mobileContent: "p-6 overflow-y-auto h-[calc(100vh-240px)]",
  mobileSectionLabel: "text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3",
  mobileNavList: "space-y-1.5",
  mobileNavItem: "group flex items-center gap-3 px-3.5 py-3 rounded-xl border border-transparent transition-all duration-300",
  mobileNavIcon: "w-5 h-5 text-current",
  mobileNavLabel: "text-sm font-medium tracking-wide",

  // Mobile social section
  mobileSocialSection: "mb-8",
  mobileSocialList: "space-y-1.5",
  mobileSocialItem: "group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-450 hover:text-emerald-400 hover:bg-zinc-900/20 border border-transparent transition-all duration-300",
  mobileSocialIcon: "w-4 h-4 text-current transition-all duration-300 group-hover:scale-105",
  mobileSocialText: "text-xs font-semibold tracking-wide",

  // Mobile footer
  mobileFooter: "absolute bottom-0 left-0 right-0 p-6 border-t border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md",
  mobileFooterLabel: "text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4",
  mobileFooterText: "text-[11px] font-medium text-zinc-500 tracking-wider uppercase flex justify-between",

  // Bottom navigation bar
  bottomNav: "md:hidden fixed bottom-0 left-0 right-0 z-50",
  bottomNavContainer: "mx-auto w-full px-4 pb-4",
  bottomNavInner: "max-w-lg mx-auto",
  bottomNavBar: "bg-zinc-950/80 backdrop-blur-lg border border-zinc-900/50 px-2.5 py-2 flex items-center gap-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)] rounded-2xl",
  bottomNavGrid: "grid grid-cols-6 gap-1 flex-1",
  bottomNavLink: "p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center border border-transparent",
  bottomNavLinkActive: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.05)]",
  bottomNavLinkInactive: "text-zinc-450 hover:text-zinc-200 hover:bg-zinc-900/40",
  bottomNavIcon: "w-4 h-4",
  bottomNavDivider: "h-6 w-px bg-zinc-900",
  bottomMenuButton: "p-2.5 rounded-xl text-zinc-450 hover:text-zinc-200 hover:bg-zinc-900/40 border border-transparent transition-all duration-300",
  bottomMenuIcon: "w-4 h-4",
};