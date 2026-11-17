export type SimField = { key: string; label: string };

export type SimStep = {
  userText: string;
  aiText: string;
  fieldUpdates: Record<string, string>;
  status: string;
};

export type SimConfig = {
  slug: string;
  group: "professionals" | "enterprises";
  name: string;
  title: string;
  tagline: string;
  greeting: string;
  fields: SimField[];
  steps: SimStep[];
  completionLabel: string;
  reference: string;
};

export const PROFESSIONS: { slug: string; title: string; experience: string }[] = [
  { slug: "doctor", title: "Doctor", experience: "clinicos-doctor" },
  { slug: "dentist", title: "Dentist", experience: "clinicos-dentist" },
  { slug: "distributor", title: "Distributor", experience: "distributoros" },
  { slug: "salon", title: "Salon Owner", experience: "salonos" },
];

export const INDUSTRIES: { slug: string; title: string; experience: string }[] = [
  { slug: "agribusiness", title: "Agribusiness", experience: "agribusiness" },
  { slug: "fmcg", title: "FMCG", experience: "fmcg" },
  { slug: "pharmaceuticals", title: "Pharmaceuticals", experience: "pharmaceuticals" },
];

export const SIMULATIONS: Record<string, SimConfig> = {
  "clinicos-doctor": {
    slug: "clinicos-doctor",
    group: "professionals",
    name: "ClinicOS",
    title: "Doctor",
    tagline: "Handle patient enquiries and book OPD appointments.",
    greeting: "Hello, this is the clinic receptionist. How can I help?",
    fields: [
      { key: "reason", label: "Reason for Visit" },
      { key: "date", label: "Appointment Date" },
      { key: "time", label: "Appointment Time" },
      { key: "reference", label: "Booking Reference" },
    ],
    steps: [
      {
        userText: "I'd like to see the doctor for a fever",
        aiText: "I have a sample OPD slot tomorrow at 11:00 am with Dr. Mehta. Would that work?",
        fieldUpdates: { reason: "Fever, general consultation" },
        status: "Slot offered",
      },
      {
        userText: "Yes, book 11:00 am",
        aiText: "Your sample OPD appointment is confirmed. Here's your reference: CL-104.",
        fieldUpdates: { date: "Tomorrow", time: "11:00 am", reference: "CL-104" },
        status: "Appointment confirmed",
      },
    ],
    completionLabel: "Appointment booked",
    reference: "CL-104",
  },
  "clinicos-dentist": {
    slug: "clinicos-dentist",
    group: "professionals",
    name: "ClinicOS",
    title: "Dentist",
    tagline: "Handle treatment enquiries and dental appointments.",
    greeting: "Hello, this is the dental clinic receptionist. How can I help?",
    fields: [
      { key: "treatment", label: "Treatment" },
      { key: "date", label: "Appointment Date" },
      { key: "time", label: "Appointment Time" },
      { key: "reference", label: "Booking Reference" },
    ],
    steps: [
      {
        userText: "What does a root canal cost?",
        aiText: "A sample root canal consultation is ₹1,500, and I have a slot tomorrow at 4:00 pm. Want me to hold it?",
        fieldUpdates: { treatment: "Root canal consultation" },
        status: "Treatment quoted",
      },
      {
        userText: "Yes, hold 4:00 pm",
        aiText: "Your sample dental appointment is confirmed. Here's your reference: CL-219.",
        fieldUpdates: { date: "Tomorrow", time: "4:00 pm", reference: "CL-219" },
        status: "Appointment confirmed",
      },
    ],
    completionLabel: "Appointment booked",
    reference: "CL-219",
  },
  distributoros: {
    slug: "distributoros",
    group: "professionals",
    name: "DistributorOS",
    title: "Distributor",
    tagline: "Check stock, confirm prices, and capture orders.",
    greeting: "Welcome to the distributor counter. What are you looking for?",
    fields: [
      { key: "product", label: "Product" },
      { key: "stock", label: "Available Stock" },
      { key: "quantity", label: "Quantity Requested" },
      { key: "total", label: "Total Order Value" },
    ],
    steps: [
      {
        userText: "Do you have 10 sacks in stock?",
        aiText: "Yes, 24 sacks are available in this sample inventory at ₹840 per sack.",
        fieldUpdates: { product: "Sacks", stock: "24 sacks" },
        status: "Stock checked",
      },
      {
        userText: "Request 10 sacks",
        aiText: "I've recorded 10 sacks at ₹8,400 for the counter team to confirm.",
        fieldUpdates: { quantity: "10 sacks", total: "₹8,400" },
        status: "Order request captured",
      },
    ],
    completionLabel: "Order request captured",
    reference: "DS-552",
  },
  salonos: {
    slug: "salonos",
    group: "professionals",
    name: "SalonOS",
    title: "Salon Owner",
    tagline: "Answer service enquiries and fill appointment slots.",
    greeting: "Welcome to the salon. What would you like to book?",
    fields: [
      { key: "service", label: "Service" },
      { key: "date", label: "Appointment Date" },
      { key: "time", label: "Time Slot" },
      { key: "reference", label: "Booking Reference" },
    ],
    steps: [
      {
        userText: "Any haircut slots on Saturday?",
        aiText: "There's a sample slot at 11:30 am on Saturday. A haircut starts at ₹900.",
        fieldUpdates: { service: "Haircut · ₹900" },
        status: "Slot offered",
      },
      {
        userText: "Confirm Saturday at 11:30",
        aiText: "Your sample booking is confirmed. Here's your reference: SL-208.",
        fieldUpdates: { date: "Saturday", time: "11:30 am", reference: "SL-208" },
        status: "Booking confirmed",
      },
    ],
    completionLabel: "Booking confirmed",
    reference: "SL-208",
  },
  agribusiness: {
    slug: "agribusiness",
    group: "enterprises",
    name: "Agribusiness",
    title: "Agribusiness",
    tagline: "Capture grower interest and route field follow-ups.",
    greeting: "You've reached the grower helpdesk. How can I help?",
    fields: [
      { key: "interest", label: "Crop Interest" },
      { key: "team", label: "Assigned Field Team" },
      { key: "status", label: "Follow-up Status" },
    ],
    steps: [
      {
        userText: "Where can I see a seed trial?",
        aiText: "I can ask the local field team to share a trial location. May they follow up with you?",
        fieldUpdates: { interest: "Seed trial enquiry" },
        status: "Follow-up offered",
      },
      {
        userText: "Yes, ask the field team to call",
        aiText: "I've recorded permission to follow up and assigned this sample enquiry to the field team.",
        fieldUpdates: { team: "Local field team", status: "Assigned" },
        status: "Follow-up assigned",
      },
    ],
    completionLabel: "Follow-up assigned",
    reference: "AG-317",
  },
  fmcg: {
    slug: "fmcg",
    group: "enterprises",
    name: "FMCG",
    title: "FMCG",
    tagline: "Capture retailer interest in promotions and restocks.",
    greeting: "Welcome to the retailer helpdesk. What can I help with?",
    fields: [
      { key: "offer", label: "Offer Details" },
      { key: "distributor", label: "Distributor" },
      { key: "status", label: "Follow-up Status" },
    ],
    steps: [
      {
        userText: "Is there a case-buying offer?",
        aiText: "The sample promotion includes one bonus case for every ten. I can log a request with your distributor.",
        fieldUpdates: { offer: "1 bonus case / 10 cases" },
        status: "Offer shared",
      },
      {
        userText: "Ask my distributor to follow up",
        aiText: "I've logged the promotion enquiry and assigned it to the distributor's sales team.",
        fieldUpdates: { distributor: "Regional sales team", status: "Assigned" },
        status: "Follow-up assigned",
      },
    ],
    completionLabel: "Follow-up assigned",
    reference: "FM-480",
  },
  pharmaceuticals: {
    slug: "pharmaceuticals",
    group: "enterprises",
    name: "Pharmaceuticals",
    title: "Pharmaceuticals",
    tagline: "Log pharmacy stock enquiries and route them to trade support.",
    greeting: "You've reached trade support. How can I help your pharmacy?",
    fields: [
      { key: "sku", label: "SKU Enquiry" },
      { key: "desk", label: "Regional Trade Desk" },
      { key: "ticket", label: "Ticket Reference" },
    ],
    steps: [
      {
        userText: "Can I check an SKU's availability?",
        aiText: "I can create a stock enquiry for your regional trade desk to verify availability.",
        fieldUpdates: { sku: "Availability check" },
        status: "Enquiry logged",
      },
      {
        userText: "Create a stock enquiry",
        aiText: "I've created a sample ticket for the regional trade desk. Reference: PH-302.",
        fieldUpdates: { desk: "Regional trade desk", ticket: "PH-302" },
        status: "Ticket created",
      },
    ],
    completionLabel: "Ticket created",
    reference: "PH-302",
  },
};
