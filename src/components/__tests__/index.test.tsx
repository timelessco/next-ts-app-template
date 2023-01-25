import { render } from "@testing-library/react";

it("renders Button unchanged", () => {
  const { container } = render(<button type="button">Button</button>);
  expect(container).toMatchSnapshot();
});
