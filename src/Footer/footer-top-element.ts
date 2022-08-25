import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./footer-element.scss";

@customElement("footer-top-element")
export class FooterTopElement extends LitElement {
  static styles = styles;

  @property()
  classes = ""  

  render() {
    return html`
    <section class="footer-top ${this.classes}">
            <div class="container-fluid">
                <div class="row footer-header">
                    <div class="col col-lg-6 col-md-12">
                        <div class="title">Singapore Government Design System</div>
                        <div class="description">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum illo delectus laborum libero id
                            ratione quibusdam tempora assumenda quas, pariatur cum minus, aliquid molestiae et nisi dolorem
                            vitae molestias! Voluptate commodi aliquid iusto sequi sit eligendi, quod numquam nihil
                            consectetur eaque error earum laudantium! Temporibus accusamus pariatur quod totam quia.
                        </div>
                    </div>
                </div>
                <div class="row footer-items">
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 1
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 2
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 3
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 4
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 5
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div class="col-xxl-2 col-md-4 mb-3">
                        <div class="title">
                            Column 6
                        </div>
                        <ul class="links">
                            <li><a href="">About Us</a></li>
                            <li><a href="">This is a super long link</a></li>
                            <li><a href="">Test</a></li>
                            <li><a href="">Test</a></li>
                        </ul>
                    </div>
                </div>
                <div class="row footer-contact-links">
                    <div class="col">
                        <div class="d-flex justify-content-lg-end">
                            <ul>
                                <li><a href="">Contact</a></li>
                                <li><a href="">Feedback</a></li>
                                <li><a href="https://www.reach.gov.sg/" target="_blank"
                                        rel="noopener noreferrer">Reach.gov.sg</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
  }
}
