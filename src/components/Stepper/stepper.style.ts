import { css } from "lit";
export default css`
*,:after,:before{box-sizing:border-box;}
p{margin-bottom:1.5rem;margin-top:0;}
b{font-weight:bolder;}
.sgds.stepper{display:flex;flex-wrap:wrap;font-size:1rem;min-height:calc(1rem*2rem);}
.sgds.stepper .stepper-item{flex-basis:0;flex-grow:1;margin-top:0;position:relative;}
.sgds.stepper .stepper-item:not(:first-child){flex-basis:1em;flex-grow:1;flex-shrink:1;}
.sgds.stepper .stepper-item:not(:first-child):before{content:" ";position:absolute;}
.sgds.stepper .stepper-item.is-clickable{cursor:pointer;}
.sgds.stepper .stepper-item.is-clickable:hover .stepper-marker{background-color:#491db6;border-color:#491db6;}
.sgds.stepper .stepper-item.is-clickable:hover .stepper-detail,.sgds.stepper .stepper-item.is-clickable:hover .stepper-detail>*{color:#491db6;transition:all .5s ease;}
.sgds.stepper .stepper-item:before{background:linear-gradient(270deg,#d0d5dd 50%,#5925dc 0);background-position:100% 100%;background-size:200% 100%;}
.sgds.stepper .stepper-item:before .stepper-marker{color:#fff;}
.sgds.stepper .stepper-item.is-active:before{background-position:0 100%;}
.sgds.stepper .stepper-item.is-active .stepper-marker{background-color:#fff;border-color:#5925dc;color:#5925dc;}
.sgds.stepper .stepper-item.is-completed:before{background-position:0 100%;}
.sgds.stepper .stepper-item.is-completed .stepper-marker{background-color:#5925dc;border-color:#5925dc;color:#fff;}
.sgds.stepper .stepper-item>.stepper-marker{align-items:center;background:#98a2b3;border:.25rem solid #fff;border-radius:50%;color:#fff;display:flex;font-weight:700;justify-content:center;z-index:1;}
.sgds.stepper .stepper-item>.stepper-detail{text-align:center;}
.sgds.stepper .stepper-item:not(:first-child):before{bottom:0;height:.25rem;left:-50%;top:1rem;width:100%;}
.sgds.stepper .stepper-item .stepper-marker{height:2rem;left:calc(50% - 1rem);position:absolute;width:2rem;}
.sgds.stepper .stepper-item .stepper-detail{margin-left:.5rem;margin-right:.5rem;margin-top:2rem;}
`;
