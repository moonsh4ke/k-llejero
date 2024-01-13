import { Msg, StringCodec, connect } from "nats";

async function natsMain() {
  // const sc = StringCodec();
  // try {
  //   const nc = await connect({servers: "nats://nats:4222"})
  //   console.log(`connected to ${nc.getServer()}`);
  //   const sub = nc.subscribe("tracking:tender_update", {callback: (err, msg) => {
  //       console.log(`received message [${sub.getProcessed()}]: ${sc.decode(msg.data)}`)
  //   }})
  //   const sub2 = nc.subscribe("tracking:created", {callback: (err, msg) => {
  //     console.log(`received message [${sub.getProcessed()}]: ${sc.decode(msg.data)}`)
  // }})
  // const sub3 = nc.subscribe("notification:tracking_update", {callback: (err, msg) => {
  //   console.log(`received message [${sub3.getProcessed()}]: ${sc.decode(msg.data)}`)
  // }})
  // const sub4 = nc.subscribe("notification:tracking_notify", {callback: (err, msg) => {
  //   console.log(`received message [${sub4.getProcessed()}]: ${sc.decode(msg.data)}`)
  // }})
  // } catch(err) {
  //   console.log(`error connecting to nats server`);
  // }

}

natsMain();
