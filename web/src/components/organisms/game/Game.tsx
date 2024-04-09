import { createSignal, type JSXElement } from 'solid-js';
import Tabs from './Tabs';
import Canvas from './Canvas';
import BlankTab from './BlankTab';
import Accommodation from './Accommodation';
import Bank from './Bank';
import Work from './Work';

export type PossibleTabs =
  | 'Blank Tab'
  | 'Canvas'
  | 'Accommodation Portal'
  | 'Work'
  | 'The Bank';

export default function Game() {
  const [tabNames, setTabNames] = createSignal<PossibleTabs[]>([]);

  const assignments = [];

  const [isGameStarted, setIsGameStarted] = createSignal<boolean>(false);
  const [selectedTab, setSelectedTab] = createSignal<number | null>(null);
  const [money, setMoney] = createSignal<number>(0);
  const weeklyRent = 510;

  const changeTab = (index: number) => {
    setSelectedTab(index);
  };

  const openNewTab = (tabName?: PossibleTabs) => {
    const newTabName: PossibleTabs = tabName || 'Blank Tab';
    if (tabNames().includes(newTabName)) {
      const tabNameIndex = tabNames().findIndex(
        (element) => element == newTabName
      );
      setSelectedTab(tabNameIndex);
    }
    setTabNames([...tabNames(), newTabName]);
    setSelectedTab(tabNames().length - 1);
  };

  const closeTab = (index: number) => {
    setTabNames(
      tabNames().filter((element, elementIndex) => index != elementIndex)
    );
    if (index == selectedTab()) {
      setSelectedTab(null);
    }
  };

  const getCurrentTab = (): JSXElement => {
    console.log(
      `selectedTab = ${selectedTab()}, ${tabNames()[selectedTab()!]}`
    );
    if (selectedTab() == null) {
      return <></>;
    }
    switch (tabNames()[selectedTab()!]) {
      case 'Blank Tab': {
        return (
          <BlankTab
            openNewTab={openNewTab}
            closeTab={closeTab}
            selectedTab={selectedTab}
          />
        );
      }
      case 'Canvas': {
        return <Canvas />;
      }
      case 'Accommodation Portal': {
        return <Accommodation />;
      }
      case 'The Bank': {
        return <Bank />;
      }
      case 'Work': {
        return <Work />;
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <div class="flex flex-row">
      <div class="w-[30%]">
        <Tabs
          names={tabNames}
          selectedName={selectedTab}
          onChange={changeTab}
          openNewTab={openNewTab}
          closeTab={closeTab}
        />
      </div>
      <div class="w-full">{getCurrentTab()}</div>
    </div>
  );
}
