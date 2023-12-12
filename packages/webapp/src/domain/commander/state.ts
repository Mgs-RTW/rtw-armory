import { create } from "zustand";
import { produce } from "immer";
import { useShallow } from "zustand/react/shallow";
import { Commander, Gear, GearSlot } from "@lotr-rtw/service-types";

type CommanderGearGraph = Record<string, Record<GearSlot, Gear | undefined>>;

interface CommanderGearStore {
  prepare: (commanders: Commander[]) => void;
  equip: (commanderId: string, gear: Gear) => void;
  unEquip: (commanderId: string, slot: GearSlot) => void;
  graph: Record<string, Record<GearSlot, Gear | undefined>>;
}

export const useCommanderGearStore = create<CommanderGearStore>((set) => ({
  graph: {},
  prepare: (commanders) => {
    const preparedGraph = commanders.reduce<CommanderGearGraph>(
      (acc, commander) => {
        acc[commander.id] = {
          accessory: undefined,
          armour: undefined,
          hand: undefined,
          head: undefined,
          relic: undefined,
        };
        return acc;
      },
      {}
    );
    set({ graph: preparedGraph });
  },
  unEquip: (commanderId, slot) => {
    set(
      produce<CommanderGearStore>((state) => {
        state.graph[commanderId][slot] = undefined;
      })
    );
  },
  equip: (commanderId, gear) =>
    set(
      produce<CommanderGearStore>((state) => {
        state.graph[commanderId][gear.slot] = gear;
      })
    ),
}));

interface CommanderStore {
  commander: Commander | undefined;
  setCommander: (commander: Commander) => void;
}

const _useCommanderStore = create<CommanderStore>((set) => ({
  commander: undefined,
  setCommander: (commander: Commander) => set({ commander }),
}));

export const useCommanderStore = () => {
  const [commander, setCommander] = _useCommanderStore(
    useShallow((state) => [state.commander, state.setCommander])
  );
  return [commander, setCommander] as const;
};
