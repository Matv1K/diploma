/* eslint-disable no-unused-vars */

export {};

interface GoogleSignInResponse {
  credential: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (
            options: { client_id: string | undefined; callback: (response: GoogleSignInResponse) => void
        }) => void;
          renderButton: (element: HTMLElement | null, options: { size: string; text: string }) => void;
          disableAutoSelect: () => void;
          revoke: (credential: string, callback: (response: any) => void) => void;
        };
      };
    };
  }
}
