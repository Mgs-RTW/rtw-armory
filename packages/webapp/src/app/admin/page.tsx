"use client";
import { useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { client } from "@/util";
import styles from "./page.module.scss";
import { CommanderForm } from "./tabs/CommanderForm";
import { CreateGearForm } from "./tabs/GearForm";

const Null = () => null;

const tabs = [
  {
    label: "Commander",
    component: <CommanderForm />,
  },
  {
    label: "Gear",
    component: <CreateGearForm />,
  },
];

export default function AdminPage() {
  useEffect(() => {
    client.post("/login", {
      email: "kevin.nemec94@gmail.com",
      password: "password",
    });
  }, []);

  return (
    <div className={styles.root}>
      <Tabs.Root defaultValue="Commander" className={styles.TabsRoot}>
        <Tabs.List className={styles.TabsList}>
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.label}
              value={tab.label}
              className={styles.TabsTrigger}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Content
            key={tab.label}
            value={tab.label}
            className={styles.TabsContent}
          >
            {tab.component}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
