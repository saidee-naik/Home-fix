export type ProviderRequest = {
  id: number;
  name: string;
  company: string;
  category: string;
  experience: number;
  location: string;
  phone: string;
  email: string;
  appliedOn: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected";
  image: string;
};

export const providerRequests: ProviderRequest[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    company: "Rahul Plumbing Services",
    category: "Plumbing",
    experience: 5,
    location: "Ponda, Goa",
    phone: "9876543210",
    email: "rahul@example.com",
    appliedOn: "23 Sep 2026",
    time: "10:30 AM",
    status: "Pending",
    image: "/providers/rajesh.jpg",
  },

  {
    id: 2,
    name: "Amit Naik",
    company: "Goa Electrical Solutions",
    category: "Electrical",
    experience: 7,
    location: "Panaji, Goa",
    phone: "8765432109",
    email: "goaelectric@example.com",
    appliedOn: "22 Sep 2026",
    time: "04:15 PM",
    status: "Pending",
    image: "/providers/amit.jpg",
  },

  {
    id: 3,
    name: "CleanHome Services",
    company: "CleanHome Services",
    category: "Cleaning",
    experience: 3,
    location: "Margao, Goa",
    phone: "7654321098",
    email: "cleanhome@example.com",
    appliedOn: "21 Sep 2026",
    time: "11:20 AM",
    status: "Approved",
    image: "/providers/vikram.jpg",
  },

  {
    id: 4,
    name: "ColorPro Painters",
    company: "ColorPro Painters",
    category: "Painting",
    experience: 6,
    location: "Vasco, Goa",
    phone: "9876123450",
    email: "colorpro@example.com",
    appliedOn: "20 Sep 2026",
    time: "02:45 PM",
    status: "Rejected",
    image: "/providers/nilesh.jpg",
  },

  {
    id: 5,
    name: "CoolAir HVAC",
    company: "CoolAir HVAC",
    category: "HVAC",
    experience: 8,
    location: "Mapusa, Goa",
    phone: "9765432101",
    email: "coolair@example.com",
    appliedOn: "19 Sep 2026",
    time: "09:10 AM",
    status: "Pending",
    image: "/providers/rajesh.jpg",
  },
];