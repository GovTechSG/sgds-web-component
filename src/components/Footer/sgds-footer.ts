import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import footerStyle from "./footer.css";
export interface ColumnLinks {
  title: string;
  links: Links[];
}
export interface Links {
  href: string;
  label: string;
}

/**
 * @summary The footer contains supporting information for your service at the bottom of your website. All .gov.sg digital services shall contain a Global Footer Bar across all pages. The Global Footer Bar should include the name of the digital service, contact information, a privacy statement and the terms of use.
 *
 * @csspart footer-top - The component's footer-top section container.
 * @csspart footer-bottom - The component's footer-bottom section container.
 *
 */
export class SgdsFooter extends SgdsElement {
  static styles = [...SgdsElement.styles, footerStyle];

  /**
   * 	Sets copyrightLiner of SgdsFooter
   */
  @property({ type: String })
  copyrightLiner = "Government of Singapore";

  /**
   * 	href link for facebook
   */
  @property({ type: String })
  facebookHref = "";

  /**
   * 	href link for instagram
   */
  @property({ type: String })
  instagramHref = "";

  /**
   * 	href link for linkedIn
   */
  @property({ type: String })
  linkedInHref = "";

  /**
   * 	href link for twitter
   */
  @property({ type: String })
  twitterHref = "";

  /**
   * 	href link for youtube
   */
  @property({ type: String })
  youtubeHref = "";

  /**
   * 	href link for contacts
   */
  @property({ type: String })
  contactHref = "#";

  /**
   * 	href link for feedback
   */
  @property({ type: String })
  feedbackHref = "#";

  /**
   * 	href link for faq
   */
  @property({ type: String })
  faqHref = "#";

  /**
   * 	href link for privacy statement
   */
  @property({ type: String })
  privacyHref = "#";

  /**
   * 	href link for terms of use
   */
  @property({ type: String })
  termsOfUseHref = "#";

  private _getFacebookLink() {
    if (!this.facebookHref) {
      return;
    }

    return html`
      <a href="${this.facebookHref}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.0551C21 7.05399 16.9708 3 12.0011 3C7.02925 3.00112 3 7.05399 3 12.0562C3 16.5748 6.29134 20.3206 10.5928 21V14.6727H8.30934V12.0562H10.5951V10.0596C10.5951 7.79078 11.9393 6.53768 13.9944 6.53768C14.9798 6.53768 16.009 6.71429 16.009 6.71429V8.94151H14.874C13.757 8.94151 13.4083 9.64005 13.4083 10.3566V12.0551H15.9033L15.5051 14.6715H13.4072V20.9989C17.7087 20.3195 21 16.5737 21 12.0551Z"
            fill="currentColor"
          />
        </svg>
      </a>
    `;
  }

  private _getInstagramLink() {
    if (!this.instagramHref) {
      return;
    }

    return html`
      <a href="${this.instagramHref}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C9.55762 3 9.2505 3.01125 8.29088 3.054C7.33125 3.099 6.67762 3.24975 6.105 3.4725C5.50436 3.69842 4.9603 4.0528 4.51088 4.51088C4.05309 4.96053 3.69875 5.50452 3.4725 6.105C3.24975 6.6765 3.09788 7.33125 3.054 8.2875C3.01125 9.24937 3 9.55538 3 12.0011C3 14.4446 3.01125 14.7506 3.054 15.7103C3.099 16.6688 3.24975 17.3224 3.4725 17.895C3.70312 18.4867 4.01025 18.9885 4.51088 19.4891C5.01038 19.9897 5.51213 20.298 6.10388 20.5275C6.67763 20.7502 7.33013 20.9021 8.28863 20.946C9.24938 20.9887 9.55537 21 12 21C14.4446 21 14.7495 20.9887 15.7103 20.946C16.6676 20.901 17.3235 20.7502 17.8961 20.5275C18.4964 20.3015 19.04 19.9471 19.4891 19.4891C19.9897 18.9885 20.2969 18.4867 20.5275 17.895C20.7491 17.3224 20.901 16.6688 20.946 15.7103C20.9887 14.7506 21 14.4446 21 12C21 9.55537 20.9887 9.24938 20.946 8.28863C20.901 7.33125 20.7491 6.6765 20.5275 6.105C20.3013 5.5045 19.9469 4.96051 19.4891 4.51088C19.0398 4.05264 18.4957 3.69823 17.895 3.4725C17.3212 3.24975 16.6665 3.09788 15.7091 3.054C14.7484 3.01125 14.4435 3 11.9978 3H12.0011H12ZM11.1934 4.62225H12.0011C14.4041 4.62225 14.6887 4.63013 15.6371 4.674C16.5146 4.71338 16.9916 4.86075 17.3089 4.98338C17.7285 5.1465 18.0289 5.34225 18.3439 5.65725C18.6589 5.97225 18.8535 6.2715 19.0166 6.69225C19.1404 7.00838 19.2866 7.48538 19.326 8.36288C19.3699 9.31125 19.3789 9.59588 19.3789 11.9978C19.3789 14.3996 19.3699 14.6854 19.326 15.6337C19.2866 16.5112 19.1393 16.9871 19.0166 17.3044C18.8723 17.6952 18.642 18.0485 18.3427 18.3382C18.0277 18.6532 17.7285 18.8479 17.3078 19.011C16.9928 19.1348 16.5157 19.281 15.6371 19.3215C14.6887 19.3643 14.4041 19.3744 12.0011 19.3744C9.59813 19.3744 9.31238 19.3643 8.364 19.3215C7.4865 19.281 7.01062 19.1348 6.69337 19.011C6.30244 18.8669 5.94877 18.637 5.65837 18.3382C5.35884 18.048 5.12819 17.6944 4.98338 17.3032C4.86075 16.9871 4.71338 16.5101 4.674 15.6326C4.63125 14.6843 4.62225 14.3996 4.62225 11.9955C4.62225 9.5925 4.63125 9.309 4.674 8.36062C4.7145 7.48312 4.86075 7.00613 4.9845 6.68888C5.14763 6.26925 5.34337 5.96887 5.65837 5.65387C5.97337 5.33887 6.27262 5.14425 6.69337 4.98113C7.01062 4.85738 7.4865 4.71113 8.364 4.67063C9.19425 4.63238 9.516 4.62113 11.1934 4.62V4.62225ZM16.8049 6.11625C16.663 6.11625 16.5226 6.14419 16.3916 6.19846C16.2605 6.25274 16.1415 6.33229 16.0412 6.43257C15.9409 6.53286 15.8614 6.65192 15.8071 6.78295C15.7528 6.91398 15.7249 7.05442 15.7249 7.19625C15.7249 7.33808 15.7528 7.47852 15.8071 7.60955C15.8614 7.74058 15.9409 7.85964 16.0412 7.95993C16.1415 8.06021 16.2605 8.13976 16.3916 8.19404C16.5226 8.24831 16.663 8.27625 16.8049 8.27625C17.0913 8.27625 17.366 8.16246 17.5686 7.95993C17.7711 7.75739 17.8849 7.48268 17.8849 7.19625C17.8849 6.90982 17.7711 6.63511 17.5686 6.43257C17.366 6.23004 17.0913 6.11625 16.8049 6.11625ZM12.0011 7.3785C11.3881 7.36894 10.7793 7.48142 10.2101 7.70941C9.64094 7.9374 9.12283 8.27633 8.68592 8.70648C8.24901 9.13662 7.90203 9.64939 7.6652 10.2149C7.42836 10.7804 7.30639 11.3874 7.30639 12.0006C7.30639 12.6137 7.42836 13.2207 7.6652 13.7862C7.90203 14.3517 8.24901 14.8645 8.68592 15.2946C9.12283 15.7248 9.64094 16.0637 10.2101 16.2917C10.7793 16.5197 11.3881 16.6322 12.0011 16.6226C13.2145 16.6037 14.3717 16.1084 15.2231 15.2437C16.0745 14.3789 16.5516 13.2141 16.5516 12.0006C16.5516 10.7871 16.0745 9.62221 15.2231 8.75747C14.3717 7.89272 13.2145 7.39743 12.0011 7.3785ZM12.0011 8.99963C12.7969 8.99963 13.56 9.31574 14.1227 9.87841C14.6854 10.4411 15.0015 11.2043 15.0015 12C15.0015 12.7957 14.6854 13.5589 14.1227 14.1216C13.56 14.6843 12.7969 15.0004 12.0011 15.0004C11.2054 15.0004 10.4422 14.6843 9.87954 14.1216C9.31686 13.5589 9.00075 12.7957 9.00075 12C9.00075 11.2043 9.31686 10.4411 9.87954 9.87841C10.4422 9.31574 11.2054 8.99963 12.0011 8.99963Z"
            fill="currentColor"
          />
        </svg>
      </a>
    `;
  }

  private _getLinkedInLink() {
    if (!this.linkedInHref) {
      return;
    }

    return html`
      <a href="${this.linkedInHref}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 4.28925C3 3.57713 3.59175 3 4.32187 3H19.6781C20.4082 3 21 3.57713 21 4.28925V19.7108C21 20.4229 20.4082 21 19.6781 21H4.32187C3.59175 21 3 20.4229 3 19.7108V4.28925ZM8.56087 18.0683V9.94013H5.85975V18.0683H8.56087ZM7.21088 8.82975C8.1525 8.82975 8.73862 8.2065 8.73862 7.42575C8.72175 6.62813 8.15363 6.02175 7.22888 6.02175C6.30413 6.02175 5.7 6.62925 5.7 7.42575C5.7 8.2065 6.28613 8.82975 7.19287 8.82975H7.21088ZM12.7324 18.0683V13.5289C12.7324 13.2859 12.7504 13.0429 12.8224 12.8696C13.017 12.3847 13.4614 11.8819 14.2084 11.8819C15.186 11.8819 15.5764 12.6266 15.5764 13.7201V18.0683H18.2775V13.4062C18.2775 10.9087 16.9455 9.74775 15.168 9.74775C13.7347 9.74775 13.0924 10.5352 12.7324 11.0899V11.118H12.7144C12.7204 11.1086 12.7263 11.0992 12.7324 11.0899V9.94013H10.0324C10.0661 10.7029 10.0324 18.0683 10.0324 18.0683H12.7324Z"
            fill="currentColor"
          />
        </svg>
      </a>
    `;
  }

  private _getTwitterLink() {
    if (!this.twitterHref) {
      return;
    }

    return html`
      <a href="${this.twitterHref}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.1761 3.84375H19.9362L13.9061 10.7536L21 20.1562H15.4456L11.0951 14.4536L6.11723 20.1562H3.35544L9.80517 12.7654L3 3.84375H8.69545L12.6279 9.05622L17.1761 3.84375ZM16.2073 18.4999H17.7368L7.86441 5.4131H6.2232L16.2073 18.4999Z"
            fill="currentColor"
          />
        </svg>
      </a>
    `;
  }

  private _getYoutubeLink() {
    if (!this.youtubeHref) {
      return;
    }

    return html`
      <a href="${this.youtubeHref}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12.0579 5.67767H12.1581C13.0829 5.68105 17.7688 5.7148 19.0323 6.05457C19.4142 6.15827 19.7623 6.36039 20.0416 6.64074C20.321 6.92109 20.5219 7.26985 20.6242 7.65217C20.7379 8.0797 20.8177 8.64561 20.8717 9.22952L20.883 9.34653L20.9077 9.63905L20.9167 9.75605C20.9899 10.7844 20.9989 11.7474 21 11.9578V12.0422C20.9989 12.2605 20.9887 13.2888 20.9077 14.3598L20.8987 14.478L20.8886 14.595C20.8324 15.2385 20.7491 15.8776 20.6242 16.3478C20.5222 16.7303 20.3214 17.0792 20.042 17.3596C19.7626 17.64 19.4144 17.8421 19.0323 17.9454C17.7272 18.2965 12.7667 18.3212 12.0793 18.3223H11.9196C11.5719 18.3223 10.1341 18.3156 8.62648 18.2638L8.43521 18.2571L8.33733 18.2526L7.95256 18.2368C6.70373 18.1817 5.51453 18.0928 4.96662 17.9443C4.58465 17.841 4.23653 17.6392 3.95712 17.359C3.67772 17.0788 3.47686 16.7301 3.37465 16.3478C3.24977 15.8787 3.16651 15.2385 3.11026 14.595L3.09226 14.3598C3.03673 13.5975 3.00596 12.8335 3 12.0692L3 11.9308C3.00225 11.6889 3.01125 10.853 3.072 9.93044L3.07988 9.81456L3.08326 9.75605L3.09226 9.63905L3.11701 9.34653L3.12826 9.22952C3.18226 8.64561 3.26214 8.07857 3.37577 7.65217C3.47781 7.2697 3.6786 6.92078 3.95801 6.64038C4.23742 6.35998 4.58564 6.15796 4.96775 6.05457C5.51566 5.90831 6.70486 5.81831 7.95368 5.76205L8.14495 5.75418L8.43521 5.74405L8.6276 5.73618C9.69834 5.70172 10.7695 5.68259 11.8408 5.6788H12.0579V5.67767ZM10.2005 9.28915V14.7097L14.8774 12.0006L10.2005 9.28915Z"
            fill="currentColor"
          />
        </svg>
      </a>
    `;
  }

  private _getSocialLinks() {
    const facebook = this._getFacebookLink();
    const instagram = this._getInstagramLink();
    const linkedIn = this._getLinkedInLink();
    const twitter = this._getTwitterLink();
    const youtube = this._getYoutubeLink();

    if (!facebook && !instagram && !linkedIn && !twitter && !youtube) {
      return nothing;
    }

    return html`
      <ul class="social-media">
        ${facebook && html`<li>${facebook}</li>`} ${instagram && html`<li>${instagram}</li>`}
        ${linkedIn && html`<li>${linkedIn}</li>`} ${twitter && html`<li>${twitter}</li>`}
        ${youtube && html`<li>${youtube}</li>`}
      </ul>
    `;
  }

  render() {
    const socialLinks = this._getSocialLinks();

    return html`
      <footer class="footer">
        <section class="footer-top" part="footer-top">
          <slot name="footer-title"></slot>
          <slot name="footer-link"></slot>
        </section>
        <section class="footer-bottom" part="footer-bottom">
          ${socialLinks}
          <div class="footer-mandatory-links">
            <ul>
              <li><a href=${this.contactHref}>Contact</a></li>
              <li><a href=${this.feedbackHref}>Feedback</a></li>
              <li><a href=${this.faqHref}>FAQ</a></li>
              <li>
                <a href="https://tech.gov.sg/report_vulnerability" target="_blank" rel="noopener noreferrer"
                  >Report Vulnerability</a
                >
              </li>
              <li><a href=${this.privacyHref}>Privacy Statement</a></li>
              <li><a href=${this.termsOfUseHref}>Terms of use</a></li>
            </ul>
            <div class="footer-copyrights">© ${new Date().getFullYear()}, ${this.copyrightLiner}</div>
          </div>
        </section>
      </footer>
    `;
  }
}

export default SgdsFooter;
