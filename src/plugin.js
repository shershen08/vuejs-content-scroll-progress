var progressUIelem, scrollContainer,
uiElemSelector = '.vue-sp-indicator',
tmpScrollContainerSelector = '.content.easy-vue-card';

var iterateChildren = function(childrenList){
    var summ = 0;
    for(var i =0; i<childrenList.length;i++){
        var childElHeight = childrenList[i].getBoundingClientRect().height;
        if(childElHeight >= 0) summ += childElHeight;
    }
    return summ;
}
var handleScroll = function(e){
    var ratio = (scrollContainer.scrollTop/iterateChildren(scrollContainer.children))*100;
    progressUIelem.style.width = ratio + '%';
}

document.addEventListener("DOMContentLoaded", function(event) { 
    if(!tmpScrollContainerSelector) return;
    progressUIelem = document.querySelectorAll(uiElemSelector)[0];
    scrollContainer = document.querySelectorAll(tmpScrollContainerSelector)[0];
    if(!scrollContainer) return;
    scrollContainer.addEventListener('scroll', handleScroll);
});