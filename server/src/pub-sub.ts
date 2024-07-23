import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const getPubSub = () => pubsub;
