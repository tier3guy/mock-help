import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const LatexText = ({text}) => {

  return (
    <>
    {text ?<Latex>{text}</Latex>:""}
  </>
  );
};

export default LatexText;