import { Msg, StringCodec, connect } from "nats";

async function natsMain() {
  const sc = StringCodec();
  try {
    const nc = await connect({servers: "nats://nats:4222"})
    console.log(`connected to ${nc.getServer()}`);
    const sub = nc.subscribe("tender:update", {callback: (err, msg) => {
        console.log(`received message [${sub.getProcessed()}]: ${sc.decode(msg.data)}`)
    }})
  } catch(err) {
    console.log(`error connecting to nats server`);
  }


}

natsMain();
