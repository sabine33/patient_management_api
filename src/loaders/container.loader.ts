import { asyncForEach } from "@/helpers";
import LoggerInstance from "@/loaders/logger.loader";
import AuthService from "@/services/auth.service";
import "reflect-metadata";
import { Container, Inject, Service, Token } from "typedi";

type containerType = { key: String; object: Object };

export default async (containers: containerType[]) => {
  try {
    await asyncForEach(containers, async (item) => {
      Container.set(`${item.key}`, item.object);
    });
    LoggerInstance.info("✌️injected into container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on container loading process: %o", e);
    throw e;
  }
};
