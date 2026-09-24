import Button from './Button.jsx';
import Dialog from './Dialog.jsx';

/**
 * Confirmation for a destructive action — a sheet within thumb reach on
 * phones, a small centred window on the web.
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
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}) {
  return (
    <Dialog open={open} onClose={onClose} title={title} size="sm">
      <div className="px-screen pt-2 desktop:px-0 desktop:pt-0">
        {message ? <p className="text-bodysm text-ink-muted">{message}</p> : null}
        <div className="mt-5 flex flex-col gap-2 desktop:flex-row-reverse">
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
    </Dialog>
  );
}
