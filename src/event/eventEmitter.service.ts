import {Inject, Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class EventEmitterService {
  constructor(private eventEmitter: EventEmitter2) {}

    emitEvent(event: string, payload: any) {
        console.log("2");
        this.eventEmitter.emit(event, payload)
    }
}
