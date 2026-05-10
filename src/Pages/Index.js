export const API_BASE_URL = "http://127.0.0.1:8000";

export const SERVICES = [
  { icon: "🧺", title: "Wash & Fold",      desc: "Fresh, fluffy laundry folded and ready. Per-kg pricing, same-day available.", price: "₹60/kg",    color: "from-sky-400 to-blue-500"      },
  { icon: "👔", title: "Dry Cleaning",     desc: "Expert care for delicates, suits, and silks. Stain treatment included.",      price: "₹150/pc",   color: "from-violet-400 to-purple-600" },
  { icon: "🔥", title: "Steam Ironing",    desc: "Crisp, wrinkle-free clothes pressed to perfection.",                          price: "₹15/pc",    color: "from-orange-400 to-red-500"    },
  { icon: "👟", title: "Shoe Cleaning",    desc: "Deep clean and whitening for all types of footwear.",                         price: "₹200/pair", color: "from-emerald-400 to-teal-600"  },
  { icon: "🛏️", title: "Bedding & Linen",  desc: "Duvets, comforters, curtains — large items handled with care.",              price: "₹200/pc",   color: "from-pink-400 to-rose-500"     },
  { icon: "🧥", title: "Premium Care",     desc: "Luxury fabrics, bridal wear, leather jackets — white-glove treatment.",      price: "Custom",    color: "from-yellow-400 to-amber-500"  },
];

export const STEPS = [
  { num: "01", title: "Schedule Pickup", desc: "Book online or call us. Choose your time slot — we come to you." },
  { num: "02", title: "We Collect",      desc: "Our rider picks up your laundry bag from your doorstep." },
  { num: "03", title: "Expert Cleaning", desc: "Your clothes are sorted, cleaned, and quality-checked." },
  { num: "04", title: "Delivered Fresh", desc: "Clean, folded, and packaged clothes delivered back to you." },
];

export const PLANS = [
  { plan: "Basic",    price: "₹299", desc: "Up to 5kg laundry. Wash & fold. 48hr delivery.",                            highlight: false },
  { plan: "Standard", price: "₹549", desc: "Up to 10kg. Wash, fold & iron. 24hr delivery. Free pickup.",                highlight: true  },
  { plan: "Premium",  price: "₹999", desc: "Unlimited pieces. All services. Same-day express. Priority support.",       highlight: false },
];

export const NAV_LINKS = ["home", "services", "how-it-works", "pricing", "contact"];

export const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  service: "",
  quantity: "",
  date: "",
  notes: "",
};