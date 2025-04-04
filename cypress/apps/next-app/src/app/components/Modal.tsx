"use client";
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsModal from "@govtechsg/sgds-web-component/react/modal/index.js";

import { useState } from "react";
export const Modal = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <SgdsButton onClick={toggleModal}>Open Modal</SgdsButton>
      <SgdsModal open={open}>
        <h2 slot="title">Modal title</h2>
        <p slot="description">Modal description</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit.
          Pellentesque at nunc at mi auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa
          commodo velit, pretium dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu
          pellentesque interdum, arcu nisl blandit turpis, at tincidunt purus orci ut dolor. Morbi malesuada faucibus
          lorem, ornare accumsan sapien lacinia vel. In enim justo, hendrerit eu mi vitae, viverra fringilla nunc. Proin
          semper nunc a mollis faucibus. Nam at arcu non justo congue tincidunt. Donec vehicula felis risus, et lobortis
          lacus fringilla eu. Proin faucibus, nisi non semper elementum, sapien nisi viverra urna, id tempus augue felis
          ac nibh. Nullam pulvinar magna eros. Vestibulum at orci elit. Sed convallis fermentum gravida. Etiam suscipit
          nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis
          tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida,
          congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis nulla.
          Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in volutpat.
          Vivamus at facilisis ipsum, eu consequat ex. Integer ante ligula, mollis at diam in, tincidunt tincidunt orci.
          Mauris eu rutrum purus, eget consectetur massa. Pellentesque sed euismod dolor, vel ornare orci. Proin
          tincidunt gravida lorem. Duis vehicula, turpis quis placerat pharetra, lacus tortor fermentum tortor, a
          tincidunt mi arcu quis risus. Duis id ultrices urna, non placerat ex. Sed efficitur rhoncus condimentum.
          Aliquam eu convallis massa, ac suscipit dolor. Morbi bibendum lacus a justo consectetur gravida. Nullam
          porttitor ullamcorper eros, at hendrerit est semper venenatis. Donec non dolor metus. Aenean sit amet massa
          arcu. Quisque rhoncus orci pretium, venenatis orci quis, tincidunt ex. Duis efficitur lacus dolor, a interdum
          sapien imperdiet nec. Sed lobortis erat justo. Nam nec metus eget est blandit consequat non at sapien.
          Curabitur arcu eros, ultricies eu magna non, vulputate imperdiet erat. Duis nec sapien quam. In sapien elit,
          bibendum nec porttitor ac, vulputate pulvinar lacus. Maecenas venenatis lorem eget consequat molestie. Nulla
          hendrerit interdum sem, et efficitur ligula porttitor eget. Vivamus nibh risus, sodales condimentum orci sit
          amet, aliquam bibendum nunc. Etiam a elit et mi interdum faucibus vitae sed risus. Aenean eu posuere mi.
          Aenean lectus turpis, mollis eget ornare sit amet, placerat ac orci. Suspendisse tincidunt accumsan dolor,
          vitae pellentesque ipsum hendrerit quis. Duis luctus, ipsum a tempor rutrum, neque urna tincidunt dolor, ut
          placerat neque augue at ante. Curabitur id bibendum sem. Pellentesque vel tellus congue, condimentum purus
          quis, pulvinar massa. Suspendisse ac vulputate urna. Curabitur elementum consectetur blandit. Nulla tristique
          nec elit non placerat. Vestibulum porttitor mi nec quam dignissim suscipit. Aenean eu dui a felis interdum
          eleifend ut non nibh. Proin at molestie ante. Etiam vel ipsum vitae nunc porta fermentum.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Etiam dictum est vitae erat molestie blandit. Pellentesque at nunc at mi
          auctor imperdiet eu at leo. Integer aliquam, turpis vel ultricies ornare, sem massa commodo velit, pretium
          dictum quam nibh et ex. Suspendisse eu dignissim libero. Donec aliquam, lacus eu pellentesque interdum, arcu
          nisl blandit turpis, at tincidunt purus orci ut dolor. Morbi malesuada faucibus lorem, ornare accumsan sapien
          lacinia vel. In enim justo, hendrerit eu mi vitae, viverra fringilla nunc. Proin semper nunc a mollis
          faucibus. Nam at arcu non justo congue tincidunt. Donec vehicula felis risus, et lobortis lacus fringilla eu.
          Proin faucibus, nisi non semper elementum, sapien nisi viverra urna, id tempus augue felis ac nibh. Nullam
          pulvinar magna eros. Vestibulum at orci elit. Sed convallis fermentum gravida. Etiam suscipit nisi eget porta
          cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus ac facilisis tellus. Maecenas
          ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo gravida, congue sapien eu,
          rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis nulla. Suspendisse potenti.
          Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in volutpat. Vivamus at facilisis
          ipsum, eu consequat ex. Integer ante ligula, mollis at diam in, tincidunt tincidunt orci. Mauris eu rutrum
          purus, eget consectetur massa. Pellentesque sed euismod dolor, vel ornare orci. Proin tincidunt gravida lorem.
          Duis vehicula, turpis quis placerat pharetra, lacus tortor fermentum tortor, a tincidunt mi arcu quis risus.
          Duis id ultrices urna, non placerat ex. Sed efficitur rhoncus condimentum. Aliquam eu convallis massa, ac
          suscipit dolor. Morbi bibendum lacus a justo consectetur gravida. Nullam porttitor ullamcorper eros, at
          hendrerit est semper venenatis. Donec non dolor metus. Aenean sit amet massa arcu. Quisque rhoncus orci
          pretium, venenatis orci quis, tincidunt ex. Duis efficitur lacus dolor, a interdum sapien imperdiet nec. Sed
          lobortis erat justo. Nam nec metus eget est blandit consequat non at sapien. Curabitur arcu eros, ultricies eu
          magna non, vulputate imperdiet erat. Duis nec sapien quam. In sapien elit, bibendum nec porttitor ac,
          vulputate pulvinar lacus. Maecenas venenatis lorem eget consequat molestie. Nulla hendrerit interdum sem, et
          efficitur ligula porttitor eget. Vivamus nibh risus, sodales condimentum orci sit amet, aliquam bibendum nunc.
          Etiam a elit et mi interdum faucibus vitae sed risus. Aenean eu posuere mi. Aenean lectus turpis, mollis eget
          ornare sit amet, placerat ac orci. Suspendisse tincidunt accumsan dolor, vitae pellentesque ipsum hendrerit
          quis. Duis luctus, ipsum a tempor rutrum, neque urna tincidunt dolor, ut placerat neque augue at ante.
          Curabitur id bibendum sem. Pellentesque vel tellus congue, condimentum purus quis, pulvinar massa. Suspendisse
          ac vulputate urna. Curabitur elementum consectetur blandit. Nulla tristique nec elit non placerat. Vestibulum
          porttitor mi nec quam dignissim suscipit. Aenean eu dui a felis interdum eleifend ut non nibh. Proin at
          molestie ante. Etiam vel ipsum vitae nunc porta fermentum.
        </p>
        <SgdsButton slot="footer" variant="link" class="close-modal">
          Close
        </SgdsButton>
        <SgdsButton slot="footer" variant="primary" type="submit" form="formA">
          Submit
        </SgdsButton>
      </SgdsModal>
    </>
  );
};
