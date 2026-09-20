import Button from './Button.jsx';
import BottomSheet from './BottomSheet.jsx';

/**
 * Destructive-action confirmation, presented as a sheet so it stays reachable
 * with one thumb.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 * @param {string} props.title
 * @param {string} [props.message]
 * @param {string} [props.confirmLabel]
 * @param {string} [props.cancelLabel]
 */
export default function ConfirmSheet({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title={title}>
      <div className="px-screen pt-2">
        {message ? <p className="text-bodysm text-ink-muted">{message}</p> : null}
        <div className="mt-5 flex flex-col gap-2">
          <Button
            variant="danger"
            fullWidth
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </Button>
          <Button variant="ghost" fullWidth onClick={onClose}>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
