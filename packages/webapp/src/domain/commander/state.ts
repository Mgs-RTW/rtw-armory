import { create } from "zustand";
import { produce } from "immer";
import { useShallow } from "zustand/react/shallow";
import { ApiCommander, ApiGear, GearSlot } from "@lotr-rtw/service-types";

const COMMANDER_MAX_LEVEL = 50;

type CommanderGearGraph = Record<string, Record<GearSlot, ApiGear | undefined>>;

interface CommanderGearStore {
  prepare: (commanders: ApiCommander[]) => void;
  equip: (commanderId: string, gear: ApiGear) => void;
  unEquip: (commanderId: string, slot: GearSlot) => void;
  graph: Record<string, Record<GearSlot, ApiGear | undefined>>;
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

export const useCommanderAttackDamage = () => {
  const [commander] = useCommanderStore();

  if (!commander) {
    return 0;
  }

  return (
    Number(commander.baseData.attack) +
    Number(commander.baseData.attackScalePerLevel) * COMMANDER_MAX_LEVEL
  );
};

interface CommanderStore {
  commander: ApiCommander | undefined;
  setCommander: (commander: ApiCommander) => void;
}

const _useCommanderStore = create<CommanderStore>((set) => ({
  commander: undefined,
  setCommander: (commander: ApiCommander) => set({ commander }),
}));

export const useCommanderStore = () => {
  const [commander, setCommander] = _useCommanderStore(
    useShallow((state) => [state.commander, state.setCommander])
  );
  return [commander, setCommander] as const;
};
