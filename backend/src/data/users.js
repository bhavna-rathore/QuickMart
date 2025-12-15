import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/date.js";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

const users = [

  {
    _id: "testuser1",
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: "1234",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    // IMPORTANT
    cart: [],
    wishlist: [],
    addresses: []

  }

];
export default users
