import { activate } from "../utils/interactive";

const Button = ({ funct, title, bg, margin }) => {
  // Only expose button semantics when this element handles its own click.
  // When wrapped in a <Link>, `funct` is omitted and the link stays the
  // single interactive element (avoids nested interactive controls).
  const interactiveProps = funct ? activate(funct) : {};

  return (
    <span
      className={`mainBtn ps-4 pe-4 pt-2 pb-2 fw-bold text-capitalize ${margin ?? ""}`}
      style={{ backgroundColor: bg, transition: ".4s linear" }}
      {...interactiveProps}
    >
      {title}
    </span>
  );
};

export default Button;
