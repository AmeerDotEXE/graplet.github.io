function resizeTabelements(){
  var tabelements = document.getElementsByClassName("tabelement");
  Array.from(tabelements).forEach(function (element) {
      element.style.height = window.innerHeight - 116 + 'px';
  });
}
resizeTabelements();
document.addEventListener("resize", (event) => {
  resizeTabelements();
  Blockly.svgResize(Workspace);
});


function SwitchTabs(event) {
  CurrentActive = document.getElementsByClassName('active')[0];
  CurrentActive.classList.remove('active');
  if (!event.currentTarget.classList.contains('active')) { 
  event.currentTarget.classList.add('active');
  }
  AllTabs = document.getElementsByClassName('tab');
  var index = Array.from(AllTabs).indexOf(event.currentTarget);
  AllContents = document.getElementsByClassName('tabelement');
  Array.from(AllContents).forEach(function (element) {
    element.style.display = 'none';
  });
  AllContents[index].style.display = 'block'
}


function SwitchMethodTab(element){
  if(!element.classList.contains('active2')){
    element.classList.toggle('active2');
    e1 = document.getElementById('info-automatic');
    e2 = document.getElementById('info-manual');
    if (element.nextElementSibling){
      element.nextElementSibling.classList.remove('active2')
      e1.style.display = 'block';
      e2.style.display = 'none';
    }else{
      element.previousElementSibling.classList.remove('active2')
      e1.style.display = 'none';
      e2.style.display = 'block';
    }
  }
}