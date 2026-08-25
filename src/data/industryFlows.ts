export interface IndustryMessage {
  speaker: "ai" | "user";
  text: string;
  language?: string;
  langLabel?: string;
  timestamp?: string;
}

export interface IndustryFlow {
  id: string;
  name: string;
  iconName: string;
  brandName: string;
  tagline: string;
  badgeColor: string;
  requiresDob: boolean;
  systemActionType: string;
  systemActionTitle: string;
  systemActionPayloadTemplate: Record<string, string>;
  initialGreetingEnglish: string;
  presetTurns: IndustryMessage[];
  presetExtracted: {
    name: string;
    mobile: string;
    dob?: string;
    intent: string;
    summary: string;
    actionBadge: string;
  };
  systemPrompt: string;
}

export const INDUSTRY_FLOWS: Record<string, IndustryFlow> = {
  "doctors-clinics": {
    id: "doctors-clinics",
    name: "Doctors & Clinics",
    iconName: "Stethoscope",
    brandName: "City Care Healthcare Clinic",
    tagline: "OPD Appointments, Doctor Timings & Patient Intake",
    badgeColor: "#10B981",
    requiresDob: true,
    systemActionType: "EMR_SLOT_BOOKED",
    systemActionTitle: "EMR / Clinic Token Generated",
    initialGreetingEnglish: "Hello and welcome to City Care Clinic. I am Namuste, your digital receptionist. May I have your name and mobile number to book your appointment?",
    presetExtracted: {
      name: "Rahul Verma",
      mobile: "+91 98765 43210",
      dob: "15 Aug 1992 (33 Yrs)",
      intent: "OPD Cardiology Consultation",
      summary: "Dr. Sharma • Tomorrow 10:30 AM • Token #14",
      actionBadge: "EMR Synced & WhatsApp Confirmation Sent",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to City Care Clinic. I am Namuste, your digital receptionist. May I have your name and mobile number to book your appointment?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Mera naam Rahul Verma hai, phone 9876543210. Kal subah Dr. Sharma (Cardiologist) ka slot mil sakta hai kya?",
        langLabel: "Hinglish",
      },
      {
        speaker: "ai",
        text: "Ji Rahul ji. Patient record ke liye please apna date of birth ya age bata dijiye?",
        langLabel: "Hinglish",
      },
      {
        speaker: "user",
        text: "15 August 1992, age 33 years.",
        langLabel: "Hinglish",
      },
      {
        speaker: "ai",
        text: "Dr. Sharma kal subah 10:30 AM aur 11:45 AM par available hain. Kaunsa time aapke liye best rahega?",
        langLabel: "Hindi",
      },
      {
        speaker: "user",
        text: "10:30 AM confirm kar dijiye.",
        langLabel: "Hinglish",
      },
      {
        speaker: "ai",
        text: "Aapka appointment kal subah 10:30 AM par Dr. Sharma ke saath confirm ho gaya hai (Token #14). Details WhatsApp par bhej di gayi hain.",
        langLabel: "Hinglish",
      },
    ],
    systemPrompt: `You are Namuste, the AI Digital Receptionist for 'City Care Healthcare Clinic'.
You handle OPD appointments, doctor timings (Mon-Sat 9 AM - 8 PM), consultation fees (₹600), and patient triage intake.`,
    systemActionPayloadTemplate: {
      emr_id: "EMR-88319",
      doctor: "Dr. R. K. Sharma (MD, Cardiology)",
      token: "14",
      slot: "Tomorrow 10:30 AM",
      status: "CONFIRMED",
    },
  },

  lawyers: {
    id: "lawyers",
    name: "Lawyers & Legal",
    iconName: "Scale",
    brandName: "Apex Legal Associates",
    tagline: "Case Intake, Practice Areas & Retainer Consultations",
    badgeColor: "#3B82F6",
    requiresDob: false,
    systemActionType: "LEGAL_CASE_INTAKE",
    systemActionTitle: "Legal Case File Opened",
    initialGreetingEnglish: "Hello and welcome to Apex Legal Associates. I am your legal intake assistant. How may we assist with your legal matter today? Please share your name and contact number.",
    presetExtracted: {
      name: "Priya Sen",
      mobile: "+91 98112 23344",
      intent: "Property Law Consultation",
      summary: "Senior Advocate Review • Thursday 4:00 PM (Video Call)",
      actionBadge: "Matter #L-409 Logged • Calendar Invite Sent",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Apex Legal Associates. I am your legal intake assistant. How may we assist with your legal matter today? Please share your name and contact number.",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Hi, I need legal consultation. My name is Priya Sen, 9811223344.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Thank you, Ms. Priya. Could you please share the practice area — Property, Corporate, or Family Law?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Property boundary dispute in Bangalore. Can I speak with a senior advocate this Thursday?",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Our Senior Property Counsel has an advisory slot this Thursday at 4:00 PM (Video Consultation). Shall I reserve this for you?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Yes, please reserve the video consultation slot.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Reserved! We have opened case file #L-409. The meeting link and checklist have been sent to your WhatsApp.",
        langLabel: "English",
      },
    ],
    systemPrompt: `You are Namuste, the AI Legal Intake Assistant for 'Apex Legal Associates'.
You handle case intake (Property, Corporate, Civil, Family), appointment bookings, and retainer consultations.`,
    systemActionPayloadTemplate: {
      matter_id: "MAT-409",
      practice_area: "Property Law",
      attorney: "Senior Property Counsel",
      slot: "Thursday 4:00 PM",
      format: "Video Consultation",
    },
  },

  "chartered-accountants": {
    id: "chartered-accountants",
    name: "Chartered Accountants",
    iconName: "Calculator",
    brandName: "FinCorp Chartered Accountants",
    tagline: "GST Filing, ITR & Tax Audit Consultations",
    badgeColor: "#F59E0B",
    requiresDob: false,
    systemActionType: "TAX_INTAKE_ASSIGNED",
    systemActionTitle: "Tax Audit Assignment Created",
    initialGreetingEnglish: "Hello and welcome to FinCorp Chartered Accountants. I can assist you with GST filing, ITR, and corporate audits. May I know your name and contact number?",
    presetExtracted: {
      name: "Amit Patel",
      mobile: "+91 99001 12233",
      intent: "Pvt Ltd GST & Tax Audit",
      summary: "Senior Tax Partner Review • Tomorrow 2:30 PM",
      actionBadge: "Document Checklist Dispatched to WhatsApp",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to FinCorp Chartered Accountants. I can assist you with GST filing, ITR, and corporate audits. May I know your name and contact number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Amit Patel, mobile 9900112233. Private Limited company ke quarterly GST return aur audit filing ke baare mein consult karna tha.",
        langLabel: "Hinglish",
      },
      {
        speaker: "ai",
        text: "Understood Amit ji. Our Senior Tax Partner is scheduling 20-min compliance review calls for tomorrow at 2:30 PM. Would that work?",
        langLabel: "Hinglish",
      },
      {
        speaker: "user",
        text: "Haan, 2:30 PM bilkul theek hai.",
        langLabel: "Hindi",
      },
      {
        speaker: "ai",
        text: "Your tax consultation slot is locked for tomorrow 2:30 PM. We have sent the GST document checklist and meeting link to your WhatsApp.",
        langLabel: "Hinglish",
      },
    ],
    systemPrompt: `You are Namuste, the AI Receptionist for 'FinCorp Chartered Accountants'.
You handle GST returns, ITR filings, company audits, and consultation scheduling with senior tax partners.`,
    systemActionPayloadTemplate: {
      client_id: "CA-9921",
      tax_type: "Pvt Ltd Quarterly GST & Audit",
      partner: "Senior Tax Advisory Desk",
      slot: "Tomorrow 2:30 PM",
    },
  },

  consultants: {
    id: "consultants",
    name: "Consultants",
    iconName: "Briefcase",
    brandName: "Elevate Advisory Partners",
    tagline: "Management Consulting, GTM Strategy & Advisory",
    badgeColor: "#8B5CF6",
    requiresDob: false,
    systemActionType: "DISCOVERY_CALL_LOCKED",
    systemActionTitle: "Discovery Strategy Session Scheduled",
    initialGreetingEnglish: "Hello and welcome to Elevate Advisory Partners. I am Namuste. How can we help scale your business today? May I have your name and contact number?",
    presetExtracted: {
      name: "Karan Malhotra",
      mobile: "+91 97654 32100",
      intent: "B2B SaaS GTM Strategy",
      summary: "Principal Consultant • Friday 11:00 AM (Zoom)",
      actionBadge: "Calendar Invite & Briefing Questionnaire Sent",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Elevate Advisory Partners. I am Namuste. How can we help scale your business today? May I have your name and contact number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Karan Malhotra, Founder at TechNova. Contact is 9765432100. Looking for GTM strategy for B2B SaaS expansion in India.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Great to connect Karan. Our Principal Consultant has a 30-minute discovery slot available this Friday at 11:00 AM. Shall I confirm the calendar invite?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Yes, Friday 11 AM works perfectly.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Confirmed! Calendar invite dispatched to your WhatsApp and email. Looking forward to the strategy session!",
        langLabel: "English",
      },
    ],
    systemPrompt: `You are Namuste, AI Strategy Assistant for 'Elevate Advisory Partners'.
You handle corporate growth advisory, GTM scopes, operations consulting, and discovery call bookings.`,
    systemActionPayloadTemplate: {
      deal_id: "ADV-7710",
      company: "TechNova",
      scope: "B2B SaaS GTM",
      slot: "Friday 11:00 AM",
    },
  },

  architects: {
    id: "architects",
    name: "Architects",
    iconName: "Compass",
    brandName: "Studio Forma Architecture",
    tagline: "Residential, Interior Design & Site Inspections",
    badgeColor: "#EC4899",
    requiresDob: false,
    systemActionType: "SITE_VISIT_BOOKED",
    systemActionTitle: "Architect Site Inspection Booked",
    initialGreetingEnglish: "Hello and welcome to Studio Forma Architecture & Design. I am Namuste. Are you looking to design a new space or renovate? May I have your name and contact number?",
    presetExtracted: {
      name: "Neha Kapoor",
      mobile: "+91 98200 11223",
      intent: "3BHK Luxury Interior Renovation",
      summary: "Site Inspection • Saturday 3:00 PM • Indiranagar",
      actionBadge: "Designer Assigned • WhatsApp Portfolio Dispatched",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Studio Forma Architecture & Design. I am Namuste. Are you looking to design a new space or renovate? May I have your name and contact number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Renovation. My name is Neha Kapoor, phone 9820011223. We have a 3BHK in Indiranagar.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Wonderful Neha ji. Our lead interior architect can visit your Indiranagar property this Saturday at 3:00 PM for a site inspection and layout briefing. Shall I schedule that?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Saturday 3 PM is perfect.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Site visit confirmed for Saturday 3:00 PM at Indiranagar! Our digital lookbook and architect details have been sent to your WhatsApp.",
        langLabel: "English",
      },
    ],
    systemPrompt: `You are Namuste, AI Project Intake Assistant for 'Studio Forma Architecture'.
You handle architectural design, interior renovations, budget estimates, and scheduling on-site inspections.`,
    systemActionPayloadTemplate: {
      project_id: "SF-302",
      property_type: "3BHK Apartment",
      location: "Indiranagar",
      visit_slot: "Saturday 3:00 PM",
    },
  },

  "real-estate": {
    id: "real-estate",
    name: "Real Estate",
    iconName: "Building2",
    brandName: "Skyline Heights Luxury Residences",
    tagline: "Site Visits, 2/3 BHK Inventory & Pricing Sheets",
    badgeColor: "#06B6D4",
    requiresDob: false,
    systemActionType: "VIP_PASS_GENERATED",
    systemActionTitle: "VIP Model Flat Tour Pass Issued",
    initialGreetingEnglish: "Hello and welcome to Skyline Heights. I can assist you with apartment configurations, pricing sheets, and site tours. May I know your name and mobile number?",
    presetExtracted: {
      name: "Sunita Roy",
      mobile: "+91 98450 12345",
      intent: "3 BHK Premium Flat Site Visit",
      summary: "VIP Tour • Sunday 11:30 AM • Skyline Towers",
      actionBadge: "Brochure, Price Sheet & Map Dispatched",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Skyline Heights. I can assist you with apartment configurations, pricing sheets, and site tours. May I know your name and mobile number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Sunita Roy, 9845012345. Looking for a 3 BHK flat around 1.5 Cr budget. Can I visit this Sunday?",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Yes Sunita ji! We have a private model apartment tour with our senior sales manager this Sunday at 11:30 AM. Shall I generate a VIP site visit pass for you?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Haan, Sunday 11:30 AM book kar dijiye.",
        langLabel: "Hindi",
      },
      {
        speaker: "ai",
        text: "VIP Site Pass generated for Sunday 11:30 AM. Location coordinates and floor plan PDF have been sent to your WhatsApp.",
        langLabel: "Hinglish",
      },
    ],
    systemPrompt: `You are Namuste, the AI Sales Receptionist for 'Skyline Heights Luxury Residences'.
You handle luxury 2BHK/3BHK residential inquiries, brochure requests, pricing, and VIP site visit pass bookings.`,
    systemActionPayloadTemplate: {
      lead_id: "SKY-990",
      configuration: "3 BHK Luxury",
      budget: "₹1.5 Cr",
      site_visit: "Sunday 11:30 AM",
    },
  },

  education: {
    id: "education",
    name: "Education",
    iconName: "GraduationCap",
    brandName: "Apex Academy Admissions",
    tagline: "Course Enquiries, Batch Timings & Demo Classes",
    badgeColor: "#6366F1",
    requiresDob: true,
    systemActionType: "DEMO_CLASS_RESERVED",
    systemActionTitle: "Live Demo Class Seat Allocated",
    initialGreetingEnglish: "Hello and welcome to Apex Academy Admissions. I can help with course details, batch schedules, and free demo classes. May I have the student name and parent mobile number?",
    presetExtracted: {
      name: "Rohan Gupta (Parent: Rajesh)",
      mobile: "+91 97110 02233",
      dob: "12 Jun 2008 (Grade 11)",
      intent: "JEE 2-Year Target Course",
      summary: "Free Masterclass Demo • Saturday 10:00 AM",
      actionBadge: "Student Portal ID & Demo Link Dispatched",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Apex Academy Admissions. I can help with course details, batch schedules, and free demo classes. May I have the student name and parent mobile number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Student name is Rohan Gupta, parent mobile 9711002233. Target is JEE 2026.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Thank you. What is Rohan's date of birth and current school grade for batch allocation?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "DOB 12th June 2008, currently in Grade 11.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Perfect. We have a Free Live Demo Masterclass with our Senior Physics Faculty this Saturday at 10:00 AM. Shall I register Rohan?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Yes, please register him for the Saturday masterclass.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Rohan is registered for Saturday 10:00 AM! Demo class Zoom link and syllabus handbook sent to your WhatsApp.",
        langLabel: "English",
      },
    ],
    systemPrompt: `You are Namuste, AI Admissions Counselor for 'Apex Academy'.
You handle student enrollment (JEE, NEET, Foundation), batch schedules, syllabus details, and free demo class bookings.`,
    systemActionPayloadTemplate: {
      student_id: "APX-8102",
      target_course: "JEE 2026 2-Year",
      grade: "Grade 11",
      demo_slot: "Saturday 10:00 AM",
    },
  },

  distributors: {
    id: "distributors",
    name: "Distributors",
    iconName: "Truck",
    brandName: "National Logistics & Supply",
    tagline: "Wholesale Inventory, Order Tracking & Bulk Dispatch",
    badgeColor: "#14B8A6",
    requiresDob: false,
    systemActionType: "ERP_DISPATCH_LOCKED",
    systemActionTitle: "Warehouse Dispatch Order Reserved",
    initialGreetingEnglish: "Hello and welcome to National Logistics & Supply. I can assist with wholesale stock checks, order tracking, and dispatch timelines. May I know your store name and mobile number?",
    presetExtracted: {
      name: "Manoj Kumar (Sri Krishna Traders)",
      mobile: "+91 98887 76655",
      intent: "Wholesale Stock Reserve (100 Units)",
      summary: "SKU #8420 • In-Stock • Dispatch Tomorrow Morning",
      actionBadge: "Pro-Forma Invoice & Tracking Link Generated",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to National Logistics & Supply. I can assist with wholesale stock checks, order tracking, and dispatch timelines. May I know your store name and mobile number?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Sri Krishna Traders, Manoj Kumar, phone 9888776655. Electrical fittings SKU #8420 — 100 boxes in stock hai kya?",
        langLabel: "Hinglish",
      },
      {
        speaker: "ai",
        text: "Checking warehouse inventory... Yes Manoj ji, SKU #8420 has 450 units available. If locked now, dispatch will reach by tomorrow 11 AM. Shall I reserve 100 boxes?",
        langLabel: "Hinglish",
      },
      {
        speaker: "user",
        text: "Haan, 100 boxes lock karke invoice bhej do.",
        langLabel: "Hindi",
      },
      {
        speaker: "ai",
        text: "Order #DIST-782 reserved for 100 boxes! Pro-forma invoice and dispatch tracking link have been dispatched to your WhatsApp.",
        langLabel: "Hinglish",
      },
    ],
    systemPrompt: `You are Namuste, AI Distribution Desk for 'National Logistics & Supply'.
You handle wholesale inventory stock checks, SKU availability, bulk order tracking, and warehouse dispatch reservations.`,
    systemActionPayloadTemplate: {
      order_id: "DIST-782",
      store: "Sri Krishna Traders",
      sku: "SKU-8420",
      units: "100 Boxes",
      delivery: "Tomorrow 11:00 AM",
    },
  },

  agriculture: {
    id: "agriculture",
    name: "Agriculture & Rural",
    iconName: "Sprout",
    brandName: "Kisan Seva Krishi Kendra",
    tagline: "Vernacular Farmer Helplines, Seed Enquiries & Dealer Orders",
    badgeColor: "#84CC16",
    requiresDob: false,
    systemActionType: "AGRI_ADVISORY_SENT",
    systemActionTitle: "Farmer Advisory & Dealer Dispatch Logged",
    initialGreetingEnglish: "Namaste, welcome to Kisan Seva Helpline. I can assist you with crop advisory, fertilizer recommendations, and nearest dealer orders in Hindi, Bengali or English. May I know your name and district?",
    presetExtracted: {
      name: "Rameshwar Yadav",
      mobile: "+91 94310 98765",
      intent: "Paddy Crop Fertilizer Schedule (Hooghly)",
      summary: "Urea + Zinc Schedule • Nearest Dealer: Maa Tara Krishi Bhandar",
      actionBadge: "Agronomy Schedule & Dealer SMS Dispatched",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Namaste, welcome to Kisan Seva Helpline. I can assist you with crop advisory, fertilizer recommendations, and nearest dealer orders in Hindi, Bengali or English. May I know your name and district?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Mera naam Rameshwar Yadav hai, district Hooghly. Dhaan ki fasal ke liye kaun sa khad sahi rahega is mausam mein? Phone 9431098765.",
        langLabel: "Hindi",
      },
      {
        speaker: "ai",
        text: "Namaste Rameshwar ji. Hooghly ke mausam aur dhaan ki buwai ke anusaar, 20 din baad Zinc aur Urea ka santulit prayog karein. Kya aapke paas paas ke Krishi Kendra ka contact chahiye?",
        langLabel: "Hindi",
      },
      {
        speaker: "user",
        text: "Haan, paas ke dealer ka number aur availability bhej do.",
        langLabel: "Hindi",
      },
      {
        speaker: "ai",
        text: "Hooghly mandi ke Maa Tara Krishi Bhandar par stock available hai. Poora advisory schedule aur dealer contact aapke number par SMS aur WhatsApp kar diya gaya hai.",
        langLabel: "Hindi",
      },
    ],
    systemPrompt: `You are Namuste, Vernacular AI Agronomist & Helpline for 'Kisan Seva Krishi Kendra'.
You handle crop advisory, fertilizer schedules, mandi prices, seed dealer queries in Hindi, Bengali, and English.`,
    systemActionPayloadTemplate: {
      farmer_id: "KS-5501",
      crop: "Paddy (Kharif)",
      district: "Hooghly",
      dealer: "Maa Tara Krishi Bhandar",
      status: "ADVISORY_DISPATCHED",
    },
  },

  research: {
    id: "research",
    name: "Research & Surveys",
    iconName: "FlaskConical",
    brandName: "Global Pulse Insights",
    tagline: "Multilingual Participant Intake, Study Screening & Field Surveys",
    badgeColor: "#A855F7",
    requiresDob: true,
    systemActionType: "PARTICIPANT_SCREENED",
    systemActionTitle: "Clinical Cohort Participant Qualified",
    initialGreetingEnglish: "Hello and welcome to Global Pulse Insights. I am Namuste, your automated study screening assistant. May I have your name and preferred language to begin the survey?",
    presetExtracted: {
      name: "Dr. Ananya Ray",
      mobile: "+91 98300 55443",
      dob: "24 Nov 1988 (Cohort A)",
      intent: "Cardiology Longitudinal Cohort Study",
      summary: "Screening Passed (Score 9.4/10) • Cohort #C-104",
      actionBadge: "Consent Form & Protocol PDF Dispatched",
    },
    presetTurns: [
      {
        speaker: "ai",
        text: "Hello and welcome to Global Pulse Insights. I am Namuste, your automated study screening assistant. May I have your name and preferred language to begin the survey?",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "Dr. Ananya Ray, mobile 9830055443. Preferred language English. Enquiring about the Cardiology longitudinal cohort study.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Thank you Dr. Ananya. For cohort verification, please provide your date of birth and primary institutional affiliation.",
        langLabel: "English",
      },
      {
        speaker: "user",
        text: "24 November 1988, Apollo Gleneagles Hospital.",
        langLabel: "English",
      },
      {
        speaker: "ai",
        text: "Eligible for Cohort C-104! We have opened participant file #RES-902. The digital consent form and IRB protocol have been sent to your email and WhatsApp.",
        langLabel: "English",
      },
    ],
    systemPrompt: `You are Namuste, AI Research & Study Screening Coordinator for 'Global Pulse Insights'.
You handle participant intake, cohort eligibility verification, consent capture, and survey scheduling across languages.`,
    systemActionPayloadTemplate: {
      participant_id: "RES-902",
      study: "Cardiology Cohort C-104",
      institution: "Apollo Gleneagles",
      eligibility: "QUALIFIED",
    },
  },
};
