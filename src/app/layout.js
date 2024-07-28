

import "./globals.css";
import StoreProvider from "./StoreProvider";
import ToastProvider from "./ToastProvider";


export const metadata = {
  title: "codeManohar",
  description: "Generated by codeManohar and team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <StoreProvider>
          {children}
        </StoreProvider>
        <ToastProvider />

      </body>
    </html>
  );
}
