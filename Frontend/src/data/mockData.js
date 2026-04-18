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
    image: "https://visitnj.org/sites/default/files/NYNJ_Know-Before-You-Go_Metlife-Stadium2_1200x800.jpg",
    city: "New York/New Jersey",
    country: "USA",
    capacity: "82,500",
    description: "Host of the FIFA World Cup 26™ Final. A massive, modern venue located in East Rutherford with a stunning exterior design.",
    matches: 8
  },
  {
    id: "s2",
    name: "Estadio Azteca",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Estadio_Azteca_y_sus_alrededores_46.jpg/1280px-Estadio_Azteca_y_sus_alrededores_46.jpg",
    city: "Mexico City",
    country: "Mexico",
    capacity: "83,264",
    description: "The historic host of the Opening Match. An iconic shrine of world football, legendary for its atmosphere.",
    matches: 5
  },
  {
    id: "s3",
    name: "BMO Field",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Toronto_BMO_Field_in_2024.jpg/1280px-Toronto_BMO_Field_in_2024.jpg",
    city: "Toronto",
    country: "Canada",
    capacity: "45,000",
    description: "Located at Exhibition Place, this stadium offers brilliant views of the Toronto skyline and a focused football atmosphere.",
    matches: 6
  },
  {
    id: "s4",
    name: "SoFi Stadium",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    city: "Los Angeles",
    country: "USA",
    capacity: "70,240",
    description: "A stunning architectural marvel in Inglewood with a giant 360-degree video board and world-class amenities.",
    matches: 8
  },
  {
    id: "s5",
    name: "AT&T Stadium",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg/1280px-Arlington_June_2020_4_%28AT%26T_Stadium%29.jpg",
    city: "Dallas (Arlington)",
    country: "USA",
    capacity: "92,967",
    description: "Known as 'Jerry World', one of the largest and most technologically advanced stadiums in the world.",
    matches: 9
  },
  {
    id: "s6",
    name: "Mercedes-Benz Stadium",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg/1280px-Mercedes_Benz_Stadium_time_lapse_capture_2017-08-13.jpg",
    city: "Atlanta",
    country: "USA",
    capacity: "75,000",
    description: "Famous for its unique camera-iris retractable roof and massive 'halo' screen.",
    matches: 8
  },
  {
    id: "s7",
    name: "Hard Rock Stadium",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dolphinstadiumint.JPG",
    city: "Miami",
    country: "USA",
    capacity: "65,326",
    description: "A multi-purpose jewel that has hosted multiple Super Bowls and international football classics.",
    matches: 7
  },
  {
    id: "s8",
    name: "BC Place",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/BC%20Place%20Vancouver.jpg",
    city: "Vancouver",
    country: "Canada",
    capacity: "54,500",
    description: "The premier stadium of Western Canada, featuring a state-of-the-art retractable roof system.",
    matches: 7
  }
];

export const mockTransports = [
  {
    id: "t1",
    city: "New York/NJ",
    type: "Subway",
    lineName: "Blue Line Fan Train",
    durationMin: 15,
    costUsd: 2.75,
    costLabel: "$2.75",
    from: "Penn Station",
    to: "MetLife Stadium North Gate",
    frequencyMin: 5,
    frequencyLabel: "Every 5 mins",
    status: "On Time",
    statusOk: true,
    color: "#00eeff",
    stadium: "MetLife Stadium",
    coordinates: [
      [40.7506, -73.9935],
      [40.7679, -73.9825],
      [40.8135, -74.0744]
    ]
  },
  {
    id: "t2",
    city: "New York/NJ",
    type: "Bus",
    lineName: "Express Matchday Shuttle",
    durationMin: 24,
    costUsd: 0,
    costLabel: "Free with ticket",
    from: "Times Square Fan Zone",
    to: "MetLife Stadium South Gate",
    frequencyMin: 15,
    frequencyLabel: "Every 15 mins",
    status: "Frequent",
    statusOk: true,
    color: "#f59e0b",
    stadium: "MetLife Stadium",
    coordinates: [
      [40.758, -73.9855],
      [40.7882, -74.0206],
      [40.8137, -74.0741]
    ]
  },
  {
    id: "t3",
    city: "New York/NJ",
    type: "Taxi",
    lineName: "Rideshare Priority Lane",
    durationMin: 18,
    costUsd: 28,
    costLabel: "$15 - $30",
    from: "Jersey City Center",
    to: "MetLife Stadium Drop-off Zone",
    frequencyMin: null,
    frequencyLabel: "On Demand",
    status: "High Demand",
    statusOk: false,
    color: "#ef4444",
    stadium: "MetLife Stadium",
    coordinates: [
      [40.7178, -74.0431],
      [40.7652, -74.0459],
      [40.8132, -74.0747]
    ]
  },
  {
    id: "t4",
    city: "Los Angeles",
    type: "Train",
    lineName: "Regional Rail Connector",
    durationMin: 34,
    costUsd: 8.5,
    costLabel: "$8.50",
    from: "Union Station",
    to: "SoFi Stadium Transit Hub",
    frequencyMin: 20,
    frequencyLabel: "Every 20 mins",
    status: "On Time",
    statusOk: true,
    color: "#10b981",
    stadium: "SoFi Stadium",
    coordinates: [
      [34.0562, -118.2365],
      [33.9617, -118.3532],
      [33.9534, -118.3392]
    ]
  },
  {
    id: "t5",
    city: "Los Angeles",
    type: "Subway",
    lineName: "Metro Green Stadium Link",
    durationMin: 29,
    costUsd: 3,
    costLabel: "$3.00",
    from: "Downtown LA",
    to: "SoFi Stadium East Access",
    frequencyMin: 10,
    frequencyLabel: "Every 10 mins",
    status: "On Time",
    statusOk: true,
    color: "#00eeff",
    stadium: "SoFi Stadium",
    coordinates: [
      [34.0407, -118.2468],
      [33.9748, -118.2498],
      [33.9534, -118.3392]
    ]
  },
  {
    id: "t6",
    city: "Mexico City",
    type: "Bus",
    lineName: "Azteca Fan Shuttle",
    durationMin: 40,
    costUsd: 0,
    costLabel: "Free with ticket",
    from: "Zocalo Fan Zone",
    to: "Estadio Azteca Gate 3",
    frequencyMin: 12,
    frequencyLabel: "Every 12 mins",
    status: "Frequent",
    statusOk: true,
    color: "#f59e0b",
    stadium: "Estadio Azteca",
    coordinates: [
      [19.4326, -99.1332],
      [19.3503, -99.1624],
      [19.3029, -99.1505]
    ]
  },
  {
    id: "t7",
    city: "Mexico City",
    type: "Taxi",
    lineName: "Rideshare Azteca Direct",
    durationMin: 22,
    costUsd: 22,
    costLabel: "$18 - $28",
    from: "Roma Norte",
    to: "Estadio Azteca Drop-off",
    frequencyMin: null,
    frequencyLabel: "On Demand",
    status: "High Demand",
    statusOk: false,
    color: "#ef4444",
    stadium: "Estadio Azteca",
    coordinates: [
      [19.4188, -99.1619],
      [19.3632, -99.1652],
      [19.3029, -99.1505]
    ]
  },
  {
    id: "t8",
    city: "Toronto",
    type: "Train",
    lineName: "Lakeshore Express",
    durationMin: 20,
    costUsd: 5.75,
    costLabel: "$5.75",
    from: "Union Station",
    to: "BMO Field Transit Stop",
    frequencyMin: 8,
    frequencyLabel: "Every 8 mins",
    status: "On Time",
    statusOk: true,
    color: "#10b981",
    stadium: "BMO Field",
    coordinates: [
      [43.6452, -79.3806],
      [43.6345, -79.4201],
      [43.6332, -79.4186]
    ]
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

export const mockMatches = [
  {
    id: "m1",
    teamA: "USA",
    teamB: "Spain",
    flagA: "us",
    flagB: "es",
    date: "June 12, 2026",
    time: "20:00",
    stadium: "MetLife Stadium",
    city: "New York/NJ",
    group: "Group A",
    type: "Group Stage"
  },
  {
    id: "m2",
    teamA: "Mexico",
    teamB: "France",
    flagA: "mx",
    flagB: "fr",
    date: "June 13, 2026",
    time: "18:00",
    stadium: "Estadio Azteca",
    city: "Mexico City",
    group: "Group C",
    type: "Opening Match"
  },
  {
    id: "m3",
    teamA: "Canada",
    teamB: "Morocco",
    flagA: "ca",
    flagB: "ma",
    date: "June 14, 2026",
    time: "15:00",
    stadium: "BMO Field",
    city: "Toronto",
    group: "Group B",
    type: "Group Stage"
  },
  {
    id: "m4",
    teamA: "Argentina",
    teamB: "Germany",
    flagA: "ar",
    flagB: "de",
    date: "June 15, 2026",
    time: "21:00",
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    group: "Group E",
    type: "Group Stage"
  },
  {
    id: "m5",
    teamA: "Brazil",
    teamB: "Portugal",
    flagA: "br",
    flagB: "pt",
    date: "June 16, 2026",
    time: "19:00",
    stadium: "Hard Rock Stadium",
    city: "Miami",
    group: "Group F",
    type: "Group Stage"
  },
  {
    id: "m6",
    teamA: "TBD",
    teamB: "TBD",
    flagA: "tbd",
    flagB: "tbd",
    date: "July 19, 2026",
    time: "20:00",
    stadium: "MetLife Stadium",
    city: "New York/NJ",
    group: "Final",
    type: "Grand Final"
  }
];
