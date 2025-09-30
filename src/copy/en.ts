// src/copy/en.ts
export const copy = {
  hero: {
    headline: "Certified Service You Can Count On",
    subhead:
      "From oil changes to major repair, our GM-Certified technicians keep your Chevrolet performing the way it should. Done right, at a fair price.",
    ctaPrimary: "Schedule Service",
    ctaSecondary: "Call Service"
  },

  appointments: {
    title: "Schedule Your Service",
    lead:
      "Pick a date and time that works for you. If you’ve been here before, we’ll pull up your vehicle and service history to save you time.",
    bullets: [
      "Factory-recommended maintenance by mileage and model",
      "Same-day and next-day availability when possible",
      "Text and email reminders so you never miss a visit"
    ],
    cta: "Find a Time"
  },

  serviceStatus: {
    title: "Real-Time Service Status",
    lead:
      "Know where your vehicle stands—without calling in. We’ll keep you updated step by step.",
    steps: [
      "Checked in & tagged",
      "Multi-Point Inspection",
      "Parts Sourced",
      "In Progress",
      "Quality Check",
      "Ready for Pickup"
    ],
    legal:
      "Timelines are estimates and may change depending on parts and technician availability."
  },

  sightUnseenTrade: {
    title: "Sight-Unseen Trade-In Estimate",
    lead:
      "Get a ballpark trade offer in minutes. No appointment needed. A few photos and your VIN help us provide a fair, transparent estimate.",
    bullets: [
      "Backed by real market data and auction comps",
      "No obligation—use the offer today or keep it on file",
      "We honor what we can see and verify in person"
    ],
    cta: "Start My Estimate",
    disclaimer:
      "Final value subject to in-person inspection, test drive, and vehicle history review."
  },

  touchlessCheckin: {
    title: "Touchless Check-In & Pickup",
    lead:
      "Skip the line. Check in from your phone, drop your keys, and we’ll text you when it’s ready.",
    bullets: [
      "QR code check-in at the service drive",
      "Secure key drop with time-stamped receipt",
      "Pay online; drive straight out"
    ],
    cta: "Use Touchless Check-In"
  },

  loyalty: {
    title: "Service Rewards",
    lead:
      "Every visit adds up. Earn points toward future service or accessories at Quirk.",
    bullets: [
      "Points for paid service and parts",
      "Exclusive offers for members",
      "Simple redemption at checkout"
    ],
    cta: "Join Rewards",
    fineprint:
      "Terms apply. Points have no cash value. See advisor for details."
  }
} as const;
