export const Accordion = () => {
  return (
    <>
      <sgds-accordion suppressHydrationWarning>
        <sgds-accordion-item suppressHydrationWarning>
          <div className="m-0" slot="header">This is a solo accordion</div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </sgds-accordion-item>
      </sgds-accordion>
      <sgds-accordion suppressHydrationWarning>
        <sgds-accordion-item suppressHydrationWarning>
          <div className="m-0" slot="header">This is an accordion</div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </sgds-accordion-item>
        <sgds-accordion-item suppressHydrationWarning>
          <div className="m-0" slot="header">Accordion 1</div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </sgds-accordion-item>
        <sgds-accordion-item open suppressHydrationWarning>
          <div className="m-0" slot="header">Accordion 2</div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </sgds-accordion-item>
        <sgds-accordion-item suppressHydrationWarning>
          <div className="m-0" slot="header">Accordion 3</div>
          <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores soluta eaque fugit fuga distinctio? Eum.
          </span>
        </sgds-accordion-item>
      </sgds-accordion>
    </>
  );
};
