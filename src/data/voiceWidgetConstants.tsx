import React from "react";
import {
  Stethoscope,
  Scale,
  Calculator,
  Briefcase,
  Compass,
  Building2,
  GraduationCap,
  Truck,
  Sprout,
  FlaskConical,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope size={16} />,
  Scale: <Scale size={16} />,
  Calculator: <Calculator size={16} />,
  Briefcase: <Briefcase size={16} />,
  Compass: <Compass size={16} />,
  Building2: <Building2 size={16} />,
  GraduationCap: <GraduationCap size={16} />,
  Truck: <Truck size={16} />,
  Sprout: <Sprout size={16} />,
  FlaskConical: <FlaskConical size={16} />,
};

export const VOICE_PERSONAS = [
  { id: "ritu", label: "Ritu", gender: "Female", desc: "Warm & Natural" },
  { id: "priya", label: "Priya", gender: "Female", desc: "Corporate Receptionist" },
  { id: "shubh", label: "Shubh", gender: "Male", desc: "Calm & Articulate" },
  { id: "aditya", label: "Aditya", gender: "Male", desc: "Business Executive" },
];

export const LANGUAGE_OPTIONS = [
  { id: "auto", native: "Auto", english: "Detect automatically" },
  { id: "hi-IN", native: "हिन्दी", english: "Hindi" },
  { id: "en-IN", native: "English", english: "English" },
  { id: "pa-IN", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { id: "ta-IN", native: "தமிழ்", english: "Tamil" },
  { id: "te-IN", native: "తెలుగు", english: "Telugu" },
  { id: "bn-IN", native: "বাংলা", english: "Bengali" },
  { id: "ml-IN", native: "മലയാളം", english: "Malayalam" },
  { id: "kn-IN", native: "ಕನ್ನಡ", english: "Kannada" },
  { id: "gu-IN", native: "ગુજરાતી", english: "Gujarati" },
  { id: "or-IN", native: "ଓଡ଼ିଆ", english: "Odia" },
];
