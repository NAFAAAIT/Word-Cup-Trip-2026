// Mock Data for World Cup Trip 2026 App

export const cities = [
  "New York/New Jersey",
  "Los Angeles",
  "Miami",
  "Toronto",
  "Vancouver",
  "Mexico City",
  "Monterrey"
];

export const mockHotels = [
  {
    id: "h1",
    name: "Grand Hyatt Meadowlands",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 450,
    rating: 4.8,
    reviews: 342,
    city: "New York/New Jersey",
    distance: "0.5 mi to Stadium",
    description: "Luxury suite with direct stadium view. Perfect for match days.",
    amenities: ["Pool", "Gym", "Shuttle"],
    deal: "-25% OFF"
  },
  {
    id: "h2",
    name: "Stadium View Inn",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 210,
    rating: 4.5,
    reviews: 128,
    city: "New York/New Jersey",
    distance: "2.5 mi to Stadium",
    description: "Incredible atmosphere during match days, very lively.",
    amenities: ["Free WiFi", "Bar", "Parking"],
  },
  {
    id: "h3",
    name: "Fairfield by Marriott",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 175,
    rating: 4.2,
    reviews: 410,
    city: "Los Angeles",
    distance: "10 min Train Ride",
    description: "Convenient train access, quiet rooms.",
    amenities: ["Breakfast", "Gym", "WiFi"],
  },
  {
    id: "h4",
    name: "Toronto Downtown Suites",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 320,
    rating: 4.9,
    reviews: 215,
    city: "Toronto",
    distance: "1.2 mi to Stadium",
    description: "Experience the heart of Toronto near the fan zones.",
    amenities: ["Pool", "Spa", "Restaurant"],
    deal: "Early Bird"
  },
  {
    id: "h5",
    name: "Azteca Fan Lodge",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 150,
    rating: 4.6,
    reviews: 512,
    city: "Mexico City",
    distance: "0.8 mi to Stadium",
    description: "Authentic Mexican hospitality steps away from historic Azteca.",
    amenities: ["Bar", "Live Music", "Free Breakfast"],
  },
  {
    id: "h6",
    name: "Miami Beach Resort",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 550,
    rating: 4.7,
    reviews: 890,
    city: "Miami",
    distance: "5 mi to Stadium",
    description: "Beachfront property with express shuttle to Hard Rock Stadium.",
    amenities: ["Beach Access", "Pool", "Spa", "Shuttle"],
  }
];

export const mockRestaurants = [
  {
    id: "r1",
    name: "El Pastor VIP",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cuisine: "Mexican",
    country: "Mexico",
    rating: 4.9,
    distance: "0.3 mi to Azteca",
    description: "The absolute best tacos near the stadium. Vibrant fan atmosphere.",
    tags: ["Halal", "Spicy"]
  },
  {
    id: "r2",
    name: "Liberty Steakhouse",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cuisine: "American",
    country: "USA",
    rating: 4.7,
    distance: "1.5 mi to MetLife",
    description: "Premium steaks and giant screens showing all World Cup matches.",
    tags: ["Grill", "Bar"]
  },
  {
    id: "r3",
    name: "Poutine Central",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cuisine: "Canadian",
    country: "Canada",
    rating: 4.5,
    distance: "0.5 mi to BMO Field",
    description: "Authentic Canadian poutine, perfect post-match comfort food.",
    tags: ["Vegetarian Options"]
  },
  {
    id: "r4",
    name: "Ocean Catch Seafood",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cuisine: "Seafood",
    country: "USA",
    rating: 4.8,
    distance: "3 mi to Hard Rock",
    description: "Fresh seafood straight from the Miami coast.",
    tags: ["Healthy", "Fine Dining"]
  }
];

export const mockStadiums = [
  {
    id: "s1",
    name: "MetLife Stadium",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80",
    city: "New York/New Jersey",
    country: "USA",
    capacity: "82,500",
    description: "Host of the FIFA World Cup 26™ Final. A massive, modern venue located in East Rutherford.",
    matches: 8
  },
  {
    id: "s2",
    name: "Estadio Azteca",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    city: "Mexico City",
    country: "Mexico",
    capacity: "83,264",
    description: "The historic host of the Opening Match. An iconic shrine of world football.",
    matches: 5
  },
  {
    id: "s3",
    name: "BMO Field",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80",
    city: "Toronto",
    country: "Canada",
    capacity: "45,000",
    description: "Located at Exhibition Place, offering brilliant views of the Toronto skyline.",
    matches: 6
  },
  {
    id: "s4",
    name: "SoFi Stadium",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    city: "Los Angeles",
    country: "USA",
    capacity: "70,240",
    description: "A stunning architectural marvel in Inglewood with a giant 360-degree video board.",
    matches: 8
  }
];

export const mockTransports = [
  {
    id: "t1",
    type: "Metro/Subway",
    icon: "train",
    time: "25 mins",
    cost: "$2.75",
    departure: "Manhattan (Penn Station)",
    destination: "MetLife Stadium",
    status: "On Time"
  },
  {
    id: "t2",
    type: "Fan Shuttle",
    icon: "bus",
    time: "40 mins",
    cost: "Free (with match ticket)",
    departure: "Downtown Fan Zone",
    destination: "Estadio Azteca",
    status: "Frequent"
  },
  {
    id: "t3",
    type: "Taxi/Rideshare",
    icon: "taxi",
    time: "15 mins",
    cost: "$25 - $40",
    departure: "Miami Beach",
    destination: "Hard Rock Stadium",
    status: "High Demand"
  }
];

export const mockEmergency = {
  contacts: {
    police: { name: "Police", number: "911", desc: "For urgent police assistance." },
    ambulance: { name: "Ambulance", number: "911", desc: "For immediate medical emergencies." },
    fire: { name: "Fire Department", number: "911", desc: "For fire and rescue services." }
  },
  hospitals: [
    { id: "hosp1", name: "Holy Name Medical Center", distance: "2.5 mi", time: "10 min drive", phone: "201-833-3000" },
    { id: "hosp2", name: "Hackensack University Medical Center", distance: "4.1 mi", time: "14 min drive", phone: "555-0198" }
  ]
};
