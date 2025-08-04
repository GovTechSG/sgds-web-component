import { html } from "lit-html";
import { iconRegistry } from "../../../src/components/Icon/icon-registry";

export const Template = args => {
  return html` <div>
    ${Object.keys(iconRegistry).map(
      i => html`
        <sgds-tooltip content=${i}>
          <sgds-icon name=${i} size=${args.size}></sgds-icon>
        </sgds-tooltip>
      `
    )}
  </div>`;
};

export const args = {};

export const parameters = {
  docs: {
    source: {
      code: `
          <sgds-icon name="arrow-bar-down"></sgds-icon>
      
          <sgds-icon name="arrow-bar-left"></sgds-icon>
      
          <sgds-icon name="arrow-bar-right"></sgds-icon>
      
          <sgds-icon name="arrow-bar-up"></sgds-icon>
      
          <sgds-icon name="arrow-clockwise"></sgds-icon>
      
          <sgds-icon name="arrow-down"></sgds-icon>
      
          <sgds-icon name="arrow-left"></sgds-icon>
      
          <sgds-icon name="arrow-repeat"></sgds-icon>
      
          <sgds-icon name="arrow-right"></sgds-icon>
      
          <sgds-icon name="arrow-up"></sgds-icon>
      
          <sgds-icon name="bank-fill"></sgds-icon>
      
          <sgds-icon name="bell-slash"></sgds-icon>
          
          <sgds-icon name="bell"></sgds-icon>
      
          <sgds-icon name="bi-funnel"></sgds-icon>
      
          <sgds-icon name="bookmark-fill"></sgds-icon>
          
          <sgds-icon name="bookmark"></sgds-icon>
      
          <sgds-icon name="box-arrow-up-right"></sgds-icon>
      
          <sgds-icon name="box-seam"></sgds-icon>
      
          <sgds-icon name="building"></sgds-icon>
      
          <sgds-icon name="calculator"></sgds-icon>
      
          <sgds-icon name="calendar-check"></sgds-icon>
          
          <sgds-icon name="calendar-x"></sgds-icon>
          
          <sgds-icon name="calendar"></sgds-icon>
      
          <sgds-icon name="camera"></sgds-icon>
      
          <sgds-icon name="chat-left-text"></sgds-icon>
      
          <sgds-icon name="check-circle-fill"></sgds-icon>
          
          <sgds-icon name="check-circle"></sgds-icon>
          
          <sgds-icon name="check"></sgds-icon>
      
          <sgds-icon name="chevron-down"></sgds-icon>
      
          <sgds-icon name="chevron-left"></sgds-icon>
      
          <sgds-icon name="chevron-right"></sgds-icon>
      
          <sgds-icon name="chevron-up"></sgds-icon>
      
          <sgds-icon name="clock"></sgds-icon>
      
          <sgds-icon name="cloud-check"></sgds-icon>
          
          <sgds-icon name="cloud-download"></sgds-icon>
          
          <sgds-icon name="cloud-upload"></sgds-icon>
          
          <sgds-icon name="cloud"></sgds-icon>
      
          <sgds-icon name="compass"></sgds-icon>
      
          <sgds-icon name="cross"></sgds-icon>
      
          <sgds-icon name="cursor-fill"></sgds-icon>
          
          <sgds-icon name="cursor"></sgds-icon>
          
          <sgds-icon name="dash-circle"></sgds-icon>
          
          <sgds-icon name="dash-square"></sgds-icon>
          
          <sgds-icon name="dash"></sgds-icon>
          
          <sgds-icon name="download"></sgds-icon>
      
          <sgds-icon name="exclamation-circle-fill"></sgds-icon>
          
          <sgds-icon name="exclamation-circle"></sgds-icon>
          
          <sgds-icon name="exclamation-triangle-fill"></sgds-icon>
          
          <sgds-icon name="exclamation-triangle"></sgds-icon>
          
          <sgds-icon name="exclamation"></sgds-icon>
          
          <sgds-icon name="eye-fill"></sgds-icon>
          
          <sgds-icon name="eye-slash-fill"></sgds-icon>
          
          <sgds-icon name="eye-slash"></sgds-icon>
          
          <sgds-icon name="eye"></sgds-icon>
      
          <sgds-icon name="facebook"></sgds-icon>
      
          <sgds-icon name="file-earmark-text"></sgds-icon>
          
          <sgds-icon name="file-pdf"></sgds-icon>
          
          <sgds-icon name="file-plus"></sgds-icon>
          
          <sgds-icon name="file-text"></sgds-icon>
          
          <sgds-icon name="file"></sgds-icon>
          
          <sgds-icon name="files"></sgds-icon>
      
          <sgds-icon name="folder-check"></sgds-icon>
          
          <sgds-icon name="folder-minus"></sgds-icon>
          
          <sgds-icon name="folder-plus"></sgds-icon>
          
          <sgds-icon name="folder"></sgds-icon>
      
          <sgds-icon name="gear"></sgds-icon>
      
          <sgds-icon name="geo-alt"></sgds-icon>
          
          <sgds-icon name="geo-fill"></sgds-icon>
          
          <sgds-icon name="geo"></sgds-icon>
      
          <sgds-icon name="google"></sgds-icon>
      
          <sgds-icon name="grid-fill"></sgds-icon>
      
          <sgds-icon name="hand-thumbs-down"></sgds-icon>
      
          <sgds-icon name="hand-thumbs-up"></sgds-icon>
      
          <sgds-icon name="house-door"></sgds-icon>

          <sgds-icon name="house"></sgds-icon>
      
          <sgds-icon name="image"></sgds-icon>
      
          <sgds-icon name="in-box"></sgds-icon>
      
          <sgds-icon name="info-circle-fill"></sgds-icon>
          
          <sgds-icon name="info-circle"></sgds-icon>
      
          <sgds-icon name="instagram"></sgds-icon>
      
          <sgds-icon name="layers"></sgds-icon>
      
          <sgds-icon name="layout-text-window-reverse"></sgds-icon>
          
          <sgds-icon name="layout-text-window"></sgds-icon>
          
          <sgds-icon name="layout"></sgds-icon>
      
          <sgds-icon name="link"></sgds-icon>
      
          <sgds-icon name="linkedin"></sgds-icon>
      
          <sgds-icon name="list"></sgds-icon>
          
          <sgds-icon name="lock-fill"></sgds-icon>
          
          <sgds-icon name="lock"></sgds-icon>
      
          <sgds-icon name="mail"></sgds-icon>
      
          <sgds-icon name="map"></sgds-icon>

          <sgds-icon name="menu"></sgds-icon>
      
          <sgds-icon name="paperclip"></sgds-icon>
      
          <sgds-icon name="pencil"></sgds-icon>
      
          <sgds-icon name="pending-circle"></sgds-icon>
      
          <sgds-icon name="person-dash"></sgds-icon>
          
          <sgds-icon name="person-plus"></sgds-icon>
          
          <sgds-icon name="person-x"></sgds-icon>
          
          <sgds-icon name="person"></sgds-icon>
      
          <sgds-icon name="pin-map-fill"></sgds-icon>
          
          <sgds-icon name="pin"></sgds-icon>
      
          <sgds-icon name="placeholder"></sgds-icon>
      
          <sgds-icon name="plus-circle"></sgds-icon>
      
          <sgds-icon name="plus-square"></sgds-icon>
          
          <sgds-icon name="plus"></sgds-icon>
      
          <sgds-icon name="printer"></sgds-icon>
      
          <sgds-icon name="question-circle"></sgds-icon>
      
          <sgds-icon name="save"></sgds-icon>
      
          <sgds-icon name="search"></sgds-icon>
      
          <sgds-icon name="share"></sgds-icon>
      
          <sgds-icon name="slash-circle"></sgds-icon>
      
          <sgds-icon name="sliders"></sgds-icon>
      
          <sgds-icon name="speedometer"></sgds-icon>
      
          <sgds-icon name="star-fill"></sgds-icon>
          
          <sgds-icon name="star"></sgds-icon>
      
          <sgds-icon name="stoplights"></sgds-icon>
      
          <sgds-icon name="telephone"></sgds-icon>
      
          <sgds-icon name="three-dots-vertical"></sgds-icon>
          
          <sgds-icon name="three-dots"></sgds-icon>
      
          <sgds-icon name="toggle-off"></sgds-icon>
      
          <sgds-icon name="toggle-on"></sgds-icon>
      
          <sgds-icon name="trash"></sgds-icon>
      
          <sgds-icon name="twitter-x"></sgds-icon>
      
          <sgds-icon name="unlock"></sgds-icon>
      
          <sgds-icon name="upload"></sgds-icon>
      
          <sgds-icon name="window-dash"></sgds-icon>
          
          <sgds-icon name="window-desktop"></sgds-icon>
          
          <sgds-icon name="window-dock"></sgds-icon>
          
          <sgds-icon name="window-fullscreen"></sgds-icon>
          
          <sgds-icon name="window-plus"></sgds-icon>
          
          <sgds-icon name="window-sidebar"></sgds-icon>
          
          <sgds-icon name="window-split"></sgds-icon>
          
          <sgds-icon name="window-stack"></sgds-icon>
          
          <sgds-icon name="window-x"></sgds-icon>
          
          <sgds-icon name="window"></sgds-icon>
          
          <sgds-icon name="x-circle-fill"></sgds-icon>
          
          <sgds-icon name="x-circle"></sgds-icon>
      
          <sgds-icon name="youtube"></sgds-icon>
      
          <sgds-icon name="zoom-in"></sgds-icon>
      
          <sgds-icon name="zoom-out"></sgds-icon>
        `
    }
  }
};
