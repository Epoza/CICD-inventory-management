import {
  addItem,
  updateQuantity,
  removeItem,
  getItem
} from "../src/inventory.js";

describe("Whitebox tests - Inventory", () => {

  // ---------- addItem ----------

  test("valid addItem", () => {
    const res = addItem("A1", "Apple", 10, 5);
    expect(res.status).toBe("added");
    expect(res.item.name).toBe("Apple");
  });

  test("invalid id format", () => {
    const res = addItem("A@#", "Apple", 10, 5);
    expect(res.status).toBe("error");
    expect(res.field).toBe("id");
  });

  test("invalid quantity (negative)", () => {
    const res = addItem("A3", "Apple", -1, 5);
    expect(res.status).toBe("error");
    expect(res.field).toBe("quantity");
  });

  test("invalid price (NaN)", () => {
    const res = addItem("A4", "Apple", 10, NaN);
    expect(res.status).toBe("error");
    expect(res.field).toBe("price");
  });

  test("duplicate item", () => {
    addItem("A5", "Banana", 5, 2);
    const res = addItem("A5", "Banana", 5, 2);
    expect(res.status).toBe("exists");
  });

  // ---------- updateQuantity ----------

  test("update valid quantity", () => {
    addItem("B1", "Orange", 10, 3);
    const res = updateQuantity("B1", 20);
    expect(res.status).toBe("updated");
    expect(res.item.quantity).toBe(20);
  });

  test("update invalid id", () => {
    const res = updateQuantity("!!", 10);
    expect(res.status).toBe("error");
    expect(res.field).toBe("id");
  });

  test("update non-existent item", () => {
    const res = updateQuantity("ZZZ", 10);
    expect(res.status).toBe("error");
  });

  test("update invalid quantity (> max)", () => {
    addItem("B2", "Item", 5, 2);
    const res = updateQuantity("B2", 1000001);
    expect(res.status).toBe("error");
    expect(res.field).toBe("quantity");
  });

  // ---------- removeItem ----------

  test("remove existing item", () => {
    addItem("C1", "Item", 5, 2);
    const res = removeItem("C1");
    expect(res.status).toBe("removed");
  });

  test("remove invalid id", () => {
    const res = removeItem("###");
    expect(res.status).toBe("error");
  });

  test("remove non-existent item", () => {
    const res = removeItem("C999");
    expect(res.status).toBe("error");
  });

  // ---------- getItem ----------

  test("get existing item", () => {
    addItem("D1", "Item", 5, 2);
    const res = getItem("D1");
    expect(res.status).toBe("found");
    expect(res.item.id).toBe("D1");
  });

  test("get invalid id", () => {
    const res = getItem("!!");
    expect(res.status).toBe("error");
  });

  test("get non-existent item", () => {
    const res = getItem("D999");
    expect(res.status).toBe("error");
  });

});