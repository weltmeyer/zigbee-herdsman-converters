import fz from '../converters/fromZigbee';
import * as exposes from '../lib/exposes';
import reporting from '../lib/reporting';
const e = exposes.presets;

const definitions: Definition[] = [
    {
        zigbeeModel: ['WaterLeakageSensor-ZB3.0'],
        model: 'S900W-ZG',
        vendor: 'HZC',
        description: 'Water leak sensor',
        fromZigbee: [fz.ias_water_leak_alarm_1, fz.battery],
        toZigbee: [],
        exposes: [e.water_leak(), e.battery_low(), e.battery()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genPowerCfg']);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ['HZC Electric motion sensor'],
        model: 'S902M-ZG',
        vendor: 'HZC',
        description: 'Motion sensor',
        fromZigbee: [fz.ias_occupancy_alarm_1, fz.battery, fz.illuminance],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.battery(), e.illuminance(), e.tamper()],
    },
];

module.exports = definitions;
