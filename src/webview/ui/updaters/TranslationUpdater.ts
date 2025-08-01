import { $$, t } from "../../util";
import { useTranslationUpdater } from "../react/contexts/TranslationContext";

export function TranslationUpdater() {
  console.time("TranslationUpdater");

  $$("[data-l10n]").forEach((el) => {
    el.innerHTML = t(el.dataset.l10n as string).replace(/`(\S[^`]{1,}\S)`/g, (str) => {
      const content = str.substring(1, str.length - 1);
      return `<code>${content}</code>`;
    });
  });

  useTranslationUpdater.getState().updateTranslation();

  console.timeEnd("TranslationUpdater");
}
