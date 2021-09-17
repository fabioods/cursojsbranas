function generateSerial (max) {
    if (max === undefined) {
        max = 1000;
    }
    return Math.floor(Math.random() * max);
}

generateSerial(10);
generateSerial(100);
generateSerial(1000);
generateSerial();
