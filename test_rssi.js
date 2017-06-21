var SensorTag = require('./index');
var sleep = require('sleep');
var TIME_BETWEEN_READS = 1

function readRSSI(sensorTag) {
    console.log("[RSSI]: " + sensorTag._peripheral.rssi);

    sensorTag.disconnect();

    sleep.sleep(TIME_BETWEEN_READS);
    SensorTag.discover(readRSSI);
}

function onDiscover(sensorTag) {
  console.log('discovered: ' + sensorTag.id + ', type = ' + sensorTag.type);

  sensorTag.connectAndSetUp(function(error) {
    if(error) {
      console.log("There's been an error connecting to the CC2650");
    }

    sensorTag.readFirmwareRevision(function(error, firmwareRevision) {
      console.log("firmware revision = " + firmwareRevision);
    });

    sensorTag.readDeviceName(function(error, deviceName) {
      console.log("device name = " + deviceName);
    });

    sensorTag.readSystemId(function(error, systemId) {
      console.log("system id = " + systemId)
    });

    sensorTag.readSerialNumber(function(error, serialNumber) {
      console.log("serial number = " + serialNumber);
    });

    sensorTag.readHardwareRevision(function(error, hardwareRevision) {
      console.log("hardware revision = " + hardwareRevision)
    });

    sensorTag.readSoftwareRevision(function(error, softwareRevision) {
      console.log("software revision = " + softwareRevision);
    });

    sensorTag.readManufacturerName(function(error, manufacturerName) {
      console.log("manufacturer name = " + manufacturerName);
      console.log("\nSTART READING RSSI: ");
      readRSSI(sensorTag);
    });
  });
}

SensorTag.discover(onDiscover);
