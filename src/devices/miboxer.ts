import * as exposes from '../lib/exposes';
import fz from '../converters/fromZigbee';
const e = exposes.presets;
import * as tuya from '../lib/tuya';

const definitions: Definition[] = [
    {
        fingerprint: [{modelID: 'TS0504B', manufacturerName: '_TZ3210_ttkgurpb'}],
        model: 'FUT038Z',
        description: 'RGBW LED controller',
        vendor: 'Miboxer',
        extend: tuya.extend.light_onoff_brightness_colortemp_color({colorTempRange: [153, 500]}),
    },
    {
        fingerprint: [{modelID: 'TS1002', manufacturerName: '_TZ3000_xwh1e22x'}],
        model: 'FUT089Z',
        vendor: 'MiBoxer',
        description: 'RGB+CCT Remote',
        fromZigbee: [fz.battery],
        toZigbee: [],
        exposes: [e.battery(), e.battery_voltage()],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await tuya.configureMagicPacket(device, coordinatorEndpoint, logger);
            await endpoint.command('genGroups', 'miboxerSetZones', {zones: [
                {zoneNum: 1, groupId: 101},
                {zoneNum: 2, groupId: 102},
                {zoneNum: 3, groupId: 103},
                {zoneNum: 4, groupId: 104},
                {zoneNum: 5, groupId: 105},
                {zoneNum: 6, groupId: 106},
                {zoneNum: 7, groupId: 107},
                {zoneNum: 8, groupId: 108},
            ]});
            await endpoint.command('genBasic', 'tuyaSetup', {}, {disableDefaultResponse: true});
        },
    },
];

module.exports = definitions;
