import SgdsTable from "@govtechsg/sgds-web-component/react/table";

export const Table = () => {
    return <SgdsTable tableheaders="[&quot;#&quot;, &quot;First Names&quot;, &quot;Last Name&quot;, &quot;Username&quot;]" tabledata="[
        [&quot;1&quot;, &quot;John&quot;, &quot;Doe&quot;, &quot;@johndoe&quot;],
        [&quot;2&quot;, &quot;Jane&quot;, &quot;Doe&quot;, &quot;@janedoe&quot;],
        [&quot;3&quot;, &quot;Bob&quot;, &quot;Smith&quot;, &quot;@bobsmith&quot;]
      ]" />
}
