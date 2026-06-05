import { html } from "lit";
import { iconRegistry } from "../../../src/components/Icon/icon-registry";

export const Template = args => {
  return html` <div>
    ${Object.keys(iconRegistry).map(
      i => html`
        <sgds-tooltip content=${i}>
          <sgds-icon name=${i} size=${args.size} ariaLabel=${i}></sgds-icon>
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
          <!-- Standalone informative icon (add ariaLabel) -->
          <sgds-icon name="announcement" ariaLabel="Announcement"></sgds-icon>

          <sgds-icon name="archive" ariaLabel="Archive"></sgds-icon>

          <sgds-icon name="arrow-bar-down" ariaLabel="Arrow bar down"></sgds-icon>

          <sgds-icon name="arrow-bar-left" ariaLabel="Arrow bar left"></sgds-icon>

          <sgds-icon name="arrow-bar-right" ariaLabel="Arrow bar right"></sgds-icon>

          <sgds-icon name="arrow-bar-up" ariaLabel="Arrow bar up"></sgds-icon>

          <sgds-icon name="arrow-circle-down" ariaLabel="Arrow circle down"></sgds-icon>

          <sgds-icon name="arrow-circle-left" ariaLabel="Arrow circle left"></sgds-icon>

          <sgds-icon name="arrow-circle-right" ariaLabel="Arrow circle right"></sgds-icon>

          <sgds-icon name="arrow-circle-up" ariaLabel="Arrow circle up"></sgds-icon>

          <sgds-icon name="arrow-clockwise" ariaLabel="Arrow clockwise"></sgds-icon>

          <sgds-icon name="arrow-down" ariaLabel="Arrow down"></sgds-icon>

          <sgds-icon name="arrow-left" ariaLabel="Arrow left"></sgds-icon>

          <sgds-icon name="arrow-repeat" ariaLabel="Arrow repeat"></sgds-icon>

          <sgds-icon name="arrow-right" ariaLabel="Arrow right"></sgds-icon>

          <sgds-icon name="arrow-square-down" ariaLabel="Arrow square down"></sgds-icon>

          <sgds-icon name="arrow-square-left" ariaLabel="Arrow square left"></sgds-icon>

          <sgds-icon name="arrow-square-right" ariaLabel="Arrow square right"></sgds-icon>

          <sgds-icon name="arrow-square-up" ariaLabel="Arrow square up"></sgds-icon>

          <sgds-icon name="arrow-up" ariaLabel="Arrow up"></sgds-icon>
      
          <sgds-icon name="bank-fill" ariaLabel="Bank fill"></sgds-icon>
      
          <sgds-icon name="bell-slash" ariaLabel="Bell slash"></sgds-icon>
          
          <sgds-icon name="bell" ariaLabel="Bell"></sgds-icon>
      
          <sgds-icon name="bi-funnel" ariaLabel="Bi funnel"></sgds-icon>
      
          <sgds-icon name="bookmark-fill" ariaLabel="Bookmark fill"></sgds-icon>
          
          <sgds-icon name="bookmark" ariaLabel="Bookmark"></sgds-icon>
      
          <sgds-icon name="box-arrow-up-right" ariaLabel="Box arrow up right"></sgds-icon>
      
          <sgds-icon name="box-seam" ariaLabel="Box seam"></sgds-icon>
      
          <sgds-icon name="building" ariaLabel="Building"></sgds-icon>
      
          <sgds-icon name="bus" ariaLabel="Bus"></sgds-icon>
      
          <sgds-icon name="calculator" ariaLabel="Calculator"></sgds-icon>
      
          <sgds-icon name="calendar-check" ariaLabel="Calendar check"></sgds-icon>
          
          <sgds-icon name="calendar-x" ariaLabel="Calendar x"></sgds-icon>
          
          <sgds-icon name="calendar" ariaLabel="Calendar"></sgds-icon>
      
          <sgds-icon name="camera" ariaLabel="Camera"></sgds-icon>

          <sgds-icon name="car" ariaLabel="Car"></sgds-icon>

          <sgds-icon name="chat-dots" ariaLabel="Chat dots"></sgds-icon>
      
          <sgds-icon name="chat-left-text" ariaLabel="Chat left text"></sgds-icon>
      
          <sgds-icon name="chat" ariaLabel="Chat"></sgds-icon>
      
          <sgds-icon name="check-circle-fill" ariaLabel="Check circle fill"></sgds-icon>
          
          <sgds-icon name="check-circle" ariaLabel="Check circle"></sgds-icon>
          
          <sgds-icon name="check" ariaLabel="Check"></sgds-icon>
      
          <sgds-icon name="chevron-down" ariaLabel="Chevron down"></sgds-icon>
      
          <sgds-icon name="chevron-left" ariaLabel="Chevron left"></sgds-icon>
      
          <sgds-icon name="chevron-right" ariaLabel="Chevron right"></sgds-icon>
      
          <sgds-icon name="chevron-selector-vertical" ariaLabel="Chevron selector vertical"></sgds-icon>
      
          <sgds-icon name="chevron-up" ariaLabel="Chevron up"></sgds-icon>
      
          <sgds-icon name="clock" ariaLabel="Clock"></sgds-icon>
      
          <sgds-icon name="cloud-check" ariaLabel="Cloud check"></sgds-icon>
          
          <sgds-icon name="cloud-download" ariaLabel="Cloud download"></sgds-icon>
          
          <sgds-icon name="cloud-upload" ariaLabel="Cloud upload"></sgds-icon>
          
          <sgds-icon name="cloud" ariaLabel="Cloud"></sgds-icon>
      
          <sgds-icon name="compass" ariaLabel="Compass"></sgds-icon>
      
          <sgds-icon name="copy" ariaLabel="Copy"></sgds-icon>
      
          <sgds-icon name="cross" ariaLabel="Cross"></sgds-icon>
      
          <sgds-icon name="cursor-fill" ariaLabel="Cursor fill"></sgds-icon>
          
          <sgds-icon name="cursor" ariaLabel="Cursor"></sgds-icon>
          
          <sgds-icon name="dash-circle" ariaLabel="Dash circle"></sgds-icon>
          
          <sgds-icon name="dash-square" ariaLabel="Dash square"></sgds-icon>
          
          <sgds-icon name="dash" ariaLabel="Dash"></sgds-icon>
          
          <sgds-icon name="download" ariaLabel="Download"></sgds-icon>
          
          <sgds-icon name="edit" ariaLabel="Edit"></sgds-icon>
      
          <sgds-icon name="exclamation-circle-fill" ariaLabel="Exclamation circle fill"></sgds-icon>
          
          <sgds-icon name="exclamation-circle" ariaLabel="Exclamation circle"></sgds-icon>
          
          <sgds-icon name="exclamation-triangle-fill" ariaLabel="Exclamation triangle fill"></sgds-icon>
          
          <sgds-icon name="exclamation-triangle" ariaLabel="Exclamation triangle"></sgds-icon>
          
          <sgds-icon name="exclamation" ariaLabel="Exclamation"></sgds-icon>
          
          <sgds-icon name="eye-fill" ariaLabel="Eye fill"></sgds-icon>
          
          <sgds-icon name="eye-slash-fill" ariaLabel="Eye slash fill"></sgds-icon>
          
          <sgds-icon name="eye-slash" ariaLabel="Eye slash"></sgds-icon>
          
          <sgds-icon name="eye" ariaLabel="Eye"></sgds-icon>
      
          <sgds-icon name="facebook" ariaLabel="Facebook"></sgds-icon>
      
          <sgds-icon name="file-earmark-text" ariaLabel="File earmark text"></sgds-icon>
          
          <sgds-icon name="file-pdf" ariaLabel="File pdf"></sgds-icon>
          
          <sgds-icon name="file-plus" ariaLabel="File plus"></sgds-icon>
          
          <sgds-icon name="file-text" ariaLabel="File text"></sgds-icon>
          
          <sgds-icon name="file" ariaLabel="File"></sgds-icon>
          
          <sgds-icon name="files" ariaLabel="Files"></sgds-icon>
      
          <sgds-icon name="folder-check" ariaLabel="Folder check"></sgds-icon>
          
          <sgds-icon name="folder-minus" ariaLabel="Folder minus"></sgds-icon>
          
          <sgds-icon name="folder-plus" ariaLabel="Folder plus"></sgds-icon>
          
          <sgds-icon name="folder" ariaLabel="Folder"></sgds-icon>
      
          <sgds-icon name="gear" ariaLabel="Gear"></sgds-icon>
      
          <sgds-icon name="geo-alt" ariaLabel="Geo alt"></sgds-icon>
          
          <sgds-icon name="geo-fill" ariaLabel="Geo fill"></sgds-icon>
          
          <sgds-icon name="geo" ariaLabel="Geo"></sgds-icon>
      
          <sgds-icon name="google" ariaLabel="Google"></sgds-icon>
      
          <sgds-icon name="grid-fill" ariaLabel="Grid fill"></sgds-icon>
      
          <sgds-icon name="hand-thumbs-down" ariaLabel="Hand thumbs down"></sgds-icon>
      
          <sgds-icon name="hand-thumbs-up" ariaLabel="Hand thumbs up"></sgds-icon>
      
          <sgds-icon name="hard-drive" ariaLabel="Hard drive"></sgds-icon>
      
          <sgds-icon name="heart" ariaLabel="Heart"></sgds-icon>
      
          <sgds-icon name="house-door" ariaLabel="House door"></sgds-icon>

          <sgds-icon name="house" ariaLabel="House"></sgds-icon>
      
          <sgds-icon name="image" ariaLabel="Image"></sgds-icon>
      
          <sgds-icon name="in-box" ariaLabel="In box"></sgds-icon>
      
          <sgds-icon name="info-circle-fill" ariaLabel="Info circle fill"></sgds-icon>
          
          <sgds-icon name="info-circle" ariaLabel="Info circle"></sgds-icon>
      
          <sgds-icon name="instagram" ariaLabel="Instagram"></sgds-icon>
      
          <sgds-icon name="laptop" ariaLabel="Laptop"></sgds-icon>
      
          <sgds-icon name="layers" ariaLabel="Layers"></sgds-icon>
      
          <sgds-icon name="layout-text-window-reverse" ariaLabel="Layout text window reverse"></sgds-icon>
          
          <sgds-icon name="layout-text-window" ariaLabel="Layout text window"></sgds-icon>
          
          <sgds-icon name="layout" ariaLabel="Layout"></sgds-icon>
      
          <sgds-icon name="lightbulb" ariaLabel="Lightbulb"></sgds-icon>
      
          <sgds-icon name="link" ariaLabel="Link"></sgds-icon>
      
          <sgds-icon name="linkedin" ariaLabel="Linkedin"></sgds-icon>
      
          <sgds-icon name="list" ariaLabel="List"></sgds-icon>
      
          <sgds-icon name="lock-fill" ariaLabel="Lock fill"></sgds-icon>
      
          <sgds-icon name="lock" ariaLabel="Lock"></sgds-icon>
      
          <sgds-icon name="login" ariaLabel="Login"></sgds-icon>
      
          <sgds-icon name="logout" ariaLabel="Logout"></sgds-icon>
      
          <sgds-icon name="luggage" ariaLabel="Luggage"></sgds-icon>
      
          <sgds-icon name="mail" ariaLabel="Mail"></sgds-icon>
      
          <sgds-icon name="map" ariaLabel="Map"></sgds-icon>
      
          <sgds-icon name="meetup" ariaLabel="Meetup"></sgds-icon>

          <sgds-icon name="menu" ariaLabel="Menu"></sgds-icon>

          <sgds-icon name="microphone" ariaLabel="Microphone"></sgds-icon>

          <sgds-icon name="monitor" ariaLabel="Monitor"></sgds-icon>

          <sgds-icon name="moon" ariaLabel="Moon"></sgds-icon>

          <sgds-icon name="move" ariaLabel="Move"></sgds-icon>
      
          <sgds-icon name="paperclip" ariaLabel="Paperclip"></sgds-icon>
      
          <sgds-icon name="passport" ariaLabel="Passport"></sgds-icon>
      
          <sgds-icon name="pause" ariaLabel="Pause"></sgds-icon>
      
          <sgds-icon name="pencil" ariaLabel="Pencil"></sgds-icon>
      
          <sgds-icon name="pending-circle" ariaLabel="Pending circle"></sgds-icon>
      
          <sgds-icon name="person-dash" ariaLabel="Person dash"></sgds-icon>
          
          <sgds-icon name="person-plus" ariaLabel="Person plus"></sgds-icon>
          
          <sgds-icon name="person-x" ariaLabel="Person x"></sgds-icon>
          
          <sgds-icon name="person" ariaLabel="Person"></sgds-icon>
          
          <sgds-icon name="phone" ariaLabel="Phone"></sgds-icon>
      
          <sgds-icon name="pin-map-fill" ariaLabel="Pin map fill"></sgds-icon>
          
          <sgds-icon name="pin" ariaLabel="Pin"></sgds-icon>
      
          <sgds-icon name="placeholder" ariaLabel="Placeholder"></sgds-icon>
      
          <sgds-icon name="plane" ariaLabel="Plane"></sgds-icon>
      
          <sgds-icon name="play" ariaLabel="Play"></sgds-icon>
      
          <sgds-icon name="plus-circle" ariaLabel="Plus circle"></sgds-icon>
      
          <sgds-icon name="plus-square" ariaLabel="Plus square"></sgds-icon>
          
          <sgds-icon name="plus" ariaLabel="Plus"></sgds-icon>
      
          <sgds-icon name="printer" ariaLabel="Printer"></sgds-icon>
      
          <sgds-icon name="question-circle" ariaLabel="Question circle"></sgds-icon>
      
          <sgds-icon name="rocket" ariaLabel="Rocket"></sgds-icon>
      
          <sgds-icon name="save" ariaLabel="Save"></sgds-icon>
      
          <sgds-icon name="search" ariaLabel="Search"></sgds-icon>
      
          <sgds-icon name="send" ariaLabel="Send"></sgds-icon>
      
          <sgds-icon name="sg-crest" ariaLabel="Sg crest"></sgds-icon>
      
          <sgds-icon name="share" ariaLabel="Share"></sgds-icon>
      
          <sgds-icon name="slash-circle" ariaLabel="Slash circle"></sgds-icon>
      
          <sgds-icon name="slash-divider" ariaLabel="Slash divider"></sgds-icon>
      
          <sgds-icon name="sliders" ariaLabel="Sliders"></sgds-icon>
      
          <sgds-icon name="speedometer" ariaLabel="Speedometer"></sgds-icon>
      
          <sgds-icon name="star-fill" ariaLabel="Star fill"></sgds-icon>
          
          <sgds-icon name="star" ariaLabel="Star"></sgds-icon>
      
          <sgds-icon name="stoplights" ariaLabel="Stoplights"></sgds-icon>
      
          <sgds-icon name="sun" ariaLabel="Sun"></sgds-icon>
      
          <sgds-icon name="switch-horizontal" ariaLabel="Switch horizontal"></sgds-icon>
      
          <sgds-icon name="switch-vertical" ariaLabel="Switch vertical"></sgds-icon>
      
          <sgds-icon name="tablet" ariaLabel="Tablet"></sgds-icon>
      
          <sgds-icon name="telegram" ariaLabel="Telegram"></sgds-icon>
      
          <sgds-icon name="telephone" ariaLabel="Telephone"></sgds-icon>
      
          <sgds-icon name="three-dots-vertical" ariaLabel="Three dots vertical"></sgds-icon>
          
          <sgds-icon name="three-dots" ariaLabel="Three dots"></sgds-icon>
          
          <sgds-icon name="ticket" ariaLabel="Ticket"></sgds-icon>
      
          <sgds-icon name="toggle-off" ariaLabel="Toggle off"></sgds-icon>
      
          <sgds-icon name="toggle-on" ariaLabel="Toggle on"></sgds-icon>
      
          <sgds-icon name="train" ariaLabel="Train"></sgds-icon>
      
          <sgds-icon name="translate" ariaLabel="Translate"></sgds-icon>
      
          <sgds-icon name="trash" ariaLabel="Trash"></sgds-icon>
      
          <sgds-icon name="trend-down" ariaLabel="Trend down"></sgds-icon>
      
          <sgds-icon name="trend-up" ariaLabel="Trend up"></sgds-icon>
      
          <sgds-icon name="truck" ariaLabel="Truck"></sgds-icon>
      
          <sgds-icon name="twitter-x" ariaLabel="Twitter x"></sgds-icon>
      
          <sgds-icon name="unlock" ariaLabel="Unlock"></sgds-icon>
      
          <sgds-icon name="upload" ariaLabel="Upload"></sgds-icon>
      
          <sgds-icon name="user-circle" ariaLabel="User circle"></sgds-icon>
      
          <sgds-icon name="user-square" ariaLabel="User square"></sgds-icon>
      
          <sgds-icon name="users" ariaLabel="Users"></sgds-icon>
      
          <sgds-icon name="video-recorder" ariaLabel="Video recorder"></sgds-icon>
      
          <sgds-icon name="volume-max" ariaLabel="Volume max"></sgds-icon>
      
          <sgds-icon name="volume-x" ariaLabel="Volume x"></sgds-icon>
      
          <sgds-icon name="window-dash" ariaLabel="Window dash"></sgds-icon>
          
          <sgds-icon name="window-desktop" ariaLabel="Window desktop"></sgds-icon>
          
          <sgds-icon name="window-dock" ariaLabel="Window dock"></sgds-icon>
          
          <sgds-icon name="window-fullscreen" ariaLabel="Window fullscreen"></sgds-icon>
          
          <sgds-icon name="window-plus" ariaLabel="Window plus"></sgds-icon>
          
          <sgds-icon name="window-sidebar" ariaLabel="Window sidebar"></sgds-icon>
          
          <sgds-icon name="window-split" ariaLabel="Window split"></sgds-icon>
          
          <sgds-icon name="window-stack" ariaLabel="Window stack"></sgds-icon>
          
          <sgds-icon name="window-x" ariaLabel="Window x"></sgds-icon>
          
          <sgds-icon name="window" ariaLabel="Window"></sgds-icon>
          
          <sgds-icon name="x-circle-fill" ariaLabel="X circle fill"></sgds-icon>
          
          <sgds-icon name="x-circle" ariaLabel="X circle"></sgds-icon>
      
          <sgds-icon name="youtube" ariaLabel="Youtube"></sgds-icon>
      
          <sgds-icon name="zoom-in" ariaLabel="Zoom in"></sgds-icon>
      
          <sgds-icon name="zoom-out" ariaLabel="Zoom out"></sgds-icon>
        `
    }
  }
};

export const play = undefined;
