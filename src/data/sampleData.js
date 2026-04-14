import React from "react";
import house1 from "../assets/house1.jpg";
import condo1 from "../assets/condo1.jpg";

const sampleHouses = [
  {
    id: 1,
    image: house1,
    title: "Modern Family Home",
    location: "123 Main St, Anytown, Cebu City",
    description:
      "A beautiful 4-bedroom family home with a spacious backyard and modern amenities.",
    price: "₱12,782",
  },
  {
    id: 2,
    image: house1,
    title: "Luxury Waterfront Villa",
    location: "45 Ocean Blvd, Lapu-Lapu City",
    description:
      "A luxurious 5-bedroom villa with panoramic ocean views and an infinity pool.",
    price: "₱30,000,000",
  },
  {
    id: 3,
    image: house1,
    title: "Cozy Cottage Retreat",
    location: "89 Pine Ave, Tagbilaran City, Bohol",
    description:
      "A charming 2-bedroom cottage in a peaceful forest setting, perfect for a relaxing getaway.",
    price: "₱6,250,000",
  },
  {
    id: 4,
    image: house1,
    title: "Urban Loft Apartment",
    location: "202 City Plaza, Cebu City",
    description:
      "A trendy 1-bedroom loft in the heart of Cebu's bustling city center, ideal for young professionals.",
    price: "₱8,500,000",
  },
  {
    id: 5,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 7,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 8,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 10,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 11,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 12,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
  {
    id: 13,
    image: house1,
    title: "Countryside Manor",
    location: "512 Greenfield Rd, Talisay City",
    description:
      "A sprawling 6-bedroom estate with lush gardens, perfect for a large family or entertaining guests.",
    price: "₱22,500,000",
  },
];

const sampleCondos = [
  {
    id: 1,
    image: condo1,
    title: "Contemporary Townhouse",
    location: "75 Hillcrest St, Mandaue City",
    description:
      "A stylish 3-bedroom townhouse with modern finishes, ideal for young families or professionals.",
    price: "₱14,200,000",
  },
  {
    id: 2,
    image: condo1,
    title: "Luxury Skyview Condo",
    location: "Skyline Tower, Cebu Business Park",
    description:
      "A luxurious 2-bedroom condo with stunning views of the city skyline and top-notch amenities.",
    price: "₱20,500,000",
  },
  {
    id: 3,
    image: condo1,
    title: "Beachfront Studio Unit",
    location: "Coastal Suites, Lapu-Lapu City",
    description:
      "A cozy studio condo perfect for solo living or as a vacation rental, right by the beach.",
    price: "₱6,800,000",
  },
  {
    id: 4,
    image: condo1,
    title: "Modern Highrise Apartment",
    location: "City Square Towers, Cebu City",
    description:
      "A spacious 1-bedroom apartment in a prime high-rise location with access to a gym and pool.",
    price: "₱9,500,000",
  },
  {
    id: 5,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 6,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 7,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 8,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 9,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 10,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
  {
    id: 11,
    image: condo1,
    title: "Exclusive Penthouse Loft",
    location: "The Pinnacle Residences, Cebu IT Park",
    description:
      "A stunning 3-bedroom penthouse with panoramic views, private elevator, and luxurious features.",
    price: "₱35,000,000",
  },
];

class sampleData {
  getSampleHouses() {
    return sampleHouses;
  }
  getSampleCondos() {
    return sampleCondos;
  }
}

export default new sampleData();
