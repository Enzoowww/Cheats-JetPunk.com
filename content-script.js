supportedMode=["text-game","photo-game","map-game","mc-game"]

function getQuizName(){
    console.clear()
    var name=document.querySelector('.thumb-right h1').innerHTML
    console.log(`%cName of the quiz : `+`%c${name}`, 'color:white;', 'color:skyblue;');
    console.log(`%cType : `+`%c${_page['pageType']}`, 'color:white;', 'color:skyblue;');
    if(supportedMode.indexOf(_page['pageType']) != -1){
        console.log(`%cStatus : `+`%cReady`, 'color:white;', 'color:lightgreen;');
        document.getElementById('start-button').click()
    }else{
        console.log(`%cStatus : `+`%cDoes not support this type.`, 'color:white;', 'color:#FF6666;');
    }
}
for(i in document.querySelectorAll('.correct')){
    console.log(document.querySelectorAll('.correct')[i]['innerHTML']);
}
function startScript() {
    if(_page['pageType']=='text-game'||_page['pageType']=='photo-game'){
        wordsA=[]
        for(i in _page['data']['quiz']['answers']){
            uiui=_page['data']['quiz']['answers'][i]['display']
            if(uiui.includes('{')){
                var regex = /{([^}]+)}/g;
                var motsEntreAccolades = [...uiui.matchAll(regex)].map(match => match[1]);
                wordsA.push(motsEntreAccolades)
            }else{
                wordsA.push(_page['data']['quiz']['answers'][i]['display'])}}
        if(_page['data']['quiz']['yellowBox']!=true){
            wordsA.sort(function(a, b) {
                return a.length - b.length;
            });}
        var motAChercher = "<br />";
        var nouveauMot = "";
        var motsModifies = wordsA.map(function(mot) {
        if (mot.includes(motAChercher)) {
            return mot.replace(motAChercher, nouveauMot);
        } else {
            return mot;
        }
        });
        words=motsModifies
        var input = document.getElementById('txt-answer-box');
        var i = 0;
        score=0
        var interval = setInterval(function() {
            if (i < words.length) {
                var word = words[i];
                answers=[]
                for(p in document.querySelectorAll('.correct')){
                    answers.push(document.querySelectorAll('.correct')[p]['innerHTML'])}
                answers.splice(-7, 7)
                for (var t = 0; t < answers.length; t++) {
                    if (answers[t].includes("<br>")) {
                      answers[t] = answers[t].replace("<br>", "");
                    }}
                if(!answers.includes(word)){for (var j = 0; j < word.length; j++) {
                    var event = new Event('keydown');
                    event.key = word[j];
                    input.dispatchEvent(event);
                    event = new Event('keypress');
                    event.key = word[j];
                    input.dispatchEvent(event);
                    input.value += word[j];
                    event = new Event('input', { bubbles: true });
                    input.dispatchEvent(event);
                    if(input.value==''){
                        break}}}
                if(input.value!=''){
                    clearInterval(interval)
                    document.getElementsByClassName('red btn-sm give-up show-conditional show-active')[0].click()}
                i++;
            } else {
                clearInterval(interval);
                document.getElementsByClassName('red btn-sm give-up show-conditional show-active')[0].click()}}, 1);
    }else if(_page['pageType']=='map-game'){
        wordsA=[]
        for(i in _page['data']['quiz']['answers']){
            uiui=_page['data']['quiz']['answers'][i]['display']
            if(uiui.includes('{')){
                var regex = /{([^}]+)}/g;
                var motsEntreAccolades = [...uiui.matchAll(regex)].map(match => match[1]);
                wordsA.push(motsEntreAccolades)
            }else{wordsA.push(_page['data']['quiz']['answers'][i]['display'])}}
        if(_page['data']['quiz']['yellowBox']!=true){
            wordsA.sort(function(a, b) {
                return a.length - b.length;
            });}
        var motAChercher = "<br />";
        var nouveauMot = "";
        var motsModifies = wordsA.map(function(mot) {
        if (mot.includes(motAChercher)) {
            return mot.replace(motAChercher, nouveauMot);
        } else {
            return mot;}});
        words=motsModifies
        i=0
        var interval2 = setInterval(function() {
            if (i < words.length) {
                var word = _page['data']['quiz']['answers'][i]['id'];
                document.getElementById(`map-answer-${word}`).click()
                i++;} else {clearInterval(interval2);}}, 1);
    }else if(_page['pageType']=='mc-game'){
        elements=_page['data']['quiz']['answers']
        for(i=0; i< elements.length; i++){
            var id = elements[i]['correct']
            document.getElementById(`mc-choice-button-${id}`).click()}
        document.getElementsByClassName('finish-mc')[0].click()}}
function detecterAffichage() {
    var element = document.getElementById('post-game-boxes');
    if (element.style.display !== 'none') {
      console.log('fin');
      clearInterval(ini)
      setTimeout(() => {
        var lienElement = document.querySelector('a[href="/quizzes/random?language=french"]');
        if (lienElement) {
        lienElement.click();
        }}, 1500);}}
var ini=setInterval(detecterAffichage, 1000);
document.getElementById('start-button').onclick = startScript;
getQuizName();