interface ToggleProps {
  item: string;
  showItems: string;
  setShowItems: React.Dispatch<React.SetStateAction<string>>;
}

export function handleToggle({ item, showItems, setShowItems }: ToggleProps) {
  if (showItems === item) {
    setShowItems("");
  } else {
    setShowItems(item);
  }
}
