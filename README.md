# CICD-inventory-management
This is a simple inventory management system used to demonstrate the abilities of CI/CD automation.
## Features
- Add new items
- Update Quantity ofitems
- Remove items
- Look up items
## Stack
- Backend: Node.js, Express
- Frontend: HTML, CSS, Javascript
- Testing: Jest
- CI/CD: GitHub Actions YAML
## Setup
1. Clone the repository
2. Install the dependencies
   - ```npm install```
3. Run the server
   - ```npm run dev```
4. View the website
   - Go to http://localhost:3000
<img width="2559" height="665" alt="image" src="https://github.com/user-attachments/assets/e38da7e3-c55a-4ae7-a752-d0e29829baaf" />

## Running Tests
1. Run tests
   - ```npm test```
<img width="725" height="339" alt="image" src="https://github.com/user-attachments/assets/2cd56fc6-c3f6-4f18-a11e-c4d93e0a780c" />

## Data Model
1. Add (Adds an item to the inventory)
   - id
   - name
   - quanitity
   - price
2. Update (updates an item in the inventory
   - id
   - quanitity
4. Remove (removes an item)
   - id
4. Get (returns the ID, name, quantity and price of an item)
   - id

## Attribute Constraints
1. id
  - Unique
  - Alphanumeric
  - 8 characters max
2. name
  - non-empty
  - Alphanumeric
3. quantity
  - must be >= 1 (when adding a new item)
  - must be >= 0 (when updating an item)
  - must be <= 1000000
4. price
  - must be >= 1
  - must be <= 1000000

## CI/CD Pipeline
Uses GitHub Actions to automate testing
  - Installs dependencies
  - Runs tests using jest




