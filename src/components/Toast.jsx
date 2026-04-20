export default function Toast({ toast }) { return toast ? <div className={`toast ${toast.type}`}>{toast.message}</div> : null; }
