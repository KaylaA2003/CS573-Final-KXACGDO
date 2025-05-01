<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.148.0/three.min.js"></script>;
<script src="https://d3js.org/d3.v7.min.js"></script>;
<script src="https://d3js.org/topojson.v3.min.js"></script>;
<script src="https://d3js.org/d3.v7.min.js"></script>;
<script src="https://d3js.org/topojson.v3.min.js"></script>;

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) {
  // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}

// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked

const source2 =
  "https://raw.githubusercontent.com/ChrisGeorge-fintech/data/refs/heads/main/CountyCarbonData.csv";
let fetchedData = null; // Global variable to store the data

async function fetchData() {
  try {
    const response = await fetch(source2);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    fetchedData = data; // Save the data for reuse
    console.log("Data fetched and saved:");
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

fetchData();

class Zipcode {
  constructor(
    state,
    county,
    transport,
    housing,
    food,
    goods,
    services,
    electricity,
    gas,
    fuel,
    vehicleMiles,
    population,
    households
  ) {
    //this.longitude = longitude;
    //this.latitude = latitude;
    //this.city = city;
    this.state = state;
    this.county = county.trim();
    this.Transport = transport * households;
    this.Housing = housing * households;
    this.Food = food * households;
    this.Goods = goods * households;
    this.Services = services * households;
    this.electricity = electricity * households;
    this.gas = gas * households;
    this.fuel = fuel * households;
    this.vehicleMiles = vehicleMiles * households;
    this.Population = population;
    this.households = households;
    this.I_Transport = (transport * households) / population;
    this.I_Housing = (housing * households) / population;
    this.I_Food = (food * households) / population;
    this.I_Goods = (goods * households) / population;
    this.I_Services = (services * households) / population;
  }
  toString() {
    return `State: ${this.state}, County: ${this.county}, Population: ${this.Population}, Households: ${this.households}, Transport: ${this.Transport}, Housing: ${this.Housing}, Food: ${this.Food}, Goods: ${this.Goods}, Services: ${this.Services}`;
  }
  toJSON() {
    return {
      longitude: this.longitude,
      latitude: this.latitude,
      city: this.city,
      state: this.state,
      county: this.county,
      Transport: this.Transport,
      Housing: this.Housing,
      Food: this.Food,
      Goods: this.Goods,
      Services: this.Services,
      electricity: this.electricity,
      gas: this.gas,
      fuel: this.fuel,
      vehicleMiles: this.vehicleMiles,
      Population: this.Population,
      households: this.households,
    };
  }
}

class MyCollection {
  constructor() {
    this.collection = new Set();
  }

  add(element) {
    this.collection.add(element);
  }

  remove(element) {
    if (this.collection.has(element)) {
      this.collection.delete(element);
    } else {
      throw new Error("Element not found in the collection.");
    }
  }

  size() {
    return this.collection.size;
  }

  toString() {
    return Array.from(this.collection)
      .map((item) => item.toString())
      .toString();
  }

  // Method to use all the records in a supplied worksheet as the collection
  populateCollection(data) {
    this.collection.clear();
    const rows = data.split("\n");
    const headers = rows[0].split(",");
    const indices = {
      //longitude: headers.indexOf('Longitude'),
      //latitude: headers.indexOf('Latitude'),
      //zipcode: headers.indexOf('ZipCode'),
      //city: headers.indexOf('City'),
      state: headers.indexOf("State"),
      county: headers.indexOf("County"),
      transport: headers.indexOf("Transport (tCO2e/yr)"),
      housing: headers.indexOf("Housing (tCO2e/yr)"),
      food: headers.indexOf("Food (tCO2e/yr)"),
      goods: headers.indexOf("Goods (tCO2e/yr)"),
      services: headers.indexOf("Services (tCO2e/yr)"),
      electricity: headers.indexOf("electricity (kWh)"),
      gas: headers.indexOf("Nat. Gas (cu.ft.)"),
      fuel: headers.indexOf("FUELOIL (gallons)"),
      vehicleMiles: headers.indexOf("Vehicle miles traveled"),
      population: headers.indexOf("Population"),
      households: headers.indexOf("Households"),
      //personsPerHousehold: headers.indexOf('PersonsPerHousehold')
    };

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      if (row.length === headers.length) {
        const element = new Zipcode(
          //parseFloat(row[indices.longitude]),
          //parseFloat(row[indices.latitude]),
          //row[indices.zipcode],
          //row[indices.city],
          row[indices.state],
          row[indices.county],
          parseFloat(row[indices.transport]),
          parseFloat(row[indices.housing]),
          parseFloat(row[indices.food]),
          parseFloat(row[indices.goods]),
          parseFloat(row[indices.services]),
          parseFloat(row[indices.electricity]),
          parseFloat(row[indices.gas]),
          parseFloat(row[indices.fuel]),
          parseFloat(row[indices.vehicleMiles]),
          parseInt(row[indices.population]),
          parseInt(row[indices.households])
        );
        this.collection.add(element);
      }
    }
    return `Collection populated with ${this.collection.size} elements.`;
  }

  clear() {
    this.collection.clear();
    return this.collection;
  }

  carbonFootprint(mode, t = null, h = null, f = null, g = null, s = null) {
    const carbonFootprint = {};
    if (mode === "total") {
      this.collection.forEach((zip) => {
        let footprint = 0;
        if (t === 1) footprint += zip.Transport;
        if (h === 1) footprint += zip.Housing;
        if (f === 1) footprint += zip.Food;
        if (g === 1) footprint += zip.Goods;
        if (s === 1) footprint += zip.Services;
        carbonFootprint[zip.county] = {
          footprint: footprint / 1000,
          state: zip.state,
          county: zip.county,
          population: zip.Population,
          households: zip.households,
        };
      });
      return carbonFootprint;
    }
    if (mode === "individual") {
      this.collection.forEach((zip) => {
        let footprint = 0;
        if (t === 1) footprint += zip.I_Transport;
        if (h === 1) footprint += zip.I_Housing;
        if (f === 1) footprint += zip.I_Food;
        if (g === 1) footprint += zip.I_Goods;
        if (s === 1) footprint += zip.I_Services;
        carbonFootprint[zip.county] = {
          footprint: footprint,
          state: zip.state,
          county: zip.county,
          population: zip.Population,
          households: zip.households,
        };
      });
      return carbonFootprint;
    }
  }
}

let myproject = new MyCollection();
fetchData()
  .then(() => {
    console.log("Data fetched successfully");
    if (fetchedData) {
      myproject.populateCollection(fetchedData);
      console.log(myproject.carbonFootprint("total", 1, 1, 1, 1, 1));
    } else {
      console.error("No data available to populate the collection");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//myproject.populateCollection(fetchedData);
//console.log(myproject.size());

/**
 * Renders a choropleth map of the USA by counties.
 * @param {string} svgid - The ID of the SVG container.
 * @param {string} mode - The mode for carbon footprint calculation ('total' or 'individual').
 * @param {number} t - Include transport in the calculation (1 or 0).
 * @param {number} h - Include housing in the calculation (1 or 0).
 * @param {number} f - Include food in the calculation (1 or 0).
 * @param {number} g - Include goods in the calculation (1 or 0).
 * @param {number} s - Include services in the calculation (1 or 0).
 */
function render_map(svgid, mode, t, h, f, g, s) {
  // Set up SVG dimensions
  const width = 550;
  const height = 300;

  // Create an SVG container
  const svg = d3
    .select(svgid)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define a geographic projection
  const projection = d3
    .geoAlbersUsa()
    .scale(600)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);
  
  /*
  // Tooltip for interactivity
  const tooltip = d3.select(".tooltip");
  if (tooltip.empty()) {
    console.warn("Tooltip element not found in the DOM.");
    return;
  }
  
  

  // Helper function for tooltip styling
  function styleTooltip(tooltip, event, countyName, value) {
    tooltip
      .style("opacity", 1)
      .html(`County: ${countyName}<br>Carbon Footprint: ${value}`)
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY + 10}px`);
  }
  */

  Promise.resolve(myproject.carbonFootprint(mode, t, h, f, g, s)); // Use already fetched data to process carbon footprint
  // Load data and render the map
  Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json"), // GeoJSON data for counties
    fetchData().then(() => myproject.carbonFootprint(mode, t, h, f, g, s)), // Fetch and process carbon footprint data
  ])
    .then(([us, carbonData]) => {
      // Map carbon footprint data to counties and cache min/max values
      let minValue = 0;
      let maxValue = 50;
      const dataByCounty = new Map(
        Object.entries(carbonData).map(([county, values]) => {
          const footprint = values.footprint;
          if (footprint < minValue) minValue = footprint;
          if (footprint > maxValue) maxValue = footprint;
          return [county.toUpperCase(), footprint];
        })
      );

      // Define a color scale
      const color = d3
        .scaleSequential(d3.interpolateReds)
        .domain([0, maxValue]);

      // Draw counties
      // Bind GeoJSON features to SVG paths for rendering counties
      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .join("path")
        .attr("fill", (d) => {
          const countyName = d.properties.name?.toUpperCase();
          const value = dataByCounty.get(countyName) || 0; // Default to 0 if no data
          return color(value);
        })
        .attr("d", path)
        .on("mouseover", (event, d) => {
          const countyName = d.properties.name?.toUpperCase();
          const value = dataByCounty.get(countyName) || "No data";
          styleTooltip(tooltip, event, countyName, value);
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

      // Add borders for states
      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .attr("d", path);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
  console.log("Map rendered");
}
