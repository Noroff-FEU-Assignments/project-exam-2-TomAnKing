import { Helmet } from "react-helmet";

function Head({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

export default Head;
