import { css, html } from "lit";
import SgdsElement from "../utils/sgds-element";
import { customElement, property } from "lit/decorators.js";
import styles from "./sgds-stepper.scss";
import { classMap } from "lit/directives/class-map.js";

// export interface StepMetaData {
//   component: any;
//   title: string;
//   stepHeader: string;
// }

// const getClass = (stepMetadata: StepMetaData) => {
//   if (stepMetadata.step < state.currentStep) {
//     return "is-completed is-clickable";
//   }
//   if (stepMetadata.step === state.currentStep) {
//     return "is-active";
//   }
//   return "";
// };

// export class WrappedStepsMetadata {
//   private wrappedStepMetadataArr :WrappedStepMetadata[];
//   constructor(wrappedStepMetadataArr: WrappedStepMetadata[]) {
//     this.wrappedStepMetadataArr = wrappedStepMetadataArr;
//   }

//   get length() {
//     return this.wrappedStepMetadataArr.length;
//   }

//   findByStep(step: number) {
//     return this.wrappedStepMetadataArr.find(
//       (wrappedStepMetadata) => wrappedStepMetadata.step === step
//     );
//   }

//   isFirstStep(step: number) {
//     return step === 1
//   }

//   isLastStep(step: number) {
//     return step === this.length;
//   }

//   isWithinStepRange(step: number) {
//     return step >= 1 && step <= this.length + 1;
//   }

//   get data() {
//     return this.wrappedStepMetadataArr;
//   }
// }

// next() {
//   if (this.activeStep < this.steps.length - 1) {
//     this.activeStep++;
//   }
// }

// back() {
//   if (this.activeStep > 0) {
//     this.activeStep--;
//   }
// }

@customElement("sgds-stepper")
export class SgdsStepper extends SgdsElement {
  static styles = styles;

  @property({ type: Array })
  steps = [
    {
      title: 1,
      stepHeader: "Marker title 1",
    },
    { title: 2, stepHeader: "Marker title 2" },
    { title: 3, stepHeader: "Marker title 3" },
  ];

  @property({ type: Number })
  activeStep = 2;

  @property({ type: Object }) stepper: SgdsStepper;

  @property({ type: Array })
  _isSlotVisible = new Array(this.steps.length).fill(false);

  connectedCallback() {
    super.connectedCallback();
    this.stepper = this;
  }

  _onStepperItemClick(index: number) {
    if (this.activeStep > index) {
      this.activeStep = index;
      this._isSlotVisible[index] = !this._isSlotVisible[index];
    }
  }

  render() {
    return html`
      <div class="sgds stepper">
        ${this.steps.map((step, index) => {
          return html`
            <div
              class="stepper-item ${classMap({
                "is-active": this.activeStep === index,
                "is-completed": this.activeStep > index,
                "is-clickable": this.activeStep > index,
              })}"
              @click="${() => this._onStepperItemClick(index)}"
            >
              <div class="stepper-marker">${step.title}</div>
              <div class="stepper-detail">
                <p><b>${step.stepHeader}</b></p>
              </div>
            </div>
            <br /><br />
            ${this.activeStep === index
              ? html`<p slot=${index}>This is the external content for step-${index}</p>`
              : html``}
          `;
        })}
      </div>
    `;
  }
}

export default SgdsStepper;

// <!-- ${this.steps.map(
//   (step, index) => html`
//     <div
//       class="stepper-item ${classMap({
//         "is-active": this.activeStep == index,
//         "is-completed is-clickable": this.activeStep > index,
//       })}"
//     >
//       <div class="stepper-marker">${step.marker}</div>
//       <div class="stepper-detail">
//         <p><b>${step.title}</b></p>
//       </div>
//     </div>
//   `
// )} -->
