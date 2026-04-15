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

const sampleAdminUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@ihomes.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Super Admin",
    email: "superadmin@ihomes.com",
    password: "superadmin123",
    role: "superadmin",
  },
];

const sampleReservations = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Family Home",
    propertyType: "house",
    guestName: "John Doe",
    guestEmail: "john@example.com",
    guestPhone: "09123456789",
    checkInDate: "2026-05-01",
    checkOutDate: "2026-05-05",
    numberOfGuests: 4,
    totalPrice: "₱50,000",
    status: "pending",
    createdAt: "2026-04-10",
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Luxury Waterfront Villa",
    propertyType: "house",
    guestName: "Jane Smith",
    guestEmail: "jane@example.com",
    guestPhone: "09987654321",
    checkInDate: "2026-06-15",
    checkOutDate: "2026-06-22",
    numberOfGuests: 6,
    totalPrice: "₱200,000",
    status: "approved",
    createdAt: "2026-04-08",
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Cozy Cottage Retreat",
    propertyType: "house",
    guestName: "Michael Johnson",
    guestEmail: "michael@example.com",
    guestPhone: "09111111111",
    checkInDate: "2026-05-10",
    checkOutDate: "2026-05-12",
    numberOfGuests: 2,
    totalPrice: "₱30,000",
    status: "pending",
    createdAt: "2026-04-12",
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: "Urban Loft Apartment",
    propertyType: "house",
    guestName: "Sarah Wilson",
    guestEmail: "sarah@example.com",
    guestPhone: "09222222222",
    checkInDate: "2026-07-01",
    checkOutDate: "2026-07-08",
    numberOfGuests: 2,
    totalPrice: "₱70,000",
    status: "rejected",
    createdAt: "2026-04-07",
  },
  {
    id: 5,
    propertyId: 1,
    propertyTitle: "Luxury Skyview Condo",
    propertyType: "condo",
    guestName: "David Lee",
    guestEmail: "david@example.com",
    guestPhone: "09333333333",
    checkInDate: "2026-05-20",
    checkOutDate: "2026-05-27",
    numberOfGuests: 2,
    totalPrice: "₱120,000",
    status: "approved",
    createdAt: "2026-04-11",
  },
  {
    id: 6,
    propertyId: 5,
    propertyTitle: "Beachfront Studio Unit",
    propertyType: "condo",
    guestName: "Emily Brown",
    guestEmail: "emily@example.com",
    guestPhone: "09444444444",
    checkInDate: "2026-06-01",
    checkOutDate: "2026-06-08",
    numberOfGuests: 1,
    totalPrice: "₱50,000",
    status: "pending",
    createdAt: "2026-04-13",
  },
  {
    id: 7,
    propertyId: 2,
    propertyTitle: "Contemporary Townhouse",
    propertyType: "condo",
    guestName: "Alex Johnson",
    guestEmail: "alex@example.com",
    guestPhone: "09555555555",
    checkInDate: "2026-08-10",
    checkOutDate: "2026-08-17",
    numberOfGuests: 3,
    totalPrice: "₱90,000",
    status: "approved",
    createdAt: "2026-04-14",
  },
  {
    id: 8,
    propertyId: 3,
    propertyTitle: "Modern Highrise Apartment",
    propertyType: "condo",
    guestName: "Lisa Garcia",
    guestEmail: "lisa@example.com",
    guestPhone: "09666666666",
    checkInDate: "2026-07-15",
    checkOutDate: "2026-07-22",
    numberOfGuests: 2,
    totalPrice: "₱60,000",
    status: "pending",
    createdAt: "2026-04-15",
  },
  {
    id: 9,
    propertyId: 4,
    propertyTitle: "Exclusive Penthouse Loft",
    propertyType: "condo",
    guestName: "Robert Taylor",
    guestEmail: "robert@example.com",
    guestPhone: "09777777777",
    checkInDate: "2026-09-01",
    checkOutDate: "2026-09-08",
    numberOfGuests: 4,
    totalPrice: "₱150,000",
    status: "rejected",
    createdAt: "2026-04-09",
  },
  {
    id: 10,
    propertyId: 1,
    propertyTitle: "Modern Family Home",
    propertyType: "house",
    guestName: "Maria Rodriguez",
    guestEmail: "maria@example.com",
    guestPhone: "09888888888",
    checkInDate: "2026-10-05",
    checkOutDate: "2026-10-12",
    numberOfGuests: 5,
    totalPrice: "₱75,000",
    status: "approved",
    createdAt: "2026-04-16",
  },
];

class sampleData {
  getSampleHouses() {
    return sampleHouses;
  }
  getSampleCondos() {
    return sampleCondos;
  }
  getSampleReservations() {
    return sampleReservations;
  }
  getSampleAdminUsers() {
    return sampleAdminUsers;
  }
  validateAdminLogin(email, password) {
    const user = sampleAdminUsers.find(
      (u) => u.email === email && u.password === password,
    );
    return user || null;
  }
}

export default new sampleData();
