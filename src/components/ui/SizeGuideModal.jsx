import Modal from "./Modal";

const rows = [
  { size: "XS", bust: "80", waist: "62", hips: "88" },
  { size: "S", bust: "84", waist: "66", hips: "92" },
  { size: "M", bust: "88", waist: "70", hips: "96" },
  { size: "L", bust: "94", waist: "76", hips: "102" },
  { size: "XL", bust: "100", waist: "82", hips: "108" },
];

export default function SizeGuideModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-[600px]">
      <div className="p-40">
        <h3 className="font-heading text-h4 text-heading mb-8">Size Guide</h3>
        <p className="text-caption text-muted mb-32">All measurements in centimetres.</p>
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-b border-border text-tiny uppercase tracking-[0.08em] text-muted">
              <th className="text-left py-12">Size</th>
              <th className="text-left py-12">Bust</th>
              <th className="text-left py-12">Waist</th>
              <th className="text-left py-12">Hips</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.size} className="border-b border-border">
                <td className="py-12 text-charcoal">{r.size}</td>
                <td className="py-12 text-muted">{r.bust}</td>
                <td className="py-12 text-muted">{r.waist}</td>
                <td className="py-12 text-muted">{r.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
