import { usePlatform } from '@/app/platform/PlatformProvider.jsx';
import BottomSheet from './BottomSheet.jsx';
import Modal from './Modal.jsx';

/**
 * One overlay API for both interfaces: a bottom sheet on phones, a centred
 * window on the web. Features never branch on platform themselves.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.title]
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size] Desktop width; ignored on phones.
 * @param {string} [props.className]
 */
export default function Dialog({ open, onClose, children, title, size = 'md', className }) {
  const { isDesktop } = usePlatform();

  return isDesktop ? (
    <Modal open={open} onClose={onClose} title={title} size={size} className={className}>
      {children}
    </Modal>
  ) : (
    <BottomSheet open={open} onClose={onClose} title={title} className={className}>
      {children}
    </BottomSheet>
  );
}
