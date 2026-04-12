const inventory = new Map();

const MAX_QUANTITY = 1000000;
const MAX_PRICE = 1000000;

// Validation functions
function isValidId(id) { // must be alphanumeric and max 8 characters
  return typeof id === "string"
    && /^[a-zA-Z0-9]+$/.test(id)
    && id.length <= 8;
}

function isValidName(name) { // must be non-empty and contain letters
  return typeof name === "string"
    && name.trim().length > 0
    && /[a-zA-Z]/.test(name); // must contain letters
}

function isValidNumber(num) { // checks if it's a number
  return typeof num === "number" && !isNaN(num);
}

// Inventory functions
export function addItem(id, name, quantity, price) {
  if (!isValidId(id)) return { status: "error", field: "id", message: "ID must be alphanumeric and max 8 characters" };;
  if (!isValidName(name)) return { status: "error", field: "name", message: "Name must be non-empty and contain letters" };
  if (!isValidNumber(quantity) || quantity < 1 || quantity > MAX_QUANTITY)
    return { status: "error", field: "quantity", message: `Quantity must be between 1 and ${MAX_QUANTITY}` };
  if (!isValidNumber(price) || price < 1 || price > MAX_PRICE)
    return { status: "error", field: "price", message: `Price must be between 1 and ${MAX_PRICE}` };

  if (inventory.has(id)) return { status: "exists" };

  const item = { id, name, quantity, price };
  inventory.set(id, item);

  return { status: "added", item };
}

export function updateQuantity(id, quantity) {
  if (!isValidId(id)) return { status: "error", field: "id", message: "ID must be alphanumeric and max 8 characters" };
  if (!inventory.has(id)) return { status: "error", field: "id", message: "Item not found" };
  if (!isValidNumber(quantity) || quantity < 0 || quantity > MAX_QUANTITY)
    return { status: "error", field: "quantity", message: `Quantity must be between 0 and ${MAX_QUANTITY}` };

  const item = inventory.get(id);
  item.quantity = quantity;

  return { status: "updated", item };
}

export function removeItem(id) {
  if (!isValidId(id)) return { status: "error", field: "id", message: "ID must be alphanumeric and max 8 characters" };
  if (!inventory.has(id)) return { status: "error", field: "id", message: "Item not found" };

  const item = inventory.get(id);
  inventory.delete(id);

  return { status: "removed", item };
}

export function getItem(id) {
  if (!isValidId(id)) return { status: "error", field: "id", message: "ID must be alphanumeric and max 8 characters" };
  if (!inventory.has(id)) return { status: "error", field: "id", message: "Item not found" };

  return { status: "found", item: inventory.get(id) };
}