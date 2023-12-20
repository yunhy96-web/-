import * as Style from "./style";

type Props<T> = {
  list: T[];
  onClick: (index: T) => void;
  selected: T;
};

const Tab = <T extends string>({ list, onClick, selected }: Props<T>) => {
  return (
    <Style.Tab>
      {list.map((item) => (
        <Style.TabItem
          key={item}
          isSelected={selected === item}
          onClick={() => onClick(item)}
        >
          {item}
        </Style.TabItem>
      ))}
    </Style.Tab>
  );
};

export default Tab;
