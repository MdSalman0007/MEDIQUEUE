// ============================================================
//  COMPLETE LOCATION DATA
//  Countries → States → Cities
//  Add this to your scripts.js
// ============================================================

const locationData = {


  // ──────────────────────────────────────────
  //  INDIA — All 28 States + 8 UTs
  // ──────────────────────────────────────────
  India: {
    "Andhra Pradesh": [
      "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
      "Rajamahendravaram", "Kakinada", "Tirupati", "Anantapur", "Vizianagaram",
      "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni",
      "Tenali", "Proddatur", "Chittoor", "Hindupur", "Bhimavaram"
    ],
    "Arunachal Pradesh": [
      "Itanagar", "Naharlagun", "Pasighat", "Namsai", "Bomdila",
      "Ziro", "Along", "Tezu", "Khonsa", "Changlang"
    ],
    Assam: [
      "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon",
      "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "North Lakhimpur",
      "Karimganj", "Sivasagar", "Goalpara", "Diphu", "Haflong"
    ],
    Bihar: [
      "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia",
      "Darbhanga", "Arrah", "Begusarai", "Katihar", "Munger",
      "Chapra", "Hajipur", "Sasaram", "Dehri", "Siwan",
      "Motihari", "Nawada", "Bagaha", "Buxar", "Kishanganj"
    ],
    Chhattisgarh: [
      "Raipur", "Bhilai", "Korba", "Bilaspur", "Durg",
      "Rajnandgaon", "Jagdalpur", "Ambikapur", "Raigarh", "Chirmiri",
      "Dhamtari", "Mahasamund", "Kanker", "Kawardha", "Bemetara"
    ],
    Goa: [
      "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
      "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Valpoi"
    ],
    Gujarat: [
      "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
      "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad",
      "Morbi", "Surendranagar", "Bharuch", "Mehsana", "Botad",
      "Navsari", "Valsad", "Porbandar", "Patan", "Godhra"
    ],
    Haryana: [
      "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar",
      "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula",
      "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar",
      "Kaithal", "Rewari", "Palwal", "Fatehabad", "Narnaul"
    ],
    "Himachal Pradesh": [
      "Shimla", "Dharamshala", "Solan", "Mandi", "Palampur",
      "Baddi", "Nahan", "Paonta Sahib", "Sundernagar", "Chamba",
      "Una", "Hamirpur", "Kullu", "Bilaspur", "Kangra"
    ],
    Jharkhand: [
      "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar",
      "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar",
      "Chaibasa", "Chirkunda", "Dumka", "Sahibganj", "Lohardaga",
      "Gumla", "Simdega", "Pakur", "Godda", "Koderma",
      "Chatra", "Latehar", "Khunti", "Jamtara", "East Singhbhum",
      "West Singhbhum", "Saraikela", "Seraikela-Kharsawan"
    ],
    Karnataka: [
      "Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi",
      "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumkur",
      "Raichur", "Bidar", "Gulbarga", "Hassan", "Dharwad",
      "Udupi", "Chitradurga", "Mandya", "Chikkamagaluru", "Kodagu"
    ],
    Kerala: [
      "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam",
      "Kannur", "Alappuzha", "Palakkad", "Malappuram", "Kottayam",
      "Kasaragod", "Pathanamthitta", "Idukki", "Wayanad"
    ],
    "Madhya Pradesh": [
      "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain",
      "Sagar", "Dewas", "Satna", "Ratlam", "Rewa",
      "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind",
      "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur"
    ],
    Maharashtra: [
      "Mumbai", "Pune", "Nagpur", "Thane", "Nashik",
      "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded",
      "Sangli", "Malegaon", "Jalgaon", "Akola", "Latur",
      "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji"
    ],
    Manipur: [
      "Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati",
      "Ukhrul", "Tamenglong", "Chandel", "Jiribam"
    ],
    Meghalaya: [
      "Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar",
      "Baghmara", "Ampati", "Resubelpara", "Mairang"
    ],
    Mizoram: [
      "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib",
      "Lawngtlai", "Mamit", "Saiha"
    ],
    Nagaland: [
      "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha",
      "Zunheboto", "Phek", "Mon", "Kiphire", "Longleng"
    ],
    Odisha: [
      "Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur",
      "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda",
      "Jeypore", "Bargarh", "Kendujhar", "Rayagada", "Koraput"
    ],
    Punjab: [
      "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda",
      "Mohali", "Firozpur", "Batala", "Hoshiarpur", "Pathankot",
      "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara",
      "Muktsar", "Barnala", "Rajpura", "Sangrur", "Kapurthala"
    ],
    Rajasthan: [
      "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer",
      "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar",
      "Pali", "Sri Ganganagar", "Kishangarh", "Baran", "Dhaulpur",
      "Tonk", "Beawar", "Hanumangarh", "Sambhar", "Nagaur"
    ],
    Sikkim: [
      "Gangtok", "Namchi", "Mangan", "Gyalshing", "Ravangla",
      "Jorethang", "Singtam", "Rangpo"
    ],
    "Tamil Nadu": [
      "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
      "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi",
      "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur",
      "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Kumarapalayam"
    ],
    Telangana: [
      "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam",
      "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet",
      "Miryalaguda", "Jagtial", "Mancherial", "Siddipet", "Bhongir"
    ],
    Tripura: [
      "Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia",
      "Khowai", "Ambassa", "Sabroom", "Sonamura"
    ],
    "Uttar Pradesh": [
      "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut",
      "Varanasi", "Allahabad", "Bareilly", "Aligarh", "Moradabad",
      "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Loni",
      "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur",
      "Farrukhabad", "Mau", "Hapur", "Etawah", "Mirzapur",
      "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur"
    ],
    Uttarakhand: [
      "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur",
      "Kashipur", "Rishikesh", "Kotdwar", "Ramnagar", "Pithoragarh",
      "Almora", "Nainital", "Mussoorie", "Tehri", "Pauri"
    ],
    "West Bengal": [
      "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri",
      "Bardhaman", "Malda", "Barasat", "Krishnanagar", "Kalyani",
      "Haldia", "Raiganj", "Kharagpur", "Cooch Behar", "Jalpaiguri",
      "Bankura", "Purulia", "Balurghat", "Midnapore", "Chandannagar"
    ],
    // Union Territories
    "Delhi": [
      "New Delhi", "Dwarka", "Rohini", "Janakpuri", "Pitampura",
      "Laxmi Nagar", "Saket", "Vasant Kunj", "Mayur Vihar", "Shahdara",
      "Karol Bagh", "Paharganj", "Connaught Place", "South Delhi", "North Delhi"
    ],
    "Jammu and Kashmir": [
      "Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore",
      "Kathua", "Udhampur", "Rajouri", "Punch", "Kupwara"
    ],
    "Ladakh": [
      "Leh", "Kargil", "Nubra", "Zanskar", "Drass"
    ],
    Chandigarh: [
      "Chandigarh"
    ],
    "Andaman and Nicobar Islands": [
      "Port Blair", "Car Nicobar", "Diglipur", "Rangat", "Mayabunder"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
      "Daman", "Diu", "Silvassa"
    ],
    Lakshadweep: [
      "Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy"
    ],
    Puducherry: [
      "Puducherry", "Karaikal", "Mahe", "Yanam"
    ]
  },

  // ──────────────────────────────────────────
  //  USA — All 50 States
  // ──────────────────────────────────────────
  USA: {
    Alabama: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa", "Hoover", "Dothan", "Auburn", "Decatur", "Madison"],
    Alaska: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan", "Wasilla", "Kenai", "Kodiak", "Bethel", "Palmer"],
    Arizona: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale", "Gilbert", "Tempe", "Peoria", "Surprise"],
    Arkansas: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro", "North Little Rock", "Conway", "Rogers", "Bentonville", "Hot Springs"],
    California: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Santa Ana", "Riverside", "Stockton", "Irvine", "San Bernardino"],
    Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood", "Thornton", "Arvada", "Westminster", "Pueblo", "Boulder"],
    Connecticut: ["Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury", "Norwalk", "Danbury", "New Britain", "West Hartford", "Greenwich"],
    Delaware: ["Wilmington", "Dover", "Newark", "Middletown", "Smyrna", "Milford", "Seaford", "Georgetown", "Elsmere", "New Castle"],
    Florida: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral"],
    Georgia: ["Atlanta", "Columbus", "Savannah", "Athens", "Sandy Springs", "Macon", "Roswell", "Albany", "Johns Creek", "Warner Robins"],
    Hawaii: ["Honolulu", "East Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu", "Kaneohe", "Mililani", "Kahului", "Ewa Beach"],
    Idaho: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Pocatello", "Caldwell", "Coeur d'Alene", "Twin Falls", "Lewiston", "Post Falls"],
    Illinois: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield", "Elgin", "Peoria", "Champaign", "Waukegan"],
    Indiana: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Fishers", "Bloomington", "Hammond", "Gary", "Lafayette"],
    Iowa: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City", "Waterloo", "Council Bluffs", "Ames", "West Des Moines", "Dubuque"],
    Kansas: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka", "Lawrence", "Shawnee", "Manhattan", "Lenexa", "Salina"],
    Kentucky: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Richmond", "Georgetown", "Florence", "Hopkinsville", "Nicholasville"],
    Louisiana: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Kenner", "Bossier City", "Monroe", "Alexandria", "Houma"],
    Maine: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Biddeford", "Sanford", "Augusta", "Saco", "Westbrook"],
    Maryland: ["Baltimore", "Columbia", "Germantown", "Silver Spring", "Waldorf", "Glen Burnie", "Frederick", "Ellicott City", "Dundalk", "Rockville"],
    Massachusetts: ["Boston", "Worcester", "Springfield", "Lowell", "Cambridge", "New Bedford", "Brockton", "Quincy", "Lynn", "Fall River"],
    Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn", "Livonia", "Westland"],
    Minnesota: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington", "Brooklyn Park", "Plymouth", "Maple Grove", "Woodbury", "St. Cloud"],
    Mississippi: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi", "Meridian", "Tupelo", "Olive Branch", "Greenville", "Horn Lake"],
    Missouri: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles", "St. Peters"],
    Montana: ["Billings", "Missoula", "Great Falls", "Bozeman", "Butte", "Helena", "Kalispell", "Havre", "Anaconda", "Miles City"],
    Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont", "Hastings", "Norfolk", "Columbus", "Papillion"],
    Nevada: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City", "Fernley", "Elko", "Mesquite", "Boulder City"],
    "New Hampshire": ["Manchester", "Nashua", "Concord", "Derry", "Dover", "Rochester", "Salem", "Merrimack", "Hudson", "Londonderry"],
    "New Jersey": ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Woodbridge", "Lakewood", "Toms River", "Hamilton", "Trenton"],
    "New Mexico": ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington", "Clovis", "Hobbs", "Alamogordo", "Carlsbad"],
    "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
    "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Concord"],
    "North Dakota": ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo", "Williston", "Dickinson", "Mandan", "Jamestown", "Wahpeton"],
    Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton", "Youngstown", "Lorain"],
    Oklahoma: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Lawton", "Edmond", "Moore", "Midwest City", "Enid", "Stillwater"],
    Oregon: ["Portland", "Eugene", "Salem", "Gresham", "Hillsboro", "Beaverton", "Bend", "Medford", "Springfield", "Corvallis"],
    Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "Altoona"],
    "Rhode Island": ["Providence", "Cranston", "Warwick", "Pawtucket", "East Providence", "Woonsocket", "Coventry", "Cumberland", "North Providence", "West Warwick"],
    "South Carolina": ["Columbia", "Charleston", "North Charleston", "Mount Pleasant", "Rock Hill", "Greenville", "Summerville", "Goose Creek", "Hilton Head", "Florence"],
    "South Dakota": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown", "Mitchell", "Yankton", "Pierre", "Huron", "Vermillion"],
    Tennessee: ["Memphis", "Nashville", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro", "Franklin", "Jackson", "Johnson City", "Bartlett"],
    Texas: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock", "Laredo", "Irving", "Garland", "Frisco", "McKinney"],
    Utah: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem", "Sandy", "Ogden", "St. George", "Layton", "South Jordan"],
    Vermont: ["Burlington", "South Burlington", "Rutland", "Essex", "Colchester", "Montpelier", "Barre", "Williston", "Milton", "Hartford"],
    Virginia: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria", "Hampton", "Roanoke", "Portsmouth", "Suffolk"],
    Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kirkland", "Kennewick", "Renton", "Spokane Valley", "Federal Way"],
    "West Virginia": ["Charleston", "Huntington", "Parkersburg", "Morgantown", "Wheeling", "Weirton", "Fairmont", "Martinsburg", "Beckley", "Clarksburg"],
    Wisconsin: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton", "Waukesha", "Oshkosh", "Eau Claire", "Janesville"],
    Wyoming: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Sheridan", "Green River", "Evanston", "Riverton", "Jackson"]
  },

  // ──────────────────────────────────────────
  //  UK — England, Scotland, Wales, N.Ireland
  // ──────────────────────────────────────────
  UK: {
    England: [
      "London", "Birmingham", "Manchester", "Leeds", "Liverpool",
      "Sheffield", "Bristol", "Nottingham", "Newcastle", "Leicester",
      "Brighton", "Coventry", "Bradford", "Derby", "Plymouth",
      "Southampton", "Reading", "Stoke-on-Trent", "Wolverhampton", "Portsmouth",
      "Oxford", "Cambridge", "Exeter", "Norwich", "York",
      "Sunderland", "Middlesbrough", "Luton", "Bolton", "Bournemouth"
    ],
    Scotland: [
      "Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness",
      "Stirling", "Perth", "Kirkcaldy", "Livingston", "Ayr",
      "Paisley", "East Kilbride", "Hamilton", "Cumbernauld", "Kilmarnock",
      "Coatbridge", "Greenock", "Dunfermline", "Falkirk", "Motherwell"
    ],
    Wales: [
      "Cardiff", "Swansea", "Newport", "Wrexham", "Barry",
      "Neath", "Bridgend", "Port Talbot", "Llanelli", "Cwmbran",
      "Caerphilly", "Merthyr Tydfil", "Rhondda", "Pontypridd", "Colwyn Bay"
    ],
    "Northern Ireland": [
      "Belfast", "Derry", "Lisburn", "Newry", "Armagh",
      "Ballymena", "Coleraine", "Omagh", "Enniskillen", "Bangor",
      "Antrim", "Newtownabbey", "Carrickfergus", "Ballymoney", "Cookstown"
    ]
  }

};
