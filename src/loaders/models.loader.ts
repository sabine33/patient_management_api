import { asyncForEach } from "@/helpers";
import { Container } from "typedi";
import LoggerInstance from "./logger.loader";

type ModelsType = { models: { name: string; model: any }[] };
export default ({ models }: ModelsType) => {
  try {
    asyncForEach(models, async (m) => {
      Container.set(m.name, m.model);
    });
    LoggerInstance.info("🙂 Models Loaded.");
  } catch (ex) {
    LoggerInstance.error(ex?.message);
  }
};
