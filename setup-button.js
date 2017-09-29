const deviceModule = require('aws-iot-device-sdk').device;

const TOPIC = 'button_message';

module.exports = () => {
  let certPath = '/home/stefaluc/aws-iot-score-tracker/certs/';
  const device = deviceModule({
    keyPath: `${certPath}Laptop.private.key`,
    certPath: `${certPath}Laptop.cert.pem`,
    caPath: `${certPath}root-CA.crt`,
    clientId: 'Laptop',
    host: 'akm6bi8kvgkg8.iot.us-west-2.amazonaws.com',
  });

  // device event listeners
  device.on('connect', () => {
    console.log('Connected to AWS IoT');
    device.subscribe(TOPIC);
  });
  device.on('close', () => {
    console.log('close');
  });
  device.on('reconnect', () => {
    console.log('reconnect');
  });
  device.on('offline', () => {
    console.log('offline');
  });
  device.on('error', (error) => {
    console.log('error', error);
  });

  return device;
}
