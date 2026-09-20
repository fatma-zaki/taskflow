/**
 * The phone frame. Content is capped at the design's 430px and centred, so the
 * app reads as a mobile product on any viewport rather than a stretched page.
 *
 * `transform-gpu` makes this column the containing block for its fixed
 * children, which keeps the bottom navigation, the FAB and pinned footers
 * inside the frame on large screens.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export default function AppShell({ children }) {
  return (
    <div className="fixed inset-0 flex justify-center bg-app">
      <div className="relative flex h-full w-full max-w-app transform-gpu flex-col overflow-hidden bg-app sm:border-x sm:border-line">
        {children}
      </div>
    </div>
  );
}
