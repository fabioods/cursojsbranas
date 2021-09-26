const timeUnits = new Map();
timeUnits.set("second", 1);
timeUnits.set("minute", 60);
timeUnits.set("hour", 3600);
timeUnits.delete("hour");
console.log(timeUnits.get("second"));
console.log(timeUnits.get("minute"));
console.log(timeUnits.get("hour"));
