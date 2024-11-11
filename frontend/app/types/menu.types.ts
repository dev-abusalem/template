import { Dispatch, SetStateAction } from "react";

export interface MENU_PROPS {
    showItems: string,
    setShowItems:Dispatch<SetStateAction<string>>
  }