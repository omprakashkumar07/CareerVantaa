export const PRODUCTS: Record<string, {
  price: number;
  productName: string;
  access: string[];
  storagePath: string;
}> = {
  starter: {
    price: 99,
    productName: "Fresher Job Starter Pack",
    access: ["starter"],
    storagePath: "starter/Fresher_Job_Starter_Pack.zip"
  },
  accelerator: {
    price: 299,
    productName: "Fresher Job Accelerator",
    access: ["starter", "accelerator"],
    storagePath: "accelerator/Fresher_Job_Accelerator.zip"
  },
  launch: {
    price: 499,
    productName: "Fresher Career Launch Pack",
    access: ["starter", "accelerator", "launch"],
    storagePath: "launch/Fresher_Career_Launch_Pack.zip"
  }
};
