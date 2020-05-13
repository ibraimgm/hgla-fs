import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import RadioGroup from './RadioGroup';

afterEach(cleanup);

test('renders without selection', () => {
  const options = ['Foo', 'Bar', 'Baz'];
  const { getByText } = render(<RadioGroup options={options} />);

  options.forEach((o) => {
    const elem = getByText(o);
    expect(elem).toBeInTheDocument();
    expect(elem).not.toHaveClass('selected');
  });
});

test('renders with selection', () => {
  const options = ['A', 'B', 'C'];
  const selected = 'B';
  const { getByText } = render(
    <RadioGroup options={options} selected={selected} />
  );

  options.forEach((o) => {
    const elem = getByText(o);

    if (o === selected) {
      expect(elem).toHaveClass('selected');
    } else {
      expect(elem).not.toHaveClass('selected');
    }
  });
});

test('onClick returns clicked element text', () => {
  const options = ['X', 'Y', 'Z'];
  let clickedText;

  const { getByText } = render(
    <RadioGroup options={options} onClick={(value) => (clickedText = value)} />
  );

  options.forEach((o) => {
    const elem = getByText(o);
    fireEvent.click(elem);
    expect(o).toEqual(clickedText);
  });
});
