import { Fragment } from "react";

const headerData = {
  title: "Sargent Portraits of Artists & Friends",
  subtitle: "By John Sergent",
};

function TitleSubtitle() {
  return (
    <Fragment>
      <section className="title">{headerData.title}</section>
      <section className="subtitle">{headerData.subtitle}</section>
    </Fragment>
  );
}

export default TitleSubtitle;
