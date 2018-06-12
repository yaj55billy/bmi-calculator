


// 開始計算
var resultBtn =  document.querySelector('.origin-btn'); 

// 判斷BMI 數值區間
var bmiValue = document.querySelectorAll('.bmi-value');

// re 重置
var reBtn = document.querySelectorAll('.re-btn'); 

// result 六種狀況共用的class  init用
var result = document.querySelectorAll('.result');

// str
var records = document.querySelector('.records');

// 開始計算
resultBtn.addEventListener('click',countBmi,false);

// re 重置
for(i=0; i<reBtn.length;i++){
    reBtn[i].addEventListener('click',init,false);
};



// 初始狀態
function init(){
    document.querySelector('.height').value = '';
    document.querySelector('.weight').value = '';
    document.querySelector('.height').disabled = false;
    document.querySelector('.weight').disabled = false;
    resultBtn.style.display = 'block';
    for(i=0;i<result.length;i++){
        result[i].style.display = 'none';
    }
}

// 開始計算BMI 判斷BMI
function countBmi(e){
    //parseInt 將字串轉為數字
    var heightValue = parseInt(document.querySelector('.height').value);
    var weightValue = parseInt(document.querySelector('.weight').value);

    if(isNaN(heightValue)){
        alert('此欄位不可為空，或者需要是數字')
        {return}
    };
    if(isNaN(weightValue)){
        alert('此欄位不可為空，或者需要是數字')
        {return}
    };

    // BMI公式會用將公分變為公尺的單位，所以 /100； Math.pow是平方
    var bmiHeightValue = Math.pow((heightValue / 100),2);
    var countBmi = weightValue /bmiHeightValue;
    //取小數後兩位
    var bmi = countBmi.toFixed(2);


    if(bmi >= 18.5 && bmi < 24){

        // 理想
        var normalWeight = document.querySelector('.result.nw');
        var rlName = '理想';
        resultBtn.style.display = "none";
        normalWeight.style.display = "block";
        bmiValue[0].innerHTML = bmi;
        // var border = 'border-style1';
        var color ='border-style1';
        

    } else if(bmi <18.5){
        // 過輕
        var underWeight = document.querySelector('.result.uw'); 
        var rlName ='過輕';
        resultBtn.style.display = "none";
        underWeight.style.display = "block";
        bmiValue[1].innerHTML = bmi;
        var color ='border-style2';
        
    } else if(bmi >= 24 && bmi < 27){
        // 超重
        var overWeight = document.querySelector('.result.ow');
        var rlName ='超重';
        resultBtn.style.display = "none";
        overWeight.style.display = "block";
        bmiValue[2].innerHTML = bmi;
        var color ='border-style3';

    } else if (bmi >= 27 && bmi < 30){
        // 輕度肥胖
        var overWeightS = document.querySelector('.result.ow-s');
        var rlName ='輕度肥胖';
        resultBtn.style.display = "none";
        overWeightS.style.display = "block";
        bmiValue[3].innerHTML = bmi; 
        var color ='border-style4';

    } else if (bmi >= 30 && bmi < 35){
        //中度肥胖
        var overWeightM = document.querySelector('.result.ow-m');
        var rlName ='中度肥胖';
        resultBtn.style.display = "none";
        overWeightM.style.display = "block";
        bmiValue[4].innerHTML = bmi;
        var color ='border-style5';
        
    } else if (bmi >= 35){
        // 重度肥胖
        var overWeightB = document.querySelector('.result.ow-b');
        var rlName ='重度肥胖';
        resultBtn.style.display = "none";
        overWeightB.style.display = "block";
        bmiValue[5].innerHTML = bmi;
        var color ='border-style6';
    }

    var dataInfo = {rlName,bmi,weightValue,heightValue,color};
    data.push(dataInfo);
    localStorage.setItem('info', JSON.stringify(data));
    recordsFunc(data,bmi,rlName,heightValue,weightValue,color);

    // 在按reBtn之前 讓input無效
    document.querySelector('.height').disabled = true;
    document.querySelector('.weight').disabled = true;

}



// 組字串 帶入到main內
var data = JSON.parse(localStorage.getItem('info')) || [];
recordsFunc(data);

function recordsFunc(data,bmi,rlName,heightValue,weightValue,color){

    var str = '';
    var Today = new Date();
    var catchToday =  Today.getFullYear()+ "-" + (Today.getMonth()+1) + "-" + Today.getDate();
   
    for (var i = 0; i< data.length; i++) {
        str += '<li class="'+ data[i].color +' records-list">'+
        '<div class="rl-name">'+data[i].rlName+'</div>'+
            '<ul class="rl-info">'+
                '<li>BMI <span id="main-info-bmi">'+data[i].bmi+'</span></li>'+
                '<li>Weight <span id="main-info-weight">'+data[i].weightValue+'</span></li>'+
                '<li>Height <span id="main-info-height">'+data[i].heightValue+'</span></li>'+
            '</ul>'+
        '<div class="rl-date">'+catchToday+'</div>'+
        '</li>';
    }
    records.innerHTML = str;

    localStorage.setItem('info', JSON.stringify(data));
}





