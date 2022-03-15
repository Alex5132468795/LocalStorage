window.onload = function(){
    let html;
    document.body.innerHTML += '<input type="button" id="start" disabled value="Старт"></input>';
    document.body.innerHTML += '<input type="text" id="name" placeholder="Имя"></input>';
    let names = document.querySelector('#name');
    let start = document.querySelector('#start');
    let nameValue; 
    let cl = 0;
    names.oninput = function(){
        start.removeAttribute('disabled');
        start.addEventListener('click', function(){
            nameValue = names.value;
            document.body.innerHTML = DrawGame();
            Timer(0);
            let click = document.querySelector('#click');
            click.addEventListener('click', function(){
                cl+=1;
                if(cl == 10){
                    Timer(1);
                    drawTable();
                }
            });
        });
    };
    function DrawGame(){
        return '<input type="button" id="click" value="Клик"></input><div id = "timer">'+00+':'+0000+'|'+ nameValue+'</div>';
    }
    function Timer(flag){
        let timer = document.querySelector('#timer');
        let num = 0;
        let why = setInterval(function(){
            num += 1;
            if(num<=1000){
                timer.textContent=Convert(num)+':'+num+'|'+nameValue;
            }else{
                timer.textContent=Convert(num)+':'+Math.floor(num/1000)+'|'+nameValue;
            }
            if(flag == 1){
                clearInterval(why);
                alert(nameValue+' | '+num);
                localStorage.setItem(nameValue, num);
            }
        }, 1);
    }
    function Convert(num){
        let sec = Math.floor(num/1000);
        return sec;
    }
    function drawTable(){
        html='<table><tr><td>Имя</td><td>Время</td></tr>';
        for(let elem in localStorage){
            html+='<tr><td>'+elem+'</td><td>'+localStorage.getItem(elem)+'</td></tr>';
        }
        html+='</table>'
        document.body.innerHTML=html;
    }
}