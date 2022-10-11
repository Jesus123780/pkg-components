import Container from "./Container";

export function ResisesColumns({ ...props }) {
  return (
    <Container>
      {props.children.map((container) => {return container})}
  </Container>
  );
}
