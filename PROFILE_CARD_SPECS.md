# Profile Card Design Specifications
## Look 4 Mentors - User Profile Cards

---

## 1. DIRECTORY/GRID VIEW CARD (Compact)
**Size:** ~350px wide × 450px tall
**Layout:** Vertical card, compact information

### Visual Hierarchy (Top to Bottom):

#### Header Section
- **Profile Photo** (circular, 80px diameter)
  - Positioned top-left or centered
  - Verification badge overlay (blue checkmark) if verified
  - Online status indicator (green dot)

#### Name & Title
- **Name:** "Sarah Chen" (Bold, 18-20px)
- **Professional Title:** "Senior Software Engineer" (Regular, 14px, gray)
- **Company:** "@ Tech Startup" (Regular, 12px, lighter gray)

#### Quick Stats Row (Horizontal badges/pills)
- **Experience:** "8 years" (small badge)
- **Location:** "San Francisco, CA" (with location icon)
- **Rating:** "4.9 ★" (star icon, yellow)

#### Expertise Tags (3-4 max)
- Small colored pills/badges
- Examples: "React" "Leadership" "Career Growth"
- Use brand colors (#98DFEA, #8F3985, #07BEB8)

#### Bio Snippet
- 2-3 lines max
- Truncated with "..." if longer
- Font: 13px, line-height: 1.5
- Example: "Passionate about helping junior developers navigate their tech careers. Previously at Google and Meta..."

#### Footer Actions
- **Primary Button:** "Connect" or "View Profile"
- **Secondary Action:** Heart/Save icon
- **Match Percentage:** "85% Match" (if applicable)

---

## 2. SWIPE CARD VIEW (Detailed)
**Size:** ~400px wide × 600px tall (mobile-optimized)
**Layout:** Full-screen card with more details

### Visual Hierarchy (Top to Bottom):

#### Hero Section
- **Large Profile Photo** (full width, 250-300px height)
  - Gradient overlay at bottom for text readability
  - Verification badge (top-right corner)
  - Online status indicator

#### Overlay Info (on photo)
- **Name & Age:** "Sarah Chen, 32" (Bold, white, 24px)
- **Title:** "Senior Software Engineer" (White, 16px)
- **Location:** "📍 San Francisco, CA" (White, 14px)

#### Content Section (Scrollable)

**Quick Stats Bar**
- 4 columns with icons:
  - **Experience:** "8 Years" (briefcase icon)
  - **Mentees:** "15 Helped" (users icon)
  - **Rating:** "4.9 ★" (star icon)
  - **Response:** "< 24hrs" (clock icon)

**About Section**
- Title: "About" (Bold, 16px)
- Full bio (4-6 lines)
- Example: "I'm a senior software engineer passionate about helping the next generation of developers. With 8 years in the industry at companies like Google and Meta, I've learned valuable lessons I love to share. I specialize in React, system design, and career navigation."

**Expertise & Skills** (Larger tags)
- 6-8 skills in colored badges
- Categories: "Technical Skills" and "Soft Skills"
- Examples:
  - Technical: "React" "Node.js" "System Design" "AWS"
  - Soft: "Leadership" "Communication" "Career Planning"

**Industries**
- Pills with icons
- Examples: "Tech" "Startups" "SaaS"

**Languages**
- Flag icons with language names
- Example: "🇺🇸 English (Native)" "🇨🇳 Mandarin (Fluent)"

**Availability**
- Status badge: "Available Now" / "Limited Availability" / "Not Accepting"
- Preferred times: "Weekday Evenings, Weekends"
- Communication: "Text-based messaging"

**Interests** (Optional)
- Small tags
- Examples: "Reading" "Hiking" "Photography"

#### Action Buttons (Bottom fixed)
- **Left Button (X):** "Pass" (Red/neutral)
- **Right Button (❤️):** "Connect" (Primary accent color)
- **Center Button (i):** "More Info" (Optional)

---

## 3. MENTEE CARD (Privacy-Protected View for Mentors)
**Size:** Same as directory view
**Privacy:** Limited information initially

### Shown Information:

#### Header
- **Photo:** Hidden or blurred initially
- **First Name Only:** "Emily"
- **General Info:** "Product Manager, 26"

#### Location
- **City/State Only:** "New York, NY"
- NO specific company or full personal details

#### Looking For Section
- **Goals:** "Seeking guidance in..."
  - "Product Management"
  - "Career Transition"
  - "Leadership Skills"

#### Interest Areas (Tags)
- "Tech" "SaaS" "B2B Products"

#### About (Limited)
- 2-3 lines describing what they're seeking
- Example: "Transitioning from marketing to product management. Looking for a mentor to help navigate this career shift and build technical product skills."

#### Skills to Learn
- Tags showing what they want to develop
- Examples: "Product Strategy" "User Research" "Roadmapping"

#### Footer
- **Action:** "Offer Mentorship" button
- **Note:** Full profile visible after mutual match

---

## 4. PROFILE PREVIEW MODAL/EXPANDED VIEW
**Size:** Modal overlay or full page
**Layout:** Comprehensive profile

### Sections (Vertical scroll):

#### 1. Hero Header
- Large cover photo (optional) OR colored banner (#98DFEA)
- Large profile photo (120px, centered or left)
- Verification badge
- Online status

#### 2. Main Info
- **Name:** "Sarah Chen" (Bold, 28px)
- **Title & Company:** "Senior Software Engineer @ Tech Startup"
- **Location:** "San Francisco, CA"
- **Member Since:** "January 2023"

#### 3. Stats Dashboard
- Grid of 4-6 statistics:
  - Total Mentees: "15"
  - Success Rate: "95%"
  - Response Time: "< 24 hours"
  - Sessions: "50+"
  - Rating: "4.9/5.0 (23 reviews)"
  - Industries: "3"

#### 4. About Me
- Full biography (8-12 lines)
- Rich text formatting allowed
- Professional background
- Mentorship philosophy

#### 5. Expertise
- **Technical Skills** (badges)
- **Soft Skills** (badges)
- **Industries** (badges)

#### 6. What I Can Help With
- Bulleted list:
  - ✓ Career transitions in tech
  - ✓ Technical interview preparation
  - ✓ React and frontend development
  - ✓ Work-life balance strategies
  - ✓ Salary negotiation

#### 7. Availability & Preferences
- **Current Status:** "Available for new mentees"
- **Preferred Times:** Calendar visual or text
- **Communication Style:** "Text-based messaging, weekly check-ins"
- **Max Mentees:** "3 active"

#### 8. Reviews/Testimonials
- Star rating average
- Individual reviews with:
  - Reviewer name (or Anonymous)
  - Rating
  - Date
  - Comment
  - Example: "Sarah helped me land my dream job! Her guidance on system design interviews was invaluable."

#### 9. Education & Certifications (Optional)
- University degrees
- Relevant certifications
- Professional training

#### 10. Languages
- Languages spoken with proficiency levels

#### 11. Interests & Hobbies (Optional)
- Tags or pills
- Helps build personal connection

#### 12. Connection Actions
- **Primary CTA:** "Send Connection Request"
- **Secondary:** "Save Profile" (bookmark)
- **Other:** "Share Profile" "Report"

---

## DESIGN NOTES FOR IMAGE GENERATION

### Color Palette (Use these exact colors):
- **Primary Dark:** #25283D (Text, headers)
- **Primary Accent:** #98DFEA (CTAs, links)
- **Secondary Accent:** #8F3985 (Secondary CTAs, badges)
- **Soft Accent:** #EFD9CE (Soft backgrounds)
- **Vibrant Accent:** #07BEB8 (Success, verification)
- **White:** #FFFFFF (Cards, backgrounds)
- **Neutral Gray:** #6B7280 (Secondary text)

### Typography:
- **Font Family:** Montserrat
- **Weights:** 400 (regular), 600 (semibold), 700 (bold), 900 (black)
- **Hierarchy:**
  - Headers: Bold/Black
  - Body: Regular
  - Labels: Semibold

### Spacing & Layout:
- **Card Padding:** 20-24px
- **Border Radius:** 12-16px for cards, 8px for buttons
- **Shadows:** Soft, subtle (not heavy)
- **Gap Between Elements:** 12-16px

### Icons:
- Use Lucide Icons style (simple, outlined)
- Icon size: 18-20px for inline, 24px for prominent

### Badges/Pills:
- **Small:** 6px padding top/bottom, 12px left/right
- **Border Radius:** Full (rounded-full)
- **Font Size:** 11-13px
- **Colors:** Use accent colors with 10% opacity backgrounds

### Buttons:
- **Primary:** #98DFEA background, #25283D text
- **Secondary:** #8F3985 background, white text
- **Border Radius:** 8-10px
- **Padding:** 12px 24px
- **Font Weight:** 600

### Status Indicators:
- **Online:** Green dot (8px), #10B981
- **Verified:** Blue checkmark badge, #07BEB8
- **Rating Stars:** Yellow/gold #F59E0B

---

## EXAMPLE PROFILE DATA TO USE

### Mentor Example 1:
- **Name:** Sarah Chen
- **Title:** Senior Software Engineer
- **Company:** Tech Startup
- **Location:** San Francisco, CA
- **Experience:** 8 years
- **Mentees Helped:** 15
- **Rating:** 4.9/5.0
- **Skills:** React, Node.js, System Design, AWS, Leadership, Career Planning
- **Industries:** Technology, Startups, SaaS
- **Bio:** "Passionate about helping junior developers navigate their tech careers. Previously at Google and Meta, I've learned valuable lessons I love to share."

### Mentor Example 2:
- **Name:** Michael Rodriguez
- **Title:** Marketing Director
- **Company:** Fortune 500
- **Location:** New York, NY
- **Experience:** 12 years
- **Mentees Helped:** 28
- **Rating:** 5.0/5.0
- **Skills:** Digital Marketing, Brand Strategy, Social Media, Analytics, Team Management
- **Industries:** Marketing, Advertising, E-commerce
- **Bio:** "Helping marketing professionals grow their careers and master data-driven strategies."

### Mentee Example:
- **Name:** Emily (Last name hidden)
- **Role:** Product Manager
- **Age:** 26
- **Location:** Austin, TX
- **Looking For:** Career transition guidance, Product strategy, Leadership skills
- **Interests:** Tech, SaaS, B2B Products
- **Bio:** "Transitioning from marketing to product management. Looking for mentorship to build technical product skills."

---

## PROMPT SUGGESTIONS FOR IMAGE GENERATORS

**For Directory Card:**
> "Design a modern profile card for a mentorship platform. 350px wide. Shows circular profile photo at top, name 'Sarah Chen', title 'Senior Software Engineer @ Tech Startup', rating 4.9 stars, 3 skill badges (React, Leadership, Career Growth) in colors #98DFEA and #8F3985, short bio snippet, and 'Connect' button in #98DFEA. Clean, minimalist design with Montserrat font. White card with subtle shadow."

**For Swipe Card:**
> "Design a mobile swipe card for mentorship matching. 400px wide × 600px tall. Large profile photo at top (300px height) with gradient overlay, name and title overlaid on photo. Below: 4 stat icons showing experience/rating/mentees, full bio section, skill badges in colors #98DFEA #8F3985 #07BEB8, availability status. Bottom has two buttons: red 'Pass' and cyan 'Connect'. Modern, clean design, Montserrat font."

**For Full Profile View:**
> "Design a comprehensive mentor profile page. Large header with profile photo, name 'Sarah Chen', title. Stats dashboard showing mentees helped, rating, response time. Sections for About, Expertise (skill badges), Reviews (5-star ratings), Availability calendar. Use colors: #25283D text, #98DFEA accents, #8F3985 secondary buttons. Clean, professional mentorship platform aesthetic, Montserrat typography."
