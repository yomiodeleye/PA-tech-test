import {Reading,filterObjectsBySensorID} from "../index"


describe("Testting filter object function", () => {
    const testData: Reading[] = [
        {
            sensorId: 1,
            timestamp: '2023-08-20T12:52:48.775Z',
            sensorType: "air",
            sensorValue: 5
        },
        {
            sensorId: 2,
            timestamp: '2023-08-20T12:52:46.442Z',
            sensorType: "humidity",
            sensorValue: 2
        },
        {
            sensorId: 1,
            timestamp: '2023-08-20T12:52:48.775Z',
            sensorType: "temperature",
            sensorValue: 5
        }
    ]
    test("should return 2 readings", () => {
        const result = filterObjectsBySensorID(1, testData)
        expect(result.length).toBe(2)
        expect(result).not.toBe(null)
    })
    test("should return 1 readings", () => {
        const result = filterObjectsBySensorID(2, testData)
        expect(result.length).toBe(1)
        expect(result).not.toBe(null)
    })
    test("should return 1 readings", () => {
        const result = filterObjectsBySensorID(3, testData)
        expect(result.length).toBe(0)
    })
})