// This file is intentionally empty to remove the custom layout
// that was causing hydration errors

export default function ScaleExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="m-0 p-0 overflow-hidden">
        {children}
      </body>
    </html>
  );
} 