import db, { auth } from "../../../firebaseinit.js";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default class UserRepository {
  constructor() {
    this.collection = "Users";
  }

  async signup(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, this.collection, userCredential.user.uid), {
        cart: [],
        orders: [],
      });

      return { status: true, data: { userid: userCredential.user.uid } };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async signin(email, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {
        status: true,
        data: { msg: "logged in", userid: response.user.uid },
      };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async signout() {
    try {
      await auth.signOut();
      return { status: true, msg: "Signed out" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async getUserData(id) {
    try {
      const res = await getDoc(doc(db, this.collection, id));
      return { status: true, data: res.data() };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
  async addToCart(data) {
    try {
      await updateDoc(doc(db, this.collection, data.uid), {
        cart: arrayUnion(data),
      });
      return { status: true, msg: "data added" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async increaseQty(data) {
    try {
      const res = await getDoc(doc(db, this.collection, data.uid));
      const response = res.data();
      const arr = response.cart.map((item) => {
        if (item.id == data.id) {
          item.qty += 1;
        }
        return item;
      });

      await updateDoc(doc(db, this.collection, data.uid), {
        cart: arr,
      });
      return { status: true, msg: "item increased" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async decreaseQty(data) {
    try {
      const res = await getDoc(doc(db, this.collection, data.uid));
      const response = res.data();
      const arr = response.cart.filter((item) => {
        if (item.id == data.id) {
          item.qty -= 1;
        }
        if (item.qty > 0) return true;
        else return false;
      });

      await updateDoc(doc(db, this.collection, data.uid), {
        cart: arr,
      });
      return { status: true, msg: "item increased" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async removeFromCart(data) {
    try {
      const res = await getDoc(doc(db, this.collection, data.uid));
      const response = res.data();
      const arr = response.cart.filter((item) => {
        if (item.id == data.id) {
          return false;
        } else return true;
      });
      await updateDoc(doc(db, this.collection, data.uid), {
        cart: arr,
      });
      return { status: true, msg: "item removed" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async emptyCart(id) {
    try {
      await updateDoc(doc(db, this.collection, id), {
        cart: [],
      });
      return { status: true, msg: "cart emptied" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async placeOrder({ id, data }) {
    try {
      const res = await getDoc(doc(db, this.collection, id));
      const response = res.data();
      await updateDoc(doc(db, this.collection, id), {
        orders: [...response.orders, data],
      });
      await this.emptyCart(id);
      return { status: true, msg: "cart emptied" };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
}
