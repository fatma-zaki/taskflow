import { Download, FileText, ImageIcon, Trash2 } from 'lucide-react';
import { IconBadge } from '@/shared/components';
import { formatFileSize } from '@/shared/utils/file.js';
import { formatShortDate } from '@/shared/utils/date.js';

/**
 * @param {Object} props
 * @param {import('@/shared/types').Attachment[]} props.attachments
 * @param {(attachment: import('@/shared/types').Attachment) => void} props.onDownload
 * @param {(attachment: import('@/shared/types').Attachment) => void} [props.onDelete]
 */
export default function AttachmentList({ attachments, onDownload, onDelete }) {
  if (attachments.length === 0) {
    return <p className="px-1 text-sub text-ink-muted">No files attached yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {attachments.map((attachment) => {
        const isImage = attachment.mimetype?.startsWith('image/');

        return (
          <li
            key={attachment._id}
            className="flex min-h-touch items-center gap-3 rounded-card border border-line bg-surface px-3 py-2.5"
          >
            <IconBadge
              size="sm"
              tone="neutral"
              icon={isImage ? <ImageIcon /> : <FileText />}
            />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sub font-semibold text-ink">{attachment.originalname}</span>
              <span className="block text-caption text-ink-muted">
                {formatFileSize(attachment.size)} · {formatShortDate(attachment.createdAt)}
              </span>
            </span>
            <button
              type="button"
              aria-label={`Download ${attachment.originalname}`}
              onClick={() => onDownload(attachment)}
              className="press rounded-full p-2 text-ink-muted active:bg-surface-muted"
            >
              <Download size={16} />
            </button>
            {onDelete ? (
              <button
                type="button"
                aria-label={`Delete ${attachment.originalname}`}
                onClick={() => onDelete(attachment)}
                className="press rounded-full p-2 text-danger active:bg-danger-soft"
              >
                <Trash2 size={16} />
              </button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
