import React from "react";
import { TurnSummaryModel } from "../../state/GameState";
import { CenteredColumn } from "../common/LayoutElements";
import { Spectrum } from "../common/Spectrum";

import { useTranslation } from "react-i18next";

export function PreviousTurnResult(props: TurnSummaryModel) {
  const { t } = useTranslation();
  const style: React.CSSProperties = {
    borderTop: "1px solid black",
    margin: 16,
    paddingTop: 16,
  };

  const glassStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
  };

  return (
    <div style={style}>
      <CenteredColumn>
        <em>{t("previousturnresult.previous_game")}</em>
      </CenteredColumn>
      <div
        style={{
          position: "relative",
        }}
      >
        <div style={glassStyle} />
        <Spectrum
          spectrumCard={props.spectrumCard}
          handleValue={props.guess}
          targetValue={props.spectrumTarget}
        />
        <CenteredColumn>
          <div>
            {t("previousturnresult.player_clue", {
              givername: props.clueGiverName,
            })}
            : <strong>{props.clue}</strong>
          </div>
        </CenteredColumn>
      </div>
    </div>
  );
}
