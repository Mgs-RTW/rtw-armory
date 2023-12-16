"use client";

import { GearSlot as Slot } from "@lotr-rtw/service-types";
import { Image, Select, SelectItem } from "@/components";
import { useGearBySlotQuery } from "@/domain/gear";
import styles from "./gear-slot.module.scss";
import { useCommanderGearStore, useCommanderStore } from "@/domain/commander";

interface Props {
  slot: Slot;
}

export const GearSlot = ({ slot }: Props) => {
  const [commander] = useCommanderStore();
  const { data } = useGearBySlotQuery(commander!.raceId, slot);
  const graph = useCommanderGearStore((state) => state.graph);
  const equip = useCommanderGearStore((state) => state.equip);
  const equipped = graph[commander!.id][slot];

  const handleValueChange = (gearId: string) => {
    const gearPiece = data?.find((gear) => gear.id === gearId);
    if (gearPiece) {
      equip(commander!.id, gearPiece);
    }
  };

  return (
    <Select
      value={equipped?.id}
      onValueChange={handleValueChange}
      showValue={false}
      trigger={
        <>
          <div
            className={styles.slot}
            data-slot={slot}
            data-state={equipped ? "equipped" : "un-equipped"}
          >
            {equipped && <Image alt="" src={equipped.image} />}
          </div>
        </>
      }
    >
      {data?.map((gear) => (
        <SelectItem key={gear.id} value={gear.id}>
          <div className={styles.GearPiece}>
            <div className={styles.image}>
              <Image alt={gear.description} src={gear.image} />
            </div>
            <p>{gear.name}</p>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
};
