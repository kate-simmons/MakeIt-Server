import db from "../../../firebaseinit.js";
import { getDocs, collection } from "firebase/firestore";

export class ProductRepository {
  constructor() {
    this.breakfast = "Breakfast";
    this.lunch = "Lunch";
    this.snacks = "Snacks";
    this.dinner = "Dinner";
  }

  async getAllBreakfast() {
    try {
      const data = await getDocs(collection(db, this.breakfast));
      const arr = data.docs.map((item) => {
        const product = item.data();
        return { ...product, id: item.id };
      });
      return { status: true, data: arr };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async getAllDinner() {
    try {
      const data = await getDocs(collection(db, this.dinner));
      const arr = data.docs.map((item) => {
        const product = item.data();
        return { ...product, id: item.id };
      });
      return { status: true, data: arr };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async getAllLunch() {
    try {
      const data = await getDocs(collection(db, this.lunch));
      const arr = data.docs.map((item) => {
        const product = item.data();
        return { ...product, id: item.id };
      });
      return { status: true, data: arr };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async getAllSnacks() {
    try {
      const data = await getDocs(collection(db, this.snacks));
      const arr = data.docs.map((item) => {
        const product = item.data();
        return { ...product, id: item.id };
      });
      return { status: true, data: arr };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
}
