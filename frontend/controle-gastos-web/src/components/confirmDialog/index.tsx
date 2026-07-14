import Button from "../button";
import Modal from "../modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
    >
      <p>{message}</p>
      <div className="flex justify-end gap-md mt-lg">
        <Button
          variant="error"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="success"
          loading={loading}
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog;