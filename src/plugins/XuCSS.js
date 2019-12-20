
function fixTableThead(){
  let wrapper = document.getElementsByClassName('xu-fix-table-wrapper');
  try {
    for (let i=0;i<wrapper.length;i++){
      let table = wrapper[i].getElementsByTagName('table')[0];
      let thead = table.children[0];
      let thArr = thead.children[0].children;
      let newThead = thead.cloneNode(true);
      table.insertBefore(newThead,thead);
      newThead.style.position = 'absolute';
      newThead.style.top = '0px';
      let newThArr = newThead.children[0].children;
      for (let j=0;j<thArr.length;j++){
        newThArr[j].style.width = window.getComputedStyle(thArr[j])['width']
      }
      wrapper[i].addEventListener('scroll',function () {
        table.children[0].style.top = wrapper[i].scrollTop + 'px';
        // table.children[0].style.ma = wrapper[i].scrollTop + 'px';
      });
    }
  } catch (e) {
  }
}

export default {
  fixTableThead
}


