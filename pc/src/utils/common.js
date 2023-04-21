export function getScrollingCon() {
  if(generalConfig.hasLayout == false) {
    return document.getElementById('wrapper')
  }
  return document.getElementById('content')
}

// 生成UUID
export function uuid() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}