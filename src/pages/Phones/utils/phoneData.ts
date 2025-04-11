import { Phone } from "../types";

export const fetchPhones = async (): Promise<Phone[]> => {
  try {
    const response = await fetch("/api/phones.json");
    if (!response.ok) {
      throw new Error("Failed to fetch phones data");
    }

    const phonesData = await response.json();

    // Map the API data format to our application's Phone type
    return phonesData.map((phone: any) => ({
      id: phone.id,
      title: phone.name,
      subtitle: `${phone.capacity} | ${phone.color}`,
      price: phone.priceDiscount,
      oldPrice: phone.priceRegular,
      image: phone.images[0], // Use the first image as the main image
      specs: {
        Screen: phone.screen,
        Capacity: phone.capacity,
        RAM: phone.ram,
      },
      // Additional properties for detail page if needed
      color: phone.color,
      category: phone.category,
      capacityAvailable: phone.capacityAvailable,
      colorsAvailable: phone.colorsAvailable,
      images: phone.images,
      description: phone.description,
      processor: phone.processor,
      resolution: phone.resolution,
      camera: phone.camera,
      zoom: phone.zoom,
      cell: phone.cell,
    }));
  } catch (error) {
    console.error("Error fetching phones:", error);
    return [];
  }
};

// For backward compatibility, provide an empty array until the data is loaded
export const allPhones: Phone[] = [];
