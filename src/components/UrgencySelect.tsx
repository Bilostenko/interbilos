interface UrgencySelectProps {
  value: "routine" | "urgent" | "flash";
  onChange: (value: "routine" | "urgent" | "flash") => void;
}

export const UrgencySelect: React.FC<UrgencySelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-lg font-bold">Термін виконання</div>
      <div className="flex flex-row gap-2">
        {["routine", "urgent", "flash"].map((type) => (
          <label key={type} className="flex items-center gap-1">
            <input
              type="radio"
              name="urgency"
              value={type}
              checked={value === type}
              onChange={() => onChange(type as "routine" | "urgent" | "flash")}
            />
            <span>
              {type === "routine" ? "Рутинна" : type === "urgent" ? "Терміново" : "Швидко"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

