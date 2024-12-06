import EventEmitter from "events";
import { TestEvents } from "./types/test-events";

export const eventEmitter = new EventEmitter<TestEvents>();
