import iphonesData from "@shared/data/iphones.json";
import { Phone } from "../types";

export const generateMorePhones = (): Phone[] => {
  const originalCount = iphonesData.length;
  const targetCount = 70;

  const extraNeeded = targetCount - originalCount;

  const repeatTimes = Math.ceil(extraNeeded / originalCount);

  const extraPhones: Phone[] = [];
  const colorVariants = [
    "Black",
    "White",
    "Gold",
    "Silver",
    "Purple",
    "Red",
    "Blue",
    "Green",
  ];
  const storageVariants = [32, 64, 128, 256, 512];

  let count = 0;
  for (let i = 0; i < repeatTimes && count < extraNeeded; i++) {
    for (let j = 0; j < iphonesData.length && count < extraNeeded; j++) {
      const phone = iphonesData[j];
      const color =
        colorVariants[Math.floor(Math.random() * colorVariants.length)];
      const storage =
        storageVariants[Math.floor(Math.random() * storageVariants.length)];
      const priceAdjustment = Math.floor(Math.random() * 200) - 100;

      const newTitle = phone.title
        .replace(/\d+GB/, `${storage}GB`)
        .replace(/Silver|Gold|Black|Red/, color);

      const newSubtitle = phone.subtitle
        ? phone.subtitle
            .replace(/\d+GB/, `${storage}GB`)
            .replace(/Silver|Gold|Black|Red/, color)
        : "";

      extraPhones.push({
        ...phone,
        id: `${phone.id}-${i}-${j}`,
        title: newTitle,
        subtitle: newSubtitle,
        price: Math.max(499, phone.price + priceAdjustment),
        specs: {
          ...phone.specs,
          Capacity: `${storage} GB`,
        },
      });

      count++;
    }
  }

  return [...iphonesData, ...extraPhones];
};

export const allPhones = generateMorePhones();
