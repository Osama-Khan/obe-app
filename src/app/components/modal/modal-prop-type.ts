export type ModalPropType = {
  /** Should the modal be shown */
  visible: boolean;

  /** Content of the modal */
  children: React.ReactNode;

  /** Called when the user taps anywhere outside the modal */
  onDismiss: () => void;
};
