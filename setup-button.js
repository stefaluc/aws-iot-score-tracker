const deviceModule = require('aws-iot-device-sdk').device;

const TOPIC = 'button_message';

module.exports = () => {
  let certPath = '/home/lucas/aws/certs/';
  const device = deviceModule({
    keyPath: `${certPath}Desktop.private.key`,
    certPath: `${certPath}Desktop.cert.pem`,
    caPath: `${certPath}root-CA.crt`,
    clientId: 'Desktop',
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
