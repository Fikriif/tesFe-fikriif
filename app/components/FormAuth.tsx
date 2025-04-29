import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const FormAuth = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="border border-gray-300 rounded px-3 py-2 text-sm w-full"
    />
  );
});

FormAuth.displayName = 'FormAuth';

export default FormAuth;
