type PotTargetInputProps = {
  value: string;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
};

export default function PotTargetInput({
  value,
  error,
  inputRef,
  onChange,
}: PotTargetInputProps) {
  return (
    <div className="pots-modal__field">
      <label className="pots-modal__label">Target</label>

      <div
        className={`pots-modal__money-input ${
          error ? "pots-modal__money-input--error" : ""
        }`}
      >
        <span className="pots-modal__currency">$</span>
        <input
          ref={inputRef}
          className="pots-modal__money"
          type="text"
          placeholder="e.g. 2000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {error && <span className="pots-modal__error">{error}</span>}
    </div>
  );
}
