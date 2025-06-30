## 30/06/2025

### Progress
- CREATE, READ & UPDATE of Items are now supported
- API set up for Inventory to support creating and updating item data

### Next Steps
1. Stock Adjustment Modal for items needs further work
    - This will allow users to MANUALLY adjust the stock of an item in a specific location, zone, aisle & bin, while also selecting the status of the stock (available, quarantine, inspection etc.)

## 28/06/2025

### Progress
- Just a small change, when creating/editing Zones, Aisles, Bins and saving, a URL parameter is used so that the same tab is auto selected when refreshing the page. This makes a more smooth transition and the user can see the new record appear in the list

### Next Steps
1. Work still needing on Inventory Management

## 26/06/2025

### Progress
- Added support for all CRUD actions for Zones within Locations
- Added support for all CRUD actions for Aisles within Zones
- Added support for all CRUD actions for Bins within Aisles
- Added support for DELETE action for Locations

### Next Steps
1. Work on Inventory Management module can start
    - Placing stock of an Item/Product in a Bin (which belongs to an Aisle -> Zone -> Location)
    - This also means CRUD actions for Items are now needed - I currently have work on this saved locally which isn't
      committed to GitHub yet, so this will be committed once I have Inventory Management set up

## 24/06/2025

### Progress
- Implemented CRUD for Locations (Delete operation pending)
- Integrated Record controller (`record.create`) and `RecordObject` methods (`record.setValue`, `record.save`, etc.) for data interactions
- Below are examples of how I would create, update and save changes to the database using these methods

```js
// Create a new instance of Location
const newLocation = await RecordController.create('location', dataForRecord);

// Update an existing Location record
const loadLocation = await RecordController.load(id, 'location');

// Get value of an existing record AFTER loading
const locationName = loadLocation.getValue('name');

// Set value of an existing record AFTER loading
loadLocation.setValue('name', newValue);

// Save changes to database
const saveUpdatedLocation = await loadLocation.save();
```

### Next Steps
1. Develop WMS components:
    - CRUD for Zones, Aisles, and Bins
2. Set up Inventory Management after WMS is complete
3. Begin work on Transactions and Fulfillment once Inventory Management is in place