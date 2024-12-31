import ButtonHover from "../../../components/ButtonHover";

const modes = ["All", "Fundamental", "Nice to have", "Waste"];

type toolbarProps = { activeMode: { value: string } };
export default function Toolbar({ activeMode }: toolbarProps) {
  return (
    <div className="border-b-2 border-golden w-2/3 flex justify-center relative ">
      <div className="flex ~gap-5/12  ">
        {modes.map((mode) => (
          <ButtonHover
            key={mode}
            isActive={activeMode.value === mode}
            onClick={() => (activeMode.value = mode)}
            className="~text-xs/xl"
          >
            {mode}
          </ButtonHover>
        ))}
      </div>
    </div>
  );
}
