import { Paperclip, X } from 'lucide-react';
import { cn } from '@/shared/utils/cn.js';
import { formatFileSize } from '@/shared/utils/file.js';

/**
 * Attachment picker styled as a form row.
 *
 * @param {Object} props
 * @param {string} props.label
 * @param {File | null} props.file
 * @param {(file: File | null) => void} props.onChange
 * @param {string} [props.accept]
 * @param {string} [props.className]
 */
export default function FilePickerRow({ label, file, onChange, accept, className }) {
  return (
    <div className={cn('relative flex min-h-touch items-center gap-3 px-4 py-3', className)}>
      <Paperclip size={18} className="shrink-0 text-ink-faint" />
      <span className="min-w-0 flex-1">
        <span className="block text-bodysm font-semibold text-ink">{label}</span>
        {file ? (
          <span className="mt-0.5 block truncate text-sub text-ink-muted">
            {file.name} · {formatFileSize(file.size)}
          </span>
        ) : null}
      </span>

      {file ? (
        <button
          type="button"
          aria-label="Remove attachment"
          onClick={() => onChange(null)}
          className="press relative z-10 rounded-full p-2 text-ink-faint active:bg-surface-muted"
        >
          <X size={16} />
        </button>
      ) : null}

      {file ? null : (
        <input
          type="file"
          accept={accept}
          aria-label={label}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      )}
    </div>
  );
}
