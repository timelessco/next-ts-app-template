import { render } from "@testing-library/react";

import { Button } from "../Button";

it("renders CopyButton unchanged", () => {
  const { container } = render(<Button>Button</Button>);
  expect(container).toMatchSnapshot();
});
