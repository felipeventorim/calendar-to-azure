# Calendar.js

This script is designed to extract data from Google Calendar and transcribe it in a format that can be logged into Azure's 7pace for hour tracking.

## Constants

- `DONT_REGISTER`: An array of strings that are not to be registered.
- `WORK_ITEM_DICTIONARY`: An array of objects that map meeting names to work item IDs.
- `ACTIVITY_TYPE_DICTIONARY`: An array of objects that map activity in meeting names to activity types.
- `WORK_ITEM_COLOR_DICTIONARY`: An object that maps work item names in color to work item IDs.

## Function

- `getCalendar()`: This function retrieves the calendar data. It first selects all elements with the role of "gridcell" and filters out those that have a child with the role of "presentation". It then slices the array to get the days. For each day, it maps over the meetings and returns the text content of each meeting. Finally, it filters out the meetings that are not to be registered.

## Usage

This script is intended to be used in a browser environment. To use it, navigate to your Google Calendar page, open the browser's console (usually by pressing F12), paste the entire script into the console, and then call the `getCalendar()` function. The console will then display the calendar data in a format ready to be copied and used.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
