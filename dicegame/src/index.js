// import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const product = 'MacBook';
const model = 'Air';
const item = `${product} ${model}`;
const imageUrl = 
  'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-space-gray-config-201810?wid=1078&hei=624&fmt=jpeg&qlt=80&.v=1633033424000';

function handleClick() {
  alert('곧 도착합니다!');
}

ReactDOM.render(
  // <h1>나만의 { product.toUpperCase() + model } 주문하기</h1>,
  <>
    <h1>나만의 { item } 주문하기</h1>
    <img src={ imageUrl } alt="제품 사진" />
    <button onClick={ handleClick }>확인</button>
  </>,
  document.getElementById('root')
);
