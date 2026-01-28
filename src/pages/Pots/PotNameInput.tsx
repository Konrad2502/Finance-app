type PotNameInputProps = {
  value: string;
  maxLength: number;
  error: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
};

export default function PotNameInput({
  value,
  maxLength,
  error,
  inputRef,
  onChange,
}: PotNameInputProps) {
  const charsLeft = maxLength - value.length;

  return (
    <div className="pots-modal__field">
      <label className="pots-modal__label">Pot Name</label>

      <input
        ref={inputRef}
        className={`pots-modal__input ${
          error ? "pots-modal__input--error" : ""
        }`}
        type="text"
        placeholder="e.g. Rainy Days"
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />

      <div
        className={`pots-modal__hint ${
          error ? "pots-modal__hint--between" : ""
        }`}
      >
        {error && <span className="pots-modal__error">{error}</span>}
        <span>{charsLeft} characters left</span>
      </div>
    </div>
  );
}
