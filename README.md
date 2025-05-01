# Carbon Footprint Visualizer - USA County Level

### By Kayla Afonseca, Christian George, and Daniel Onyema

**Course Project • CS573 Data Visualization • Spring 2025**

---

## Overview

The **Carbon Footprint Visualizer** is a web-based interactive platform that reveals the carbon emission patterns across United States counties. Users can explore per-person and total carbon footprints by selecting one or more activity categories (transport, housing, food, goods, services), view differences at a county level, and compare activity-specific contributions like electricity, fuel, and gas usage.

It includes:

- **Dual maps**: per capita vs total emissions
- **Interactive checkboxes** to toggle categories
- **Dynamic bar charts** for activities by county
- **Globe background** using Three.js
- **Survey form** to gather user insights
- **Admin-only download** of survey results in CSV

---

## Goals

- Make national carbon data understandable through **visual storytelling**
- Empower users to **interactively explore** carbon impacts by geography and lifestyle category
- Allow comparison of **individual vs collective emissions**
- Collect basic interpretive feedback through a **5-question survey**

---

## Features

| Feature           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| Interactive Globe | 3D Earth rendered in Three.js as immersive background                    |
| Dual D3 Maps      | Per-person (left) vs Total (right) carbon footprint by county            |
| Category Filters  | Checkboxes for transport, housing, food, goods, services                 |
| Activity Bars     | Chart.js bar charts showing electricity, gas, fuel, vehicle miles        |
| Survey + Export   | 5-question interpretation survey, downloadable CSV via admin password    |
| Modular Design    | Classes for Zipcode and Collection management for scalable data handling |

---

## Data

- **Source**: [`CountyextCarbonData.csv`](https://raw.githubusercontent.com/ChrisGeorge-fintech/data/refs/heads/main/CountyextCarbonData.csv)
- **Fields include**:
  - County, State, Population, Households
  - Activity-specific CO₂ emissions (e.g., Transport, Housing)
  - Energy usage: Electricity (kWh), Fuel Oil (gallons), etc.
- All emissions are scaled per household and normalized per person when needed

---

## How to Use

1. **Explore the globe** - background spins continuously
2. **Select categories** - using checkboxes at the top
3. **Click a county** - on either map to reveal its bar charts
4. **Interpret the data** - and fill out the survey at the bottom
5. **Admin access** - use password `CS573KCD` to download responses

---

## Technologies Used

- **HTML/CSS/JavaScript**
- **D3.js** - data-driven county maps and tooltips
- **TopoJSON** - US counties and state borders
- **Chart.js** - activity bar charts per county
- **Three.js** - interactive Earth visualization
- **LocalStorage API** - for storing user survey responses

---

## Admin Instructions

- Responses to the survey are stored in browser localStorage.
- Use the **Download All Survey Responses** button with password `CS573KCD` to export a CSV file.

---
