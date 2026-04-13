import { addItem, updateQuantity } from "../src/inventory.js";

describe("Blackbox tests - Inventory", () => {

  // ---------- BVA (Boundary Value Analysis) Tests ----------

  test("BVA: quantity = 1 (lower bound valid)", () => {
    const res = addItem("E1", "Item", 1, 10);
    expect(res.status).toBe("added");
  });

  test("BVA: quantity = 0 (invalid)", () => {
    const res = addItem("E2", "Item", 0, 10);
    expect(res.status).toBe("error");
  });

  test("BVA: quantity = MAX (valid)", () => {
    const res = addItem("E3", "Item", 1000000, 10);
    expect(res.status).toBe("added");
  });

  test("BVA: quantity > MAX (invalid)", () => {
    const res = addItem("E4", "Item", 1000001, 10);
    expect(res.status).toBe("error");
  });

  test("BVA: price = 1 (lower bound)", () => {
    const res = addItem("E5", "Item", 10, 1);
    expect(res.status).toBe("added");
  });

  test("BVA: price = 0 (invalid)", () => {
    const res = addItem("E6", "Item", 10, 0);
    expect(res.status).toBe("error");
  });

  // ---------- ECP (Equivalence Class Partitioning) Tests ----------

  test("ECP: valid input class", () => {
    const res = addItem("F1", "ValidName", 100, 50);
    expect(res.status).toBe("added");
  });

  test("ECP: invalid id class", () => {
    const res = addItem("INVALID_ID_TOO_LONG", "Item", 10, 10);
    expect(res.status).toBe("error");
  });

  test("ECP: invalid name class (empty)", () => {
    const res = addItem("F2", "", 10, 10);
    expect(res.status).toBe("error");
  });

  test("ECP: invalid quantity class (negative)", () => {
    const res = addItem("F3", "Item", -5, 10);
    expect(res.status).toBe("error");
  });

  test("ECP: invalid price class (negative)", () => {
    const res = addItem("F4", "Item", 10, -10);
    expect(res.status).toBe("error");
  });

  // ---------- Update Quantity (Black-box) ----------

  test("BVA: update quantity = 0 (valid)", () => {
    addItem("G1", "Item", 10, 5);
    const res = updateQuantity("G1", 0);
    expect(res.status).toBe("updated");
  });

  test("ECP: update invalid quantity", () => {
    addItem("G2", "Item", 10, 5);
    const res = updateQuantity("G2", -1);
    expect(res.status).toBe("error");
  });

});