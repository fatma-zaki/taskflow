/**
 * The shared design system.
 *
 * Everything here is platform-neutral: the same components render on the phone
 * screens and in the web app, adapting through their props or, for overlays,
 * through `Dialog`. Platform-specific chrome lives in `shared/components/web`.
 */
export { default as Avatar } from './Avatar.jsx';
export { default as Badge } from './Badge.jsx';
export { default as Banner } from './Banner.jsx';
export { default as BottomSheet } from './BottomSheet.jsx';
export { default as BrandLogo } from './BrandLogo.jsx';
export { default as Button } from './Button.jsx';
export { default as Card } from './Card.jsx';
export { default as ConfirmDialog } from './ConfirmDialog.jsx';
export { default as DateTimeRow } from './DateTimeRow.jsx';
export { default as Dialog } from './Dialog.jsx';
export { default as EmptyState } from './EmptyState.jsx';
export { default as Fab } from './Fab.jsx';
export { default as FilePickerRow } from './FilePickerRow.jsx';
export { default as FilterChips } from './FilterChips.jsx';
export { default as FormRow } from './FormRow.jsx';
export { default as IconBadge } from './IconBadge.jsx';
export { default as IconButton } from './IconButton.jsx';
export { default as ListRow } from './ListRow.jsx';
export { default as Modal } from './Modal.jsx';
export { default as OptionPicker } from './OptionPicker.jsx';
export { default as ProgressRing } from './ProgressRing.jsx';
export { default as RowGroup } from './RowGroup.jsx';
export { default as Screen } from './Screen.jsx';
export { default as ScreenHeader } from './ScreenHeader.jsx';
export { default as SearchInput } from './SearchInput.jsx';
export { default as Section } from './Section.jsx';
export { default as Skeleton } from './Skeleton.jsx';
export { default as Spinner } from './Spinner.jsx';
export { default as StatTile } from './StatTile.jsx';
export { default as TextAreaField } from './TextAreaField.jsx';
export { default as TextField } from './TextField.jsx';
export { default as TextLink } from './TextLink.jsx';
export { default as ClipboardIllustration } from './illustrations/ClipboardIllustration.jsx';
export { default as SproutIllustration } from './illustrations/SproutIllustration.jsx';

/* Web-only building blocks — the phone screens never import these. */
export { default as DataTable } from './web/DataTable.jsx';
export { default as DateTimeField } from './web/DateTimeField.jsx';
export { default as InputField } from './web/InputField.jsx';
export { default as Page } from './web/Page.jsx';
export { default as PageHeader } from './web/PageHeader.jsx';
export { default as Panel } from './web/Panel.jsx';
export { default as SelectField } from './web/SelectField.jsx';
export { default as TextAreaInput } from './web/TextAreaInput.jsx';
export { default as Toolbar } from './web/Toolbar.jsx';
export { default as MenuDropdown } from './web/MenuDropdown.jsx';
