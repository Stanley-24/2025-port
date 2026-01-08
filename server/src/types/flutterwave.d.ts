// src/types/flutterwave.d.ts
declare module 'flutterwave-node-v3' {
  class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    Transaction: {
      initiate: (payload: any) => Promise<any>;
      verify: (payload: any) => Promise<any>;
    };
    Charge: {
      card: (payload: any) => Promise<any>;
      ng: (payload: any) => Promise<any>;
      // Add more if you use them
    };
    // Add other methods you use
  }

  export = Flutterwave;
}