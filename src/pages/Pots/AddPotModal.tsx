import "./Pots.scss";
import CloseBtn from "../../assets/images/icon-close-modal.svg";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPot, updatePot } from "../../features/potSlice/potSlice";
import { selectUsedThemesPot } from "../../features/potSlice/potSelectors";
import PotNameInput from "./PotNameInput";
import PotTargetInput from "./PotTargetInput";
import PotThemeSelect from "./PotThemeSelect";
import { colorOptions, type ColorOption } from "../../utils/helpers";

/* ===== OPTIONS ===== */

type OpenColor = "active" | null;

type AddPotModalProps = {
  title: string;
  charMax: number;
  description: string;
  btnText: string;
  mode: "add" | "edit";
  closeModal: () => void;
  selectPot?: number;
};

export default function AddPotModal({
  title,
  charMax,
  description,
  btnText,
  closeModal,
  mode,
  selectPot,
}: AddPotModalProps) {
  const dispatch = useAppDispatch();

  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState("");
  const [color, setColor] = useState<ColorOption>("green");
  const [openColor, setOpenColor] = useState<OpenColor>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [targetError, setTargetError] = useState<string | null>(null);
  const [colorError, setColorError] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const targetInputRef = useRef<HTMLInputElement | null>(null);
  const colorRef = useRef<HTMLDivElement | null>(null);

  const usedThemes = useAppSelector(selectUsedThemesPot);
  const selectedColor = colorOptions.find((c) => c.value === color);
  const isThemeUsed = (c: ColorOption) => usedThemes.includes(c);

  const handleSubmit = () => {
    const trimmedName = potName.trim();
    const targetNumber = Number(target);

    if (!trimmedName) {
      setNameError("Pot name is required");
      nameInputRef.current?.focus();
      return;
    }

    if (!Number.isFinite(targetNumber) || targetNumber <= 0) {
      setTargetError("Please enter a valid amount");
      targetInputRef.current?.focus();
      return;
    }

    if (isThemeUsed(color)) {
      setColorError("Color already selected");
      return;
    }

    if (mode === "add") {
      dispatch(
        addPot({ name: trimmedName, target: targetNumber, theme: color })
      );
    }

    if (mode === "edit" && selectPot) {
      dispatch(
        updatePot({
          id: selectPot,
          name: trimmedName,
          target: targetNumber,
          theme: color,
        })
      );
    }

    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (openColor && colorRef.current && !colorRef.current.contains(t)) {
        setOpenColor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openColor]);

  return (
    <>
      <div className="pots-modal__overlay" />

      <div className="pots-modal" role="dialog" aria-modal="true">
        <header className="pots-modal__header">
          <h2 className="pots-modal__title">{title}</h2>
          <button className="pots-modal__close" onClick={closeModal}>
            <img src={CloseBtn} alt="Close modal" />
          </button>
        </header>

        <p className="pots-modal__desc">{description}</p>

        <PotNameInput
          value={potName}
          maxLength={charMax}
          error={nameError}
          inputRef={nameInputRef}
          onChange={(v) => {
            setPotName(v);
            if (nameError) setNameError(null);
          }}
        />

        <PotTargetInput
          value={target}
          error={targetError}
          inputRef={targetInputRef}
          onChange={(v) => {
            setTarget(v);
            if (targetError) setTargetError(null);
          }}
        />

        <PotThemeSelect
          selected={selectedColor}
          options={colorOptions}
          error={colorError}
          isUsed={isThemeUsed}
          isOpen={openColor === "active"}
          dropdownRef={colorRef}
          onToggle={() => {
            setOpenColor((p) => (p ? null : "active"));
            setColorError(null);
          }}
          onSelect={(c) => {
            setColor(c);
            setOpenColor(null);
          }}
        />

        <button className="pots-modal__submit" onClick={handleSubmit}>
          {btnText}
        </button>
      </div>
    </>
  );
}
