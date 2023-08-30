"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestReadingByTimestamp = exports.processReadingsPromise = exports.filterObjectsBySensorID = void 0;
function filterObjectsBySensorID(sensorID, readings) {
    var filteredList = readings.filter(function (reading) { return reading.sensorId === sensorID; });
    return filteredList;
}
exports.filterObjectsBySensorID = filterObjectsBySensorID;
function processReadingsPromise(sensorID, readingsPromise) {
    return __awaiter(this, void 0, void 0, function () {
        var readings, filteredList, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, readingsPromise];
                case 1:
                    readings = _a.sent();
                    filteredList = readings.filter(function (reading) { return reading.sensorId === sensorID; });
                    return [2 /*return*/, filteredList];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.processReadingsPromise = processReadingsPromise;
function getLatestReadingByTimestamp(readings) {
    var latestReadingsMap = new Map();
    readings.forEach(function (reading) {
        var existingReading = latestReadingsMap.get(reading.sensorId);
        if (!existingReading || reading.timestamp > existingReading.timestamp) {
            latestReadingsMap.set(reading.sensorId, reading);
        }
    });
    var latestReadingSortedByTimestamp = Array.from(latestReadingsMap.values());
    var latestReading = latestReadingSortedByTimestamp.reduce(function (acc, _a) {
        var sensorId = _a.sensorId;
        acc[sensorId] = "latest reading with id ".concat(sensorId);
        return acc;
    }, {});
    return latestReading;
}
exports.getLatestReadingByTimestamp = getLatestReadingByTimestamp;
var getMockReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
            case 1:
                _a.sent();
                return [2 /*return*/, [
                        {
                            id: 1,
                            sensorType: 'air',
                            sensorValue: 14,
                            timestamp: '2023-08-20T12:52:48.775Z'
                        },
                        {
                            id: 2,
                            sensorType: 'humidity',
                            sensorValue: 0.8,
                            timestamp: '2023-08-22T12:52:48.775Z'
                        },
                        {
                            id: 3,
                            sensorType: 'temperature', sensorValue: 21,
                            timestamp: '2023-08-23T12:52:48.775Z'
                        }
                    ]];
        }
    });
}); };
function checkAirQuality(reading) {
    return reading.sensorType == 'air' && reading.sensorValue > 12;
}
function checkHumidityQuality(reading) {
    return reading.sensorType == 'humidity' && reading.sensorValue > 1;
}
function checkTemperature(reading) {
    return reading.sensorType == 'temperature' && reading.sensorValue > 25;
}
function checkUpperThresholds() {
    return __awaiter(this, void 0, void 0, function () {
        var allSensorReadings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMockReadings()];
                case 1:
                    allSensorReadings = _a.sent();
                    if (allSensorReadings) {
                        allSensorReadings.forEach(function (reading) {
                            if (checkAirQuality(reading))
                                console.error("Air value has exceeded threshold");
                            if (checkHumidityQuality(reading))
                                console.error("Humidity value has excceded threshold");
                            if (checkTemperature(reading))
                                console.error("Humidity value has excceded threshold");
                            ;
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
