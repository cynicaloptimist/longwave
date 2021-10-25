import { ReactChild, Suspense } from "react";
import { GameState } from "../../state/GameState";
import { BuildGameModel } from "../../state/BuildGameModel";
import { GameModelContext } from "../../state/GameModelContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";

export function TestContext(props: {
  gameState: GameState;
  playerId: string;
  children: ReactChild;
  setState?: (newState: Partial<GameState>) => void;
}) {
  return (
    <GameModelContext.Provider
      value={BuildGameModel(
        props.gameState,
        props.setState || jest.fn(),
        props.playerId,
        () => ["left", "right"],
        () => {}
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>
      </Suspense>
    </GameModelContext.Provider>
  );
}
