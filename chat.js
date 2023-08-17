if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  theme="dark";
  font_color="white";
  background_color="rgb(22,22,22)";
}else{
  theme="light";
  font_color="black";
}


words = ['Smart search ON: \n"Hey dear Luna Suggest me some Shirts for wearing to College"','Smart search ON:\n"Help me to decorate my Walls"','Smart search ON:\n"Hey Luna help me to select sarees for wedding"']
    var part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15;
    speed = 50;
    mode=true;
    outer_id="";
var wordflick = function () {
  //alert(speed);
  inter_id=setInterval(function () {
    if(!mode){
      return;
    }
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.prompt').text(part);
    return;
  },speed);
  outer_id=inter_id;
};

$(document).ready(function () {
  wordflick();
});
press_count=true;
function clear_prompt(){
  if(press_count){
    //val=document.getElementById("prompt").value;
  document.getElementById("prompt").value="";
  document.getElementById("prompt").style.color=font_color;
  press_count=false;
  }
}

async function word_count(){
  len=document.getElementById("prompt").value;
  document.getElementById("word_count").innerText=`${len.length}/200`;
  //document.getElementById("prompt").value=len.slice(0,10);
  if(len.length>4 && count ==1){
    var res=await get_sugg({"words":len});
    console.log(res);
    document.getElementById("suggestions").innerHTML="";
    document.getElementById("product_404").style.display="none";
    document.getElementById("suggestions").style.display="block";
    res.forEach(add_elem);
    function add_elem(w){
    let word=document.createElement("p");
    temp=w.replace(len.toLowerCase(),`<span>${len}</span>`);
    word.innerHTML=temp;
    let parent=document.querySelector("#suggestions");
    parent.appendChild(word);
    }
    
  }else{
    document.getElementById("product_404").style.display="block";
    document.getElementById("suggestions").style.display="hidden";
  }
}
document.getElementById("checkbox").checked=true;


count=0;
function off(){
  clearInterval(outer_id);
  mode=false;
  if (count==0) {
    words=['Smart search OFF:\n"Casual Shirts for men"','Smart search OFF:\n"Kurtis for women latest"'];
    count+=1;
    speed = 60;
  }else{
    words = ['Smart search ON: \n"Hey dear Luna Suggest me some Shirts for wearing to College"','Smart search ON:\n"Help me to decorate my Walls"','Smart search ON:\n"Hey Luna help me to select sarees for wedding"'];
    count-=1;
    speed = 50;
  }
  
  part="",
  i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
  mode=true;
  wordflick(speed);
}


async function get_sugg(data) {
    try {
        const response = await fetch('https://api.gokulkrishnan13.repl.co/amazon_sugg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const responseData = await response.json();
        return responseData["words"];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}