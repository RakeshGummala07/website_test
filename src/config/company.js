// ---------------------------------------------------------------------------
// CENTRAL COMPANY CONFIGURATION
// Edit this file to update company details across the entire website.
// Nothing below should need to be searched for anywhere else in the codebase.
// ---------------------------------------------------------------------------

export const company = {
  name: "Jayanth Technologies",
  legalName: "Jayanth Technologies Pvt. Ltd.",
  tagline: "Build. Secure. Scale.",
  shortDescription:
    "Jayanth Technologies builds secure, scalable and modern digital solutions for businesses.",

  founded: "2024",

  location: {
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    // Exact office address has not been provided yet — replace when available.
    addressLine: "[Office Address]",
  },

  contact: {
    // Replace with the real inbox. Also update CONTACT_EMAIL in your .env file —
    // this value is for display only; the backend uses the environment variable.
    email: "[Company Email]",
    phone: "[Phone Number]",
  },

  social: {
    // Leave blank until real profile URLs exist — the footer hides any entry
    // whose value is empty.
    linkedin: "",
    github: "",
    twitter: "",
  },

  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
};

// Temporary office coordinates used for the Contact page map.
// Replace with the exact address once it is confirmed.
export const OFFICE_LOCATION = {
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  latitude: 17.385044,
  longitude: 78.486671,
};
