type TCallFn = () => void | TResultFn;

type TResultFn =
  | {
      payload: {
        ok: boolean;
        type: string;
      };
    }
  | {
      type: string;
    }
  | undefined;

export class Polling {
  callFn: TCallFn | undefined = undefined;
  intervalId: NodeJS.Timeout | null | number = null;
  delayCallFn: number = 5000;

  constructor(delay: number) {
    this.delayCallFn = delay;
  }

  setCallFn(fn: () => void) {
    this.callFn = fn;
    return this;
  }

  async callCurrentFn() {
    if (!!this.callFn) {
      const res = this.callFn && (await this.callFn());
      this.checkResult(res);
    }
    return this;
  }

  startPolling() {
    if (!!this.callFn && !this.intervalId) {
      this.intervalId = setInterval(async () => {
        const res = this.callFn && (await this.callFn());
        this.checkResult(res);
      }, this.delayCallFn);
    }
  }

  checkResult(res: void | TResultFn) {
    if (!!res && typeof res === "object" && "type" in res && res.type.includes("fulfilled")) {
      this.stopPolling();
      return;
    }
    if (typeof res === "object" && "payload" in res && res.payload.ok) {
      this.stopPolling();
      return;
    }
    this.startPolling();
  }

  stopPolling() {
    this.intervalId && clearInterval(this.intervalId);
    this.callFn = undefined;
  }
}
