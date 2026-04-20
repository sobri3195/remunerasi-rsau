export default function ConfirmModal({ open, title, onConfirm, onClose }) {
  if (!open) return null;
  return <div className="modal-backdrop"><div className="modal"><h3>{title}</h3><div className="row"><button className="btn danger" onClick={onConfirm}>Hapus</button><button className="btn" onClick={onClose}>Batal</button></div></div></div>;
}
