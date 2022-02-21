// import { Fragment } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  // <p className="hello">안녕 리액트!</p>
  // <form>
  //   <label htmlFor="name">이름</label>
  //   <input id="name" type="text" onBlur="" onFocus="" onMouseDown="" />
  // </form>,
  // <Fragment>
  //   <p>안녕</p>
  //   <p>리액트!</p>
  // </Fragment>,
  // Fragment 축약형 이 경우 import 필요 x
  <>
    <p>안녕</p>
    <p>리액트!</p>
  </>,
  document.getElementById('root')
);
